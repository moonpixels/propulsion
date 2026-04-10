---
name: review
# prettier-ignore
description: Analyze a completed phase for real issues before handoff. Use when implementation is verified and needs an objective fresh review.
---

# Review

Find real issues before the phase moves on.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The current phase is implemented.
- The current phase text, plan context, diff, and verification evidence are available.
- The review runs in a fresh subagent.
- If any required input is missing, STOP and return `unclear` to `execution`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Verify the review inputs first.
2. Review the phase contract first, then code health.
3. Use [references/signal-filter.md](references/signal-filter.md) to surface real issues only.
4. Return [references/review-format.md](references/review-format.md) using the exact `Status: clear | findings | unclear` shape only, including an `Acceptance Criteria Status` section for the current phase.
5. Sort findings by severity, highest first.

## Rules

These rules are MANDATORY.

- MUST surface real issues only.
- DO NOT self-review inside the implementer context.
- DO NOT approve work without evidence.
- DO NOT include style nits or speculative refactors.
- DO NOT treat `Acceptance Criteria Status` as permission to update `plan.md`; that stays with `execution`.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Inputs verified or `unclear` returned.
- [ ] Output uses `clear`, `findings`, or `unclear` only.
- [ ] Findings, if any, are evidence-based and severity-sorted.
- [ ] `Acceptance Criteria Status` covers every current-phase acceptance criterion with evidence.

## Next Skill

Once the completion gate is fully checked:

- If the review is `clear`, return to `execution`.
- If the review is `findings`, return the findings to `execution` so they can be sent back to the implementer context for `review-response`.
- If the review is `unclear`, return to `execution`.

## References

Use these references when you need detail.

- [references/review-format.md](references/review-format.md) - Exact review output.
- [references/signal-filter.md](references/signal-filter.md) - High-signal findings only.
