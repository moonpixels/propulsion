# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this shape.

```md
# Plan: <Feature Title>

> Source PRD: `docs/propulsion/.../prd.md`

## For Agentic Coders

- Use `execution` to implement this plan one slice at a time.
- Use the slice checkboxes for progress.
- Main agent orchestrates. Fresh subagents implement and review.
- Use `tdd` for public behavior changes.
- Stop on blockers.

## Durable Decisions

- Decision 1
- Decision 2

## Slice 1: <Short Title>

- [ ] Slice complete
- Goal: narrow end-to-end behavior
- Source: `PRD stories 1, 2` or `debug diagnosis`
- Likely areas: `src/...`, `tests/...`
- Constraints: durable rules that this slice must respect
- Acceptance criteria:
    - [ ] Criterion 1
    - [ ] Criterion 2

## Slice 2: <Short Title>

- [ ] Slice complete
- Goal: next narrow end-to-end behavior
- Source: `PRD stories 3, 4` or `debug diagnosis`
- Likely areas: `src/...`, `tests/...`
- Constraints: durable rules that this slice must respect
- Acceptance criteria:
    - [ ] Criterion 1
    - [ ] Criterion 2
```

Rules:

- One checkbox equals one thin vertical slice.
- Prefer many thin slices over few thick ones.
- Give enough context that a fresh subagent does not need to rediscover scope.
- Keep durable decisions out of the slices when they apply globally.
- Use exact file paths only when they are durable and important.
