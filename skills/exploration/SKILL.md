---
name: exploration
description: Analyze ambiguous work by inspecting repo context, asking dependency-ordered questions, and pinning down scope before handoff. Use when requests are under-specified or need discovery before planning.
---

# Exploration

Turns vague work into shared understanding. Inspect first, answer what code can answer, then interview the user one question at a time until the design tree is resolved enough to hand off.

## Quick Start

```text
Inspect relevant code/docs/recent commits -> answer from repo first -> decompose if cross-subsystem -> ask 1 question with a recommendation -> resolve that branch -> repeat until shared understanding -> hand off to planning
```

## Core Loop

- Inspect relevant files, docs, recent commits, and nearby patterns first.
- Do not ask what the codebase can answer.
- If the request spans multiple subsystems, decompose it into parts and identify the first dependency or decision before deep questioning.
- Ask one question per message. Include a recommended answer every time.
- Interview relentlessly until the plan is understood well enough to execute.
- Walk the design tree branch-by-branch in order: goal -> users/inputs -> boundaries -> constraints -> failure cases -> success criteria.
- Prefer sharp multiple-choice questions; use open-ended only when choices would distort the answer.
- Resolve one dependency before moving to the next branch.
- If the request is too large, narrow to one approved slice or discovery question, then keep going.

## Direction Setting

- When a real choice exists, surface 2-3 viable directions with tradeoffs.
- Lead with the recommended direction and why.
- Follow one branch at a time until scope, constraints, dependencies, and success criteria are explicit.
- Keep wording terse, direct, and low-context.

## Exit

- Stop before implementation, task breakdown, or file edits.
- Once the design tree is resolved enough and the boundary is approved, hand off to `planning` with a compact carry-forward summary: approved direction, scope edges, constraints, rejected options, open risks, and success criteria.
- If new repo evidence changes the next question, inspect again before asking.
