---
name: exploration
# prettier-ignore
description: Create an approved PRD through repo inspection and relentless user questioning. Use when scope, UX, constraints, or success criteria are unclear, or when user needs a PRD.
---

# Exploration

Turn vague work into an approved PRD.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- No approved `docs/propulsion/.../prd.md` exists for this work.
- Product intent, scope, UX, constraints, or success criteria are unresolved.
- If this is a bug, failure, or unexpected behavior, STOP. Load `debugging`.
- If an approved `prd.md` already exists, STOP. Load `planning`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Start with a targeted repo scan. Use fresh subagents for code facts.
2. Walk this order: goal -> actors -> inputs -> UX -> boundaries -> constraints -> failure cases -> success criteria -> out of scope.
3. Ask one question per message from [references/questioning-rules.md](references/questioning-rules.md). Each user question MUST use the `question` tool. Give your recommendation first. If code can answer the branch, inspect the repo instead.
4. If the request is too large, decompose it and explore only the first phase or subsystem.
5. Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` from [references/prd-template.md](references/prd-template.md) only after all blocking branches are closed.
6. Ask the user to review the file and approve it before `planning`.

## Rules

These rules are MANDATORY.

- MUST close every blocking branch before writing `prd.md`.
- MUST keep the PRD product-facing while recording durable implementation and testing decisions.
- DO NOT print the PRD, plan, or other workflow artifact content in chat instead of writing files.
- DO NOT start `planning` here.
- If you cannot write files, STOP, ask the user to switch to build mode, and tell them to return to `exploration` so you can write `prd.md`.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Targeted repo scan complete.
- [ ] Blocking branches closed or scope decomposed.
- [ ] `prd.md` written to `docs/propulsion/.../prd.md`.
- [ ] User asked to review and approve `prd.md`.

## Next Skill

Once the completion gate is fully checked:

- If `prd.md` is approved, load `planning`.

## References

Use these references when you need detail.

- [references/questioning-rules.md](references/questioning-rules.md) - Question order and blocking branches.
- [references/prd-template.md](references/prd-template.md) - PRD shape and output path.
