---
name: code-review
description: Reviews a fixed code change through isolated specification and engineering-standards agents. Use for direct diff review or when another delivery skill invokes independent review.
disable-model-invocation: true
---

# Code Review

Independently diagnoses one fixed code change against intended behaviour and engineering standards, returning falsifiable suggestions for its caller to adjudicate.

## Process

### 1. Fix the candidate and authorities

Use the caller's pinned candidate when supplied; otherwise resolve one exact non-empty diff, revision range, branch comparison, pull-request revision, repair, or local candidate. Capture its patch, changed and in-scope untracked paths, complete changed files, relevant source and tests, repository state, and exact revision identifiers where available. Ask when the target is materially ambiguous. Return the exact blocker when it is empty or cannot be fixed.

Resolve intended behaviour from an implementation-independent authority such as a specification, ticket, acceptance criteria, confirmed request, contract, or another project source. When none is reasonably available, omit Spec and continue Standards without inferring intent from code, commits, or implementation rationale.

Resolve applicable repository instructions, conventions, architecture decisions, configured checks, affected contracts and consumers, and supplied quality evidence. The review basis is explicit and sufficient to understand every changed line in context.

### 2. Prepare isolated review packets

Give both applicable packets the fixed candidate, complete changed files and necessary surrounding source, their own authorities and criteria, the consequence ranking and finding format below, and a read-only boundary.

Direct the Spec reviewer to account for every applicable requirement in code and retained tests, account for every introduced behaviour against authority, and follow affected contracts, states, data shapes, errors, effects, and consumers far enough to find missing, partial, conflicting, excessive, or regressed behaviour. Trace distinct success, failure, retry, and concurrent paths when the authority distinguishes them. When an external effect precedes durable state or acknowledgement, trace failure after the effect and before that record or response, including what a retry repeats. Report separate suggestions when a different triggering state, violated requirement, consequence, or narrow corrective outcome survives review, even if the evidence overlaps another suggestion.

Direct the Standards reviewer to understand every changed line in its necessary context and assess:

- correctness and regression risk;
- the smallest coherent scope and absence of speculative or superseded work;
- repository, language, and framework conventions;
- changed-test validity, independent oracles, behavioural durability, and meaningful failure detection;
- modular ownership, interface depth, dependencies, and change locality;
- repository-required and changed-risk harness selection, measurement-path integrity, and honest evidence limits; and
- recognised maintainability shapes and specialist risks exposed by the change.

Require the Standards reviewer to load and apply `$modular-design`, plus `$tdd` when its prerequisites hold. These skills supply teaching knowledge within the Standards review; they do not become delegated workflows or own findings, commands, remediation, or a verdict. When a concrete maintainability shape needs recognised vocabulary, load [Code Smells](references/CODE-SMELLS.md); use it to investigate a mechanism and consequence, never as finding authority or a removal checklist.

### 3. Run independent reviews

Give each applicable packet to a separate fresh agent and run them in parallel where possible. Do not substitute coordinator self-review. If fresh-agent execution is unavailable, mark the affected axis not performed and state the exact limitation.

Each reviewer may run a safe, focused, non-mutating command only to confirm or falsify a concrete concern. It does not repeat the implementation's whole quality portfolio, edit code or tests, update snapshots or baselines, install dependencies, modify durable data, or repair a finding.

Before retaining a suggestion, try to disprove it through contradicting authority, existing handling, repository-sanctioned exceptions, surrounding code, a focused counterexample, and the strongest benign interpretation. Omit unsupported generic advice, tooling-enforced trivia, speculative best practice, and a pre-existing issue unless the candidate introduces, worsens, or makes it newly consequential.

Rank each surviving suggestion by consequence:

- **High:** a credible path to materially wrong required behaviour, including a duplicated, lost, or misdirected external effect; security or privacy compromise; data loss or corruption; major production or reliability failure; or a structural, test, or evidence defect that makes the change untrustworthy.
- **Medium:** a concrete defect, regression risk, or significant maintainability, modularity, test-quality, or harness-integrity weakness with a bounded material consequence.
- **Low:** a local evidenced issue whose narrow correction has a concrete benefit.

Priority orders attention only; it does not direct remediation.

### 4. Preserve the results and candidate

Validate only that each result uses the required fields. Return an incomplete result to that same reviewer for structural completion from its original packet. Do not substantively re-review, merge, deduplicate, suppress, or cross-axis rerank the independent results.

Reinspect the fixed revisions, diff, paths, and in-scope untracked content. When the candidate drifted, preserve each affected frozen result, prefix it with `Status: stale`, state the changed paths and basis mismatch, and stop without retargeting it.

## Handoff

State the exact frozen scope, behavioural authority or reason Spec was omitted, Standards authorities, probes and limitations, unperformed axes, and scope drift. Return `## Standards` and `## Spec` separately; for an applicable current clean axis use `No findings.` and for an omitted, unperformed, or stale axis state that status explicitly.

Format each suggestion as:

```markdown
### [high|medium|low] Concise finding

- Evidence: exact code location, applicable authority or criterion, and observed fact
- Consequence: concrete behavioural or code-health impact
- Suggested direction: narrow outcome that addresses the concern without prescribing an unverified patch
```

End with axis-specific counts and review scope. Return the reviewers' substance and ordering unchanged. Do not repair the candidate, adjudicate suggestions, issue a verification, completion, or approval verdict, publish comments, or alter pull-request state. The caller owns validation, adjudication, remediation, re-review, verification, and publication.
