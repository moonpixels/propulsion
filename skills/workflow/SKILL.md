---
name: workflow
description: Routes work to the right Propulsion process skill and enforces artifact and approval gates. Use when a session starts, work changes stage, or the next skill is unclear.
---

# Workflow

Route before acting. Do not start substantive work until the right process skill is active.

## Quick Start

```text
new or unclear work -> exploration
approved prd -> planning
approved plan or trivial safe task -> execution
unknown-cause bug or failing test -> debugging
behavior-changing task inside execution -> tdd
meaningful completed work -> review
review findings -> review-response -> review until clear
```

## Use When

- Session start.
- Before substantive questions, edits, or tool use.
- When the next stage is unclear.

## Routing

- `exploration`: vague requests, missing scope, missing decisions, or no approved PRD.
- `planning`: approved `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md`.
- `execution`: approved `plan.md`, or trivial, clearly-scoped, low-risk work that is safe without a PRD or plan.
- `debugging`: unknown-cause bugs, failing tests, flaky behavior, or unexpected output.
- `tdd`: behavior-changing work with a stable automated proof. Use inside `execution`, not instead of it.
- `review`: meaningful completed work or explicit review request.
- `review-response`: review findings or disputed feedback.

## Guardrails

- Main agent owns routing, artifact authorship, approval gates, and done state.
- Subagents support the current stage only. They do not advance the workflow.
- Do not skip `exploration` or `planning` unless the trivial-task exception is clearly true.
- Do not use `tdd` before `debugging` when the cause is unknown.
- Done = verification passed, review clear, accepted feedback resolved.

## Exit

- Load the chosen skill and follow its method.
