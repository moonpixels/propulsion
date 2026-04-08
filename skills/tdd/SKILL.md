---
name: tdd
description: Test behavior changes with red-green-refactor, one failing test at a time. Use when adding a feature or bugfix.
---

# TDD

## Quick Start

```text
Write 1 behavior test -> run it and watch it fail -> make it pass with the smallest change -> re-run relevant tests -> refactor while green -> re-run tests -> repeat
```

## Enter `tdd` When

- Use `tdd` only for behavior-changing implementation where a failing automated test should prove correctness.
- Common yes: new feature behavior, bugfix with known cause, regression test after `debugging`, or public contract change.
- Common no: docs or copy, config-only edits, generated files, formatting, mechanical renames or moves, and pure refactors that should preserve behavior.
- If the cause is unknown, go to `debugging` first.
- If a small safe seam makes the behavior testable, create it first, then start at red.
- If no stable automated harness exists and creating one would itself be a separate slice, return to `execution`, use direct verification instead, and say why.

## Guardrails

- No production code before a failing test for the current behavior step.
- One behavior test, one failure, one pass. No batch tests. No horizontal inventories.
- Test public behavior through real interfaces so the test survives internal refactors.
- A test that passes on first run is not the next test. If you did not watch it fail, you do not know it proves the behavior.
- Before editing production code, run the new test and confirm the red failure matches the intended behavior gap.
- Prefer small vertical slices over full test inventories or layer-by-layer implementation.
- Write the smallest code that gets back to green. No speculative work.
- Refactor only while green. If refactoring breaks a test, fix or revert before continuing.
- If the red state is unclear, reproduce and debug first; do not code around it.
- After each green step or refactor, re-run the relevant test or test set.
- Keep assertions plain and direct: prove behavior, not internals.
- Do not write surprise low-value tests just because code changed.
