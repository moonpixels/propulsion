---
name: commit
description: Creates coherent conventional commits from uncommitted work. Use when changes are ready to be inspected, separated, staged, and committed.
metadata:
    invocation: model
disable-model-invocation: false
---

# Commit

**Conventional Commits** turns uncommitted work into atomic commits whose
messages state each change's intent.

## Steps

1. Inspect `git status`, the repository's Git instructions and current
   operation, staged, unstaged, and untracked changes, and recent commit messages.
   Honour user-supplied scope or message constraints and compatible repository
   conventions. The complete candidate diff and commit context are explicit.
2. Partition eligible changes by coherent intent using **atomic commits**.
   Keep related implementation, tests, and documentation together while
   leaving unrelated or ambiguous work uncommitted. Treat a coherent,
   independent pre-staged set as the first commit; when it mixes concerns or
   belongs with unstaged work, ask the user before altering the staged set.
   Each planned commit has one explainable purpose.
3. For each concern, retain an already exact staged selection or use
   **interactive staging** at file or hunk granularity to stage exactly that
   change, then inspect the complete staged diff. The index represents one
   atomic change while unselected work remains intact.
4. Write an accurate Conventional Commit message in the form
   `type[(scope)][!]: description` for the staged diff.
5. Create the commit and allow configured Git hooks to run. A failed hook
   remains authoritative; report its output and the resulting Git state for
   user direction.
6. Verify each created commit against its recorded diff, inspect the remaining
   status before continuing, and return each hash and subject plus work left
   uncommitted.
