---
name: pr
description: Create or reuse a GitHub pull request from the current branch with safe commit and push. Use when opening, updating, or reporting a PR.
---

# Pull Request

Create or reuse one GitHub pull request from the current branch and report the verified result.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- GitHub CLI `gh` is installed and authenticated for the target repository (may need to run outside sandbox).
- The current directory is a git repository with an `origin` remote.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Resolve the base branch from optional user input, or default to the repo's main development branch.
2. Collect context first with the git commands in [references/workflow.md](references/workflow.md).
3. If the current branch equals the base branch, stop and ask the user to confirm the intended base branch.
4. If the worktree is dirty, load and invoke the `commit` skill with no extra instructions, then refresh branch context before PR metadata.
5. Push safely: use `git push -u origin <branch>` when no upstream exists; otherwise use `git push`.
6. Check for an existing open PR for the current head branch.
7. If an open PR exists with a different base, stop and ask whether to update the base; only if confirmed, run `gh pr edit --base <base>` before title or body refresh.
8. If an open PR exists on the chosen base, reuse it unchanged when no commit delta exists; otherwise ask whether to refresh title and body, then use `gh pr edit` only after explicit confirmation.
9. If no open PR exists and no commit delta exists, output exactly `No PR changes to open.`
10. Generate a Conventional Commit PR title and summary body from the complete `<base>...HEAD` history and diff.
11. Create the PR with `gh pr create --base <base> --title "<title>" --body "<body>"` when no reusable open PR exists.
12. Verify the final PR with `gh pr view --json url,number,title,baseRefName,headRefName,state` and return the output contract.

## Rules

These rules are MANDATORY.

- ALWAYS collect context before committing, pushing, creating, editing, or reusing a PR.
- MUST use the complete branch history and diff, not only the latest commit, for title and body.
- MUST keep the PR title a valid Conventional Commit subject suitable for squash merge history.
- NEVER force push, reset, amend older commits, change git config, or bypass hooks.
- ALWAYS stop and report the failing command plus one concrete unblock action for GitHub CLI auth, permission, or remote access failures.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Base branch, current branch, status, history, diff, and diff stat were collected.
- [ ] Dirty worktree was handled through the `commit` skill, or no dirty work existed.
- [ ] Push completed without force, or the workflow stopped for auth, permission, or access action.
- [ ] Existing PR reuse or refresh rules were followed, or a new PR was created.
- [ ] Final PR state was verified with `gh pr view`.
- [ ] Final response matches the required contract in [references/workflow.md](references/workflow.md).

## References

Use these references when you need detail.

- [references/workflow.md](references/workflow.md) - Commands, PR metadata rules, body shape, and output contract.
