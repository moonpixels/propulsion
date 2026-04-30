---
name: tdd
# prettier-ignore
description: Build observable behaviour with one failing test at a time through red-green-refactor. Use when a slice changes user-facing behaviour, API contracts, or durable business logic, including bug fixes proven with regression tests.
---

# TDD

Prove observable behaviour with a failing test before writing production code. Use red-green-refactor to build confidence in the change and keep the code clean.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The work includes a change to observable user-facing behaviour, a public contract, or durable business logic that can be proven through testing.
- The codebase has a test framework installed, and tests can be run locally.
- The work is not solely for CI-only changes, linting, formatting, dependency maintenance, build or development script changes, repo hygiene, or internal refactors with no behaviour change.

If the work mixes behaviour change with tooling or maintenance updates, use `tdd` on the behaviour change ONLY.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Choose the smallest thin vertical slice that delivers one observable behaviour end-to-end.
2. Write one test for that single behaviour through a public interface or stable seam. Refer to [references/testing-patterns.md](references/testing-patterns.md) for guidance.
3. Run the test and verify it fails for the expected reason.
4. Write the smallest amount of production code to pass the test.
5. Run the test again and verify it now passes.
6. Repeat steps 1-5 for the next behaviour, building on the previous code, until the work is complete.
7. Refactor only while all tests are green, and verify tests remain green after refactor. Refer to [references/refactor-candidates.md](references/refactor-candidates.md) for guidance.
8. For bug fixes, write a regression test that reproduces the bug before fixing it, then verify the test passes after the fix.

## Rules

These rules are MANDATORY.

- ONLY use `tdd` on observable user-visible behaviour or business logic changes.
- NO PRODUCTION CODE BEFORE A FAILING TEST.
- ALWAYS write ONE test at a time for ONE observable behaviour.
- ENSURE the test initially fails for the EXPECTED reason before writing production code.
- ONLY write the minimal amount of code to make the test pass.
- ALWAYS use the public interface for testing, and test through stable seams if necessary.
- NEVER write speculative tests or code for behaviour that is not yet required.
- ALWAYS look for refactor opportunities AFTER the test is green.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Work was implemented in thin vertical slices.
- [ ] Each slice started with a failing test.
- [ ] Each failing test was verified to fail for the expected reason.
- [ ] Each slice was completed with passing tests.
- [ ] Refactors only happened from green and remained green.
- [ ] All tests for the work are now passing.

## References

Use these references when you need detail.

- [references/testing-patterns.md](references/testing-patterns.md) - Testing patterns for guidance on how to write effective tests.
- [references/refactor-candidates.md](references/refactor-candidates.md) - Refactor candidates to identify good opportunities for refactor after the tests are green.
