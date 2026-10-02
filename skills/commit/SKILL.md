---
name: commit
description: Record completed local work as atomic Conventional Commits while preserving unrelated changes.
---

# Commit

Record the eligible work in coherent commits. Preserve unrelated **staged, unstaged, and untracked work**.

## Inputs

Use the user's request, repository path, eligible changes, and existing review and validation evidence. Inspect the complete Git state, including the index and working tree. Resolve unclear ownership before staging the affected hunks.

## Method

1. Compare staged and unstaged diffs with the request. Group eligible changes by intent; keep coupled work together and separate independent outcomes.
2. Stage only eligible paths or hunks. Preserve unrelated index entries and working-tree content, including different changes in the same file. Avoid broad staging, destructive cleanup, or history rewriting.
3. Review the exact patch each commit will record. Use an atomic **Conventional Commit** title and let commit hooks run. Do not bypass a failing hook; report its failure and keep the work recoverable.
4. Verify each recorded commit and the final Git status. Confirm that excluded work retains its content and staging state.

Use existing validation evidence for completed work. Run a new check only when repository instructions require it or changed evidence exposes a material gap; do not alter implementation merely to make a commit succeed.

## Finish

Return commit hashes, titles, and remaining work or blockers. Done when every eligible change is recorded and excluded work is preserved. Stop before pushing or opening a pull request.
