---
name: debugging
# prettier-ignore
description: Resolve planned bug work through a strict reproduce, diagnose, TDD-fix, verify, reset, and escalate loop.
---

# Debugging

Use when bug work is ready to resolve after `planning`.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If no `docs/propulsion/.../plan.md` exists for this work, STOP. Load `planning`.
- If the plan is feature-oriented, STOP. Load `execution`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Create or resume `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` using the template in [references/debug-template.md](references/debug-template.md).
2. Reproduce and stabilise the bug with [references/investigation-loop.md](references/investigation-loop.md). Record the exact symptom, environment facts, and one stable reproducing command or explicit flaky classification.
3. Reduce and isolate the failure. Shrink the failing case, isolate the first bad boundary or first meaningful divergence, and keep a short ranked hypothesis list with one discriminating experiment at a time.
4. Diagnose and gate the fix. Do not allow production-code changes until `debug.md` contains the grounded diagnosis, supporting evidence, fix constraints, and one chosen fix hypothesis that explains the first bad state or divergence.
5. Dispatch a fresh implementer subagent with the prompt in [references/bug-implementer-prompt.md](references/bug-implementer-prompt.md).
6. Wait for the implementer to finish and report back.
7. If the implementer reports `Status: unclear` then provide additional context or clarification to the implementer.
8. If the implementer reports `Status: blocked` then triage the blocker and resolve it.
9. Escalate to the user if you are unable to resolve `unclear` or `blocked` statuses from `debug.md`, `plan.md`, the codebase, or the available tools.
10. If the implementer reports `Status: done` then dispatch a fresh reviewer subagent with the prompt in [references/bug-reviewer-prompt.md](references/bug-reviewer-prompt.md).
11. If the bug-reviewer reports `Status: rejected`, send the findings back to the same implementer subagent session with the prompt in [references/bug-feedback-prompt.md](references/bug-feedback-prompt.md).
12. Repeat steps 6-11 until the implementer reports `Status: done` and the latest bug-reviewer reports `Status: approved`, or until the diagnosis is contradicted and must reset.
13. If the fix attempt fails verification, contradicts the diagnosis, or introduces new unexplained behaviour, update `debug.md`, reset to step 2, and run the next loop only after the diagnosis is grounded again.
14. If the fix is verified and approved, record closure in `debug.md` and finish. After 3 failed fix loops, STOP and escalate to the user.

## Rules

These rules are MANDATORY.

- MUST keep `debug.md` current from entry to closure.
- MUST stabilise reproduction before broad code inspection or fix work.
- MUST reduce the failing case and isolate the first bad boundary or divergence before choosing a fix.
- MUST keep a short ranked hypothesis list and run one discriminating experiment at a time.
- NEVER edit production code in the main `debugging` stage.
- ONLY a dispatched implementer subagent may attempt the bug fix, and only after the diagnosis gate is satisfied.
- EVERY fix attempt MUST start with a failing regression test and target one fix hypothesis.
- If a fix attempt fails verification, contradicts the diagnosis, or introduces new unexplained behaviour, MUST reset to diagnosis immediately.
- MUST record each failed loop in `debug.md`, including what was tried, what failed, and what evidence changed.
- After 3 failed fix loops, MUST escalate to the user instead of continuing blindly.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] `debug.md` exists at `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` and was created or resumed on entry.
- [ ] Reproduction, reduction, evidence, ranked hypotheses, experiments, and diagnosis gate are recorded in `debug.md`.
- [ ] The first bad boundary, first divergence, or earliest explainable bad transition is grounded by evidence.
- [ ] At least one fix hypothesis, regression test result, fix attempt result, and verification outcome are recorded in `debug.md`.
- [ ] The bug is either closed with verified evidence or escalated after 3 failed fix loops.

## Next Skill

Once the completion gate is fully checked:

- If the bug is fixed and verified, STOP. Tell the user the bug is fixed and ask whether they have any feedback on the fix.
- If later evidence contradicts the current diagnosis or fix, load `debugging` and resume the same `debug.md`.
- If the work is no longer a bug and has become behaviour-shaping product work, load `exploration`.

## References

Use these references when you need detail.

- [references/investigation-loop.md](references/investigation-loop.md) - Core bug loop for reproduce, reduce, isolate, diagnose, reset, and escalate.
- [references/debug-template.md](references/debug-template.md) - Living `debug.md` template for the full bug dossier.
- [references/bug-implementer-prompt.md](references/bug-implementer-prompt.md) - Prompt template for one diagnosis-gated TDD fix attempt.
- [references/bug-reviewer-prompt.md](references/bug-reviewer-prompt.md) - Prompt template for independent review of one bug fix attempt.
- [references/bug-feedback-prompt.md](references/bug-feedback-prompt.md) - Prompt template for feeding review findings back into the active bug fix attempt.
