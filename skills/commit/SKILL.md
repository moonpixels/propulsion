---
name: commit
description: Creates atomic Conventional Commits for eligible reviewed work while preserving unrelated changes. Use when completed local work is ready to record.
metadata:
    type: utility
disable-model-invocation: true
---

# Commit

Records eligible local work in coherent commits without disturbing unrelated changes.

## Process

Assign the entire process below to one fresh agent with the user's request and repository path; when already inside the fresh agent for an enclosing operation, perform it there. Use only repository evidence to inspect the complete Git state and diffs, group eligible work by intent into atomic **Conventional Commits**, preserve unrelated staged, unstaged, and untracked work, and let commit hooks run. The work is already reviewed and verified; do not run tests, project checks, or implementation verification. Verify only each commit and the final Git status, then return only the hashes, titles, and remaining work. Retain only that result.

Stop without changing the implementation, pushing, or opening a pull request.
