---
name: tdd
description: Execute TDD red-green-refactor for behaviour changes. Use when changing observable behaviour, public contracts, or durable business logic.
---

# TDD

Drive behaviour changes with one failing behavioural test, minimal green code, then safe refactor.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- The task changes observable behaviour, a public contract, or durable business logic.
- A local test runner and relevant test command are available. If not, STOP and ask whether adding or fixing the test path is in scope.
- Maintenance-only work is invalid for TDD. STOP for docs/comments/prompts/spec text, styling-only UI changes, copy-only edits unless copy is the contract, config/build/dev-tool text edits, dependency bumps, generated files, data/schema migrations without logic changes, or pure refactors.
- If work mixes behaviour change with maintenance, apply TDD ONLY to the behaviour-changing slice.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Choose the smallest thin vertical slice that delivers one observable behaviour end-to-end; state the interface, expected outcome, and narrowest test command.
2. Apply the gate in [references/testing-patterns.md](references/testing-patterns.md). If no valuable behavioural test exists, record the no-test rationale and strongest fallback verification before changing code.
3. Write ONE failing test through a public interface or stable seam for the next behaviour only.
4. Run the narrowest test command and confirm the test fails for the expected reason.
5. Write the minimum production code to pass; keep fixtures small and mock only real external, slow, unstable, or nondeterministic boundaries.
6. Re-run the narrowest test command and confirm green.
7. Review refactor candidates only after green using [references/refactor-candidates.md](references/refactor-candidates.md); refactor in small behaviour-preserving steps and rerun relevant checks.
8. Repeat slice by slice until the requested behaviour is complete.

## Rules

These rules are MANDATORY.

- NEVER write production code before a failing test WHEN a valuable behavioural test exists.
- ALWAYS test observable behaviour through a public interface or stable seam.
- NEVER add source-text checks, private-structure checks, internal call choreography, broad snapshots, speculative tests, or implementation-detail tests as behavioural proof.
- DO NOT over-mock; ONLY mock real boundaries that are external, slow, unstable, nondeterministic, or too expensive for the selected test scope.
- STOP and ask if the behaviour, acceptance rule, stable seam, or relevant test command is unclear.
- NEVER refactor while red.
- ALWAYS prefer a regression test first for bug fixes.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Work was implemented in thin vertical slices.
- [ ] Each testable slice has red proof that failed for the expected reason, then green proof after the smallest implementation.
- [ ] Tests prove behaviour through a public interface or stable seam, with no brittle, speculative, implementation-detail, or over-mocked tests kept.
- [ ] No-test fallback rationale was documented only where no valuable behavioural test exists.
- [ ] Refactor opportunities were reviewed after green, and refactors happened only while checks were green.

## References

Use these references when you need detail.

- [references/testing-patterns.md](references/testing-patterns.md) - Test scope, behavioural seams, mocks, anti-patterns, fallback verification, and concise templates.
- [references/refactor-candidates.md](references/refactor-candidates.md) - Safe refactor candidates and post-green refactor gates.
