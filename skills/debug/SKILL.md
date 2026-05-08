---
name: debug
description: Handle concrete failures through intake, diagnosis, one-hypothesis fixes, review, reset, and escalation. Use when bugs or failures need repair.
---

# Debug

Diagnose concrete failures before dispatching one evidence-backed fix loop.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- The request is a concrete failure: bug, regression, crash, failing test/build, incorrect output, flaky behaviour, or runtime error.
- If the request is feature-shaped, product-scope work, expected-behaviour design, refactor, optimisation, or enhancement, STOP and load `brainstorm`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Create or resume `docs/propulsion/{yyyymmdd}-{bug-slug}/debug.md` from [references/debug-template.md](references/debug-template.md) before diagnosis work.
2. Record report provenance, expected behaviour, actual behaviour, impact, environment, reproduction, prior attempts, and open blockers in `debug.md`.
3. Load `interrogate` ONLY when missing user-answerable intake blocks expected behaviour, reproduction, impact, or environment; record answers and resolved decisions in `debug.md`.
4. Explore only the relevant code, tests, logs, recent changes, ownership, and likely boundaries; record facts and intentional limits in `debug.md`.
5. Use [references/investigation-loop.md](references/investigation-loop.md) to reproduce, read the full error, reduce, compare working examples, isolate the first bad boundary, and test one diagnosis hypothesis at a time.
6. Gate fix dispatch until `debug.md` has grounded diagnosis evidence, the first bad state or divergence, fix constraints, a falsifier, and one chosen fix hypothesis.
7. Dispatch one fresh bug-worker with [references/bug-worker-prompt.md](references/bug-worker-prompt.md), then dispatch one fresh reviewer with [references/bug-reviewer-prompt.md](references/bug-reviewer-prompt.md).
8. If review rejects the fix, return findings to the active worker with [references/bug-feedback-prompt.md](references/bug-feedback-prompt.md) while the diagnosis still holds.
9. If verification, review, or new evidence contradicts the diagnosis, reset to investigation and record the contradicted evidence before any new fix attempt.
10. After 3 failed fix loops, reassess architecture and patterns, record the reassessment, then escalate to the user with evidence and next options.
11. Close only when fixed and verified, blocked by missing intake, no-repro after documented attempts, or escalated after the 3-loop reassessment path.

## Rules

These rules are MANDATORY.

- MUST keep `debug.md` current from entry through closure.
- MUST diagnose before fixing; NEVER make permanent production-code edits in the controller stage.
- MUST use `interrogate` only for missing user-answerable intake, not repo facts the agent can inspect.
- MUST reset instead of pushing through when evidence contradicts the diagnosis or chosen fix hypothesis.
- EVERY fix loop MUST target one chosen fix hypothesis and start with a failing regression test unless `tdd` declares no valuable test.
- MUST record failed hypotheses, blocked/no-repro status, rejected reviews, resets, failed loops, verification, escalation, and closure.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] `debug.md` exists or is resumed at `docs/propulsion/{yyyymmdd}-{bug-slug}/debug.md`.
- [ ] Intake, user-answerable `interrogate` decisions if any, targeted exploration, reproduction or no-repro attempts, full error reading, reduction, evidence, hypotheses, diagnosis gate, fix loops, reviews, resets, and verification are recorded.
- [ ] Outcome is one of: fixed and verified; blocked on missing intake; no-repro with documented attempts; reset to diagnosis with contradicted evidence; review-rejected and returned to worker; escalated after 3 failed loops plus architecture and pattern reassessment.

## Next Steps

Once the completion gate is fully checked:

- Return a concise status with the `debug.md` path, final outcome, checks run, and any user decision needed.

## References

Use these references when you need detail.

- [references/debug-template.md](references/debug-template.md) - Living `debug.md` template for the bug dossier.
- [references/investigation-loop.md](references/investigation-loop.md) - Evidence-first reproduce, reduce, isolate, diagnose, reset, and escalate loop.
- [references/bug-worker-prompt.md](references/bug-worker-prompt.md) - Prompt template for one diagnosis-gated TDD fix attempt.
- [references/bug-reviewer-prompt.md](references/bug-reviewer-prompt.md) - Prompt template for independent review of one bug fix attempt.
- [references/bug-feedback-prompt.md](references/bug-feedback-prompt.md) - Prompt template for returning review findings to the active worker.
