#!/usr/bin/env python3
"""Measure changed-code complexity with a pinned, vendored Lizard runtime."""

from __future__ import annotations

import argparse
import hashlib
import itertools
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
from typing import Any, Iterable


SCHEMA_VERSION = 1
SCRIPT_ROOT = Path(__file__).resolve().parent
VENDOR_ROOT = SCRIPT_ROOT / "vendor"
WHEELS = (
    (
        "pygments-2.19.2-py3-none-any.whl",
        "86540386c03d588bb81d44bc3928634ff26449851e99741617ecb9037ee5ec0b",
    ),
    (
        "lizard-1.24.0-py2.py3-none-any.whl",
        "a688bc607a891ff4a7836826f25742dc9c1bf648da3075dbd495e199e8848602",
    ),
)

DEFAULTS = {
    "cyclomaticReview": 10,
    "nlocReview": 100,
    "nestedStructuresReview": 3,
    "parameterCountReview": 5,
    "duplicateTokens": 70,
}

REFERENCES = {
    "cyclomaticComplexity": "references/CYCLOMATIC-COMPLEXITY.md",
    "nloc": "references/FUNCTION-SIZE.md",
    "nestedStructures": "references/NESTING.md",
    "parameterCount": "references/PARAMETERS.md",
    "duplication": "references/DUPLICATION.md",
}

EXCLUDED_SEGMENTS = {
    ".git",
    ".hg",
    ".svn",
    "build",
    "coverage",
    "deps",
    "dist",
    "fixtures",
    "generated",
    "node_modules",
    "snapshots",
    "vendor",
    "vendors",
    "__fixtures__",
    "__snapshots__",
}

TEST_SEGMENTS = {"spec", "specs", "test", "tests", "__tests__"}
NON_SOURCE_SUFFIXES = {
    ".css",
    ".csv",
    ".gif",
    ".html",
    ".jpeg",
    ".jpg",
    ".json",
    ".lock",
    ".md",
    ".pdf",
    ".png",
    ".svg",
    ".toml",
    ".txt",
    ".xml",
    ".yaml",
    ".yml",
}


class MeasurementError(RuntimeError):
    """A deterministic measurement prerequisite or execution failed."""


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def load_analyzer() -> tuple[Any, Any, Any, str]:
    if sys.version_info < (3, 8):
        raise MeasurementError("Python 3.8 or newer is required.")

    for filename, expected in WHEELS:
        wheel = VENDOR_ROOT / filename
        if not wheel.is_file():
            raise MeasurementError(f"Missing vendored analyzer wheel: {filename}")
        actual = sha256(wheel)
        if actual != expected:
            raise MeasurementError(
                f"Checksum mismatch for {filename}: expected {expected}, got {actual}"
            )
        sys.path.insert(0, str(wheel))

    try:
        import lizard  # type: ignore
        from lizard_ext import lizardduplicate, lizardns, version  # type: ignore
    except (ImportError, SystemExit) as error:
        raise MeasurementError(f"Unable to load vendored Lizard: {error}") from error

    return lizard, lizardns, lizardduplicate, str(version)


def git(repo: Path, *arguments: str, check: bool = True) -> bytes:
    command = ["git", "-C", str(repo), *arguments]
    result = subprocess.run(command, capture_output=True, check=False)
    if check and result.returncode != 0:
        message = result.stderr.decode("utf-8", "replace").strip()
        raise MeasurementError(
            f"Command failed ({result.returncode}): {' '.join(command)}: {message}"
        )
    return result.stdout


def nul_fields(data: bytes) -> list[str]:
    return [field.decode("utf-8", "surrogateescape") for field in data.split(b"\0") if field]


def normalize_path(value: str) -> str:
    return Path(value).as_posix().removeprefix("./")


def excluded(path: str) -> bool:
    normalized = normalize_path(path)
    parts = set(Path(normalized).parts)
    name = Path(normalized).name.lower()
    return (
        bool(parts & EXCLUDED_SEGMENTS)
        or bool(parts & TEST_SEGMENTS)
        or name.endswith((".min.js", ".min.css", ".generated.ts", ".generated.js"))
        or ".fixture." in name
        or ".snap." in name
        or name.endswith((".spec.ts", ".spec.tsx", ".test.ts", ".test.tsx"))
    )


