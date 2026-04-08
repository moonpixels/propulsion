---
name: workflow
description: Enforce Propulsion's session workflow and route to the right process skill. Use when a new request arrives, when deciding the next workflow stage, or when choosing which process skill to load.
---

# Workflow

## Contract

```text
Propulsion workflow is active for this session.
Before any substantive response or action, choose the correct process skill.
Do not skip stages on non-trivial work.
Done = verification passed, review clear, accepted feedback resolved.
```

## Canonical Flow

```text
Canonical lifecycle: exploration -> planning -> execution -> tdd -> review -> review-response -> done
Unknown-cause bug, failing test, or unexpected behavior -> debugging first, then return to the lifecycle
New or unclear work -> exploration
Approved direction -> planning
Trivial, clearly-scoped, low-risk work that is safe without a multi-step plan -> execution
Approved plan -> execution
Behavior-changing implementation inside execution -> tdd
Meaningful completed work or explicit review request -> review
Review clear -> done
Review feedback -> review-response, then return to review until clear
```

## Rules

- Treat this skill as already active when bootstrapped. Reload it only to re-check wording or if the user asks.
- Before any substantive response, action, or clarifying question, route to the right process skill first.
- Main agent owns top-level routing and workflow state.
- Subagents support bounded work inside the current stage; they do not restart top-level routing unless explicitly asked.
- Planning may be skipped only for trivial, clearly-scoped, low-risk work that can be safely completed without a multi-step plan; in that case, route straight to `execution`. If that is not clearly true, do not skip stages.
- Where routes overlap: `debugging` before `tdd` when the cause is unknown; `execution` before `tdd` when there is an approved plan; `review` before handoff after meaningful work.
- Downstream skills own the method details. Load the chosen skill and follow it.
