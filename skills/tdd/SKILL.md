---
name: tdd
# prettier-ignore
description: Build behavior with one failing test at a time through red-green-refactor. Use when a slice changes public behavior or when fixing a bug with a regression test.
---

# TDD

Prove behaviour with a failing test before writing production code. Use red-green-refactor to build confidence in the change and keep the code clean.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The work includes observable behaviour that can be proven through testing.
- The codebase has a test framework and tests can be run locally.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Choose the smallest thin vertical slice that delivers one observable behaviour end-to-end.
2. Write one test for that single behaviour through a public interface.
3. Run the test and verify it fails for the expected reason.
4. Write the smallest amount of production code to pass the test.
5. Run the test again and verify it now passes.
6. Repeat steps 1-5 for the next behaviour, building on the previous code, until the work is complete.
7. Refactor only while all tests are green, and verify tests remain green after refactor.
8. For bug fixes, write a regression test that reproduces the bug before fixing it, then verify the test passes after the fix.

## Rules

These rules are MANDATORY.

- NO PRODUCTION CODE BEFORE A FAILING TEST.
- ALWAYS write ONE test at a time for ONE observable behaviour. 
- ENSURE the test initially fails for the EXPECTED reason before writing production code.
- ONLY write the minimal amount of code to make the test pass.
- ALWAYS use the public interface for testing, and test through stable seams if necessary.
- NEVER write speculative tests or code for behaviour that is not yet required.
- ALWAYS look for refactor opportunities after the test is green, and ONLY refactor when all tests are green.

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

- [references/public-behavior.md](references/public-behavior.md) - Test through stable seams.
- [references/good-vs-bad-tests.md](references/good-vs-bad-tests.md) - Keep tests high-signal.
