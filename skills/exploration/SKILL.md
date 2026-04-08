---
name: exploration
description: Analyze ambiguous work by inspecting repo context, asking dependency-ordered questions, and pinning down scope before handoff. Use when requests are under-specified or need discovery before planning.
---

# Exploration

Turns vague work into an approved PRD. Inspect only enough to answer factual repo questions, then interview the user relentlessly until the design tree is resolved enough to write `prd.md`.

## Quick Start

```text
Inspect minimal relevant code/docs -> answer only what the repo can answer -> decompose if cross-subsystem -> ask 1 question with a recommendation -> resolve that branch -> repeat until the design tree is resolved -> propose 2-3 approaches -> confirm direction -> write docs/propulsion/{yyyymmdd}-{plan-name}/prd.md -> self-review -> ask user to review or approve -> on approval hand off to planning
```

## Interview Rules

- If a question can be answered by exploring the codebase, explore the codebase instead.
- Inspect only the files, docs, recent commits, and patterns needed to answer factual repo questions.
- Do not infer product intent, UX choices, or scope from code.
- If the request spans multiple subsystems, decompose it into parts and identify the first dependency or decision before deep questioning.
- Ask one question per message. Include a recommended answer every time.
- Interview relentlessly until the design tree is resolved enough to write the PRD.
- Walk the design tree branch-by-branch in order: goal -> actors/inputs -> boundaries -> constraints -> failure cases -> success criteria -> out of scope.
- Prefer sharp multiple-choice questions; use open-ended only when choices would distort the answer.
- Resolve one dependency before moving to the next branch.
- Do not stop with unresolved branches that would change scope, UX, architecture, sequencing, or success criteria.
- If the request is too large, narrow to one approved slice or discovery question, then keep going.

## Direction Setting

- When a real choice exists, surface 2-3 viable directions with tradeoffs.
- Lead with the recommended direction and why.
- Follow one branch at a time until scope, constraints, dependencies, and success criteria are explicit.
- Keep wording terse, direct, and low-context.

## PRD

- Write exactly one file: `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md`.
- Use this section order: `# Title`, `## Problem Statement`, `## Goals`, `## User Stories`, `## Solution`, `## Implementation Decisions`, `## Testing Decisions`, `## Out Of Scope`, `## Risks / Open Questions`.
- Keep it product-facing and reviewable. No file paths, code snippets, or task breakdown.
- Run a self-review pass before handoff: remove placeholders, resolve contradictions, tighten ambiguity, and make scope explicit.
- Subagents may inspect repo context or critique the PRD, but the main agent owns the questions, the PRD, and the approval gate.

## Exit

- Stop before implementation, task breakdown, or file edits.
- After writing `prd.md`, ask the user to review it, request changes, or approve it.
- Only after explicit PRD approval, hand off to `planning` with a compact carry-forward summary: approved direction, scope edges, constraints, rejected options, open risks, and success criteria.
- If new repo evidence changes the next question, inspect again before asking.
