---
name: execution
# prettier-ignore
description: Execute a current plan by orchestrating fresh subagents one phase at a time. Use when current `plan.md` exists and the user wants implementation to start.
---

# Execution

Execute a current plan one phase at a time.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- Current `plan.md` exists and the user said to proceed.
- The next unchecked phase is concrete enough for a fresh subagent.
- If the plan is missing, stale, or unclear, STOP. Load `planning`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Read the plan. Stop if the next phase is unclear, blocked, or out of order.
2. Work sequentially unless `plan.md` marks phases independent.
3. Dispatch a fresh implementer with [references/subagent-handoff.md](references/subagent-handoff.md). Give the implementer the full phase text and let that subagent decide whether the handed-off work requires `tdd`.
4. After the implementer reports the phase ready, dispatch a fresh reviewer with `review`.
5. If `review` returns `findings`, send those findings back to the same implementer subagent session. That implementer handles `review-response`, reruns targeted verification, and reports back before you dispatch `review` again.
6. Repeat the review loop until `review` returns `clear`.
7. Mark the phase complete in `plan.md` only after `review` returns `clear`, including after any fixes from review findings.
8. After the last phase, infer and run the repo's real final checks before claiming the plan complete.

## Rules

These rules are MANDATORY.

- Main agent orchestrates only and never implements plan work directly.
- Fresh subagents implement or review. They do not update workflow artifacts.
- Review findings go back through the same implementer subagent session for triage, fixes, or pushback before the next fresh review.
- Keep each phase scoped as a thin vertical slice where possible.
- DO NOT skip blocked or unclear phases.
- DO NOT claim completion without final repo-wide checks.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every phase is checked off in `plan.md` only after a `clear` review, including after any review-driven fixes.
- [ ] Final repo-wide checks pass.
- [ ] User receives completion evidence.

## Next Skill

Once the completion gate is fully checked:

- The implementer subagent decides whether to load `tdd` for the handed-off phase.
- After each implemented phase, dispatch a fresh reviewer with `review`.
- If `review` returns findings, return them to the same implementer subagent session and handle `review-response` there before dispatching `review` again.

## References

Use these references when you need detail.

- [references/subagent-handoff.md](references/subagent-handoff.md) - What each implementer must receive.
- [references/phase-completion-checklist.md](references/phase-completion-checklist.md) - Phase and plan completion gate.
