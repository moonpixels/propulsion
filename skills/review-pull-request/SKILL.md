---
name: review-pull-request
description: Reviews a supplied pull request through independent specification and engineering-standards assessment. Use when a pull request needs a read-only independent report.
metadata:
    type: router
disable-model-invocation: true
---

# Review Pull Request

Routes one fixed pull request through `$code-review` and returns its independent findings unchanged.

## Process

Resolve the supplied pull-request identifier against the current repository unless another repository is named. Use native host metadata to fix its repository, number or URL, and exact base and head revisions. Return the exact blocker when the pull request is ambiguous or inaccessible.

Invoke `$code-review` with that fixed pull-request candidate and a read-only boundary. Return its result unchanged.
