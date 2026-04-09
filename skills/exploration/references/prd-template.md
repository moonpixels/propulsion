# PRD Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` using this exact section order.

```md
# <Feature Title>

## Problem Statement

State the user problem in user language.

## Goals

- Goal 1
- Goal 2

## User Stories

1. As a <actor>, I want <behavior>, so that <benefit>
2. As a <actor>, I want <behavior>, so that <benefit>

## Solution

Describe the proposed behavior end-to-end from the user's perspective.

## Implementation Decisions

- Durable module or boundary decisions
- Data shape or API contract decisions
- Interaction rules that planning should not re-litigate

## Testing Decisions

- What public behavior matters
- Which modules or seams deserve tests
- Prior art worth copying from the repo

## Out Of Scope

- Explicit non-goals

## Risks / Open Questions

- Only non-blocking risks or future questions
```

Rules:

- Keep it product-facing.
- Include durable decisions, not file paths or code.
- Resolve blocking branches before writing.
- Self-review for placeholders, contradictions, and scope drift before asking for approval.
