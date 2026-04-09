---
name: planning
# prettier-ignore
description: Create an execution-ready plan from approved discovery using phases scoped as thin vertical slices. Use when approved `prd.md` or grounded debugging output exists and the next step is execution.
---

# Planning

Turn approved discovery into an execution-ready plan.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- Approved `docs/propulsion/.../prd.md` exists, or grounded output from `debugging` exists.
- The next step is to break the work into phases.
- If product intent is unresolved, STOP. Load `exploration`.
- If bug diagnosis is ungrounded, STOP. Load `debugging`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Re-scan the relevant repo areas before drafting phases.
2. Capture durable decisions first. Keep them stable across all phases.
3. Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` from [references/plan-template.md](references/plan-template.md).
4. Make each checkbox one phase scoped as a thin vertical slice with acceptance criteria and likely areas.
5. Use a fresh review subagent with [references/plan-review-format.md](references/plan-review-format.md). Repeat until it returns `clear`.
6. If review finds missing product intent, STOP. Load `exploration`. If review finds missing bug diagnosis, STOP. Load `debugging`.
7. Tell the user planning is complete and ask whether to move to `execution`.

## Rules

These rules are MANDATORY.

- MUST start every `plan.md` with `## For Agentic Coders` from the template.
- MUST keep phases thin, ordered, and execution-ready.
- MUST write workflow artifacts to files. DO NOT print full `plan.md` or full review artifacts in chat instead.
- DO NOT invent missing product decisions or bug diagnosis here.
- DO NOT auto-start `execution`.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Relevant repo areas re-scanned.
- [ ] `plan.md` written to `docs/propulsion/.../plan.md`.
- [ ] Fresh review returns `clear`.
- [ ] User asked whether to move to `execution`.

## Next Skill

Once the completion gate is fully checked:

- If the user says to proceed, load `execution`.
- If product intent is missing, load `exploration`.
- If bug diagnosis is missing, load `debugging`.

## References

Use these references when you need detail.

- [references/plan-template.md](references/plan-template.md) - Plan shape and phase format.
- [references/plan-review-format.md](references/plan-review-format.md) - Review statuses and routing.
