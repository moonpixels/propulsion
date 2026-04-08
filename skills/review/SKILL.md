---
name: review
description: Analyze code, plans, or other high-value artifacts for regressions, weak verification, plan drift, or risky changes. Use when execution work or high-value artifacts must pass review before closure.
---

# Review

Findings-first quality gate for execution and planning.

## Quick Start

```text
Collect contract + artifact + fresh evidence -> review -> report findings by severity -> route them through `review-response` -> re-review until clear
```

## Inputs

- Use `review` after each completed execution task or slice and for explicit review requests.
- For execution work, inputs are the approved task contract, the relevant diff or artifact, and fresh verification evidence.
- If the contract or evidence is missing, that is itself a finding. Do not invent standards.
- Prefer a fresh reviewer subagent when the platform supports it; use inline review only as fallback.

## Review Order

- Start with issues only, ordered: Critical, Important, Minor.
- Prioritize regressions, requirement gaps, plan drift, weak verification, risky behavior, and unnecessary scope.
- For code, inspect behavior changes, regressions, weak tests, and risky implementation choices.
- For plans/docs, inspect decision clarity, phase order, touch-point precision, review quality, and execution readiness.
- For each finding: state impact, cite exact file/section when possible, judge whether it deviates from the source of truth, and say what is missing or wrong.
- When the corrective step is obvious, include it briefly after the finding; do not let remediation overshadow the issue.
- Keep the closing summary to 1-2 lines.

## Loop

- Reviewer returns one status: `clear`, `findings`, or `unclear`.
- `clear` means no unresolved Critical or Important issues.
- `findings` route to `review-response`; accepted fixes return here after re-verification.
- `unclear` means review cannot finish without a narrow question or missing artifact.
- If findings show the artifact needs new scope, missing decisions, or structural redirection, stop the loop and route to `planning` or the user.

## Guardrails

- Review behavior, risk, and evidence; do not spend time on stylistic trivia.
- If there are no findings, say so plainly, then note any residual risk or unverified area in one line.
- If feedback is disputed or unclear, hand off to `review-response`.
