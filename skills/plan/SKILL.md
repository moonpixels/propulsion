---
name: plan
description: Create an implementation-ready feature plan from an approved PRD using phases scoped as thin vertical slices. Use when an approved `docs/propulsion/.../prd.md` exists.
---

# Plan

Turn an approved PRD into a phased implementation-ready plan using vertical slices.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- If a `docs/propulsion/.../plan.md` already exists for this work, STOP. Ask the user whether to enter `execute`.
- If no approved `docs/propulsion/.../prd.md` exists, STOP. Enter the `brainstorm` skill.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review the approved `prd.md` to get a complete understanding of the feature.
2. Explore relevant areas of the codebase for fresh context.
3. Load any non-Propulsion skills relevant to the PRD and use them to help inform the plan.
4. Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using the template in [references/plan-template.md](references/plan-template.md).
5. Start a fresh plan review subagent with the prompt in [references/plan-reviewer-prompt.md](references/plan-reviewer-prompt.md).
6. Review and implement feedback from the plan review.
7. Repeat steps 6 and 7 until the review returns `Status: approved`.
8. Ask the user to review and approve the plan.
9. After explicit approval, enter the `execute` skill.

## Rules

These rules are MANDATORY.

- NEVER skip reviewing the PRD, exploring the codebase, or loading relevant skills.
- ALWAYS use the plan template reference for structure, section order, and completion rules.
- NEVER print the full plan in the chat, ONLY write it to the file.
- MUST use ALL information from the PRD, DO NOT leave any details out even if they seem obvious or minor.
- USE `Status: approved` as the ONLY valid review approval signal.
- MUST treat review `findings` as fixable issues and `suggestions` as helpful improvements.
- NEVER invent product decisions that are not in the PRD; if a decision is missing, enter `brainstorm` to resolve it before planning.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Reviewed the PRD, codebase, and relevant skills.
- [ ] Written plan to `docs/propulsion/.../plan.md`.
- [ ] Plan reviewed by a subagent which returned `Status: approved`.
- [ ] User has explicitly approved `plan.md`.

## Next Steps

Once the completion gate is fully checked:

- If `prd.md` is approved, enter the `execute` skill.

## References

Use these references when you need detail.

- [references/plan-template.md](references/plan-template.md) - Plan shape and phase format.
- [references/plan-reviewer-prompt.md](references/plan-reviewer-prompt.md) - Plan-reviewer subagent prompt.
