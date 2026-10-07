---
name: review-pull-request
description: Resolve a supplied pull request to fixed revisions and return an independent read-only code review.
---

# Review a pull request

Review one **fixed pull-request candidate** through `$code-review`.

## Inputs

Use the supplied identifier and current repository unless the request names another repository. Resolve host metadata to a unique repository, URL or number, and exact base and head revisions. Report the blocker when the pull request is ambiguous or inaccessible.

## Method

1. Capture the fixed candidate and available behavioural authorities from the request, linked specification, ticket, or project contracts.
2. Invoke [$code-review](../code-review/SKILL.md) with that candidate, its authorities and a read-only boundary. Read the returned report file and check its candidate identity, assessment status and coverage.
3. Recheck host revisions before handoff. If the pull request moved, identify the result as stale and report the reviewed and current revisions without silently retargeting it.

## Finish

Return the report path, pull-request identity, assessment status and any revision drift. Preserve the report's findings. Stop before repairing the branch, publishing comments, or changing pull-request state unless the user separately requests that action.

**Done only when** the report has been read and checked against the resolved pull-request candidate, and host revisions have been rechecked. Report an inaccessible candidate or failed freshness check as an exact blocker.
