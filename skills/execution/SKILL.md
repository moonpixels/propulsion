---
name: execution
description: Executes one approved task at a time with verification and review loops. Use when implementation is approved and should stay tightly in scope.
---

# Execution

Execute one approved task. Do not redesign the plan.

## Quick Start

```text
read one task -> choose implementer path -> route unknown causes to `debugging` and behavior-proof work to `tdd` -> implement -> verify -> `review` -> `review-response` if needed -> close task only when clear
```

## Use When

- An approved `plan.md` task is ready.
- `workflow` routed a trivial, clearly-scoped, low-risk task straight here.
- The work should stay tightly inside an existing contract.

## Core Loop

- Read the current task, its goal, verification, and review hold point before editing.
- Work one task at a time. Main agent owns task choice, state, questions, blockers, and closure.
- A bounded task has one clear goal, one verification bundle, and a small enough touch surface for one implementer and one reviewer.
- Use a fresh implementer subagent for bounded tasks by default. Inline execution is fallback only for trivial local edits or missing subagent support.
- Before coding, route correctly: unknown cause -> `debugging`; behavior change with stable automated proof -> `tdd`; otherwise stay here.
- Implement exactly this task, then run its required verification before review.
- Implementer returns one status: `done`, `needs_context`, or `blocked`.
- On `needs_context`, answer narrowly and re-dispatch. On `blocked`, change approach or escalate. Do not churn unchanged.
- Run `review` with the task contract, the relevant diff, and fresh evidence.
- Route findings through `review-response`. Re-verify and re-review until clear.

## Guardrails

- Do not quietly expand scope.
- Do not batch multiple tasks into one pass.
- No task closes without verification and clear review, including trivial inline tasks.
- If the current task is unclear, the plan drifts, or required repo state is missing, stop and ask.
- Do not assume hidden setup, hidden prerequisites, or leftover workflow state.

## Exit

- Close the task only after verification passes and `review` returns `clear`.
- Choose the next task in the main workflow, not inside a subagent.
