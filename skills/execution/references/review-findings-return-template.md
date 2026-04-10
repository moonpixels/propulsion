**You are a subagent completing work in the Propulsion workflow.**

Load `review-response`.

Follow only the review-findings path in `skills/review-response/SKILL.md`.

Do not leave `review-response` for another skill unless `skills/review-response/SKILL.md` explicitly routes you there.

Treat the returned review findings as claims to verify in the same implementer subagent session that owns the phase.

Return the exact triage, targeted rerun-check evidence, and updated `Acceptance Criteria Status` output that `skills/review-response/SKILL.md` requires before the main agent dispatches `review` again.
