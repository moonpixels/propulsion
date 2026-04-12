---
name: code-review
# prettier-ignore
description: Reviews code changes for senior-level PR feedback with parallel reviewer passes, disprove-first validation, and exact report output. Use when reviewing PR or local changes.
---

# Code Review

Review diffs like a senior engineer. Stay evidence-first. Stay merge-relevant.

## Instructions

1. Resolve review scope and allowed context with [references/mode-selection.md](references/mode-selection.md).
2. Dispatch fresh reviewer subagents in parallel with the prompt in [references/reviewer-prompt.md](references/reviewer-prompt.md). Cover the axes in [references/review-axes.md](references/review-axes.md).
3. Dispatch fresh validator subagents with the prompt in [references/validator-prompt.md](references/validator-prompt.md). Discard anything unconfirmed.
4. Produce the final report exactly as defined in [references/report-format.md](references/report-format.md). Use only `approve`, `approve-with-comments`, `request-changes`, or `needs-clarification`.
5. After the report, for a real PR only, optionally post inline comments with [references/comment-template.md](references/comment-template.md). Default to validated blocking findings only.

## Rules

- ALWAYS use a severity-first model: `critical`, `high`, `medium`, `low`, `nitpick`, `question`.
- ALWAYS report only validated findings or validated missing-context questions with concrete evidence and exact `file:line` refs when code is involved.
- DO keep findings issue-focused. DO NOT add a positive-notes section.
- DO NOT keep style nits, speculative risks, weak evidence, pre-existing issues, or linter-catch comments.
- DO treat blocking recommendations as requiring material production, security, UX, or maintenance risk.
- DO treat blocking findings as the validated `critical` and `high` findings that would materially harm code health or create unacceptable production, security, UX, or maintenance risk if shipped.
- DO NOT post unvalidated findings.

## References

- [references/mode-selection.md](references/mode-selection.md) - Scope parsing and allowed context.
- [references/review-axes.md](references/review-axes.md) - Parallel reviewer-pass contracts.
- [references/reviewer-prompt.md](references/reviewer-prompt.md) - Prompt template for one reviewer pass.
- [references/issue-schema.md](references/issue-schema.md) - Candidate finding and question schema.
- [references/validator-prompt.md](references/validator-prompt.md) - Prompt template for one validator pass.
- [references/validation-rubric.md](references/validation-rubric.md) - Separate disprove-first validator rules.
- [references/report-format.md](references/report-format.md) - Exact final report shape and decision rules.
- [references/comment-template.md](references/comment-template.md) - Post-report inline comment format.
