---
name: pr-creation
# prettier-ignore
description: Create pull requests from the current branch with a safe, deterministic git + gh workflow. Use when running /pr, when user asks to open a PR, or when changes are ready for review.
---

# PR Creation

Open or reuse a PR from the current branch with explicit base, title, and body handling.

## Quick Start

    Use `pr-creation` to inspect branch state, commit only if needed, push safely, and return the PR URL.

## Core Rules

- Resolve base branch in order: explicit user input, `branch.<current>.gh-merge-base`, repository default branch, then `main`.
- For `gh pr create --base`, normalize remote refs to branch names (strip `origin/` when present).
- Build PR context from `git log <base>...HEAD` and `git diff <base>...HEAD` so all commits are represented.
- If uncommitted changes exist, invoke `/commit` with no arguments to create the commit; if clean, keep existing commit stack as-is.
- Never force push, reset, amend older commits, or change git config while creating PRs.
- Check for an open PR on the current head branch before creating a new one; return existing URL if found.
- Prefer explicit `gh pr create --base --title --body` values; use `--draft` only when requested.
- If push, auth, or permission steps fail, stop and ask for one concrete user unblock action.

## PR Content

- Title priority: exact user title, else infer from dominant change intent in PR scope.
- Inferred titles use imperative present tense (e.g., `Fix bug`, `Add feature`), not past tense.
- Body includes `## Summary` with concise, reviewer-focused detail.
- If user provides exact title/body, preserve them verbatim.
- If no delta exists versus base after optional commit, output `No PR changes to open.`

## References

- [references/workflow.md](references/workflow.md) - Detailed decision flow and command sequence
