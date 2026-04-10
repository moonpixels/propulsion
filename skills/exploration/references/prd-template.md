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

1. As a <actor>, I want <behaviour>, so that <benefit>
2. As a <actor>, I want <behaviour>, so that <benefit>

## Solution

Describe the proposed behaviour end-to-end from the user's perspective.

## Implementation Inputs

- External links or references to check out
- Business rules or constraints that must be respected
- References to tickets, docs, or other internal resources that are relevant to implementation

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

## Rules

These rules are MANDATORY.

- Keep it product-facing.
- Include durable decisions, not file paths or code.
- Resolve blocking branches before writing.
- Write the PRD to the correct path using the correct shape.
- Use the first explored phase only if the request was decomposed.
- Self-review for placeholders, contradictions, and scope drift before asking for approval.
