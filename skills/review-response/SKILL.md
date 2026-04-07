---
name: review-response
description: Handle review feedback on code, docs, or plans. Use when a comment must be verified before accepting it or pushing back with evidence.
---

# Review Response

Complements `review`: `review` finds issues; this handles feedback after review.

## Quick Start

```text
Verify against artifact/codebase -> classify correct/incorrect/unclear -> fix or push back with evidence -> re-verify accepted changes
```

## Core Loop

1. Verify the comment against the actual code, doc, plan, diff, or requirement.
2. Classify it: `correct`, `incorrect`, `mixed`, or `unclear`.
3. Act:
   - `correct`: make the smallest good fix
   - `incorrect`: push back with concrete evidence
   - `mixed`: separate issue from remedy; accept the valid part, reject the invalid part with evidence
   - `unclear`: ask a narrow clarifying question
4. Re-verify any accepted change before reporting back; if the change may expose broader issues, hand off to `review`.

## Rules

- No blind agreement. Verification first.
- No performative gratitude or deference. Be direct.
- Keep replies concise, direct, and low-context.
- Prefer artifact evidence: code, tests, docs, diffs, commands, requirements.
- Handle one item at a time unless items are obviously coupled.
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
