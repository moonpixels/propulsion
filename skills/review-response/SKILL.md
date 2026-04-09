---
name: review-response
# prettier-ignore
description: Handle review findings with technical triage, fixes, and re-review. Use when a fresh review returned findings that must be checked before the slice can complete.
---

# Review Response

Treat review findings as technical claims to verify.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- `review` returned findings.
- The original slice context and verification commands are available.
- If required context is missing, STOP and return to `execution`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Classify every finding with [references/finding-triage-format.md](references/finding-triage-format.md).
2. If any finding is `unclear`, resolve it before coding.
3. If a valid finding changes public behavior or fixes a bug, load `tdd` before production code.
4. Fix valid findings.
5. Push back on invalid findings with [references/pushback-rules.md](references/pushback-rules.md).
6. Rerun the relevant checks and request a fresh `review`.

## Rules

These rules are MANDATORY.

- DO NOT agree performatively.
- DO NOT implement every finding blindly.
- DO NOT partially fix around unclear findings.
- DO NOT self-close after code changed.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every finding classified as `valid`, `invalid`, or `unclear`.
- [ ] Valid findings fixed or invalid findings pushed back with evidence.
- [ ] Relevant checks rerun.
- [ ] Fresh `review` requested.

## Next Skill

Once the completion gate is fully checked:

- Load `review`.

## References

Use these references when you need detail.

- [references/finding-triage-format.md](references/finding-triage-format.md) - Classify before coding.
- [references/pushback-rules.md](references/pushback-rules.md) - Push back with evidence.
