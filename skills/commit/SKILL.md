---
name: commit
description: Record all uncommitted branch changes as atomic Conventional Commits when asked to commit directly or by a publishing workflow.
---

# Commit

Record **all uncommitted changes** in atomic commits by intent, including work from earlier sessions. Respect Git's normal ignore rules.

## Inputs

The actual diffs determine what needs recording.

## Method

1. Inspect the status, staged and unstaged diffs, and untracked files. Account for every change, regardless of its session or author.
2. Group changes by intent. Keep coupled changes together and separate independent outcomes. Stage each exact group while keeping the remaining groups intact.
3. Review the exact patch and use a **Conventional Commit** title, `type: description` or `type(scope): description`. Choose the type from the change and a meaningful scope when useful. Keep the description short and imperative, without a trailing full stop. For example, `fix(parser): reject invalid dates` or `docs: explain configuration`. Mark breaking changes with `!` before the colon or a `BREAKING CHANGE:` footer. Add a body only when necessary context or repository guidance requires it.
4. Let normal commit hooks run. If a hook fails, report the failure and remaining work. Preserve the changes and stop without bypassing the hook or altering implementation to satisfy it.
5. Verify each recorded commit and the remaining status. Inspect hook edits and repeat until every change is recorded. Keep existing history intact.

## Finish

Return commit hashes and titles, or report that there is nothing to commit. Report any blocker and remaining work.

**Done only when** every uncommitted change is recorded and the final status is clean under normal ignore rules. Stop before pushing or opening a pull request.
