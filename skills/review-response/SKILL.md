---
name: review-response
# prettier-ignore
description: Handle review findings with technical triage, fixes, and re-review. Use when a fresh review returned findings that must be checked before the slice can complete.
---

# Review Response

Treat review findings as technical claims to verify.

## Quick Start

    Classify each finding -> fix valid items -> push back on invalid items with evidence -> rerun checks -> request fresh review.

## Before This Skill

- `review` returned findings.
- The original slice context and verification commands are available.

## Use When

- A reviewer reported issues that block slice completion.
- Feedback needs technical evaluation before code changes start.

## Core Loop

- Classify each finding with [references/finding-triage-format.md](references/finding-triage-format.md): `valid`, `invalid`, or `unclear`.
- If a valid finding changes public behavior or fixes a bug, use `tdd` before changing production code.
- Fix valid items first.
- For invalid items, respond with evidence from code, tests, or plan scope. See [references/pushback-rules.md](references/pushback-rules.md).
- Resolve unclear items before coding. Do not partially implement ambiguous feedback.
- Rerun the relevant checks after the fixes.
- Request a fresh `review`. Do not self-close after code changed.

## Hand Off To

- Hand off fixed work to `review` again.

## Do Not

- Do not agree performatively.
- Do not implement every finding blindly.
- Do not move on without rechecking and re-reviewing.
