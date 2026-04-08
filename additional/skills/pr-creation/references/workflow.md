# PR Workflow Reference

Use this flow to create PRs reliably in local agent workflows.

## Why this flow

- `gh pr create` can prompt to push/fork unless branch is already pushed; pre-push avoids surprise interactivity.
- GitHub PR diffs are effectively three-dot (`base...head`), so scope analysis should use merge-base-aware logs and diffs.
- `gh pr create --base` expects a branch name (e.g., `main`), not a remote ref like `origin/main`.
- `--title` and `--body` override `--fill`; explicit values are more deterministic for agents.
- `gh pr create --dry-run` may still push, so do not treat it as side-effect free.

## Step-by-step

1. Resolve current branch and intended base branch (`input > branch config > repo default branch > main`).
2. Gather state:
    - `git status --short`
    - `git branch --show-current`
    - `git log --oneline <base>...HEAD`
    - `git diff --stat <base>...HEAD`
3. If uncommitted changes exist, invoke `/commit` with no arguments to create the commit.
4. Ensure branch is pushed:
    - no upstream: `git push -u origin <branch>`
    - upstream exists: `git push`
5. Check existing open PR for head branch:
    - `gh pr list --head <branch> --state open --json url,number,baseRefName`
    - if found, return URL and stop.
6. Prepare PR metadata from full PR scope (`<base>...HEAD`), unless user gave exact title/body.
    - If title is inferred, write it in imperative present tense (`Fix bug`, `Add feature`).
    - Normalize base for `gh` calls: if `<base>` starts with `origin/`, strip that prefix to get `<normalized-base>`.
7. Create PR:
    - `gh pr create --base <normalized-base> --title "<title>" --body "<body>"`
    - add `--draft` only when requested.
8. Verify and report:
    - `gh pr view --json url,number,title,baseRefName,headRefName,state`

## Decision rules

- If there are zero commits in `<base>...HEAD`, do not open a PR.
- If branch equals target base branch, stop and ask for a feature branch.
- If upstream push is rejected (non-fast-forward), ask user whether to rebase/merge manually.
- If `gh` auth fails, ask user to run `gh auth login` (or refresh token) and retry.

## Suggested PR body template

```markdown
## Summary

- ...
```
