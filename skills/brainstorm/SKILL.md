---
name: brainstorm
# prettier-ignore
description: Create an approved PRD through repo inspection and interrogation. Use when scope, UX, constraints, or success criteria are unclear, or when user needs a PRD.
---

# Brainstorm

Turn vague feature, UX, API, product-scope, or requirements work into an approved PRD.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If an approved `docs/propulsion/.../prd.md` already exists for this work, STOP. Enter the `plan` skill.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Load `interrogate` skill to close blocking branches and reach shared understanding before PRD writing.
2. If the request is too large, decompose it and explore only the first phase or subsystem.
3. After all blocking branches are closed and brainstorming is complete, check for relevant non-Propulsion skills and load them before writing `prd.md`.
4. Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` using the template in [references/prd-template.md](references/prd-template.md), including resolved decisions and assumptions from `interrogate`.
5. Compare `prd.md` against the conversation for missing decisions, constraints, assumptions, requested behaviours, or success criteria; update `prd.md` before approval if relevant content is missing.
6. Ask the user to review and approve `prd.md` before entering `plan`.

## Rules

These rules are MANDATORY.

- MUST close every blocking branch before writing `prd.md`. Blocking branches include anything that would change scope, UX, architecture, sequencing, or success criteria.
- BEFORE writing `prd.md`, ALWAYS check for relevant non-Propulsion skills and load them IMMEDIATELY.
- Propulsion skills and workflow MUST take precedence over any conflicting non-Propulsion skill UNLESS the user instructions state otherwise.
- MUST keep the PRD product-facing while recording durable implementation and testing decisions.
- ENSURE the PRD includes ALL relevant decisions, even if they seem obvious or minor.
- You CAN create supporting documents such as `docs/propulsion/.../research.md` or `docs/propulsion/.../diagrams.md` if needed, but the PRD must include all durable decisions.
- DO include the supporting documents as implementation inputs in the PRD, but DO NOT rely on them for durable decisions.
- DO NOT print the PRD, or other workflow artefacts in the chat, keep them in files. 
- If you cannot write files, STOP, ask the user to switch to write mode, then continue to write the PRD.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Used `interrogate` skill to reach shared understanding and close every blocking branch.
- [ ] `prd.md` written to `docs/propulsion/.../prd.md`.
- [ ] `prd.md` sanity-checked against the conversation and updated if relevant content was missing.
- [ ] User has explicitly approved `prd.md` after self-review.

## Next Steps

Once the completion gate is fully checked:

- If `prd.md` is approved, enter the `plan` skill.

## References

Use these references when you need detail.

- [references/prd-template.md](references/prd-template.md) - PRD shape and output path.
