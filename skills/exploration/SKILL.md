---
name: exploration
# prettier-ignore
description: Create an approved PRD through repo inspection and relentless user questioning. Use when scope, UX, constraints, or success criteria are unclear, or when user needs a PRD.
---

# Exploration

Turn vague work into an approved PRD.

## Quick Start

    User asks for a feature -> inspect repo -> ask one question with a recommendation -> write `prd.md` -> ask for approval.

## Before This Skill

- No approved PRD exists.
- Product intent, scope, UX, constraints, or success criteria are unresolved.

## Use When

- The request is vague, cross-cutting, or likely to change shape during planning.
- Planning would require guessing.
- The user asks for a PRD, feature discovery, or design questioning.

## Core Loop

- Start with an aggressive targeted repo scan. Use subagents when code can answer the next branch faster than the user can.
- Ask one question at a time from [references/questioning-rules.md](references/questioning-rules.md). Give your recommendation first.
- Resolve branches in order: goal, actors, inputs, boundaries, constraints, failure cases, success criteria, out of scope.
- If the work is too large, decompose it and explore the first slice only.
- Do not leave blocking branches open. Resolve anything that would change scope, UX, architecture, sequencing, or success criteria.
- Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` from [references/prd-template.md](references/prd-template.md). Add `-2`, `-3`, and so on on collisions.
- Keep the PRD product-facing, but record durable implementation and testing decisions. Do not print the full PRD in chat.
- If asked to plan without an approved PRD, route back to `exploration` and tell the user to switch to build mode so you can write the PRD first.

## Subagents

- Use fresh explore subagents for repo inspection only. They gather code facts. They do not decide product intent.

## Hand Off To

- Ask the user to review `prd.md`.
- Move to `planning` only after explicit PRD approval.

## Do Not

- Do not infer product intent from code.
- Do not start planning or implementation here.
- Do not hide approval gates in references.
