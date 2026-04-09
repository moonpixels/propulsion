---
name: execution
# prettier-ignore
description: Execute a current plan by orchestrating fresh subagents one thin slice at a time. Use when current `plan.md` exists and the user wants implementation to start.
---

# Execution

Execute a current plan one thin slice at a time.

## Quick Start

    Load `execution` -> read `plan.md` -> dispatch first slice -> review -> update `plan.md` -> repeat.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- Current `plan.md` exists and the user said to proceed.
- The next unchecked slice is concrete enough for a fresh subagent.
- If the plan is missing, stale, or unclear, STOP. Load `planning`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Read the plan. Stop if the next slice is unclear, blocked, or out of order.
2. Work sequentially unless `plan.md` marks slices independent.
3. Dispatch a fresh implementer with [references/subagent-handoff.md](references/subagent-handoff.md). Require `tdd` for public behavior changes.
4. Dispatch a fresh reviewer with `review`. If it returns `findings`, load `review-response`, then `review` again until it returns `clear`.
5. Mark the slice complete in `plan.md` only after `review` returns `clear`.
6. After the last slice, infer and run the repo's real final checks before claiming the plan complete.

## Rules

These rules are MANDATORY.

- Main agent orchestrates only.
- Fresh subagents implement or review. They do not update workflow artifacts.
- DO NOT skip blocked or unclear slices.
- DO NOT claim completion without final repo-wide checks.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every slice is checked off in `plan.md`.
- [ ] Final repo-wide checks pass.
- [ ] User receives completion evidence.

## Next Skill

Once the completion gate is fully checked:

- For behavior changes inside a slice, load `tdd`.
- After each implemented slice, load `review`.
- If `review` returns findings, load `review-response`.

## References

Use these references when you need detail.

- [references/subagent-handoff.md](references/subagent-handoff.md) - What each implementer must receive.
- [references/slice-completion-checklist.md](references/slice-completion-checklist.md) - Slice and plan completion gate.
