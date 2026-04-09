---
name: tdd
# prettier-ignore
description: Build behavior with one failing test at a time through red-green-refactor. Use when a slice changes public behavior or when fixing a bug with a regression test.
---

# TDD

Prove behavior with a failing test before writing production code.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The current slice changes public behavior.
- The interface or expected behavior is clear enough to test.
- If the work is non-behavioral, STOP. Return to `execution`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Write one test for one behavior through a public interface. Use [references/public-behavior.md](references/public-behavior.md).
2. Run it. If it does not fail for the expected reason, fix the test first.
3. Write the smallest good code to pass the test.
4. Run the targeted test again. Repeat one behavior at a time.
5. Refactor only while green. See [references/good-vs-bad-tests.md](references/good-vs-bad-tests.md).

## Rules

These rules are MANDATORY.

- NO PRODUCTION CODE BEFORE A FAILING TEST.
- MUST do one behavior, one test, and one fix at a time.
- DO NOT test implementation details.
- DO NOT keep speculative code.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] A failing test existed for the target behavior.
- [ ] The target test now passes.
- [ ] No speculative code remains.
- [ ] Any refactor left the tests green.

## Next Skill

Once the completion gate is fully checked:

- Return to `execution` or `review-response`.

## References

Use these references when you need detail.

- [references/public-behavior.md](references/public-behavior.md) - Test through stable seams.
- [references/good-vs-bad-tests.md](references/good-vs-bad-tests.md) - Keep tests high-signal.
