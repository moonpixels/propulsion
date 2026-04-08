---
name: planning
description: Create one execution-ready implementation doc for approved work. Use when exploration is complete and direction is approved.
---

# Planning

Turns approved direction into one execution doc. Do not use for unclear requests; `exploration` owns discovery.

## Quick Start

```text
Confirm approved direction from exploration -> inspect only files needed to lock design -> write docs/propulsion/{yyyymmdd}-{plan-name}.md -> review it -> get approval -> stop
```

## Start Conditions

- Enter only after `exploration` or the user has already fixed scope, constraints, and success criteria.
- Pull forward discovery facts and approved decisions explicitly; do not re-derive them.
- If direction is still fuzzy, stop and hand back to `exploration`.

## Plan File

- Write exactly one document: `docs/propulsion/{yyyymmdd}-{plan-name}.md`.
- Keep the single-document model. If scope crosses multiple subsystems or is unsafe to drive from one reviewable doc, stop and route back to `exploration` to split it first.
- Write for an execution agent with near-zero context: concise, exact, no filler.
- Use this fixed section order: `# Title`, `## Discovery Context`, `## Decisions`, `## Architecture`, `## Repo Touch Points`, `## Execution Phases`, `## Verification`, `## Review Points`.

## Required Contents

- Discovery context: problem, constraints, approved direction, rejected options, non-blocking assumptions only.
- Architecture: hide complexity behind small stable testable interfaces; cover data flow, dependencies, migrations, rollout notes.
- Exact repo touch points: files/modules to create or change, with why each one exists.
- Execution phases: ordered delivery slices, with phased rollout when work is too large for one safe pass.
- Verification: tests, prior-art tests/checks to extend or mirror, lint, builds, manual checks, and required evidence.
- Review points: checkpoints where an execution agent should pause for review before risky or irreversible work.
- No placeholders: ban `TBD`, `etc.`, `as needed`, `follow existing patterns`, or similar gaps.
- If any assumption would change scope, design, or sequencing, stop and route back to `exploration`.

## Review And Handoff

- Run a critique pass on the written doc before handoff. If subagents are available, use one; otherwise self-review.
- Check: section order complete, decisions match approved direction, touch points/phases are exact, assumptions are non-blocking, verification/review points are concrete.
- Fold fixes into the same document, then hand off.
- Require explicit approval before any implementation starts.

## Guardrails

- No implementation, no code edits, no commits.
- Prefer phased delivery over one large batch when scope, risk, or review load is high.
- Scale detail to scope; do not fill sections ceremonially when a small change needs only brief exact notes.
- Keep wording sharp, low-context, and execution-oriented.
