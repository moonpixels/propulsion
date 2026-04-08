---
name: exploration
description: Turns vague work into an approved PRD by inspecting the repo and interviewing for missing decisions. Use when requests are under-specified or planning would require guessing.
---

# Exploration

Turn vague work into an approved PRD. Inspect only enough repo context to ask better questions.

## Quick Start

```text
check minimal repo facts -> ask 1 question with a recommendation -> resolve that branch -> repeat until scope is explicit -> present 2-3 directions if needed -> write prd.md -> self-review -> ask for approval
```

## Use When

- Request is vague, cross-cutting, or missing scope.
- Planning would require guessing.
- The user needs discovery before implementation.

## Core Loop

- Answer repo facts from code. Ask the user only for product intent, UX, scope, and constraints.
- Ask one question per message. Include a recommended answer.
- Walk the design tree in order: goal -> actors and inputs -> boundaries -> constraints -> failure cases -> success criteria -> out of scope.
- Resolve one dependency before moving on.
- Prefer sharp multiple-choice questions. Use open-ended only when choices would bias the answer.
- If the work spans subsystems, decompose it and question the first dependency first.
- If the request is too large, narrow to one approved slice or discovery question and keep going.
- When a real choice exists, present 2-3 viable directions, lead with the recommendation, then continue the interview.

## Guardrails

- Do not infer product intent from code.
- Do not stop with unresolved branches that would change scope, UX, architecture, sequencing, or success criteria.
- Keep wording terse, direct, and low-context.

## PRD

- Write exactly one file: `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md`.
- Use this section order: `# Title`, `## Problem Statement`, `## Goals`, `## User Stories`, `## Solution`, `## Implementation Decisions`, `## Testing Decisions`, `## Out Of Scope`, `## Risks / Open Questions`.
- Keep it product-facing. No file paths, code snippets, or task breakdown.
- Self-review: remove placeholders, resolve contradictions, and make scope explicit.

## Exit

- Stop before implementation or plan breakdown.
- Ask the user to review `prd.md`, request changes, or approve it.
- Only approved PRDs hand off to `planning`, with a compact summary of scope, constraints, rejected options, risks, and success criteria.
