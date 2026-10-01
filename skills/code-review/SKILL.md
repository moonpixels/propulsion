---
name: code-review
description: Review one fixed code change independently against intended behaviour and engineering standards, returning separate diagnostic findings.
metadata:
    type: utility
---

# Code review

Return falsifiable findings for one fixed change through separate Standards and Spec reviews. Keep the candidate read-only and preserve each axis's independent results.

## Inputs

Use the pinned candidate or resolve an exact non-empty diff, revision range, branch comparison, pull-request revision, or local change. Capture the patch, changed and in-scope untracked paths and contents, complete changed files, surrounding source and tests, and repository state. Resolve a materially ambiguous target before review. Report an empty or unavailable candidate as a blocker.

Find intended behaviour in a specification, ticket, acceptance criteria, confirmed request, contract, or other implementation-independent authority. If none is reasonably available, omit Spec and state why. Code, commits, and implementation rationale cannot supply missing intent.

Find repository instructions, conventions, architecture decisions, configured checks, affected contracts and consumers, and current quality evidence.

## Method

1. Build self-contained packets with the fixed candidate, necessary surrounding source, each axis's authorities, [review rules](references/REVIEW-RULES.md), and a read-only boundary. Use [axis criteria](references/AXES.md) for the applicable review. Exclude desired findings and the other axis's conclusions.
2. Give each applicable axis to a separate fresh agent with no conversation history. Run them in parallel when possible. Each reviewer reads its criteria and review rules, inspects the actual candidate, and returns its own findings. Coordinator self-review does not replace these reviews.
3. Check only result structure. Return missing fields to the same reviewer for completion from its original packet. Preserve substance and ordering; leave adjudication to the caller.
4. Recheck revisions, diff, paths, and in-scope untracked content. If the candidate drifted, retain affected reports with `Status: stale`, name changed paths and the basis mismatch, and stop without retargeting.

## Conditional resources

- Reviewers read [review rules](references/REVIEW-RULES.md) for falsification, consequence ranking, safe probes, and report fields.
- Read [axis criteria](references/AXES.md) when preparing packets; each reviewer reads its own section.
- The Standards reviewer reads [code smells](references/CODE-SMELLS.md) when a concrete maintainability shape needs recognised vocabulary. A smell is a diagnostic cue, not finding authority.

## Finish

State frozen scope, authorities, probes, evidence limitations, and drift. Return `## Standards` and `## Spec` separately with axis-specific counts and scope. Use `No findings.` for a current clean axis; explicitly identify an omitted, unperformed, or stale axis.

Return the reviewers' reports unchanged. Do not merge, deduplicate, suppress, or rerank across axes. Stop before repair, adjudication, approval, verification verdicts, publication, or pull-request changes. The caller owns those actions.
