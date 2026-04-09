---
name: planning
# prettier-ignore
description: Create an execution-ready plan from an approved PRD using thin vertical slices and plan-review loops. Use when an approved PRD exists and the next step is to prepare for execution.
---

# Planning

Turn an approved PRD into an execution-ready plan.

## Quick Start

    Approved `prd.md` -> inspect repo -> draft thin slices -> review the plan -> write `plan.md` -> announce `execution`.

## Before This Skill

- An approved `docs/propulsion/.../prd.md` exists.
- Execution would require a slice breakdown.

## Use When

- The PRD is approved.
- The user asks for a plan, phases, or execution-ready slices.
- Execution would require rediscovering scope.

## Core Loop

- Stop if the PRD is missing or unapproved. Route back to `exploration`.
- Re-scan the relevant repo areas before slicing.
- Capture durable decisions first. Keep them stable across all slices.
- Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` from [references/plan-template.md](references/plan-template.md).
- Every `plan.md` must begin with `## For Agentic Coders` exactly as shown in the template.
- Make each checkbox one thin vertical slice. Each slice should be demoable or verifiable on its own.
- Make each slice execution-ready: target behavior, likely files or areas, durable constraints, and targeted verification.
- Use a fresh planning-review subagent with [references/plan-review-format.md](references/plan-review-format.md). If it returns `unclear`, route back to `exploration`, update the PRD, get the PRD approved again, then repair the plan.
- Iterate until the reviewer says `clear`.
- End by telling the user planning is complete and `execution` is next. Do not auto-start execution.

## Subagents

- Use fresh subagents for repo inspection and plan review.
- Review subagents do not invent product intent.

## Hand Off To

- Hand off to `execution` with the PRD path, plan path, and durable decisions.

## Do Not

- Do not plan from an unapproved PRD.
- Do not leave scope gaps for execution to guess through.
- Do not hide slice rules or handoff rules in references.
