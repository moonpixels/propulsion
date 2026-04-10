---
name: debugging
# prettier-ignore
description: Analyze bugs and failures systematically before proposing fixes. Use when a test fails, behavior is unexpected, or the real issue is not yet understood.
---

# Debugging

Find the root cause before anyone changes code.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- A bug, test failure, flaky result, or unexpected behavior exists.
- The root cause is not yet proven.
- If this is new feature work without a failure, STOP. Load `exploration`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Reproduce the issue first with [references/investigation-loop.md](references/investigation-loop.md).
2. Capture fresh evidence and drive the investigation loop with [references/investigation-loop.md](references/investigation-loop.md). Repeat until the root cause is grounded.
3. If the investigation is non-trivial, write `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` with [references/debug.md](references/debug.md).
4. Tell the user debugging is complete, summarize the diagnosis, point to `debug.md` if it exists, and ask whether to move to `planning`.

## Rules

These rules are MANDATORY.

- NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.
- MUST complete the phases in order.
- MUST stop after 3 failed hypotheses or probes and question the architecture with the user.
- Fresh subagents may gather evidence or code facts only.
- DO NOT implement fixes here.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Reproduction and fresh evidence captured.
- [ ] Root cause grounded in evidence.
- [ ] `debug.md` written for non-trivial work, if needed.
- [ ] User asked whether to move to `planning`.

## Next Skill

Once the completion gate is fully checked:

- If the diagnosis is grounded, load `planning`.

## References

Use these references when you need detail.

- [references/investigation-loop.md](references/investigation-loop.md) - Reproduce, gather evidence, compare variants, narrow the surface, and test one hypothesis at a time.
- [references/debug.md](references/debug.md) - Durable `debug.md` guidance and template.