def parse_name_status(data: bytes) -> dict[str, str | None]:
    fields = nul_fields(data)
    changed: dict[str, str | None] = {}
    index = 0
    while index < len(fields):
        status = fields[index]
        index += 1
        if status.startswith(("R", "C")):
            if index + 1 >= len(fields):
                raise MeasurementError("Malformed git rename/copy status output.")
            old_path = normalize_path(fields[index])
            new_path = normalize_path(fields[index + 1])
            changed[new_path] = old_path
            index += 2
        else:
            if index >= len(fields):
                raise MeasurementError("Malformed git name-status output.")
            path = normalize_path(fields[index])
            index += 1
            if not status.startswith("D"):
                changed[path] = path
    return changed


def all_changed_paths(repo: Path, base: str) -> dict[str, str | None]:
    changed = parse_name_status(
        git(repo, "diff", "--name-status", "-z", "--find-renames", base, "--")
    )
    for path in nul_fields(git(repo, "ls-files", "--others", "--exclude-standard", "-z")):
        changed[normalize_path(path)] = None
    return {path: old_path for path, old_path in changed.items() if (repo / path).is_file()}


def changed_paths(repo: Path, base: str) -> dict[str, str | None]:
    return {
        path: old_path
        for path, old_path in all_changed_paths(repo, base).items()
        if not excluded(path)
    }


