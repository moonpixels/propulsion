---
name: review-response
description: Handle review feedback on code, docs, or plans. Use when `review` findings must be verified and resolved before work can close.
---

# Review Response

`review` finds issues; this handles them without guesswork.

## Quick Start

```text
Verify against artifact/codebase -> classify correct/incorrect/unclear -> fix or push back with evidence -> re-verify accepted changes
```

## Core Loop

- Use `review-response` for execution findings or explicit review feedback.
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

## Rules

- No blind agreement. Verification first.
- No performative gratitude or deference. Be direct.
- Keep replies concise, direct, and low-context.
- Prefer artifact evidence: code, tests, docs, diffs, commands, requirements.
- For "more proper/professional" feedback, require a concrete correctness, clarity, policy, or usage problem before expanding scope.
- Works for high-value docs/plans too; verify against source material, not vibes.

## Replies

- Accepted: state fix + evidence or verification result.
- Mixed: state what you accepted, what you rejected, and why.
- Rejected: state why, with specific evidence.
- Unclear: state what is ambiguous and what answer is needed.

## Red Flags

- agreeing before checking
- implementing to be polite
- arguing from memory instead of artifact evidence
- claiming fixed before re-verification
