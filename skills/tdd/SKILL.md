---
name: tdd
description: Test behavior changes with red-green-refactor, one failing test at a time. Use when adding a feature or bugfix.
---

# TDD

## Quick Start

```text
Write 1 behavior test -> run it and watch it fail -> make it pass with the smallest change -> re-run relevant tests -> refactor while green -> re-run tests -> repeat
```

## Rules

- Enter `tdd` for behavior-changing implementation, including work handed off from `execution` or evidence-backed fixes from `debugging`.
- No production code before a failing test. If you wrote speculative code for the current slice, discard it and start at red.
- One test, one change, one pass. No batch tests. No batch fixes.
- Test public behavior through real interfaces so the test survives internal refactors.
- Write the smallest code that gets back to green. No speculative work.
- Refactor only while green. If refactoring breaks a test, fix or revert before continuing.

## Guardrails

- A test that passes on first run is not the next test. If you did not watch it fail, you do not know it proves the behavior.
- Before editing production code, run the new test and confirm the red failure matches the intended behavior gap.
- Prefer small vertical slices over full test inventories or layer-by-layer implementation.
- If the red state is unclear, reproduce and debug first; do not code around it.
- After each green step or refactor, re-run the relevant test or test set.
- Keep assertions plain and direct: prove behavior, not internals.
