# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this shape.

```md
# Plan: <Feature Title>

> Source PRD: `docs/propulsion/.../prd.md`

## For Agentic Coders

- Main agent orchestrates.
- Complete one checkbox at a time.
- Use a fresh implementation subagent per checkbox.
- Use a fresh review subagent before handoff.
- Use `tdd` for public behavior changes.
- Run targeted checks before marking a slice complete.
- Update this file only from the main agent.
- Stop on blockers.

## Durable Decisions

- Decision 1
- Decision 2

## Slice 1: <Short Title>

- [ ] Slice complete
- Goal: narrow end-to-end behavior
- PRD stories: `1, 2`
- Likely areas: `src/...`, `tests/...`
- Constraints: durable rules that this slice must respect
- Verification: `exact command or commands`

## Slice 2: <Short Title>

- [ ] Slice complete
- Goal: next narrow end-to-end behavior
- PRD stories: `3, 4`
- Likely areas: `src/...`, `tests/...`
- Constraints: durable rules that this slice must respect
- Verification: `exact command or commands`
```

Rules:

- One checkbox equals one thin vertical slice.
- Prefer many thin slices over few thick ones.
- Give enough context that a fresh subagent does not need to rediscover scope.
- Keep durable decisions out of the slices when they apply globally.
