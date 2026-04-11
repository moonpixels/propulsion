# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this shape.

```md
# Plan: <Feature Title>

> Source PRD: `docs/propulsion/.../prd.md`

## For Agentic Coders

Use the <`execution` | `debugging`> skill to implement this plan and track progress using the checkboxes.

## Durable Decisions

- Decision 1
- Decision 2

## Phase 1: <Short Title>

**Status**: [ ] Phase complete

**Goal**: Concise description of the vertical slice, describing the narrow end-to-end behaviour that this phase will implement and test.

**Supporting Context**: Any important implementation inputs from the PRD that are relevant to this phase.

**User Stories**:

1. As a <actor>, I want <behaviour>, so that <benefit>

**Likely Areas**: `src/...`, `tests/...`

**Constraints**: Durable rules that this phase must respect

**Acceptance Criteria**:

- [ ] Criterion 1
- [ ] Criterion 2

## Phase 2: <Short Title>

**Status**: [ ] Phase complete

**Goal**: Concise description of the vertical slice, describing the narrow end-to-end behaviour that this phase will implement and test.

**Supporting Context**: Any important implementation inputs from the PRD that are relevant to this phase.

**User Stories**:

1. As a <actor>, I want <behaviour>, so that <benefit>

**Likely Areas**: `src/...`, `tests/...`

**Constraints**: Durable rules that this phase must respect

**Acceptance Criteria**:

- [ ] Criterion 1
- [ ] Criterion 2
```

## Rules

- Prefer many thin phases over few thick ones.
- Keep durable decisions out of the phases when they apply globally.
- Use exact file paths only when they are durable and important.
- Copy the relevant `**User Stories**:` into each phase from the approved PRD.
- Give each phase enough context that a fresh subagent does not need to rediscover scope.
- Choose the downstream skill based on the plan's content and PRD context. If the plan is feature-oriented, it should hand off to `execution`. If the plan is bug-oriented, it should hand off to `debugging`.
