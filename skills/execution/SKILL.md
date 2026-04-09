---
name: execution
# prettier-ignore
description: Execute a current plan by orchestrating fresh subagents one thin slice at a time. Use when `plan.md` exists and implementation should start.
---

# Execution

Execute a current plan one thin slice at a time.

## Quick Start

    Read `plan.md` -> dispatch fresh implementer for first unchecked slice -> verify -> review -> update plan -> continue.

## Before This Skill

- An approved PRD exists.
- `plan.md` exists and is current.
- The next step is implementation.

## Use When

- The user wants to build from a written plan.
- Each checkbox is concrete enough for a fresh subagent.

## Core Loop

- Read the plan. Stop if a slice is unclear, blocked, or out of order.
- Work sequentially unless the plan explicitly marks slices independent.
- Dispatch a fresh implementer with [references/subagent-handoff.md](references/subagent-handoff.md).
- The implementer uses `tdd` for public behavior changes. Skip it only for pure docs, config, or non-behavioral maintenance.
- Require targeted verification from [references/slice-completion-checklist.md](references/slice-completion-checklist.md) before review.
- Dispatch a fresh reviewer using `review`. If it returns findings, send them to `review-response`, then review again.
- Mark the slice complete in `plan.md` only after verification and a clear review.
- Stop on blockers. Surface the blocker instead of skipping ahead.
- After all slices complete, run `bun run checks` before claiming the plan done.

## Subagents

- Main agent orchestrates only. Subagents implement or review. They do not update workflow artifacts.
- Use fresh context for each implementer and each review pass.

## Hand Off To

- Implementers use `tdd` inside behavioral slices. The main agent sends completed slices to `review` and `review-response` as needed.
- After the last slice and `bun run checks`, hand off to the user with evidence.

## Do Not

- Do not implement from an unapproved or stale plan.
- Do not run multiple implementation subagents in parallel by default.
- Do not move to the next slice with open review issues.
