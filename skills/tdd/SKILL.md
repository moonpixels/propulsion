---
name: tdd
# prettier-ignore
description: Build behavior with one failing test at a time through red-green-refactor. Use when a slice changes public behavior or when fixing a bug with a regression test.
---

# TDD

Prove behavior with a failing test before writing production code.

## Quick Start

    Write one failing test -> watch it fail -> write the smallest code to pass -> refactor while green.

## Before This Skill

- The current slice changes public behavior.
- The interface or expected behavior is clear enough to test.

## Use When

- Building a feature or bug fix that changes behavior.
- Writing a regression test for an observed failure.

## Core Loop

- Write one test for one behavior through a public interface.
- Run it. If it does not fail for the expected reason, fix the test first.
- Write the smallest good fix. No speculative code.
- Run the targeted test again. Keep going until it passes.
- Refactor only while green.
- Repeat one behavior at a time. Do not queue failing tests.
- Prefer real code paths over mocks. See [references/public-behavior.md](references/public-behavior.md) and [references/good-vs-bad-tests.md](references/good-vs-bad-tests.md).

## Good vs Bad

```text
WRONG:  test1, test2, test3 -> code1, code2, code3
RIGHT:  test1 -> code1 -> test2 -> code2 -> test3 -> code3
```

## Hand Off To

- Hand off passing changes to `execution`.

## Do Not

- Do not write production code before a failing test.
- Do not test implementation details.
- Do not keep code written before the test.
