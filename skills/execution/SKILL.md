---
name: execution
description: Execute an approved plan one task at a time with review loops. Use when implementation is approved and should stay tightly in scope.
---

# Execution

Run one approved task, not a fresh design pass.

## Quick Start

```text
Read one task -> use a bounded implementer subagent by default, inline only if truly trivial -> if behavior changes and a failing test is the right proof, use `tdd` -> verify -> run `review` -> handle findings through `review-response` -> only then close the task
```

## Core Loop

- Enter from an approved plan task or from `workflow` routing a trivial, clearly-scoped, low-risk slice straight here.
- Work exactly one task at a time. Main agent owns task choice, task state, questions, blockers, and next-task decision.
- Read the current task, its verification, and its review hold point before editing.
- `bounded task` = one clear goal, one verification bundle, and a small enough touch surface for one implementer and one reviewer.
- Use a fresh implementer subagent for bounded tasks whenever subagents exist.
- Inline execution is fallback only for trivial local edits or no subagent support.
- Subagents do not advance workflow, choose the next task, or silently close work.
- Before coding, decide whether `tdd` applies.
- Use `tdd` for behavior-changing work when a failing automated test is the right proof.
- If the cause is unknown, go to `debugging` first, not `tdd`.
- If a small safe seam is needed to enable TDD, add it, then start at red.
- If no stable automated harness exists and creating one would itself be a separate slice, stay in `execution`, use the strongest direct verification available, and say why.

## Review Loop

- Implement exactly one task and run its required verification before review.
- Implementer must return one status: `done`, `needs_context`, or `blocked`.
- On `needs_context`, answer narrowly and re-dispatch.
- On `blocked`, change context or approach, or escalate; do not keep retrying unchanged.
- After verification passes, run `review` with the task contract, the relevant diff, and fresh evidence.
- Reviewer must return one status: `clear`, `findings`, or `unclear`.
- Route findings through `review-response`. Accepted fixes must be re-verified and re-reviewed.
- If the loop stops being evidence-backed, stop and escalate instead of churning.
- No task closes without verification and clear review, including inline trivial tasks.

## Guardrails

- Do not quietly expand scope.
- Do not batch multiple tasks into one pass.
- If the current task is unclear, the plan drifts, or required repo state is missing, stop and ask.
- Do not assume hidden setup, hidden prerequisites, or leftover workflow state.
