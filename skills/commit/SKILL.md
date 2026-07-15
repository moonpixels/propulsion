---
name: commit
description: Creates coherent conventional commits from uncommitted work. Use when the user or an authorised publishing workflow requests ready changes be inspected, separated, staged, and committed.
metadata:
    invocation: model
disable-model-invocation: false
---

# Commit

**Conventional Commits** turns uncommitted work into atomic commits whose messages state each change's intent.

## Process

### 1. Establish authority and scope

Establish commit authority from an explicit user request or authorised caller. Inspect `git status`, the repository's Git instructions and current operation, staged, unstaged, and untracked changes, and recent commit messages. Honour user-supplied scope or message constraints and compatible repository conventions. When authority is absent or no eligible change remains, report it and stop without changing Git state. Otherwise the complete candidate diff and commit context are explicit.

### 2. Partition coherent concerns

Partition eligible changes by coherent intent using **atomic commits**. Keep related implementation, tests, and documentation together while leaving unrelated or ambiguous work uncommitted. Treat a coherent, independent pre-staged set as the first commit; when it mixes concerns or belongs with unstaged work, ask the user before altering the staged set. Each planned commit has one explainable purpose.

### 3. Stage one concern

For each concern, retain an already exact staged selection or use **interactive staging** at file or hunk granularity to stage exactly that change, then inspect the complete staged diff. The index represents one atomic change while unselected work remains intact.

### 4. Write the message

Write an accurate Conventional Commit message in the form `type[(scope)][!]: description` for the staged diff.

### 5. Create the commit

Create the commit and allow configured Git hooks to run. On any failure, treat hook output as authoritative when present, preserve the index and working tree, and report the exact output and resulting Git state. Obtain user direction for any repository or user Git configuration change.

### 6. Verify the commits

Verify each created commit against its recorded diff, inspect the remaining status before continuing, and return each hash and subject plus work left uncommitted.