def line_ranges(repo: Path, base: str, path: str, is_untracked: bool) -> list[tuple[int, int]]:
    if is_untracked:
        line_count = sum(1 for _ in (repo / path).open("rb"))
        return [(1, max(1, line_count))]

    patch = git(repo, "diff", "--unified=0", "--no-color", base, "--", path).decode(
        "utf-8", "replace"
    )
    ranges: list[tuple[int, int]] = []
    for match in re.finditer(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@", patch, re.MULTILINE):
        start = int(match.group(1))
        count = int(match.group(2) or "1")
        if count:
            ranges.append((start, start + count - 1))
    return ranges


def intersects(start: int, end: int, ranges: Iterable[tuple[int, int]]) -> bool:
    return any(start <= range_end and end >= range_start for range_start, range_end in ranges)


def current_paths(repo: Path) -> list[str]:
    paths = nul_fields(git(repo, "ls-files", "-co", "--exclude-standard", "-z"))
    return sorted(
        {
            normalize_path(path)
            for path in paths
            if (repo / path).is_file() and not excluded(path)
        }
    )


def base_paths(repo: Path, base: str) -> list[str]:
    return sorted(
        path
        for path in map(
            normalize_path,
            nul_fields(git(repo, "ls-tree", "-r", "--name-only", "-z", base)),
        )
        if not excluded(path)
    )


def source_paths(paths: Iterable[str], root: Path, lizard: Any) -> tuple[list[str], list[str]]:
    supported: list[str] = []
    unsupported: list[str] = []
    for path in paths:
        if lizard.get_reader_for(str(root / path)):
            supported.append(path)
        elif Path(path).suffix.lower() not in NON_SOURCE_SUFFIXES:
            unsupported.append(path)
    return supported, unsupported


def extract_base(repo: Path, base: str, paths: Iterable[str], target: Path) -> list[str]:
    extracted: list[str] = []
    for path in paths:
        result = subprocess.run(
            ["git", "-C", str(repo), "show", f"{base}:{path}"],
            capture_output=True,
            check=False,
        )
        if result.returncode != 0:
            continue
        destination = target / path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(result.stdout)
        extracted.append(path)
    return extracted


def analyze(
    root: Path,
    paths: list[str],
    lizard: Any,
    lizardns: Any,
    duplicate_module: Any,
    duplicate_tokens: int,
) -> tuple[list[dict[str, Any]], list[list[dict[str, Any]]], float]:
    nested_extension = lizardns.LizardExtension()
    duplicate_extension = duplicate_module.LizardExtension()
    extensions = lizard.get_extensions([nested_extension, duplicate_extension])
    absolute_paths = [str(root / path) for path in paths]
    file_infos = list(lizard.analyze_files(absolute_paths, threads=1, exts=extensions))

    functions: list[dict[str, Any]] = []
    for file_info in file_infos:
        relative = normalize_path(os.path.relpath(file_info.filename, root))
        for function in file_info.function_list:
            functions.append(
                {
                    "file": relative,
                    "line": int(function.start_line),
                    "endLine": int(function.end_line),
                    "symbol": str(function.name),
                    "longName": str(function.long_name),
                    "metrics": {
                        "cyclomaticComplexity": int(function.cyclomatic_complexity),
                        "nloc": int(function.nloc),
                        "nestedStructures": int(function.max_nested_structures),
                        "parameterCount": int(function.parameter_count),
                        "tokenCount": int(function.token_count),
                    },
                }
            )

    duplicates: list[list[dict[str, Any]]] = []
    for group in duplicate_extension.get_duplicates(duplicate_tokens):
        duplicates.append(
            [
                {
                    "file": normalize_path(os.path.relpath(snippet.file_name, root)),
                    "line": int(snippet.start_line),
                    "endLine": int(snippet.end_line),
                }
                for snippet in group
            ]
        )
    return functions, duplicates, float(duplicate_extension.duplicate_rate() or 0.0)


def cyclomatic_band(value: int) -> str:
    if value <= 6:
        return "low"
    if value <= 9:
        return "moderate"
    if value <= 20:
        return "high"
    return "veryHigh"


def baseline_match(function: dict[str, Any], base_functions: list[dict[str, Any]], old_path: str | None) -> dict[str, Any] | None:
    if old_path is None:
        return None
    same_name = [
        item
        for item in base_functions
        if item["file"] == old_path and item["symbol"] == function["symbol"]
    ]
    if len(same_name) == 1:
        return same_name[0]
    same_signature = [item for item in same_name if item["longName"] == function["longName"]]
    if same_signature:
        return min(same_signature, key=lambda item: abs(item["line"] - function["line"]))
    if same_name:
        return min(same_name, key=lambda item: abs(item["line"] - function["line"]))
    return None


def metric_value(
    value: int,
    baseline: int | None,
    band: str | None = None,
    is_new: bool = False,
) -> dict[str, Any]:
    result: dict[str, Any] = {"value": value}
    if is_new:
        result["baseline"] = "absent"
        result["delta"] = "new"
    elif baseline is not None:
        result["baseline"] = baseline
        result["delta"] = value - baseline
    if band:
        result["band"] = band
    return result


def duplicate_pairs(groups: list[list[dict[str, Any]]]) -> dict[tuple[str, str], int]:
    pairs: dict[tuple[str, str], int] = {}
    for group in groups:
        for left, right in itertools.combinations(group, 2):
            key = tuple(sorted((left["file"], right["file"])))
            span = min(
                left["endLine"] - left["line"] + 1,
                right["endLine"] - right["line"] + 1,
            )
            pairs[key] = max(pairs.get(key, 0), span)
    return pairs


def duplicate_triggers(
    candidate_groups: list[list[dict[str, Any]]],
    base_groups: list[list[dict[str, Any]]],
    changed: dict[str, str | None],
    changed_lines: dict[str, list[tuple[int, int]]],
    whole_repository: bool,
    minimum_tokens: int,
) -> list[dict[str, Any]]:
    base_pair_lengths = duplicate_pairs(base_groups)
    results: list[dict[str, Any]] = []
    seen: set[tuple[tuple[str, int, int], ...]] = set()

    for group in candidate_groups:
        touches_change = whole_repository or any(
            snippet["file"] in changed
            and intersects(
                snippet["line"],
                snippet["endLine"],
                changed_lines.get(snippet["file"], []),
            )
            for snippet in group
        )
        if not touches_change:
            continue

        state = "present" if whole_repository else None
        baseline_lines: int | None = None
        if not whole_repository:
            for left, right in itertools.combinations(group, 2):
                old_left = changed.get(left["file"], left["file"])
                old_right = changed.get(right["file"], right["file"])
                if old_left is None or old_right is None:
                    state = "new"
                    continue
                base_key = tuple(sorted((old_left, old_right)))
                candidate_span = min(
                    left["endLine"] - left["line"] + 1,
                    right["endLine"] - right["line"] + 1,
                )
                prior_span = base_pair_lengths.get(base_key)
                if prior_span is None:
                    state = "new"
                elif candidate_span > prior_span and state != "new":
                    state = "expanded"
                    baseline_lines = prior_span

        if state is None:
            continue
        identity = tuple(
            sorted((item["file"], item["line"], item["endLine"]) for item in group)
        )
        if identity in seen:
            continue
        seen.add(identity)
        item: dict[str, Any] = {
            "state": state,
            "minimumTokens": minimum_tokens,
            "locations": group,
            "reference": REFERENCES["duplication"],
        }
        if state == "new":
            item["baseline"] = "absent"
            item["delta"] = "new"
        elif state == "expanded":
            item["delta"] = "expanded"
        if baseline_lines is not None:
            item["baselineSpanLines"] = baseline_lines
        results.append(item)
    return results


def write_raw(payload: dict[str, Any]) -> str:
    descriptor, path = tempfile.mkstemp(prefix="code-complexity-", suffix=".json")
    with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
        json.dump(payload, stream, indent=2, sort_keys=True)
        stream.write("\n")
    return path


def parser() -> argparse.ArgumentParser:
    result = argparse.ArgumentParser(description=__doc__)
    result.add_argument("--repo", default=".", help="Git repository to measure")
    result.add_argument("--base", help="Base revision for changed-code measurement")
    result.add_argument(
        "--whole-repository",
        action="store_true",
        help="Measure every supported production source file without a baseline",
    )
    result.add_argument("--all", action="store_true", help="Include every normalized record")
    result.add_argument("--cyclomatic-review", type=int, default=DEFAULTS["cyclomaticReview"])
    result.add_argument("--nloc-review", type=int, default=DEFAULTS["nlocReview"])
    result.add_argument(
        "--nested-structures-review",
        type=int,
        default=DEFAULTS["nestedStructuresReview"],
    )
    result.add_argument(
        "--parameter-count-review",
        type=int,
        default=DEFAULTS["parameterCountReview"],
    )
    result.add_argument("--duplicate-tokens", type=int, default=DEFAULTS["duplicateTokens"])
    return result


def main() -> int:
    args = parser().parse_args()
    try:
        if args.whole_repository and args.base:
            raise MeasurementError("--base and --whole-repository cannot be combined.")
        if not args.whole_repository and not args.base:
            raise MeasurementError("--base is required unless --whole-repository is set.")
        thresholds = {
            "cyclomaticReview": args.cyclomatic_review,
            "nlocReview": args.nloc_review,
            "nestedStructuresReview": args.nested_structures_review,
            "parameterCountReview": args.parameter_count_review,
            "duplicateTokens": args.duplicate_tokens,
        }
        if any(value < 1 for value in thresholds.values()):
            raise MeasurementError("Every threshold must be a positive integer.")

        repo = Path(args.repo).resolve()
        if not repo.is_dir():
            raise MeasurementError(f"Repository directory does not exist: {repo}")
        git(repo, "rev-parse", "--show-toplevel")
        head = git(repo, "rev-parse", "HEAD").decode().strip()
        base = None
        if args.base:
            base = git(repo, "rev-parse", "--verify", f"{args.base}^{{commit}}").decode().strip()

        lizard, lizardns, duplicate_module, lizard_version = load_analyzer()
        all_current_paths = current_paths(repo)
        supported_current, _ = source_paths(all_current_paths, repo, lizard)

        if args.whole_repository:
            changed: dict[str, str | None] = {path: None for path in supported_current}
            changed_lines = {
                path: [(1, max(1, sum(1 for _ in (repo / path).open("rb"))))]
                for path in supported_current
            }
            unsupported_changed: list[str] = []
        else:
            changed = changed_paths(repo, base or args.base)
            changed_lines = {
                path: line_ranges(repo, base or args.base, path, old_path is None)
                for path, old_path in changed.items()
            }
            supported_changed, unsupported_changed = source_paths(changed, repo, lizard)
            changed = {path: changed[path] for path in supported_changed}
            changed_lines = {path: changed_lines[path] for path in supported_changed}

        candidate_functions, candidate_duplicates, candidate_duplicate_rate = analyze(
            repo,
            supported_current,
            lizard,
            lizardns,
            duplicate_module,
            thresholds["duplicateTokens"],
        )

        base_functions: list[dict[str, Any]] = []
        base_duplicates: list[list[dict[str, Any]]] = []
        base_duplicate_rate: float | None = None
        if base:
            with tempfile.TemporaryDirectory(prefix="code-complexity-base-") as directory:
                base_root = Path(directory)
                possible_base_paths = base_paths(repo, base)
                supported_base, _ = source_paths(possible_base_paths, base_root, lizard)
                extracted = extract_base(repo, base, supported_base, base_root)
                base_functions, base_duplicates, base_duplicate_rate = analyze(
                    base_root,
                    extracted,
                    lizard,
                    lizardns,
                    duplicate_module,
                    thresholds["duplicateTokens"],
                )

        changed_functions = [
            function
            for function in candidate_functions
            if function["file"] in changed
            and (
                args.whole_repository
                or intersects(
                    function["line"],
                    function["endLine"],
                    changed_lines.get(function["file"], []),
                )
            )
        ]

        band_counts = {"low": 0, "moderate": 0, "high": 0, "veryHigh": 0}
        maxima = {
            "cyclomaticComplexity": 0,
            "nloc": 0,
            "nestedStructures": 0,
            "parameterCount": 0,
            "tokenCount": 0,
        }
        function_triggers: list[dict[str, Any]] = []

        for function in changed_functions:
            metrics = function["metrics"]
            band = cyclomatic_band(metrics["cyclomaticComplexity"])
            band_counts[band] += 1
            for metric in maxima:
                maxima[metric] = max(maxima[metric], metrics[metric])

            baseline_function = baseline_match(
                function,
                base_functions,
                changed.get(function["file"]),
            )
            baseline_metrics = baseline_function["metrics"] if baseline_function else {}
            is_new = bool(base and baseline_function is None)
            triggered: dict[str, Any] = {}
            references: list[str] = []

            if metrics["cyclomaticComplexity"] >= thresholds["cyclomaticReview"]:
                triggered["cyclomaticComplexity"] = metric_value(
                    metrics["cyclomaticComplexity"],
                    baseline_metrics.get("cyclomaticComplexity"),
                    band,
                    is_new,
                )
                references.append(REFERENCES["cyclomaticComplexity"])
            if metrics["nloc"] > thresholds["nlocReview"]:
                triggered["nloc"] = metric_value(
                    metrics["nloc"], baseline_metrics.get("nloc"), is_new=is_new
                )
                references.append(REFERENCES["nloc"])
            if metrics["nestedStructures"] > thresholds["nestedStructuresReview"]:
                triggered["nestedStructures"] = metric_value(
                    metrics["nestedStructures"],
                    baseline_metrics.get("nestedStructures"),
                    is_new=is_new,
                )
                references.append(REFERENCES["nestedStructures"])
            if metrics["parameterCount"] >= thresholds["parameterCountReview"]:
                triggered["parameterCount"] = metric_value(
                    metrics["parameterCount"],
                    baseline_metrics.get("parameterCount"),
                    is_new=is_new,
                )
                references.append(REFERENCES["parameterCount"])

            if triggered:
                function_triggers.append(
                    {
                        "file": function["file"],
                        "line": function["line"],
                        "endLine": function["endLine"],
                        "symbol": function["symbol"],
                        "metrics": triggered,
                        "tokenCount": metrics["tokenCount"],
                        "references": sorted(set(references)),
                    }
                )

        duplication_triggers = duplicate_triggers(
            candidate_duplicates,
            base_duplicates,
            changed,
            changed_lines,
            args.whole_repository,
            thresholds["duplicateTokens"],
        )

        scope = {
            "base": base,
            "candidate": f"working-tree@{head}",
            "changedProductionFiles": len(changed),
            "sourceFilesAnalyzed": len(supported_current),
            "changedFunctionsAnalyzed": len(changed_functions),
            "excludedChangedPaths": sorted(
                path
                for path in (all_changed_paths(repo, base or args.base) if base else {})
                if excluded(path)
            ),
        }
        summary = {
            "cyclomaticBands": band_counts,
            "maxima": maxima,
            "observedCloneGroups": len(candidate_duplicates),
            "duplicateRate": candidate_duplicate_rate,
            "triggeredFunctions": len(function_triggers),
            "triggeredCloneGroups": len(duplication_triggers),
        }
        limitations = []
        if unsupported_changed:
            limitations.append(
                {
                    "kind": "unsupported-language",
                    "paths": sorted(unsupported_changed),
                }
            )

        tool = {
            "name": "lizard",
            "version": lizard_version,
            "cloneDetector": {
                "name": "lizard-duplicate",
                "version": lizard_version,
            },
        }
        raw_payload = {
            "schema": SCHEMA_VERSION,
            "tool": tool,
            "scope": scope,
            "thresholds": thresholds,
            "functions": candidate_functions,
            "duplicates": candidate_duplicates,
            "duplicateRate": candidate_duplicate_rate,
            "baseFunctions": base_functions,
            "baseDuplicates": base_duplicates,
            "baseDuplicateRate": base_duplicate_rate,
            "limitations": limitations,
        }
        raw_artifact = write_raw(raw_payload)
        attention = bool(function_triggers or duplication_triggers)
        status = "incomplete" if limitations else "attention" if attention else "clear"
        output: dict[str, Any] = {
            "schema": SCHEMA_VERSION,
            "tool": tool,
            "status": status,
            "scope": scope,
            "thresholds": thresholds,
            "summary": summary,
            "triggers": {
                "functions": function_triggers,
                "duplicates": duplication_triggers,
            },
            "rawArtifact": raw_artifact,
        }
        if limitations:
            output["limitations"] = limitations
        if args.all:
            output["records"] = {
                "functions": candidate_functions,
                "duplicates": candidate_duplicates,
            }
        print(json.dumps(output, indent=2, sort_keys=True))
        return 0
    except MeasurementError as error:
        print(
            json.dumps(
                {
                    "schema": SCHEMA_VERSION,
                    "status": "incomplete",
                    "error": str(error),
                },
                indent=2,
                sort_keys=True,
            )
        )
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
