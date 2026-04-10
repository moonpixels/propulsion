---
name: planning
# prettier-ignore
description: Create an execution-ready plan from approved discovery using phases scoped as thin vertical slices. Use when approved `prd.md` or grounded debugging output exists and the next step is execution.
---

# Planning

Turn an approved PRD into a phased execution-ready implementation plan using vertical slices.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If a `docs/propulsion/.../plan.md` already exists for this work, STOP. Ask the user whether to load `execution`.
- If this is not a bug, failure, or unexpected behaviour and no approved `docs/propulsion/.../prd.md` exists, STOP. Load `exploration`.
- If this is a bug, failure, or unexpected behaviour and no grounded output from `debugging` exists, STOP. Load `debugging`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review the approved `prd.md` or grounded debug output to understand the requirements.
2. Explore relevant areas of the codebase for fresh context.
3. Identify high-level durable decisions that are unlikely to change throughout implementation.
4. Identify narrow vertical slices that cut through all integration layers end-to-end.
5. Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using the template in [references/plan-template.md](references/plan-template.md).
6. Dispatch a fresh plan-reviewer subagent with the prompt in [references/plan-reviewer-prompt.md](references/plan-reviewer-prompt.md).
7. Review and implement feedback from the plan-reviewer subagent.
8. Repeat steps 6 and 7 until the review returns `Status: approved`.
9. Tell the user planning is complete and ask whether to move to `execution`.

## Rules

These rules are MANDATORY.

- MUST output the `plan.md` in the exact shape specified in the template reference.
- DO NOT output the plan in the chat, ONLY in the `plan.md` file.
- MUST keep phases thin, ordered, and execution-ready.
- MUST treat `Status: approved` as the only valid approval signal for execution-readiness.
- MUST treat `findings` as fixable planning issues inside `planning`.
- MUST treat `suggestions` as improvable aspects that should be implemented IF they make execution smoother.
- DO NOT invent missing product decisions or bug diagnosis.
- DO NOT auto-start `execution`.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] PRD or debug context reviewed.
- [ ] Relevant codebase areas explored for fresh context.
- [ ] `plan.md` written to `docs/propulsion/.../plan.md`.
- [ ] Plan-reviewer subagent returns `Status: approved`.
- [ ] User asked whether to move to `execution`.

## Next Skill

Once the completion gate is fully checked:

- If the user says to proceed, load `execution`.
- If product intent is missing, load `exploration`.
- If bug diagnosis is missing, load `debugging`.

## References

Use these references when you need detail.

- [references/plan-template.md](references/plan-template.md) - Plan shape and phase format.
- [references/plan-reviewer-prompt.md](references/plan-reviewer-prompt.md) - Fresh plan-reviewer subagent prompt.
