---
description: Create or reuse a pull request from the current branch with safe push + explicit metadata
agent: build
subtask: true
---

Load the `pr-creation` skill and follow it strictly.

## Input

User input: $ARGUMENTS

Interpret `$ARGUMENTS` as optional directives:

- `base=<branch>`
- `title="<exact title>"`
- `body="<exact markdown body>"`
- `draft=true|false`

If user provides explicit title or body, preserve each value exactly as given.

## Workflow

1. Collect context first:
   - `git status --short`
   - `git branch --show-current`
   - resolve base branch (input > branch config > repo default branch from `gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name'` > `main`)
   - `git log --oneline <base>...HEAD`
   - `git diff --stat <base>...HEAD`
2. If uncommitted changes exist, invoke `/commit` with no arguments to create the commit.
3. Push branch safely:
   - no upstream: `git push -u origin <branch>`
   - upstream exists: `git push`
4. Check for existing open PR on current head branch:
   - `gh pr list --head <branch> --state open --json url,number,baseRefName,headRefName`
   - if present, return URL and stop.
5. If no commit delta exists against base, output exactly:
   - `No PR changes to open.`
6. Derive title/body from all commits in `<base>...HEAD` unless user provided exact values.
   - Inferred title must be imperative present tense (e.g., `Fix bug`, `Add feature`), not past tense.
   - Normalize base for `gh` calls: if `<base>` starts with `origin/`, strip that prefix.
7. Create PR with explicit flags:
   - `gh pr create --base <normalized-base> --title "<title>" --body "<body>"`
   - append `--draft` only when requested.
8. Verify and report using `gh pr view --json url,number,title,baseRefName,headRefName,state`.

## Safety

- Never force push, reset, amend older commits, or change git config.
- If current branch matches target base branch, stop and ask user to confirm the intended feature branch.
- If a step fails, ask for one concrete unblock action and include the failing command.
