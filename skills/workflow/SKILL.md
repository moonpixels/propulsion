---
name: workflow
# prettier-ignore
description: Manage work through Propulsion from session start and load the right skill before any action. Use when a conversation starts or when the next Propulsion stage is unclear.
---

# Workflow

Treat Propulsion as the session contract.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- This skill is for the main agent.
- If you are a subagent on a bounded task, follow the assigned skill and do not reroute the workflow.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. If a Propulsion skill applies, load it before any response or action. This includes clarifying questions.
2. Announce the active skill and each major stage transition in plain language.
3. Route with this table:
    - New feature, vague request, or new behavior -> `exploration`
    - Bug, test failure, flaky behavior, or unexpected output -> `debugging`
    - Approved `prd.md` or grounded debugging output to break into slices -> `planning`
    - Current `plan.md` and user wants implementation -> `execution`
    - Public behavior change inside a slice -> `tdd`
    - Completed slice needing objective review -> `review`
    - `review` findings to address -> `review-response`
4. Keep major stage prompts user-facing: `exploration` -> `planning`, `planning` -> `execution`, `debugging` -> `planning`.

## Rules

These rules are MANDATORY.

- User instructions and repo rules win, then Propulsion, then platform defaults.
- Main agent owns routing and stage changes.
- DO NOT let subagents reroute the workflow.
- DO NOT handle coding work outside Propulsion.
- DO NOT repeat downstream skill detail here.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Active skill loaded before work begins.
- [ ] Major stage transitions announced to the user.
- [ ] Routing stayed inside Propulsion.

## Next Skill

Once the completion gate is fully checked:

- Load the skill selected by the routing table.

## References

Use these references when you need detail.

- None. This file is the routing contract.
