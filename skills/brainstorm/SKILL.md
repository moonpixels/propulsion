---
name: brainstorm
description: Create an approved PRD through repo inspection and interrogation. Use when scope, UX, constraints, or success criteria are unclear, or when user needs a PRD.
---

# Brainstorm

Turn feature, UX, API, product-scope, or requirements work into an approved PRD.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- If user provides an approved `docs/propulsion/.../prd.md`, STOP. Enter the `plan` skill.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Load `interrogate` skill and interview the user about their request.
2. Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` from [references/prd-template.md](references/prd-template.md).
3. Meticulously sanity-check `prd.md` against the conversation and add any missing decisions, facts, constraints, behaviours, or success criteria.
4. Ask the user to review and approve `prd.md`.
5. After explicit approval, enter the `plan` skill.

## Rules

These rules are MANDATORY.

- ALWAYS use `interrogate` skill to reach shared understanding BEFORE writing the PRD.
- ALWAYS use the PRD template for structure and section order.
- MUST keep the PRD product-facing and record durable implementation and testing decisions.
- ENSURE the PRD includes ALL relevant decisions, even if they seem obvious or minor.
- USE supporting documents such as `docs/propulsion/.../diagrams.md` if needed.
- If you cannot write files, STOP, ask the user to enable write mode before continuing the PRD.
- NEVER print the full PRD in the chat, ONLY write it to the file.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Used `interrogate` skill to gather every last detail about the request.
- [ ] Written PRD to `docs/propulsion/.../prd.md`.
- [ ] Compared PRD against conversation and added any missing content.
- [ ] User has explicitly approved `prd.md`.

## Next Steps

Once the completion gate is fully checked:

- If `prd.md` is approved, enter the `plan` skill.

## References

Use these references when you need detail.

- [references/prd-template.md](references/prd-template.md) - PRD shape and output path.
