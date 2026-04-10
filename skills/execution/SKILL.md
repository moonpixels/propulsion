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
3. Dispatch a fresh implementer with [references/implementer-prompt-template.md](references/implementer-prompt-template.md). Give the implementer the full phase text, require an `Acceptance Criteria Status` report for the current phase, and include the supporting handoff context from [references/subagent-handoff.md](references/subagent-handoff.md).
4. After the implementer reports the phase ready, dispatch a fresh reviewer with [references/review-dispatch-template.md](references/review-dispatch-template.md). The review dispatch must keep the review loop with the main agent, tell the subagent to load `review`, require fresh review findings, an `unclear` result, or a clear result for the current phase, and require an `Acceptance Criteria Status` report for the current phase.
5. If `review` returns findings, send those findings back to the same implementer subagent session with [references/review-findings-return-template.md](references/review-findings-return-template.md). That findings-return prompt must tell the implementer to load `review-response`, verify each finding in the implementer context, rerun targeted verification, return an updated `Acceptance Criteria Status` report for the current phase, and report back before you dispatch `review` again.
6. Repeat the review loop until `review` returns `clear`.
7. Check off the phase acceptance criteria in `plan.md` only after the implementer and reviewer evidence supports them, then mark the phase complete in `plan.md` only after `review` returns `clear`, including after any fixes from review findings.
8. After the last phase, infer and run the repo's real final checks before claiming the plan complete.

## Rules

These rules are MANDATORY.

- Main agent orchestrates only and never implements plan work directly.
- Fresh subagents implement or review. They do not update workflow artifacts.
- The main orchestrator owns `plan.md` checkboxes and checks off acceptance criteria only when implementer and reviewer evidence supports them.
- The implementer prompt must start with `**You are a subagent completing work in the Propulsion workflow.**` and explicitly route the subagent to load `tdd` when the handed-off work changes public behavior.
- For non-behavioral implementation work, the implementer prompt must explicitly tell the subagent to stay in the handed-off implementer prompt and not load another Propulsion skill unless later routed to `review-response`.
- The implementer must ask questions before guessing when requirements or repo state are unclear.
- The implementer must escalate blockers instead of guessing.
- The implementer must verify the work with targeted checks before reporting back.
- The implementer must self-review before reporting back.
- The implementer report must include status, what changed, checks run, files changed, self-review findings, and `Acceptance Criteria Status` for every current-phase acceptance criterion.
- Review findings go back through the same implementer subagent session for triage, fixes, or pushback before the next fresh review.
- Review dispatch stays with the main agent unless the implementer is later routed to `review-response`.
- The reviewer dispatch must use the standardized review template and keep the reviewer output explicit: `clear`, `findings`, or `unclear`, supporting evidence, and `Acceptance Criteria Status` for every current-phase acceptance criterion.
- The findings-return prompt must use the standardized review-response template and keep the same implementer subagent session responsible for triage, fixes, targeted reruns, and the updated `Acceptance Criteria Status` report.
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

- The implementer prompt routes the subagent to load `tdd` only when the handed-off phase changes public behavior.
- After each implemented phase, dispatch a fresh reviewer with [references/review-dispatch-template.md](references/review-dispatch-template.md), which starts with `**You are a subagent completing work in the Propulsion workflow.**` and tells the reviewer to load `review`.
- If `review` returns findings, return them to the same implementer subagent session with [references/review-findings-return-template.md](references/review-findings-return-template.md), which starts with `**You are a subagent completing work in the Propulsion workflow.**` and tells the implementer to load `review-response` before dispatching `review` again.

## References

Use these references when you need detail.

- [references/subagent-handoff.md](references/subagent-handoff.md) - What each implementer must receive.
- [references/implementer-prompt-template.md](references/implementer-prompt-template.md) - Standardized implementer dispatch template.
- [references/review-dispatch-template.md](references/review-dispatch-template.md) - Standardized reviewer dispatch template.
- [references/review-findings-return-template.md](references/review-findings-return-template.md) - Standardized implementer findings-return template.
- [references/phase-completion-checklist.md](references/phase-completion-checklist.md) - Phase and plan completion gate reference.
