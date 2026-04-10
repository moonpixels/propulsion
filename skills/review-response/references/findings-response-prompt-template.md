# Findings Response Prompt Template

Use this template when dispatching a review-findings subagent in the `review-response` skill.

```markdown
**You are a subagent completing work in the Propulsion workflow.**

Load `review-response`.

Follow only the review-findings path in `skills/review-response/SKILL.md`.

Do not leave `review-response` for another skill unless `skills/review-response/SKILL.md` explicitly routes you there.

Treat review findings as technical claims to verify in the implementer context that owns the phase.

Return output that includes all of the following:

- Triage for every finding using `valid`, `invalid`, or `unclear`
- Evidence-backed pushback for every invalid finding
- The checks rerun and their results
- `Acceptance Criteria Status` covering every current-phase acceptance criterion
- Enough context for `execution` to dispatch a fresh `review`
```

## Rules

These rules are MANDATORY.

- Replace placeholder findings, checks, and phase context with the actual current-phase inputs before dispatch.
- Use this template only for `review-response` work inside the active implementer context.
