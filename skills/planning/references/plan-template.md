# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this shape.

```md
# Plan: <Feature Title>

> Source PRD: `docs/propulsion/.../prd.md`

## For Agentic Coders

- Use `execution` to implement this plan one phase at a time.
- Use the phase checkboxes for progress.
- Main agent orchestrates. Fresh subagents implement and review.
- Use `tdd` for public behavior changes.
- Stop on blockers.

## Durable Decisions

- Decision 1
- Decision 2

## Phase 1: <Short Title>

- [ ] Phase complete
- Goal: narrow end-to-end behavior
- Source: `PRD stories 1, 2` or `debug diagnosis`
- Likely areas: `src/...`, `tests/...`
- Constraints: durable rules that this phase must respect
- Acceptance criteria:
    - [ ] Criterion 1
    - [ ] Criterion 2

## Phase 2: <Short Title>

- [ ] Phase complete
- Goal: next narrow end-to-end behavior
- Source: `PRD stories 3, 4` or `debug diagnosis`
- Likely areas: `src/...`, `tests/...`
- Constraints: durable rules that this phase must respect
- Acceptance criteria:
    - [ ] Criterion 1
    - [ ] Criterion 2
```

Rules:

- One checkbox equals one phase scoped as one thin vertical slice.
- Prefer many thin phases over few thick ones.
- Give enough context that a fresh subagent does not need to rediscover scope.
- Keep durable decisions out of the phases when they apply globally.
- Use exact file paths only when they are durable and important.
