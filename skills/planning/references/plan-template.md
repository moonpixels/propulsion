# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this shape.

```md
# Plan: <Feature Title>

> Source PRD: `docs/propulsion/.../prd.md` OR Source Debug: `docs/propulsion/.../debug.md`

## For Agentic Coders

- Use `execution` to implement this plan one phase at a time.
- Use the phase status checkboxes for progress.
- Main agent orchestrates. Fresh subagents implement and review.
- Use `tdd` for public behavior changes.
- Stop on blockers.

## Durable Decisions

- Decision 1
- Decision 2

## Phase 1: <Short Title>

**Status**: [ ] Phase complete

**Goal**: narrow end-to-end behavior

**User Stories**:

1. As a <role>, I want <outcome>, so that <value>.

Replace this section with `**Debug Context**:` when the plan is driven by grounded `debugging` output instead of a PRD.

**Likely Areas**: `src/...`, `tests/...`

**Constraints**: durable rules that this phase must respect

**Acceptance Criteria**:

- [ ] Criterion 1
- [ ] Criterion 2

## Phase 2: <Short Title>

**Status**: [ ] Phase complete

**Goal**: next narrow end-to-end behavior

**User Stories**:

1. As a <role>, I want <outcome>, so that <value>.

Replace this section with `**Debug Context**:` when the plan is driven by grounded `debugging` output instead of a PRD.

**Likely Areas**: `src/...`, `tests/...`

**Constraints**: durable rules that this phase must respect

**Acceptance Criteria**:

- [ ] Criterion 1
- [ ] Criterion 2
```

Rules:

- One phase-complete checkbox equals one phase scoped as one thin vertical slice.
- Prefer many thin phases over few thick ones.
- Give enough context that a fresh subagent does not need to rediscover scope.
- Copy the relevant `**User Stories**:` into each phase for PRD-driven plans. Use `**Debug Context**:` instead only when planning from grounded `debugging` output.
- Keep durable decisions out of the phases when they apply globally.
- Use exact file paths only when they are durable and important.
