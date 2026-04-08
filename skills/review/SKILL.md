---
name: review
description: Analyze code, plans, or other high-value artifacts for regressions, weak verification, plan drift, or risky changes. Use when a concise quality gate is needed.
---

# Review

Reusable critique loop for implementation and planning. Findings first. Short summary only.

## Quick Start

```text
Collect source of truth + artifact + verification evidence -> review -> report only findings by severity -> fix -> re-review until clear
```

## Inputs

- Review against the artifact's contract: approved plan, task, diff, doc, or stated requirements.
- If the contract is missing, incomplete, or unapproved, stop. Ask for the source of truth or route back to `planning`/the user; do not invent standards.
- Pull in fresh verification evidence when available; missing evidence is itself a finding.
- Prefer subagent review when the platform supports it.

## Review Order

- Start with issues only, ordered: Critical, Important, Minor.
- Prioritize regressions, missing verification, plan drift, risky behavior, and requirement gaps.
- For code, inspect behavior changes, regressions, weak tests, and risky implementation choices.
- For plans/docs, inspect decision clarity, phase order, touch-point precision, review/verification quality, and whether the artifact is execution-ready.
- For each finding: state impact, cite exact file/section when possible, judge whether it deviates from the source of truth, and say what is missing or wrong.
- When the corrective step is obvious, include it briefly after the finding; do not let remediation overshadow the issue.
- Keep the closing summary to 1-2 lines.

## Loop

- Use review repeatedly, not only at the end: after meaningful implementation slices and after drafting high-value written artifacts.
- Default pattern: implement or draft -> review -> fix -> re-review.
- If findings show the artifact needs new scope, missing decisions, or structural redirection, stop the critique loop and route to `planning` or the user for replanning.
- Do not wave through work with unresolved Critical or Important findings.

## Guardrails

- Review behavior, risk, and evidence; do not spend time on stylistic trivia.
- If there are no findings, say so plainly, then note any residual risk or unverified area in one line.
- If feedback is disputed or unclear, hand off to `review-response`.
