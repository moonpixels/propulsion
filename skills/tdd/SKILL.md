---
name: tdd
description: Tests behavior changes with red-green-refactor, one failing test at a time. Use when a feature or bugfix should be proved by an automated test.
---

# TDD

Test behavior, not implementation.

## Quick Start

```text
write 1 behavior test -> run it and watch it fail -> make it pass with the smallest change -> re-run relevant tests -> refactor while green -> repeat
```

## Use When

- New feature behavior.
- Bugfix with known cause.
- Regression test after `debugging`.
- Public contract change where a failing automated test is the right proof.
- Not docs, copy, config-only edits, generated files, formatting, mechanical renames, moves, or pure refactors.
- If the cause is unknown, go to `debugging` first.
- If a small safe seam makes the behavior testable, create it first, then start at red.
- If no stable automated harness exists and creating one would itself be a separate slice, return to `execution`, use direct verification instead, and say why.

## Core Loop

- Write one behavior test through a public interface.
- Run it and watch it fail. A test that passes on first run is not the next test.
- Write the smallest code that gets back to green.
- Re-run the relevant tests.
- Refactor only while green.
- Repeat one behavior at a time.

## Guardrails

- No production code before a failing test for the current behavior step.
- No horizontal slicing. Do not write all tests first, then all code.
- One behavior test, one failure, one pass. No batch tests.
- Test public behavior through real interfaces so the tests survive internal refactors.
- Prefer small vertical slices over test inventories or layer-by-layer implementation.
- No speculative work.
- If the red state is unclear, debug first. Do not code around it.
- Keep assertions plain and direct: prove behavior, not internals.
- Do not write surprise low-value tests just because code changed.

## Exit

- End each cycle with green tests and simpler code.
