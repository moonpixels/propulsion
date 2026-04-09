---
name: review
# prettier-ignore
description: Analyze a completed slice for real issues before handoff. Use when implementation is verified and needs an objective fresh review.
---

# Review

Find real issues before the slice moves on.

## Quick Start

    Load `review` -> verify inputs -> review for real issues only -> return `clear`, `findings`, or `unclear`.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- The current slice is implemented.
- The current slice text, plan context, diff, and verification evidence are available.
- The review runs in a fresh subagent.
- If any required input is missing, STOP and return `unclear` to `execution`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Verify the review inputs first.
2. Review the slice contract first, then code health.
3. Use [references/signal-filter.md](references/signal-filter.md) to surface real issues only.
4. Return [references/review-format.md](references/review-format.md) with `clear`, `findings`, or `unclear` only.
5. Sort findings by severity, highest first.

## Rules

These rules are MANDATORY.

- MUST surface real issues only.
- DO NOT self-review inside the implementer context.
- DO NOT approve work without evidence.
- DO NOT include style nits or speculative refactors.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Inputs verified or `unclear` returned.
- [ ] Output uses `clear`, `findings`, or `unclear` only.
- [ ] Findings, if any, are evidence-based and severity-sorted.

## Next Skill

Once the completion gate is fully checked:

- If the review is `clear`, return to `execution`.
- If the review is `findings`, load `review-response`.
- If the review is `unclear`, return to `execution`.

## References

Use these references when you need detail.

- [references/review-format.md](references/review-format.md) - Exact review output.
- [references/signal-filter.md](references/signal-filter.md) - High-signal findings only.
