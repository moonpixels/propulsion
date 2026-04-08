---
name: workflow
description: Enforce Propulsion's session workflow and route to the right process skill. Use when a new request arrives, when deciding the next workflow stage, or when choosing which process skill to load.
---

# Workflow

## Contract

```text
Propulsion workflow is active for this session.
Before any substantive response, question, or action, choose the correct process skill.
Non-trivial work must not skip required artifacts or approval gates.
Done = verification passed, review clear, accepted feedback resolved.
```

## Canonical Flow

```text
Canonical lifecycle: exploration -> approved prd -> planning -> approved plan -> execution -> review -> review-response -> done
Unknown-cause bug, failing test, or unexpected behavior -> debugging first, then return to the lifecycle
New or unclear work -> exploration
Exploration is not done until `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md` is written and user-approved
Approved PRD -> planning
Planning is not done until `docs/propulsion/{yyyymmdd}-{plan-name}/plan.md` is written, reviewed, and user-approved
Trivial, clearly-scoped, low-risk work that is safe without a PRD or multi-step plan -> execution
Approved plan -> execution
Behavior-changing tasks inside execution -> tdd first, then return to execution/review
Meaningful completed work or explicit review request -> review
Review clear -> done
Review feedback -> review-response, then return to review until clear
```

## Rules

- Treat this skill as already active when bootstrapped. Reload it only to re-check wording or if the user asks.
- Before any substantive response, action, or clarifying question, route to the right process skill first.
- Main agent owns top-level routing, workflow state, artifact authorship, and approval gates.
- Subagents support bounded work inside the current stage. They may inspect, critique, or validate, but they do not advance or restart top-level routing unless explicitly asked.
- Planning may be skipped only for trivial, clearly-scoped, low-risk work that can be safely completed without a PRD or multi-step plan; in that case, route straight to `execution`. If that is not clearly true, do not skip stages.
- Where routes overlap: `debugging` before `tdd` when the cause is unknown; approved plans enter `execution` first and use `tdd` only for behavior-changing tasks inside that flow; `review` before handoff after meaningful work.
- Downstream skills own the method details. Load the chosen skill and follow it.
