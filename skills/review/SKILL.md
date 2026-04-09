---
name: review
# prettier-ignore
description: Analyze a completed slice for real issues before handoff. Use when implementation is verified and needs an objective fresh review.
---

# Review

Find real issues before the slice moves on.

## Quick Start

    Gather plan step, plan excerpt, diff, and verification evidence -> review for real issues only -> return `clear`, `findings`, or `unclear`.

## Before This Skill

- The current slice is implemented.
- Targeted verification evidence exists.
- The review runs in a fresh subagent.

## Use When

- A slice needs objective review before it can be marked complete.
- The main agent needs findings, not suggestions.

## Core Loop

- Stop if the reviewer did not receive the current plan step, relevant plan excerpt, diff, and verification evidence.
- Review the work against the slice contract first, then against code health.
- Use [references/signal-filter.md](references/signal-filter.md) to surface only real issues.
- Return [references/review-format.md](references/review-format.md) with `clear`, `findings`, or `unclear`.
- Sort findings by severity: `high`, `medium`, `low`.

## Hand Off To

- If `clear`, return to `execution`.
- If `findings`, hand off to `review-response`.
- If `unclear`, return to `execution` for missing inputs.

## Do Not

- Do not suggest speculative improvements or style nits.
- Do not self-review inside the implementer context.
- Do not approve work without evidence.
