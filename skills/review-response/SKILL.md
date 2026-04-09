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
6. Rerun the relevant checks and report back to `execution` so it can dispatch a fresh `review`.

## Rules

These rules are MANDATORY.

- DO NOT agree performatively.
- DO NOT implement every finding blindly.
- DO NOT partially fix around unclear findings.
- DO NOT self-close after code changed.
- DO NOT leave the implementer context while findings are being resolved.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every finding classified as `valid`, `invalid`, or `unclear`.
- [ ] Valid findings fixed or invalid findings pushed back with evidence.
- [ ] Relevant checks rerun.
- [ ] `execution` has what it needs to dispatch a fresh `review`.

## Next Skill

Once the completion gate is fully checked:

- Return to `execution` for a fresh `review` dispatch.

## References

Use these references when you need detail.

- [references/finding-triage-format.md](references/finding-triage-format.md) - Classify before coding.
- [references/pushback-rules.md](references/pushback-rules.md) - Push back with evidence.
