---
name: planning
description: Turns an approved PRD into an execution-ready plan with thin vertical slices and bounded tasks. Use when exploration is complete and the PRD is approved.
---

# Planning

Turn an approved PRD into one execution-ready plan. No discovery here.

## Quick Start

```text
confirm approved prd -> inspect minimal code -> lock durable decisions -> draft thin vertical slices -> show slice list -> revise until approved -> write plan.md -> review it -> fix until clear -> ask user to approve -> stop
```

## Use When

- `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md` exists and is explicitly approved.
- Scope is clear enough to plan.
- Execution needs bounded tasks, touch points, and verification.

## Core Loop

- Pull decisions from the approved PRD. Do not reopen discovery.
- If scope, constraints, or success criteria are still unclear, return to `exploration`.
- Identify durable decisions first: routes, schema shape, key models, auth boundaries, service boundaries.
- Break the work into tracer-bullet vertical slices. Each slice must be narrow, end-to-end, and verifiable on its own.
- Prefer many thin slices over few thick ones.
- Before writing the final plan, show the proposed slices as a numbered list with covered user stories. Ask whether any slice should be split or merged.
- Keep tasks bounded enough for one implementer subagent and one reviewer pass.
- Use exact repo touch points when they are stable and useful. Do not pad the plan with brittle trivia.
- No placeholders like `TBD`, `etc.`, `as needed`, or `follow existing patterns`.

## Plan

- Write exactly one file: `docs/propulsion/{yyyymmdd}-{plan-name}/plan.md`.
- Header must include the source PRD and a short `## Durable Decisions` section.
- Then write one section per slice with: title, user stories, goal, files to create or modify or test, checkbox tasks, verification, review hold point.
- Keep the plan task-oriented and execution-facing.

## Review Loop

- After writing the plan, dispatch a reviewer subagent using `plan-reviewer.md`.
- Reviewer blocks on real execution risk only: missing PRD coverage, vague or contradictory tasks, weak decomposition, missing verification, or bad sequence.
- Fix blocking issues and re-review until clear.

## Exit

- After the reviewer loop is clear, ask the user to review `plan.md`, request changes, or approve it.
- Require explicit user approval before any implementation starts.
- No implementation, no code edits, no commits.
