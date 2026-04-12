---
description: Create or reuse a pull request from the current branch with safe commit + push
---

## Inputs

User input: $ARGUMENTS

- Default base branch: `main`
- If `$ARGUMENTS` is non-empty then treat it as the base branch name

## Instructions

1. Resolve the base branch from `$ARGUMENTS` or default to `main`.
2. Collect context first:
    - `git status --short`
    - `git branch --show-current`
    - `git log --oneline <base>...HEAD`
    - `git diff <base>...HEAD`
    - `git diff --stat <base>...HEAD`
3. If the current branch matches the chosen base branch, stop and ask the user to confirm the intended base branch.
4. If the worktree is dirty, invoke `/commit` with no arguments before pushing.
5. After `/commit`, refresh the branch context before generating PR metadata:
    - `git status --short`
    - `git log --oneline <base>...HEAD`
    - `git diff <base>...HEAD`
    - `git diff --stat <base>...HEAD`
6. If there is no upstream for the current branch, push with `git push -u origin <branch>`. Otherwise, run `git push`.
7. If push fails because of authentication, permissions, or remote access requires user action, stop and report the failing command with one concrete unblock action.
8. Check for an existing open PR for the current head branch with `gh pr list --head <branch> --state open --json url,number,title,body,baseRefName,headRefName`.
9. If no commit delta exists against the base branch, output exactly:
    - `No PR changes to open.`
10. Infer a Conventional Commit PR title from the full `<base>...HEAD` scope.
    - use the complete branch diff and commit history, not just the latest commit
    - include a scope only when the scope is obvious from the full PR context
    - make the title a valid Conventional Commit subject suitable for squash merge history
11. Use a PR body with this exact shape:

    ```md
    ## Summary

    - <bullet derived from the full PR scope>
    ```

12. If an open PR already exists with a different base branch than the chosen `<base>`, stop and ask the user whether to correct the PR base.
    - If the user agrees, update the base with `gh pr edit --base <base>` before any title or body refresh.
    - If the user declines, stop and ask them to rerun `/pr` with the intended base branch.
13. If an open PR already exists on the chosen base, show its URL and ask whether to refresh the title and summary.
    - If the user agrees, update only the title and body with `gh pr edit`.
    - If the user declines, reuse the existing PR unchanged.
14. If no open PR exists, create one with `gh pr create --base <base> --title "<title>" --body "<body>"`.
15. Verify with `gh pr view --json url,number,title,baseRefName,headRefName,state`.

## Rules

- NEVER force push, reset, amend older commits, or change git config.
- ALWAYS stop for correction when the current branch equals the base branch.
- ALWAYS stop for user action when push or GitHub auth fails.
- ALWAYS collect context first.
- DO use the complete branch diff and commit history, not just the latest commit.
- DO include a scope only when the scope is obvious from the full PR context.
- ALWAYS make the title a valid Conventional Commit subject suitable for squash merge history.

## Output

Use this exact format for your output when PR creation or reuse succeeds:

```md
PR URL: <url>
Title: <final PR title>
Base branch: <base>
Head branch: <head>
State: <state>
```
