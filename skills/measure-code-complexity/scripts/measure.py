#!/usr/bin/env python3
"""Measure current production files with cccc and Lizard. Save full JSON, print a compact summary."""

from __future__ import annotations

import argparse
from collections import defaultdict
import hashlib
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
from python_nesting import function_depths
from bundled_cccc import executable as bundled_cccc

SCRIPT_ROOT = Path(__file__).resolve().parent
WHEELS = {
    "pygments-2.19.2-py3-none-any.whl": "86540386c03d588bb81d44bc3928634ff26449851e99741617ecb9037ee5ec0b",
    "lizard-1.24.0-py2.py3-none-any.whl": "a688bc607a891ff4a7836826f25742dc9c1bf648da3075dbd495e199e8848602",
}
EXCLUDED = {
    ".git", ".hg", ".svn", "node_modules", "vendor", "vendors", "deps",
    "build", "dist", "target", "coverage", "generated", "fixtures",
    "snapshots", "__fixtures__", "__snapshots__", "__pycache__",
    "test", "tests", "spec", "specs", "__tests__",
}
NON_SOURCE = {
    ".css", ".csv", ".gif", ".html", ".ico", ".info", ".jpeg", ".jpg",
    ".json", ".jsonc", ".lcov", ".lock", ".map", ".md", ".mdx", ".pdf",
    ".png", ".pyc", ".snap", ".svg", ".toml", ".tsv", ".txt", ".webp",
    ".whl", ".xml", ".yaml", ".yml",
}
CLONE_TOKENS = 70
# Attention routes interpretation. It never controls success or changes scores.
ATTENTION = {
    "cyclomatic": (10, "cyclomatic-complexity.md"),
    "cognitive": (16, "cognitive-complexity.md"),
    "nloc": (61, "function-size.md"),
    "max_nesting": (4, "nesting.md"),
    "parameters": (6, "parameters.md"),
}


class MeasurementError(RuntimeError):
    pass


def run(command, cwd=None):
    result = subprocess.run(command, cwd=cwd, capture_output=True, text=True, timeout=60)
    if result.returncode:
        raise MeasurementError(f"Command failed ({result.returncode}): {' '.join(command)}: {result.stderr.strip()}")
    return result.stdout


def git(repo, *arguments):
    return run(["git", "-C", str(repo), *arguments])


def fields(text):
    return [part for part in text.split("\0") if part]


def excluded(path):
    name = path.name.lower()
    return (
        bool(set(path.parts) & EXCLUDED)
        or path.suffix.lower() in NON_SOURCE
        or name.endswith((".min.js", ".generated.ts", ".generated.js"))
        or ".fixture." in name or ".snap." in name
        or re.search(r"\.(?:spec|test)\.(?:[cm]?[jt]sx?)$", name)
        or (path.suffix.lower() in {".py", ".pyw"} and (name.startswith("test_") or name.endswith("_test.py") or name == "conftest.py"))
        or name.endswith(("_test.go", "_spec.rb"))
        or re.search(r"Tests?\.(?:java|cs)$", path.name)
    )


def select_files(repo, paths, base):
    if paths:
        candidates = []
        for value in paths:
            path = Path(os.path.abspath(repo / value))
            if not path.is_file() or not path.is_relative_to(repo) or not path.resolve().is_relative_to(repo):
                raise MeasurementError(f"Expected a file inside --repo: {value}")
            candidates.append(str(path.relative_to(repo)))
        selection = {"mode": "explicit"}
    else:
        revision = git(repo, "rev-parse", "--verify", "--end-of-options", f"{base}^{{commit}}").strip()
        candidates = fields(git(repo, "diff", "--name-only", "-z", "--diff-filter=ACMR", revision, "--"))
        candidates += fields(git(repo, "ls-files", "--others", "--exclude-standard", "-z"))
        selection = {"mode": "changed-files", "selection_base": revision}
    selected, ignored = [], []
    for name in sorted(set(candidates)):
        path = repo / name
        if excluded(Path(name)):
            ignored.append(name)
        elif not path.is_file() or not path.resolve().is_relative_to(repo):
            raise MeasurementError(f"Selected source is missing or resolves outside --repo: {name}")
        else:
            selected.append(name)
    return selected, {**selection, "files": selected, "excluded_files": ignored}


def content_id(repo, paths):
    digest = hashlib.sha256()
    for name in paths:
        digest.update(name.encode() + b"\0")
        digest.update(hashlib.sha256((repo / name).read_bytes()).digest())
    return digest.hexdigest()


def load_lizard():
    for name, expected in WHEELS.items():
        path = SCRIPT_ROOT / "vendor" / name
        if hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            raise MeasurementError(f"Vendored wheel checksum mismatch: {name}")
        sys.path.insert(0, str(path))
    import lizard
    from lizard_ext import lizardduplicate, lizardns, version
    return lizard, lizardduplicate, lizardns, str(version)


