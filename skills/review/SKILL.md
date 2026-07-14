---
name: review
description: Reviews scoped code changes for requirements, code health, and refactor opportunities. Use when assessing a diff, branch, pull request, or completed implementation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Review

Google's **code health** standard governs whether a change improves the system;
independent requirements and code-health passes prevent one concern from
masking the other.

## Steps

1. Resolve the change scope in this order: an explicit fixed point or caller
   scope, uncommitted tracked and untracked changes, then the current branch
   from its default-branch merge base. Confirm any revision exists and the
   change set is non-empty; ask the user only when multiple scopes remain
   plausible. Recover the originating
   request from caller context, a supplied specification or ticket, then the
   change description and commit history. If none exists, state that the
   Requirements pass has no source instead of inventing one. The exact diff and
   available requirements source are pinned.
2. Read repository instructions, relevant context and decisions, documented
   standards, changed files in full, nearby tests, and any code needed to judge
   effects. Treat surrounding code as context while keeping findings limited to
   the scoped change. Both reviewers receive the same evidence and boundaries.
3. Run two fresh independent passes in parallel when the host supports
   delegation; otherwise perform the passes separately without allowing one to
   suppress or reprioritise the other:
    - **Requirements** compares the diff with the confirmed request and reports
      missing, partial, incorrect, or unrequested behaviour and relevant edge
      cases.
    - **Code health** examines design, correctness, complexity, tests, naming,
      documentation, security, performance, reliability, and repository
      standards where relevant. Assess changed tests for behavioural sensitivity,
      structure insensitivity, specificity, and determinism. Use Martin Fowler's
      **code smells** from _Refactoring_ to investigate concrete refactor
      opportunities; a smell is a prompt for judgement, not a violation by
      itself.

    Each pass returns candidate findings with evidence and does not edit files.

4. Validate every candidate by trying to disprove it against the scoped diff,
   full context, requirements, and repository standards. Run targeted
   non-mutating tests, type-checking, linting, or other checks when they can
   settle a claim. Discard preferences, unsupported speculation, unrelated
   pre-existing debt, and issues already enforced by tooling. Every remaining
   finding is reproducible or directly evidenced.
5. Assign `critical` to immediate data-loss, security, or production failure;
   `high` to incorrect requirements or major behaviour, reliability, security,
   or maintenance risk; `medium` to a concrete defect or significant code,
   design, or test weakness; and `low` to a local but worthwhile improvement.
   Every level remains actionable, while inconsequential nits are omitted. The
   two axes are ready for transfer without merging or reranking them against
   each other.

## Rules

- Keep review read-only; return corrections for the caller to implement.
- Prefer technical evidence and documented repository standards over personal
  preference.
- Review the changed lines and their effects completely, but report only issues
  introduced by or directly relevant to the scoped change.
- Give refactor opportunities the same evidence, priority, and correction
  standard as behavioural findings.

## Handoff

Return `## Requirements` and `## Code health`. Use `No requirements source.`
when the first axis has no recoverable source and `No findings.` for a clean
axis. Format every finding as:

```markdown
### [priority] Concise finding

- Evidence: exact `path:line` and the observed fact
- Consequence: concrete behaviour or code-health impact
- Correction: smallest effective change
```

End with `## Summary` containing the finding count for each axis and any check
that could not run. The report contains findings only; a clean report says both
axes have no findings.
