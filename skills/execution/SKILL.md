---
name: execution
description: Execute an approved plan one task at a time with review loops. Use when implementation is approved and should stay tightly in scope.
---

# Execution

Run the approved execution slice, not a fresh design pass.

## Quick Start

```text
Read the current task and its verification/review steps -> execute it via subagent if possible, inline only if not -> if the task changes behavior, do that implementation through `tdd` -> run `review`, fix findings, and re-review until clear -> then move on
```

## Start Here

- Enter from an approved plan task or from `workflow` routing a trivial, clearly-scoped, low-risk slice straight here.
- Read the current task or direct-execution slice before editing.
- Read that slice's verification steps and review checkpoints before editing.
- Follow the task's written steps closely; if you need to change the sequence or intent, stop and ask.
- Review it critically. If the plan or direct-execution slice is wrong, missing detail, or no longer fits the repo, stop and ask.
- Keep exactly one task in progress at a time.

## Execution Mode

- Default to subagent-driven execution when the platform supports it.
- Use inline execution only as fallback.
- In either mode, make the smallest correct change needed for the current task.
- Execution follows the approved plan; when a task changes behavior, use `tdd` to implement that task within this flow.
- A task is not done until its required verification passes and `review` is clear.

## Review Loop

- Finish the current task's plan-defined verification before review.
- Run review at the current task's plan-defined checkpoints; if none are called out, review before closing the task.
- Use subagent-backed `review` by default when the platform supports it; otherwise use inline `review`.
- Fix findings, then run `review` again. Repeat until clear.
- If verification keeps failing and the next fix is not evidence-backed, stop and surface the blocker.
- Route meaningful completed work through `review`; no silent handoff.
- Route review feedback through `review-response`, then return to `review` until clear.
- Do not move to the next task with open review findings.

## Scope Guardrails

- Do not quietly expand scope.
- If the current task is unclear, stop and ask instead of guessing.
- If required repo state, tools, or inputs are missing, stop and surface the dependency.
- Stop when the plan is wrong or scope changes materially.
- Do not assume extra repo setup, hidden prerequisites, or leftover workflow state.
