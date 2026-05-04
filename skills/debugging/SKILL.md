---
name: debugging
# prettier-ignore
description: Handle concrete bug reports through direct intake, reproduce, diagnose, TDD-fix, verify, reset, and escalate loops. Use when failures need repair.
---

# Debugging

Use when a concrete failure or bug report needs diagnosis and repair.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The work is a bug, regression, crash, incorrect output, flaky behaviour, or other concrete failure.
- If the work is feature-shaped or expected behaviour is intentionally being designed, STOP. Load `exploration`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Create or resume `docs/propulsion/{yyyymmdd}-{bug-slug}/debug.md` using [references/debug-template.md](references/debug-template.md).
2. Load `questioning` skill for missing user-answerable intake: report provenance, expected behaviour, actual behaviour, impact, environment, reproduction, and questions answered.
3. Record answers and assumptions from `questioning` in `debug.md`; if expected behaviour is unknowable, stay in `debugging` and ask or block.
4. Complete targeted codebase exploration in `debug.md` before reproduction, diagnosis, or fix work: relevant files, existing tests, commands, logs, ownership, and likely seams only.
5. Reproduce, reduce, isolate, diagnose, reset, and escalate with [references/investigation-loop.md](references/investigation-loop.md).
6. Do not allow production-code changes until `debug.md` contains a grounded diagnosis, supporting evidence, fix constraints, and one chosen fix hypothesis.
7. Start a fresh bug-worker subagent with [references/bug-worker-prompt.md](references/bug-worker-prompt.md), then review with [references/bug-reviewer-prompt.md](references/bug-reviewer-prompt.md).
8. If review rejects the fix, send findings back with [references/bug-feedback-prompt.md](references/bug-feedback-prompt.md). Repeat until approved, reset when evidence contradicts the diagnosis, or reassess architecture and patterns before escalating after 3 failed fix loops.
9. If the fix is verified and approved, record closure in `debug.md` and finish.

## Rules

These rules are MANDATORY.

- MUST keep `debug.md` current from direct entry or resumed entry through closure.
- MUST complete intake for expected behaviour, actual behaviour, impact, environment, and reproduction before broad code inspection or fix work.
- MUST record `questioning` answers and assumptions in `debug.md`.
- MUST record targeted codebase exploration before reproduction, diagnosis, or fix work.
- MUST stabilise reproduction, reduce the failing case, and isolate the first bad boundary or divergence before choosing a fix.
- NEVER edit production code in the main `debugging` stage.
- EVERY fix attempt MUST start with a failing regression test and target one fix hypothesis.
- MUST record each failed hypothesis, diagnostic edit, fix attempt, review outcome, reset, escalation, and closure in `debug.md`.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] `debug.md` exists at `docs/propulsion/{yyyymmdd}-{bug-slug}/debug.md` and was created or resumed on entry.
- [ ] Intake, `questioning` answers, targeted codebase exploration, reproduction, reduction, evidence, ranked hypotheses, experiments, diagnosis gate, fix attempts, review outcomes, verification, and closure are recorded in `debug.md`.
- [ ] The bug is either closed with verified evidence or escalated after architecture and pattern reassessment following 3 failed fix loops.

## References

Use these references when you need detail.

- [references/debug-template.md](references/debug-template.md) - Living `debug.md` template for the full bug dossier.
- [references/investigation-loop.md](references/investigation-loop.md) - Core bug loop for reproduce, reduce, isolate, diagnose, reset, and escalate.
- [references/bug-worker-prompt.md](references/bug-worker-prompt.md) - Prompt template for one diagnosis-gated TDD fix attempt.
- [references/bug-reviewer-prompt.md](references/bug-reviewer-prompt.md) - Prompt template for independent review of one bug fix attempt.
- [references/bug-feedback-prompt.md](references/bug-feedback-prompt.md) - Prompt template for feeding review findings back into the active bug fix attempt.
