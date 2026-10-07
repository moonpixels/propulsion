---
name: measure-code-complexity
description: Measure current code complexity when a caller needs scores and interpretation to guide refactoring.
---

# Measure code complexity

Measure current code and explain signals that warrant attention. **The caller owns changes and comparisons.**

## Inputs

Measure the production files selected by the request. Default to every function in changed production files, including eligible untracked files. A supplied Git base selects files only, defaulting to `HEAD`. Requires Git and Python 3.9 or newer. Supports macOS and Linux on ARM64 or x64, and Windows x64 with the Visual C++ runtime.

## Method

1. **Run the CLI.** Read [the CLI contract](references/cli.md) when selecting files, inspecting report fields or resolving a limitation.

    ```sh
    python3 /path/to/measure-code-complexity/scripts/measure.py --repo /repo
    ```

    Read the compact summary and saved report. Inspect status and limitations before interpreting scores.

2. **Collect available native CRAP.** Inspect installed packages, test commands and reporting support. If usable, read [native collection](references/native-crap.md), reuse a proven current report or run the existing command with its supported reporting option. Keep native scores and provenance as supplementary evidence. Omit unavailable CRAP. Report actual attempted failures.
3. **Interpret the scores.** Load each reference whose condition is met and follow its guidance. Use individual function or method scores for the conditions below.

    | Signal               | Load when                    | Reference                                                    |
    | -------------------- | ---------------------------- | ------------------------------------------------------------ |
    | CC                   | ≥10                          | [Cyclomatic complexity](references/cyclomatic-complexity.md) |
    | Cognitive Complexity | >15                          | [Cognitive complexity](references/cognitive-complexity.md)   |
    | Function NLOC        | >60                          | [Function size](references/function-size.md)                 |
    | Maximum nesting      | ≥4                           | [Nesting](references/nesting.md)                             |
    | Parameters           | ≥6                           | [Parameters](references/parameters.md)                       |
    | Duplication          | A span of ≥70 tokens repeats | [Duplication](references/duplication.md)                     |
    | Native CRAP          | ≥30                          | [CRAP](references/crap.md)                                   |

    Read relevant records from the saved report instead of dumping it into context. Scores prompt consideration, not a quality verdict or compulsory refactoring.

## Finish

Return the compact measurements, report path, interpretation of triggered metrics, available native CRAP with provenance, and material limitations. Leave refactoring, testing decisions, subsequent calls and comparisons to the caller.

**Done only when** selected files are accounted for, available measurements are reported, triggered metrics are interpreted and incomplete evidence remains explicit. Missing native CRAP is a valid omission. An attempted measurement failure leaves that measurement unresolved.
