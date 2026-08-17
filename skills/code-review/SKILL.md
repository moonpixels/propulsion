---
name: code-review
description: Diagnoses a fixed code change independently against intended behaviour and engineering standards. Use when reviewing code directly or during implementation, debugging, or pull-request review.
metadata:
    invocation: model
disable-model-invocation: false
---

# Code Review

A tailored **Software Formal Inspection** independently diagnoses a fixed code change through isolated Spec and Standards reviews, returning evidence for the caller without verifying, approving, or changing the work.

## Process

### 1. Freeze the change

Use a caller-supplied frozen basis when available; otherwise resolve the exact uncommitted diff, revision range, branch comparison, pull-request change, repair, or other scoped work product. Read repository instructions, resolve every revision, and capture the patch, changed paths, complete in-scope changed and untracked files, and repository state once. Ask when scope is materially ambiguous. When it is invalid or empty, return the exact blocker without reviewing. The review has one explicit, non-empty work product.

### 2. Resolve the authorities and context

Identify intended behaviour from the caller's fixed authority, such as a specification, ticket, acceptance criteria, confirmed request, or another project source. Extract the authoritative statement without carrying surrounding conversation into inspection. When no intended-behaviour authority can be found, ask the user to confirm a Standards-only review unless the caller already supplied that confirmation.

Independently resolve applicable repository instructions, architecture decisions, language and framework policies, configured checks, and established local conventions. Read every changed file in full, relevant tests, affected contracts and consumers, and enough surrounding implementation to understand each change. Reuse relevant caller-supplied `$modular-design` constraints, or invoke `$modular-design` when ownership, boundaries, dependencies, contracts, or change propagation present a material structural concern.

Apply the universal Standards criteria directly: correctness and regression risk; scoped minimality; language, framework, and repository conventions, including established helpers; changed-test validity and durability; maintainability and economy; recognised smells; and modular architecture. Activate security, performance, accessibility, compatibility, resilience, concurrency, migration, or another specialist concern only when task evidence or project authority exposes it. Use ISO/IEC 25010 only when an authority adopts it. For an implicated supported-language or Web-security construct, consult the current official CERT rule or stable versioned OWASP ASVS requirement narrowly and include its exact applicability and exceptions. When a concrete maintainability shape still needs recognised diagnostic vocabulary, consult [Code Smells](references/CODE-SMELLS.md); a smell prompts investigation and is never finding authority by itself. The two axes have explicit, task-relevant evidence without a universal external checklist.

### 3. Prepare the inspection packets

Create one self-contained, operational packet per applicable axis. Both packets receive the frozen scope, complete changed files and necessary surrounding source, their applicable authorities and criteria, the priority definitions and output schema below, and the read-only boundary. Exclude conversation history, undocumented implementation rationale, `$verify-change` results or conclusions, and the other reviewer's materials.

The Spec packet directs its reviewer to:

1. account for every applicable statement of intended behaviour in the changed implementation and relevant tests;
2. account for every introduced or altered behaviour against an identified authority; and
3. follow affected contracts, states, data shapes, side effects, and consumers far enough to expose missing, partial, conflicting, excess, and regressed behaviour.

The Standards packet directs its reviewer to:

1. understand every changed line and the necessary whole-file and system context;
2. follow affected contracts, states, data shapes, side effects, callers, and dependencies far enough to expose correctness and regression risks;
3. apply the universal and triggered criteria resolved in step 2; and
4. when tests changed, ask whether they detect a promised-behaviour defect, survive behaviour-preserving changes to hidden structure, remain deterministic and readable, and credibly predict the promised result.

Each packet tells the reviewer how to inspect its axis rather than supplying labels alone.

### 4. Run the independent reviews

Give each applicable packet to a separate fresh agent, in parallel when possible and otherwise sequentially. Do not substitute the coordinating agent; when fresh-agent delegation is unavailable, mark the affected axis not performed and state the exact limitation.

Each reviewer owns candidate discovery, code and authority validation, consequence analysis, and priority validation for its axis. Before retaining a candidate, actively try to disprove it through contradicting authority, an already-handled path, a repository-sanctioned exception, surrounding code, and the strongest benign interpretation. Run a targeted probe only when its command and boundary demonstrate that it cannot mutate the checkout, repository state, durable data, or an external system; otherwise omit it and record the limitation. Report a pre-existing issue only when the fixed change introduces or worsens it, makes it newly consequential, or cannot conform because of it. Return only findings that survive these checks.

Use consequence-based priority within each axis: `critical` for immediate data loss, security compromise, or production failure; `high` for incorrect required behaviour or major security, reliability, or maintainability risk; `medium` for a concrete defect or significant code, design, or test weakness; and `low` for a local but worthwhile issue. Priority communicates impact and order, not remediation authority.

### 5. Preserve the independent results

Validate only that each reviewer returned the required fields, returning an incomplete result to that same reviewer for structural completion from the original packet. Reinspect the scoped revisions, diff, paths, and in-scope untracked content. When the frozen work product drifted, preserve each affected axis's frozen result, prefix it with `Status: stale` and the changed paths and basis mismatch, and stop without silently retargeting the review.

Present Standards and Spec separately without substantive re-review, merging, deduplication, suppression, or cross-axis reranking. Preserve each reviewer's findings and ordering. The caller receives independent diagnostic evidence for its own adjudication.

## Handoff

State the exact frozen scope, intended-behaviour authority or user-confirmed absence, Standards authorities, any omitted or unperformed axis, every probe run or omitted, and any scope drift. Return `## Standards` and `## Spec`; use `No findings.` only for a current clean axis, never for a stale clean result without its `Status: stale` prefix, and state when Spec was omitted or either axis was not performed. Format each finding as:

```markdown
### [priority] Concise finding

- Evidence: exact code `path:line`, applicable authority or criterion, and observed fact
- Consequence: concrete behavioural or code-health impact
```

End with `## Summary` and the finding count for each completed axis, labelling an affected frozen count `stale`. The caller owns adjudication, remediation, re-review, verification, and any publication or pull-request decision. Do not repair the code, adjudicate findings, issue a verification or approval verdict, publish review comments, or alter pull-request state.
