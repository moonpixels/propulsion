---
name: planning
description: Turn an approved PRD into an execution-ready plan with vertical slices, checkbox tasks, and a reviewer-subagent loop. Use when exploration is complete and the PRD is approved.
---

# Planning

Turns an approved PRD into one execution-ready plan. Do not use for unclear requests; `exploration` owns discovery.

## Quick Start

```text
Confirm approved docs/propulsion/{yyyymmdd}-{plan-name}/prd.md -> inspect only files needed to lock implementation -> capture durable decisions -> draft thin vertical slices -> review the slice breakdown with the user -> write docs/propulsion/{yyyymmdd}-{plan-name}/plan.md -> dispatch a reviewer subagent -> fix issues and re-review until approved -> ask the user to review or approve -> stop
```

## Start Conditions

- Enter only after `exploration` or the user has already approved `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md`.
- Pull decisions from the approved PRD. Do not re-run discovery.
- If scope, constraints, or success criteria are still unclear, stop and hand back to `exploration`.

## Slice Design

- Break the work into tracer-bullet vertical slices, not broad horizontal phases.
- Each slice must deliver a narrow but complete path through the system and be demoable or verifiable on its own.
- Prefer more thin slices over fewer thick ones.
- Before writing the final plan, show the proposed slices as a numbered list with covered user stories. Ask whether any slice should be split or merged, then iterate until approved.
- Capture durable decisions near the top of the plan so every slice can rely on them: routes, schema shape, key models, auth boundaries, service boundaries, or other stable choices.

## Plan File

- Write exactly one file: `docs/propulsion/{yyyymmdd}-{plan-name}/plan.md`.
- Start with this header:

```markdown
# <Feature Name> Implementation Plan

> Source PRD: `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md`
> For agentic workers: use bounded subagents by default for one task at a time. Main agent keeps routing, review, and approval ownership.

## Durable Decisions

- ...
```

- Then write one section per slice using this shape:

```markdown
## Slice N: <Title>

**User stories:** ...
**Goal:** ...

**Files**

- Create: `...`
- Modify: `...`
- Test: `...`

### Tasks

- [ ] Task 1: ...
- [ ] Task 2: ...
- [ ] Task 3: ...

### Verification

- [ ] ...

### Review Hold Point

- [ ] Pause for review before moving past this slice.
```

- Keep tasks bounded and execution-facing. A task should be easy to hand to one subagent without extra decomposition.
- Use exact repo touch points where they are stable and useful. Do not pad the plan with brittle trivia.
- Keep wording sharp. No placeholders like `TBD`, `etc.`, `as needed`, or `follow existing patterns`.

## Plan Review Loop

- After writing the plan, dispatch a reviewer subagent using `plan-reviewer.md`.
- The reviewer should block only on real implementation risks: missing PRD coverage, vague or contradictory tasks, weak decomposition, missing verification, or a sequence likely to get an implementer stuck.
- If the reviewer finds blocking issues, fix the plan and run the reviewer again. Repeat until approved.
- Subagents may inspect code or critique the plan, but the main agent owns the final plan, revisions, and approval gate.

## Handoff

- After the reviewer loop is clear, ask the user to review `plan.md`, request changes, or approve it.
- Require explicit user approval before any implementation starts.

## Guardrails

- No implementation, no code edits, no commits.
- Keep the plan task-oriented and checkbox-heavy. If a task is too large for one bounded execution pass, split it.
- Plans should make subagent-driven execution the default.
- If a requirement would force a scope change, stop and return to `exploration`.
