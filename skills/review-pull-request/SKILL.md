---
name: review-pull-request
description: Review a pull request through code-review when the user supplies a PR identifier and requests a review.
---

# Review a pull request

Return `$code-review`'s result for the supplied pull request. Keep the workflow **read-only**.

## Inputs

Take a PR URL or number from the request. Use the current repository for a bare number unless the request names another repository.

## Method

1. Resolve host metadata to a unique repository and exact base and head revisions. Make the PR's merge-base-to-head diff and source available for review.
2. Load and invoke [$code-review](../code-review/SKILL.md) for that PR diff, passing any supplied behavioural authority.

## Finish

Return `$code-review`'s result unchanged.

**Done only when** the PR is resolved and `$code-review` has completed. If resolution or review is blocked, return the exact blocker.
