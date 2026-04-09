---
name: debugging
# prettier-ignore
description: Analyze bugs and failures systematically before proposing fixes. Use when a test fails, behavior is unexpected, or the real issue is not yet understood.
---

# Debugging

Find the root cause before anyone changes code.

## Quick Start

    Reproduce -> gather evidence -> compare broken vs working -> test one hypothesis -> diagnose -> hand off fix.

## Before This Skill

- A bug, test failure, flaky result, or unexpected behavior exists.
- The root cause is not yet proven.

## Use When

- A user or agent reports a failure.
- A proposed fix would still be guesswork.

## Core Loop

- Reproduce the issue first. Use [references/reproduction.md](references/reproduction.md).
- Capture fresh evidence before proposing fixes. Use [references/evidence-capture.md](references/evidence-capture.md).
- If a working example exists, compare broken vs working with [references/compare-working-vs-broken.md](references/compare-working-vs-broken.md).
- Narrow the surface before changing code. Use [references/narrow-the-surface.md](references/narrow-the-surface.md).
- Form one hypothesis at a time and test it with [references/hypothesis-testing.md](references/hypothesis-testing.md).
- Do not propose fixes until the root cause is grounded in evidence.
- If the investigation is non-trivial, write `docs/propulsion/{yyyymmdd}-{issue-name}/debug.md` from [references/debug-note-template.md](references/debug-note-template.md). Add `-2`, `-3`, and so on on collisions.
- After 3 failed hypothesis or probe attempts, stop and question the architecture with the user.
- Once the root cause and fix direction are clear, hand off to `execution` if a current plan exists. Otherwise route to `exploration`, then `planning`, then `execution`.

## Subagents

- Use fresh subagents to gather evidence, compare variants, or inspect likely code paths without polluting the main context.

## Hand Off To

- Hand off grounded diagnosis and fix direction to `execution` if a current plan exists.
- Otherwise hand off to `exploration` so the bug fix gets a PRD and plan first.

## Do Not

- Do not stack guesses.
- Do not patch symptoms first.
- Do not claim the issue is fixed without fresh verification.
