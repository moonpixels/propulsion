---
name: commit
description: Creates coherent Conventional Commits from eligible changed work. Use when the user or an authorised workflow asks to commit ready changes.
metadata:
    invocation: model
disable-model-invocation: false
---

# Commit

**Conventional Commits** turns eligible changed work into coherent commits whose messages state each change's intent.

## Process

### 1. Inspect the changed work

Inspect repository instructions, the current Git state, staged, unstaged, and untracked changes, and recent commit subjects. Apply any requested scope or message constraint. When no eligible change remains, report it and stop; otherwise the complete candidate work is explicit.

### 2. Group coherent changes

Partition the candidate work into **atomic commits** by coherent intent. Keep changes together when they serve the same purpose and leave unrelated or ambiguous work untouched. Each group has one explainable purpose.

### 3. Create the commits

For each group, stage its exact files or hunks, inspect the staged diff, and commit it with an accurate `type[(scope)][!]: description` message using the repository's Git setup. Ask before altering ambiguous user-staged work. On failure, preserve the resulting Git state and report the blocker.

### 4. Verify the result

Verify each created commit and inspect the remaining status. Return each hash and subject plus any work left uncommitted.
