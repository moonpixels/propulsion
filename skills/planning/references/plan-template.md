# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this shape.

```md
# Plan: <Feature Title>

> Source PRD: `docs/propulsion/.../prd.md` OR Source Debug: `docs/propulsion/.../debug.md`

## For Agentic Coders

Use the `execution` skill to implement this plan one phase at a time, and track progress using the checkboxes.

## Durable Decisions

- Decision 1
- Decision 2

## Phase 1: <Short Title>

**Status**: [ ] Phase complete

**Goal**: Concise description of the vertical slice, describing the narrow end-to-end behaviour that this phase will implement and test.

**User Stories**:

1. As a <actor>, I want <behaviour>, so that <benefit>

Replace this section with `**Debug Context**:` when the plan is driven by grounded `debugging` output instead of a PRD.

**Likely Areas**: `src/...`, `tests/...`

**Constraints**: Durable rules that this phase must respect

**Acceptance Criteria**:

- [ ] Criterion 1
- [ ] Criterion 2

## Phase 2: <Short Title>

**Status**: [ ] Phase complete

**Goal**: Concise description of the vertical slice, describing the narrow end-to-end behaviour that this phase will implement and test.

**User Stories**:

1. As a <actor>, I want <behaviour>, so that <benefit>

Replace this section with `**Debug Context**:` when the plan is driven by grounded `debugging` output instead of a PRD.

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
- Copy the relevant `**User Stories**:` into each phase for PRD-driven plans. Use `**Debug Context**:` instead only when planning from grounded `debugging` output.
- Give each phase enough context that a fresh subagent does not need to rediscover scope.
