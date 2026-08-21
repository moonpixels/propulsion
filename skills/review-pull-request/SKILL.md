---
name: review-pull-request
description: Reviews a supplied pull request through independent specification and engineering-standards assessment. Use when the user wants a read-only pull-request report.
disable-model-invocation: true
---

# Review Pull Request

Resolves one pull request and routes its complete change through `$code-review`, then returns the independent findings without changing the pull request or repository.

## Process

### 1. Resolve the pull request

Resolve the supplied pull-request identifier against the current repository unless the user names another repository. Use available native host tooling to inspect its metadata, commits, complete patch and changed files, relevant surrounding code, discussion, existing check evidence, repository guidance, linked specification or work item, and applicable product and technical authorities.

Fix one exact, non-empty pull-request candidate with its repository, number or URL, base and head revisions, complete changed paths, and authorities. Return the exact blocker when the pull request is ambiguous, inaccessible, or incomplete. Do not infer intended behaviour from the implementation, commit messages, or implementation rationale.

### 2. Invoke the independent review

Invoke `$code-review` with the fixed candidate, complete pull-request context, intended-behaviour authorities when available, applicable Standards authorities, existing check evidence, and a read-only boundary. When no implementation-independent behavioural authority exists, let `$code-review` omit Spec and continue Standards.

Treat existing checks as supplied evidence. Leave focused review probes to `$code-review`; do not run a separate review, verification workflow, or full project check suite.

### 3. Return the report

State the pull-request identity and exact reviewed scope, then return `$code-review`'s separate Standards and Spec results, priorities, findings, evidence, limitations, omitted axes, and counts without substantive rewriting or adjudication.

Stop after the report. Do not modify files or branches, publish comments, change pull-request or tracker state, approve, request changes, merge, commit, push, release, or deploy.
