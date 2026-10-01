---
name: measure-code-complexity
description: Measure changed-code complexity with pinned cross-language tools and interpret advisory triggers in source and contract context.
metadata:
    type: utility
---

# Measure code complexity

Return reproducible complexity evidence and a contextual disposition for each trigger. Metrics route attention; they do not establish defects or mandate refactoring.

## Inputs

Fix the Git repository, current working-tree candidate, comparison base, read-only authority, and explicit repository thresholds. The helper requires Python 3.8 or newer and Git. It measures working-tree contents, including eligible untracked production files. Python nesting uses its bundled AST counter; other metrics use the pinned Lizard tools. The output identifies methods and runtime. For a historical or remote candidate, use an isolated checkout containing that exact state.

## Method

1. Run the bundled helper with no installation or network access:

    ```sh
    python3 /path/to/measure-code-complexity/scripts/measure.py \
      --repo /path/to/repository --base <revision>
    ```

    It verifies vendored wheel checksums, reads Git and source, and writes a raw JSON artefact in the system temporary directory. It leaves the repository unchanged. Exit 0 means measurement completed, including an `attention` or `incomplete` result; exit 2 means a prerequisite or usage failure. Read status and limitations rather than infer completeness from the exit code. Use `--help` for threshold options. Override defaults only for explicit repository policy. Use `--whole-repository` only for a repository-wide request and `--all` only when compact evidence cannot answer the question.

2. Read compact JSON, scope, summary, exclusions, and limitations. The summary covers measured changed functions; detailed output defaults to triggers and the raw artefact preserves all normalised records. Unsupported languages, excluded files, partial parsers, or unavailable prerequisites limit the result. A failed measurement is not clear evidence.
3. Inspect each trigger's source, nearby contracts, tests, and clone counterparts. Classify it as a **supported concern** with concrete consequence and narrow improvement direction, a **justified shape** with code and test evidence, or **unresolved** with the exact missing evidence.

## Conditional resources

Read only references for triggered metrics: [cyclomatic complexity](references/CYCLOMATIC-COMPLEXITY.md), [function size](references/FUNCTION-SIZE.md), [nesting](references/NESTING.md), [parameters](references/PARAMETERS.md), and [duplication](references/DUPLICATION.md). They define the signal and contextual alternatives.

## Finish

Return fixed scope, compact summary, triggered locations and values, available baseline deltas, dispositions, incomplete evidence, and raw-artefact path. Keep metric components separate; a scalar grade hides their different meanings. Preserve definitions and bands except explicit policy threshold overrides.

Done when every trigger has a supported disposition or is explicitly unresolved. Reject score-only recommendations that move branches, add shallow indirection, hide parameters, or merge unrelated clones. Leave edits, test runs, policy changes, durable reports, commits, publication, and external state to the caller.
