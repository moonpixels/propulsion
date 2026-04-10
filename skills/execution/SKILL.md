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
3. Dispatch a fresh implementer with [references/subagent-handoff.md](references/subagent-handoff.md). The implementer prompt must explicitly say `You are a subagent.` Give the implementer the full phase text, require an `Acceptance Criteria Status` report for the current phase, and let that subagent decide whether the handed-off work requires `tdd`.
4. After the implementer reports the phase ready, dispatch a fresh reviewer. The reviewer prompt must explicitly say `You are a subagent.` and tell the reviewer to load the `review` skill and return an `Acceptance Criteria Status` report for the current phase.
5. If `review` returns `findings`, send those findings back to the same implementer subagent session. That feedback must explicitly say `You are a subagent.` and tell the implementer to load the `review-response` skill, rerun targeted verification, return an updated `Acceptance Criteria Status` report, and report back before you dispatch `review` again.
6. Repeat the review loop until `review` returns `clear`.
7. Check off the phase acceptance criteria in `plan.md` only after the implementer and reviewer evidence supports them, then mark the phase complete in `plan.md` only after `review` returns `clear`, including after any fixes from review findings.
8. After the last phase, infer and run the repo's real final checks before claiming the plan complete.

## Rules

These rules are MANDATORY.

- Main agent orchestrates only and never implements plan work directly.
- Fresh subagents implement or review. They do not update workflow artifacts.
- The main orchestrator owns `plan.md` checkboxes and checks off acceptance criteria only when implementer and reviewer evidence supports them.
- Review findings go back through the same implementer subagent session for triage, fixes, or pushback before the next fresh review.
- Keep each phase scoped as a thin vertical slice where possible.
- DO NOT skip blocked or unclear phases.
- DO NOT claim completion without final repo-wide checks.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every phase acceptance criterion is checked off in `plan.md` only by the main orchestrator and only after implementer and reviewer evidence supports it.
- [ ] Every phase is checked off in `plan.md` only after a `clear` review, including after any review-driven fixes.
- [ ] Final repo-wide checks pass.
- [ ] User receives completion evidence.

## Next Skill

Once the completion gate is fully checked:

- The implementer subagent decides whether to load `tdd` for the handed-off phase.
- After each implemented phase, dispatch a fresh reviewer with a prompt that says `You are a subagent.` and tells the reviewer to load `review`.
- If `review` returns findings, return them to the same implementer subagent session with a prompt that says `You are a subagent.` and tells the implementer to load `review-response` before dispatching `review` again.

## References

Use these references when you need detail.

- [references/subagent-handoff.md](references/subagent-handoff.md) - What each implementer must receive.
- [references/phase-completion-checklist.md](references/phase-completion-checklist.md) - Phase and plan completion gate.
