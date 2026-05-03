---
name: exploration
# prettier-ignore
description: Create an approved PRD through repo inspection and relentless user questioning. Use when scope, UX, constraints, or success criteria are unclear, or when user needs a PRD.
---

# Exploration

Turn vague feature, UX, API, product-scope, or requirements work into an approved PRD.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If an approved `docs/propulsion/.../prd.md` already exists for this work, STOP. Enter the `planning` skill.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Start with a targeted exploration of the codebase using fresh subagents for code facts.
2. Walk down each branch of the decision tree, interviewing the user relentlessly until every branch is closed, and you have a shared understanding of the work.
3. Ask one structured question at a time. Provide your recommendation first, then 2-3 viable approaches for the user to choose from.
4. If a question can be answered by inspecting the codebase, do that instead of asking the user.
5. If the request is too large, decompose it and explore only the first phase or subsystem.
6. After all blocking branches are closed and exploration is complete, check for relevant non-Propulsion skills and load them before writing `prd.md`.
7. Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` using the template in [references/prd-template.md](references/prd-template.md).
8. Ask the user to review and approve `prd.md` before entering `planning`.

## Rules

These rules are MANDATORY.

- ALWAYS interview the user RELENTLESSLY to close branches, ask as many questions as it takes to get a shared understanding.
- MUST close every blocking branch before writing `prd.md`. Blocking branches include anything that would change scope, UX, architecture, sequencing, or success criteria.
- BEFORE writing `prd.md`, ALWAYS check for relevant non-Propulsion skills and load them IMMEDIATELY.
- Propulsion skills and workflow MUST take precedence over any conflicting non-Propulsion skill UNLESS the user instructions state otherwise.
- MUST keep the PRD product-facing while recording durable implementation and testing decisions.
- ENSURE the PRD includes ALL relevant decisions, even if they seem obvious or minor.
- You CAN create supporting documents such as `docs/propulsion/.../research.md` or `docs/propulsion/.../diagrams.md` if needed, but the PRD must include all durable decisions.
- DO include the supporting documents as implementation inputs in the PRD, but DO NOT rely on them for durable decisions.
- DO NOT print the PRD, plan, or other workflow artefact content in chat instead of writing files.
- DO NOT start `planning` here.
- If you cannot write files, STOP, ask the user to switch to build mode, and tell them to return to `exploration` so you can write `prd.md`.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Targeted exploration of the codebase is complete.
- [ ] Blocking decision tree branches are closed.
- [ ] `prd.md` written to `docs/propulsion/.../prd.md`.
- [ ] User asked to review and approve `prd.md`.

## Next Skill

Once the completion gate is fully checked:

- If `prd.md` is approved, enter the `planning` skill.

## References

Use these references when you need detail.

- [references/prd-template.md](references/prd-template.md) - PRD shape and output path.
