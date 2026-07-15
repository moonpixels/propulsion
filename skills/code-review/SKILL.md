---
name: code-review
description: Reviews scoped code changes for requirements and code health. Use when assessing a diff, branch, pull request, or completed implementation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Code Review

**Google code review** applies the code-health standard to a scoped change.
Separate requirements and code-health passes keep delivery gaps, defects, and
refactor opportunities independently visible.

## Steps

1. Resolve the change scope in this order: an explicit caller-supplied scope,
   uncommitted tracked and untracked work, then the current branch from its
   default-branch merge base. Confirm any revision exists and the change set is
   non-empty; report the exact blocker and stop when either check fails, and ask
   the user only when multiple scopes remain plausible. Recover requirements
   from caller context, a supplied request, specification or ticket, then the
   change description and commit history. When none exists, state that there is
   no requirements source rather than inventing one. The exact change set and
   best available requirements source are explicit.
2. Read repository instructions, relevant context and decisions, changed files
   in full, nearby tests, and the surrounding code needed to judge effects. Run
   non-mutating verification already required by the repository when its result
   materially informs the review. The review evidence and applicable standards
   are complete.
3. Perform a **requirements traceability** pass. Compare the change with every
   available requirement and identify missing, partial, incorrect, conflicting,
   or unrequested behaviour and relevant unhandled cases. When there is no
   requirements source, preserve that limitation instead of treating inferred
   intent as a requirement. Requirements candidates are explicit.
4. Perform an independent code-health pass across correctness, design,
   complexity, tests, naming, documentation, security, performance, reliability,
   and repository standards where relevant. Apply the **Test Desiderata** to
   changed tests, especially behavioural sensitivity, structure insensitivity,
   specificity, and determinism. Use **code smells** as a heuristic baseline:
   **Mysterious Name**, **Duplicated Code**, **Global Data**, **Mutable Data**,
   **Divergent Change**, **Shotgun Surgery**, **Feature Envy**, **Data Clumps**,
   **Primitive Obsession**, **Repeated Switches**, **Speculative Generality**,
   **Message Chains**, **Middle Man**, and **Refused Bequest**. Investigate other
   established smells when the changed code provides a concrete cue. A smell
   becomes a finding only when evidence shows a worthwhile correction.
   Code-health candidates are explicit.
5. Apply **falsification** to every candidate against the scoped change, full
   context, requirements, and repository standards. Run targeted non-mutating
   tests, type checks, linting, or other checks when they can settle a claim.
   Discard any candidate without a demonstrated consequence. Every remaining
   finding is reproducible or directly evidenced.
6. Use **risk-based prioritisation**: `critical` for immediate data loss,
   security compromise, or production failure; `high` for incorrect requirements
   or major behaviour, security, reliability, or maintenance risk; `medium` for
   a concrete defect or significant code, design, or test weakness; and `low`
   for a local but worthwhile improvement. Keep both review axes separate and
   order findings within each from highest to lowest priority. Every reported
   finding is actionable.

## Rules

- Keep the review read-only and return corrections for the caller to implement.
- Report only issues introduced by or materially relevant to the scoped change.
- Prefer code evidence and documented standards over personal preference.
- Hold refactor opportunities to the same evidence, consequence, priority, and
  correction standard as behavioural findings.

## Handoff

State the exact scope and requirements source, then return `## Requirements`
and `## Code health`. Use `No requirements source.` when applicable and `No
findings.` for a clean axis. Format each finding as:

```markdown
### [priority] Concise finding

- Evidence: exact `path:line` and observed fact
- Consequence: concrete behaviour or code-health impact
- Correction: smallest effective change
```

End with `## Summary`, including the finding count for each axis and any check
that could not run. When no material finding remains, say the scoped change is
clean plainly.
