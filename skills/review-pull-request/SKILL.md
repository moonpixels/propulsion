---
name: review-pull-request
description: Reviews someone else's pinned pull request independently with code findings and verification evidence. Use when assessing an external contributor's pull request.
metadata:
    invocation: user
disable-model-invocation: true
---

# Review Pull Request

Coordinates `$code-review`'s tailored **Software Formal Inspection** and `$verify-change`'s **bidirectional verification traceability** against one frozen pull-request revision, then reports the independent findings and verification evidence without changing the contributor's work.

## Process

### 1. Resolve the review target

Inspect the request, repository guidance, available host tooling and authentication, pull-request metadata and discussion, repository state, and relevant product, architecture, context, ADR, specification, ticket, and acceptance authorities. Resolve one exact repository and pull-request identity. Confirm intent when the selected pull request belongs to the user or current author's branch; this skill normally reviews work submitted by someone else rather than duplicating `$implement`'s author-side review.

Identify the intended-behaviour authority without inferring intent from the implementation. When none exists, follow `$code-review`'s Standards-only confirmation rule. The review target, authorship, authorities, and requested report-only or publication outcome are explicit.

### 2. Freeze the complete candidate

Resolve and record the pull request's exact base SHA and head SHA, full patch, commits and revisions, changed paths and complete changed files, relevant current code, discussion, and check evidence. Review the whole pull request rather than its latest commit, comment, or visible excerpt.

Prefer host data or a checkout already representing the pinned candidate. When execution needs another filesystem view, use an isolated disposable worktree or temporary checkout only when its boundary and ownership are explicit. Do not switch, reset, clean, or overwrite the user's working tree. Stop with the exact access or isolation requirement when no safe complete view is available. The candidate is complete, immutable for the review, and safe to inspect.

### 3. Run the independent code review

Invoke `$modular-design` only when the complete candidate presents a material ownership, boundary, contract, dependency, seam, or change-propagation concern that needs focused structural constraints. Supply its result to `$code-review`; modular design owns the structural assessment while code review alone owns any retained review finding. Invoke `$research` only when the assessment depends on a material external-knowledge subject that needs durable evidence and its report can be persisted without altering the contributor candidate. Supply that cited report as evidence rather than letting it decide a finding. When no safe durable-report boundary exists, state the limitation instead of changing contributor work.

Invoke `$code-review` with the frozen base and head SHAs, complete candidate, intended-behaviour and Standards authorities, and a read-only boundary. Require its independent Standards and applicable Spec reviews. Preserve their findings, distinctions, priorities, evidence, ordering, omitted axes, and limitations without merging, suppressing, cross-axis reranking, adjudicating, or remediating them.

Re-read the remote base and head after the review. If either differs from its pinned SHA, retain the result as stale for its original candidate. Pin the new base and head and repeat the complete review only when the user's requested outcome still identifies the same pull request unambiguously; otherwise stop and ask for direction. The current code-review result refers to one explicit candidate.

### 4. Verify the same candidate

Invoke `$verify-change` on exactly the base and head SHAs reviewed in step 3. Supply the intended-behaviour and repository authorities, material risks exposed by the complete change, relevant existing CI evidence, and the isolated execution boundary. Let it select and appraise applicable existing required and risk-triggered harnesses and return claim-level evidence, exact commands or procedures, limitations, residual risk, and its verification-specific verdict.

Use existing CI evidence only when its provenance ties it to the pinned head and its execution boundary and result are inspectable. When local verification cannot run safely or the repository lacks faithful infrastructure, retain the exact `not run`, partial, or unverified evidence; do not install tools, add tests or ad hoc harnesses, alter source, tests, snapshots, baselines, suppressions, dependencies, or checks, or treat static inspection as execution. Passing checks do not erase a code-review finding, and verification never certifies the pull request.

Re-read the remote base and head after verification. If either differs from its pinned SHA, preserve both results as stale for their original candidate and repeat steps 2–4 on the newly pinned candidate only while the requested outcome remains clear. Stop with the stale results and exact blocker when repeated drift prevents one stable current assessment. The completed review and verification evidence refer to identical current base and head SHAs or are explicitly stale.

### 5. Report the assessment

Report:

- the repository, pull request, frozen base and head SHAs, full-change scope, and any drift;
- the intended-behaviour authority or confirmed Standards-only basis, plus applicable repository and technical authorities;
- the independent Standards and Spec findings in their returned sections and order, including `No findings.` only for a genuinely current completed axis;
- the verification verdict and claim-level evidence, exact commands or procedures, execution boundaries, and material results;
- existing pull-request check evidence whose provenance was accepted;
- every omitted, unsafe, unavailable, unperformed, or stale review or verification axis; and
- limitations, residual risks, and a concise finding-count and evidence summary.

Do not add an approval, request-changes, merge, or other disposition merely from green checks or the absence of findings. Provide a disposition only when the user's requested outcome includes it and the complete current evidence supports it.

### 6. Publish only an included outcome

Stop after the chat report by default. Do not publish comments, approve, request changes, merge, close, edit pull-request metadata, change tracker state, modify the contributor branch, commit, push, release, or deploy.

When the invocation explicitly includes publishing review feedback or a host review state, present the exact supported comments and disposition for confirmation as part of resolving that outcome. After agreement, publish only that content through the repository's native host tooling without another application gate, then read back the comments and review state. Never publish an unsupported conclusion or merge, fix, or otherwise advance the pull request.
