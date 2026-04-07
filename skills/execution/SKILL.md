---
name: execution
description: Execute an approved plan one task at a time with review loops. Use when implementation is approved and should stay tightly in scope.
---

# Execution

Run the current plan, not a fresh design pass.

## Quick Start

```text
Read current task + its verification/review steps -> implement it via subagent if possible, inline only if not -> route behavior changes through `tdd` -> run subagent-backed `review`, fix, re-review until clear -> then move on
```

## Start Here

- Read the current plan task before editing.
- Read that task's verification steps and review checkpoints before editing.
- Review it critically. If the plan is wrong, missing detail, or no longer fits the repo, stop and ask.
- Keep exactly one task in progress at a time.

## Execution Mode

- Default to subagent-driven execution when the platform supports it.
- Use inline execution only as fallback.
- In either mode, make the smallest correct change for the current task only.
- If the task changes behavior, use `tdd` instead of coding directly.

## Review Loop

- Finish the current task's plan-defined verification before review handoff.
- Run review at the current task's plan-defined checkpoints; if none are called out, review before closing the task.
- Use subagent-backed `review` by default when the platform supports it; otherwise use inline `review`.
- Fix findings, then run `review` again. Repeat until clear.
- Route meaningful completed work through `review`; no silent handoff.
- If feedback is unclear, disputed, or risky, use `review-response` before proceeding.
- Do not move to the next task with open review findings.

## Scope Guardrails

- Do not quietly expand scope.
- Stop when the plan is wrong or scope changes materially.
- Do not assume extra repo setup, hidden prerequisites, or leftover workflow state.
