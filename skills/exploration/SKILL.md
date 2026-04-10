---
name: exploration
# prettier-ignore
description: Create an approved PRD through repo inspection and relentless user questioning. Use when scope, UX, constraints, or success criteria are unclear, or when user needs a PRD.
---

# Exploration

Turn vague work into an approved PRD.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If an approved `docs/propulsion/.../prd.md` already exists for this work, STOP. Load `planning`.
- If this is a bug, failure, or unexpected behaviour, STOP. Load `debugging`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Start with a targeted exploration of the codebase using fresh explore subagents for code facts.
2. Walk down each branch of the decision tree, interviewing the user relentlessly until every branch is closed, and you have a shared understanding of the work.
3. Ask each question using the `question` tool, one at a time, and provide your recommended answer first.
4. If a question can be answered by inspecting the codebase, do that instead of asking the user. 
5. If the request is too large, decompose it and explore only the first phase or subsystem.
6. After all blocking branches are closed, write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` using the template in [references/prd-template.md](references/prd-template.md).
7. Ask the user to review and approve `prd.md` before loading `planning`.

## Rules

These rules are MANDATORY.

- MUST close every blocking branch before writing `prd.md`. Blocking branches include anything that would change scope, UX, architecture, sequencing, or success criteria.
- MUST keep the PRD product-facing while recording durable implementation and testing decisions.
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

- If `prd.md` is approved, load `planning`.

## References

Use these references when you need detail.

- [references/prd-template.md](references/prd-template.md) - PRD shape and output path.