def distribution(values):
    values = sorted(values)
    def percentile(percent):
        return values[max(0, math.ceil(len(values) * percent / 100) - 1)] if values else 0
    return {"sum": sum(values), "max": max(values, default=0), "median": percentile(50), "p90": percentile(90), "p95": percentile(95)}


def functions(tree):
    for function in tree:
        yield function
        yield from functions(function.get("children", []))


def measure_cccc(repo, paths, executable):
    version = run([executable, "--version"]).strip()
    if not paths:
        return {"files": [], "summary": {
            "file_count": 0, "function_count": 0, "parse_error_count": 0,
            "parse_error_file_count": 0, "cognitive": distribution([]), "cyclomatic": distribution([]),
        }}, version
    report = json.loads(run([executable, "--no-config", "--no-cache", "-j", "1", "--", *[str(repo / name) for name in paths]], cwd=repo))
    if not isinstance(report, dict) or not isinstance(report.get("files"), list) or not isinstance(report.get("summary"), dict):
        raise MeasurementError("cccc returned an unsupported report shape. Expected files and summary.")
    summary = report["summary"]
    for key in ("file_count", "function_count", "parse_error_count", "parse_error_file_count"):
        if type(summary.get(key)) is not int or summary[key] < 0:
            raise MeasurementError(f"Invalid cccc summary {key}")
    for key in ("cognitive", "cyclomatic"):
        if not isinstance(summary.get(key), dict) or any(type(summary[key].get(field)) is not int or summary[key][field] < 0 for field in ("sum", "max", "median", "p90", "p95")):
            raise MeasurementError(f"Invalid cccc summary {key}")
    for file in report["files"]:
        file["path"] = str(Path(file["path"]).relative_to(repo))
        if file["path"] not in paths:
            raise MeasurementError(f"cccc reported a file outside the selected scope: {file['path']}")
        for function in functions(file["functions"]):
            for key in ("line", "cyclomatic", "cognitive"):
                if type(function[key]) is not int or function[key] < (1 if key == "line" else 0):
                    raise MeasurementError(f"Invalid cccc function {key} in {file['path']}")
    if "parse_error_files" in report["summary"]:
        report["summary"]["parse_error_files"] = [str(Path(path).relative_to(repo)) for path in report["summary"]["parse_error_files"]]
    return report, version


def measure_lizard(repo, paths, limitations):
    lizard, duplicate_module, nesting_module, version = load_lizard()
    supported = [name for name in paths if lizard.get_reader_for(str(repo / name))]
    for name in sorted(set(paths) - set(supported)):
        limitations.append({"path": name, "tool": "lizard", "reason": "unsupported source"})
    duplicates = duplicate_module.LizardExtension()
    def nesting(tokens, reader):
        return nesting_module.LizardExtension()(tokens, reader)
    extensions = lizard.get_extensions([nesting, duplicates])
    records = {}
    for info in lizard.analyze_files([str(repo / name) for name in supported], threads=1, exts=extensions):
        name = str(Path(info.filename).relative_to(repo))
        depths = None
        invalid_depths = False
        if Path(name).suffix.lower() in {".py", ".pyw"}:
            try:
                depths = function_depths((repo / name).read_text(encoding="utf-8-sig"), name)
                omitted = set(depths) - {f.start_line for f in info.function_list}
                if omitted:
                    limitations.append({"path": name, "tool": "lizard", "reason": "functions omitted", "lines": sorted(omitted)})
            except (SyntaxError, UnicodeError, RecursionError) as error:
                invalid_depths = True
                limitations.append({"path": name, "tool": "python-ast", "reason": str(error)})
        rows = []
        for function in info.function_list:
            row = {"name": function.name, "line": function.start_line, "end_line": function.end_line,
                   "nloc": function.nloc, "parameters": function.parameter_count}
            if depths is not None:
                if function.start_line in depths:
                    row["max_nesting"] = depths[function.start_line]
                else:
                    limitations.append({"path": name, "tool": "python-ast", "reason": "unmatched function", "line": function.start_line})
            elif not invalid_depths:
                row["max_nesting"] = int(function.max_nested_structures)
            rows.append(row)
        records[name] = rows
    clones = [
        {"locations": [{"path": str(Path(part.file_name).relative_to(repo)), "line": part.start_line, "end_line": part.end_line} for part in group]}
        for group in duplicates.get_duplicates(CLONE_TOKENS)
    ]
    clones.sort(key=lambda group: [(part["path"], part["line"]) for part in group["locations"]])
    return records, clones, float(duplicates.duplicate_rate() or 0), version


def leaf_name(name):
    return re.split(r"\.|::", name)[-1]


