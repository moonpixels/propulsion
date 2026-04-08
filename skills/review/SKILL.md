---
name: review
description: Reviews code, plans, and artifacts for regressions, drift, and weak verification. Use when completed work or high-value artifacts need a findings-first quality gate.
---

# Review

Findings first. Review behavior, risk, and evidence.

## Quick Start

```text
collect contract + artifact + fresh evidence -> review -> report findings by severity -> route valid fixes through `review-response` -> re-review until clear
```

## Use When

- After a completed execution task or slice.
- For explicit review requests.
- For plans or other high-value artifacts before closure.

## Core Loop

- Inputs are the source of truth, the artifact or diff, and fresh evidence. If contract or evidence is missing, that is a finding.
- Prefer a fresh reviewer subagent when the platform supports it.
- Review for regressions, requirement gaps, plan drift, weak verification, risky behavior, and unnecessary scope.
- For code, inspect behavior changes, regressions, weak tests, and risky implementation choices.
- For plans or docs, inspect decision clarity, sequence, touch-point precision, and execution readiness.
- Report findings only, ordered: Critical, Important, Minor.
- For each finding: state impact, cite exact file or section when possible, say how it deviates from the source of truth, and add the shortest obvious fix if it is clear.
- Return one status: `clear`, `findings`, or `unclear`.
- `findings` route to `review-response` and return here after re-verification. `unclear` means ask one narrow question or request the missing artifact.

## Guardrails

- Review behavior, risk, and evidence; do not spend time on stylistic trivia.
- If there are no findings, say so plainly, then note any residual risk or unverified area in one line.
- If the artifact needs new scope, missing decisions, or structural redirection, stop and route to `planning` or the user.

## Exit

- `clear` means no unresolved Critical or Important issues.
- Keep the close to 1-2 lines.
