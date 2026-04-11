---
name: planning
# prettier-ignore
description: Create an implementation-ready plan from an approved PRD using phases scoped as thin vertical slices. Use when an approved `docs/propulsion/.../prd.md` exists and the next step is to create a feature or bug implementation plan.
---

# Planning

Turn an approved PRD into a phased implementation-ready plan using vertical slices.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If a `docs/propulsion/.../plan.md` already exists for this work, STOP. Determine whether the plan is feature-oriented or bug-oriented, then ask the user whether to load the correct downstream skill: `execution` for feature work or `debugging` for bug work.
- If no approved `docs/propulsion/.../prd.md` exists, STOP. Load `exploration`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review the approved `prd.md` to understand the requirements.
2. Explore relevant areas of the codebase for fresh context.
3. Identify high-level durable decisions that are unlikely to change throughout implementation.
4. Identify narrow vertical slices that cut through all integration layers end-to-end.
5. Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using the template in [references/plan-template.md](references/plan-template.md).
6. Dispatch a fresh plan-reviewer subagent with the prompt in [references/plan-reviewer-prompt.md](references/plan-reviewer-prompt.md).
7. Review and implement feedback from the plan-reviewer subagent.
8. Repeat steps 6 and 7 until the review returns `Status: approved`.
9. Tell the user planning is complete, state whether the work is feature-oriented or bug-oriented, and ask whether to move to the correct downstream skill: `execution` for feature work or `debugging` for bug work.

## Rules

These rules are MANDATORY.

- MUST output the `plan.md` in the exact shape specified in the template reference.
- DO NOT output the plan in the chat, ONLY in the `plan.md` file.
- MUST keep phases thin, ordered, and implementation-ready.
- MUST make the plan's downstream ownership explicit: `execution` for feature implementation, `debugging` for bug diagnosis and bug-fix loops.
- MUST determine the downstream skill from the plan and PRD context. DO NOT ask the user to choose between `execution` and `debugging`.
- DO NOT loose ANY information from the PRD that is relevant to implementation, otherwise you risk misalignment and rework.
- MUST treat `Status: approved` as the only valid approval signal for downstream readiness.
- MUST treat `findings` as fixable planning issues inside `planning`.
- MUST treat `suggestions` as improvable aspects that should be implemented IF they make downstream implementation or debugging smoother.
- DO NOT invent missing product decisions.
- DO NOT auto-start `execution` or `debugging`, ALWAYS ask the user whether to proceed.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] PRD reviewed.
- [ ] Relevant codebase areas explored for fresh context.
- [ ] `plan.md` written to `docs/propulsion/.../plan.md`.
- [ ] Plan-reviewer subagent returns `Status: approved`.
- [ ] User asked whether to move to the correct downstream skill for the work.

## Next Skill

Once the completion gate is fully checked:

- If the plan is feature-oriented and the user says to proceed, load `execution`.
- If the plan is bug-oriented and the user says to proceed, load `debugging`.
- If product intent is missing, load `exploration`.

## References

Use these references when you need detail.

- [references/plan-template.md](references/plan-template.md) - Plan shape and phase format.
- [references/plan-reviewer-prompt.md](references/plan-reviewer-prompt.md) - Fresh plan-reviewer subagent prompt.
