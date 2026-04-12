---
description: Run a report-first senior code review with PR-first context gathering and local fallback modes.
agent: plan
subtask: true
---

Load the `code-review` skill and follow it strictly.

## Input

User input: $ARGUMENTS

Interpret `$ARGUMENTS` as review scope only:

- `#<pr-number>`
- `uncommitted`
- `branch`
- `branch <base-branch>`

If mode is missing, use the question tool:

- header: Review mode
- question: Which changes should I review?
- options:
    - `Pull request (Recommended)` - Review a real GitHub PR by number
    - `Branch diff` - Review current branch changes against a base branch
    - `Uncommitted` - Review staged, unstaged, and untracked changes

If PR review is selected, ask one follow-up question for the PR reference in `#123` form.

If mode is `branch` and base branch is missing, use the question tool:

- header: Base branch
- question: Compare current branch against which base branch?
- options:
    - `main (Recommended)` - Use `main...HEAD`
    - `Custom base branch` - I will provide another branch name

If custom base is selected, ask one follow-up question for the branch name.
Validate that branch exists locally or as `origin/<branch>`. If not found, ask one corrective question with the closest match.

Pass the resolved PR reference, mode, and base branch into the skill.
