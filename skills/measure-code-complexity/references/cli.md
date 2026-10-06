# Measurement CLI

Use `scripts/measure.py --help` for arguments. Requires Git and Python 3.9 or newer. Supported hosts are macOS and Linux on ARM64 or x64, and Windows x64 with the Visual C++ runtime. No complexity-tool installation or download is needed. The helper writes its executable cache and full JSON outside the repository, and leaves project files unchanged.

## Select current files

By default, measure changed production files relative to `HEAD`, including staged, unstaged and eligible untracked files. Every recognised function in those files is measured. `--base <revision>` changes file selection only.

Pass explicit files relative to the repository to stabilise scope across refactoring runs or include related files.

```sh
python3 /path/to/measure.py --repo /repo src/quote.ts src/rules.ts
```

Conventional tests, fixtures, dependencies, generated output and non-source formats are excluded and listed in the report. Explicit paths must name files inside the repository. Keep selected files fixed during measurement. An empty selection supplies no function evidence.

## Read the report

Stdout contains status, summary, scope, producing versions, limitation count and the report path. Full JSON contains `files`, functions and nested `children`. File totals include module-level code. Summary distributions describe functions, with separate populations for supporting measurements under `summary.lizard`. Missing measurements are absent, never zero.

Function records contain `cyclomatic` and `cognitive`. Supporting fields under `lizard` are `nloc`, `parameters`, `max_nesting` and `end_line`. Ambiguous supporting records retain their own locations under `lizard_unmatched`. `duplicates` supplies clone groups and locations. `summary.attention` counts records meeting the interpretation conditions in the skill.

Read only needed records. For example, select one file without printing the entire report.

```sh
jq '.files[] | select(.path == "src/quote.ts")' /tmp/code-complexity-report.json
```

`scope.content_id` identifies selected paths and contents. It does not identify tests, configuration or a native reporting run. Keep producing versions and scope alongside comparisons.

## Limits and failure

Exit 0 means a report was produced, including `partial` results. Read the full `limitations` list whenever its count is non-zero. Unsupported source, parse errors and incomplete joins remain explicit. Exit 2 means invalid input or a failed prerequisite or command. Argument errors go to stderr. Resolve the reported cause before rerunning.

Recognition can affect function boundaries and parameter counts. A file with no recognised functions may contain executable module code. Command execution is bounded to 60 seconds. Selected-source changes during collection invalidate the measurement. Native CRAP reporting is separate.
