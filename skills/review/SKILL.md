---
name: review
description: Review PRs and ref ranges with senior-level findings, validation, and exact reports. Use when reviewing PRs or base...head changes.
---

# Review

Review a PR or ref range like a senior engineer and return a validated report.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- If review scope is unclear, STOP. Ask for a PR number, PR URL, or `base...head` ref range.
- GitHub CLI `gh` is installed and authenticated when reviewing a PR number or PR URL.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Resolve review scope and allowed context with [references/mode-selection.md](references/mode-selection.md). Stop and ask for a PR number, PR URL, or `base...head` when scope is unclear.
2. Dispatch fresh reviewer subagents in parallel with [references/reviewer-prompt.md](references/reviewer-prompt.md). Cover the axes in [references/review-axes.md](references/review-axes.md).
3. Dispatch fresh validator subagents with [references/validator-prompt.md](references/validator-prompt.md). Discard anything unconfirmed.
4. Produce the final report exactly as defined in [references/report-format.md](references/report-format.md). Use only `approve`, `approve-with-comments`, `request-changes`, or `needs-clarification`.

## Rules

These rules are MANDATORY.

- MUST accept only `#<pr-number>`, PR URLs, or `base...head`.
- MUST require installed and authenticated `gh` only for PR review scopes.
- ALWAYS validate both refs before reviewing `base...head`; do not guess missing refs.
- ALWAYS use merge-base diff semantics for `base...head`.
- ALWAYS use a severity-first model: `critical`, `high`, `medium`, `low`, `nitpick`, `question`.
- ALWAYS report only validated findings or validated missing-context questions with concrete evidence and exact `file:line` refs when code is involved.
- DO keep findings issue-focused. DO NOT add a positive-notes section.
- DO NOT keep style nits, speculative risks, weak evidence, pre-existing issues, or linter-catch comments.
- DO treat blocking findings as validated `critical` and `high` findings that would materially harm production, security, UX, or maintenance if shipped.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Scope was resolved as a PR number, PR URL, or `base...head`.
- [ ] PR scopes used GitHub PR metadata, or range scopes validated both refs and reviewed the merge-base diff.
- [ ] Reviewer and validator passes completed before the final report.
- [ ] Final response matches [references/report-format.md](references/report-format.md).

## References

Use these references when you need detail.

- [references/mode-selection.md](references/mode-selection.md) - Scope parsing, validation, and allowed context.
- [references/review-axes.md](references/review-axes.md) - Parallel reviewer-pass contracts.
- [references/reviewer-prompt.md](references/reviewer-prompt.md) - Prompt template for one reviewer pass.
- [references/issue-schema.md](references/issue-schema.md) - Candidate finding and question schema.
- [references/validator-prompt.md](references/validator-prompt.md) - Prompt template for one validator pass.
- [references/validation-rubric.md](references/validation-rubric.md) - Disprove-first validation rules.
- [references/report-format.md](references/report-format.md) - Exact final report shape and decision rules.
