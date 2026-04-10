---
name: review-response
# prettier-ignore
description: Handle review findings with technical triage, fixes, and re-review. Use when a fresh review returned findings that must be checked before the phase can complete.
---

# Review Response

Treat review findings as technical claims to verify in the implementer context.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- `review` returned findings.
- The original phase context and verification commands are available.
- The same implementer subagent session is handling the findings.
- If required context is missing, STOP and return to `execution`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Classify every finding with [references/finding-triage-format.md](references/finding-triage-format.md).
2. If any finding is `unclear`, resolve it before coding.
3. If a valid finding changes public behavior or fixes a bug, load `tdd` before production code.
4. Fix valid findings.
5. Push back on invalid findings with [references/pushback-rules.md](references/pushback-rules.md).
6. Rerun the relevant checks and report back to `execution` with an updated `Acceptance Criteria Status` section for the current phase so it can dispatch a fresh `review`.

## Rules

These rules are MANDATORY.

- DO NOT agree performatively.
- DO NOT implement every finding blindly.
- DO classify every finding as `valid`, `invalid`, or `unclear` before changing code.
- DO resolve every `unclear` finding before coding.
- DO NOT partially fix around unclear findings.
- DO keep triage and follow-up in the implementer context that owns the phase.
- DO NOT self-close after code changed.
- DO NOT leave the implementer context while findings are being resolved.
- DO NOT update `plan.md` or its acceptance-criteria checkboxes.
- DO push back when a finding adds unneeded scope, is disproved by code or tests, contradicts the plan or PRD, breaks existing behavior, or assumes context the reviewer did not have.
- DO back every pushback with code or test evidence, the relevant plan or PRD constraint when one exists, and a concrete technical reason the finding is wrong here.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every finding classified as `valid`, `invalid`, or `unclear`.
- [ ] Valid findings fixed or invalid findings pushed back with evidence.
- [ ] Relevant checks rerun.
- [ ] Updated `Acceptance Criteria Status` returned for every current-phase acceptance criterion.
- [ ] `execution` has what it needs to dispatch a fresh `review`.

## Next Skill

Once the completion gate is fully checked:

- Return to `execution` for a fresh `review` dispatch.

## References

Use these references when you need detail.

- [references/findings-response-prompt-template.md](references/findings-response-prompt-template.md) - Skill-local subagent dispatch template.
- [references/finding-triage-format.md](references/finding-triage-format.md) - Classify before coding.
- [references/pushback-rules.md](references/pushback-rules.md) - Push back with evidence.
