---
name: review-response
description: Handles review feedback by verifying each item, fixing valid issues, and pushing back with evidence when needed. Use when `review` findings must be resolved before work can close.
---

# Review Response

Verify first. Agreement is not the goal.

## Quick Start

```text
verify each finding -> classify it -> fix valid issues or push back with evidence -> re-verify -> return to `review` until clear
```

## Use When

- `review` returned findings.
- Explicit review feedback needs an objective response.
- Code, docs, or plans need fixes or pushback before closure.

## Core Loop

- Verify each item against the code, diff, tests, plan, or requirement before agreeing.
- Classify it: `correct`, `incorrect`, `mixed`, or `unclear`.
- `correct`: make the smallest good fix.
- `incorrect`: push back with concrete evidence.
- `mixed`: accept the valid issue, reject the bad remedy with evidence.
- `unclear`: ask one narrow question.
- Handle one finding at a time unless items are tightly coupled.
- Re-verify every accepted fix before reporting back.
- If code, doc, or plan changes were made, return to `review` until clear.
- If findings conflict or the loop stops converging, escalate instead of churning.

## Guardrails

- No blind agreement. Verification first.
- No performative gratitude or deference. Be direct.
- Prefer artifact evidence: code, tests, docs, diffs, commands, requirements.
- For "more proper/professional" feedback, require a concrete correctness, clarity, policy, or usage problem before expanding scope.
- Works for high-value docs/plans too; verify against source material, not vibes.

## Exit

- Reply with `accepted`, `rejected`, `mixed`, or `unclear`, plus evidence.
- Keep replies concise, direct, and low-context.
