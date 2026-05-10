# Pull Request Workflow Reference

## Inputs

- Treat any explicit user-provided branch name as `<base>`.
- If no base is provided, use the repo's main development branch, such as `main` or `origin/HEAD`.

## Context Commands

Collect context before any mutation:

- `git status --short`
- `git branch --show-current`
- `git log --oneline <base>...HEAD`
- `git diff <base>...HEAD`
- `git diff --stat <base>...HEAD`

After invoking the `commit` skill for a dirty worktree, refresh:

- `git status --short`
- `git log --oneline <base>...HEAD`
- `git diff <base>...HEAD`
- `git diff --stat <base>...HEAD`

## Existing PR Handling

Check for an open PR for the current head branch:

```sh
gh pr list --head <branch> --state open --json url,number,title,body,baseRefName,headRefName
```

- If the PR base differs from `<base>`, stop and ask whether to correct the PR base.
- If the user explicitly agrees, update the base before any title or body refresh: `gh pr edit --base <base>`.
- If the user declines or gives an unclear answer, stop and ask them to rerun the PR skill with the intended base branch.
- If the PR base matches `<base>` and no commit delta exists, reuse unchanged, verify, and report success output.
- If the PR base matches `<base>` and a commit delta exists, show the URL and ask whether to refresh title and summary.
- If the user explicitly agrees, update only title and body with `gh pr edit --title "<title>" --body "<body>"`.
- If the user declines or gives an unclear answer, reuse unchanged, verify, and report success output.

## Push Safety

- If the branch has no upstream, run `git push -u origin <branch>`.
- If the branch has an upstream, run `git push`.
- Never force push.
- If push fails due to auth, permissions, or remote access, stop and report the failing command plus one concrete unblock action.

## PR Metadata

Infer title and summary from the full `<base>...HEAD` commit history, diff, and diff stat.

Allowed Conventional Commit title types:

- `build`: production dependencies or build-system changes
- `chore`: maintenance, admin, or dev-only dependency work
- `ci`: CI or automation pipeline changes
- `docs`: documentation-only changes
- `feat`: a new feature or functionality
- `fix`: a bug fix for incorrect behaviour
- `perf`: a performance improvement
- `refactor`: code changes without behaviour changes
- `revert`: reverts an earlier change
- `style`: formatting or style-only clean-up
- `test`: adds or updates tests

Make the title a valid Conventional Commit subject suitable for squash merge history.

Use this exact PR body shape:

```md
## Summary

- <bullet derived from the full PR scope>
```

If no open PR exists, create one with:

```sh
gh pr create --base <base> --title "<title>" --body "<body>"
```

Verify the final PR with:

```sh
gh pr view --json url,number,title,baseRefName,headRefName,state
```

## No Changes Output

If no open PR exists and no commit delta exists against the base branch, output exactly:

```md
No PR changes to open.
```

## Success Output

When PR creation or reuse succeeds, output exactly:

```md
PR URL: <url>
Title: <final PR title>
Base branch: <base>
Head branch: <head>
State: <state>
```
