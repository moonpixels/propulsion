---
description: Run a report-first senior code review with PR-first context gathering and local fallback modes.
agent: plan
---

## Inputs

User input: $ARGUMENTS

- Interpret `$ARGUMENTS` as review scope only.
- Accepted review scope forms:
    - `#<pr-number>`
    - `uncommitted`
    - `branch`
    - `branch <base-branch>`

## Instructions

1. Resolve the review scope from `$ARGUMENTS`.
2. If mode is missing, use the question tool:
    - header: Review mode
    - question: Which changes should I review?
    - options:
        - `Pull request (Recommended)` - Review a real GitHub PR by number
        - `Branch diff` - Review current branch changes against a base branch
        - `Uncommitted` - Review staged, unstaged, and untracked changes
3. If PR review is selected, ask one follow-up question for the PR reference in `#123` form.
4. If mode is `branch` and base branch is missing, use the question tool:
    - header: Base branch
    - question: Compare current branch against which base branch?
    - options:
        - `main (Recommended)` - Use `main...HEAD`
        - `Custom base branch` - I will provide another branch name
5. If custom base is selected, ask one follow-up question for the branch name.
6. Once the review mode and any required follow-up answers are resolved, load the `code-review` skill and follow it strictly.
7. Pass the resolved review mode, PR reference, and base branch into `code-review`.

## Rules

- ALWAYS keep the accepted review scope forms explicit: `#<pr-number>`, `uncommitted`, `branch`, and `branch <base-branch>`.
- ALWAYS validate a custom base branch against local refs or `origin/<branch>` refs before proceeding.
- ALWAYS ask exactly one corrective question when the branch is not found:
    - header: Branch not found
    - question: I could not find that branch. Did you mean the <closest-match>?
    - options:
        - `<closest-match> (Recommended)` - Use the closest matching branch
        - `Enter a different branch` - I will provide another branch name
- ALWAYS repeat the same branch validation and corrective question flow after `Enter a different branch`.