def enrich(report, records, paths, limitations):
    files = {file["path"]: file for file in report["files"]}
    attached = 0
    for name in paths:
        if name not in files:
            limitations.append({"path": name, "tool": "cccc", "reason": "source not reported"})
            files[name] = {"path": name, "functions": []}
        file = files[name]
        if file.get("parse_errors"):
            limitations.append({"path": name, "tool": "cccc", "reason": "parse errors", "errors": file["parse_errors"]})
        cccc_index, lizard_index = defaultdict(list), defaultdict(list)
        for function in functions(file["functions"]):
            cccc_index[(function["line"], leaf_name(function["name"]))].append(function)
        for row in records.get(name, []):
            lizard_index[(row["line"], leaf_name(row["name"]))].append(row)
        unmatched = []
        for key, rows in lizard_index.items():
            targets = cccc_index.get(key, [])
            if len(rows) == len(targets) == 1 and not file.get("parse_errors"):
                targets[0]["lizard"] = {k: v for k, v in rows[0].items() if k not in {"name", "line"}}
                attached += 1
            else:
                unmatched.extend(rows)
        if unmatched:
            file["lizard_unmatched"] = unmatched
            limitations.append({"path": name, "tool": "join", "reason": "Lizard functions retained separately", "count": len(unmatched)})
        missing = sum(len(targets) for key, targets in cccc_index.items() if key not in lizard_index)
        if missing and name in records:
            limitations.append({"path": name, "tool": "lizard", "reason": "cccc functions lack supporting measurements", "count": missing})
    report["files"] = [files[name] for name in sorted(files)]
    return attached


def build_summary(report, records, clones, rate, attached):
    rows = [row for file in records.values() for row in file]
    lizard_summary = {"file_count": len(records), "function_count": len(rows), "attached_function_count": attached,
                      "unmatched_function_count": len(rows) - attached}
    for key in ("nloc", "max_nesting", "parameters"):
        values = [row[key] for row in rows if key in row]
        lizard_summary[key] = {**distribution(values), "measured_function_count": len(values)}
    lizard_summary["duplication"] = {"minimum_tokens": CLONE_TOKENS, "group_count": len(clones), "rate": rate}
    report["summary"]["lizard"] = lizard_summary
    cccc_rows = [function for file in report["files"] for function in functions(file["functions"])]
    attention = {}
    for key, (minimum, reference) in ATTENTION.items():
        population = cccc_rows if key in {"cognitive", "cyclomatic"} else rows
        attention[key] = {"count": sum(row.get(key, -1) >= minimum for row in population),
                          "minimum": minimum, "reference": f"references/{reference}"}
    attention["duplication"] = {"count": len(clones), "minimum_tokens": CLONE_TOKENS, "reference": "references/duplication.md"}
    report["summary"]["attention"] = attention


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".", help="Git repository root")
    parser.add_argument("--base", default="HEAD", help="Git revision used only to select changed files, default HEAD")
    parser.add_argument("--cccc", help="Override the bundled executable with a supplied path")
    parser.add_argument("paths", nargs="*", help="Explicit files relative to --repo, overrides changed-file selection")
    args = parser.parse_args()
    try:
        if sys.version_info < (3, 9):
            raise MeasurementError("Python 3.9 or newer is required.")
        repo = Path(args.repo).resolve()
        if Path(git(repo, "rev-parse", "--show-toplevel").strip()).resolve() != repo:
            raise MeasurementError("--repo must be the Git repository root.")
        paths, scope = select_files(repo, args.paths, args.base)
        identity = content_id(repo, paths)
        report, cccc_version = measure_cccc(repo, paths, args.cccc or bundled_cccc())
        limitations = []
        records, clones, rate, lizard_version = measure_lizard(repo, paths, limitations)
        attached = enrich(report, records, paths, limitations)
        build_summary(report, records, clones, rate, attached)
        if content_id(repo, paths) != identity or select_files(repo, args.paths, args.base)[0] != paths:
            raise MeasurementError("Selected source changed during measurement. Rerun on the current candidate.")
        report.update({
            "schema": 4, "status": "partial" if limitations else "complete",
            "scope": {**scope, "content_id": identity},
            "tools": {"cccc": cccc_version, "lizard": lizard_version, "python": sys.version.split()[0],
                      "nesting": "Python AST for Python, lizard-ns for other languages"},
            "duplicates": clones, "limitations": limitations,
        })
        descriptor, destination = tempfile.mkstemp(prefix="code-complexity-", suffix=".json")
        with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
            json.dump(report, stream, indent=2)
            stream.write("\n")
        print(json.dumps({"schema": report["schema"], "status": report["status"], "summary": report["summary"],
                          "scope": {"mode": scope["mode"], "file_count": len(paths), "content_id": identity},
                          "tools": report["tools"], "limitation_count": len(limitations), "report": destination}, indent=2))
        return 0
    except (MeasurementError, OSError, ValueError, KeyError, TypeError, ImportError, subprocess.TimeoutExpired) as error:
        print(json.dumps({"status": "failed", "error": str(error)}, indent=2))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
