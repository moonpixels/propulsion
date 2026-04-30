---
name: tdd
# prettier-ignore
description: Build observable behaviour with one failing test at a time through red-green-refactor. Use when a slice changes user-facing behaviour, API contracts, or durable business logic, including bug fixes proven with regression tests.
---

# TDD

Default to red-green-refactor when a valuable behavioural test exists. Do not fabricate brittle tests when work cannot be proven through a public interface or stable seam.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The work includes a change to observable user-facing behaviour, a public contract, or durable business logic.
- The codebase has a test framework installed, and tests can be run locally.
- The work is not solely for CI-only changes, linting, formatting, dependency maintenance, build or development script changes, repo hygiene, or internal refactors with no behaviour change.

If the work mixes behaviour change with tooling or maintenance updates, use `tdd` on the behaviour change ONLY.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Choose the smallest thin vertical slice that delivers one observable behaviour end-to-end.
2. Apply the test-quality/applicability gate in [references/testing-patterns.md](references/testing-patterns.md) before writing or keeping a test.
3. If a valuable behavioural test exists, write one failing test for that behaviour through a public interface or stable seam, verify it fails for the expected reason, implement the smallest passing code, then verify it passes.
4. If no valuable behavioural test exists, document the no-test rationale, run the strongest appropriate fallback verification, implement the smallest change, then rerun fallback verification.
5. Repeat for the next behaviour until complete; refactor only while tests or fallback checks are green. Refer to [references/refactor-candidates.md](references/refactor-candidates.md).
6. For bug fixes, prefer a regression test that reproduces the bug; if none is valuable, document why and use the strongest fallback verification.

## Rules

These rules are MANDATORY.

- ONLY use `tdd` on observable user-visible behaviour or business logic changes.
- NO production code before a failing test WHEN a valuable behavioural test exists.
- ALWAYS write ONE test at a time for ONE observable behaviour.
- ENSURE the test initially fails for the EXPECTED reason before writing production code.
- ONLY write the minimal amount of code to make the test pass.
- ALWAYS use the public interface for testing, and test through stable seams if necessary.
- NEVER write speculative, brittle, implementation-detail, or private-structure tests.
- ALWAYS document no-test rationale plus fallback verification when no valuable behavioural test exists.
- ALWAYS look for refactor opportunities AFTER the test is green.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Work was implemented in thin vertical slices.
- [ ] Each slice passed the test-quality/applicability gate.
- [ ] Each testable slice started with a failing test that failed for the expected reason.
- [ ] Untestable slices documented no-test rationale and strongest appropriate fallback verification.
- [ ] Each slice was completed with passing tests or fallback checks.
- [ ] Where possible, refactors were applied after the tests were green.

## References

- [references/testing-patterns.md](references/testing-patterns.md) - Testing patterns for guidance on how to write effective tests.
- [references/refactor-candidates.md](references/refactor-candidates.md) - Refactor candidates to identify good opportunities for refactor after the tests are green.
