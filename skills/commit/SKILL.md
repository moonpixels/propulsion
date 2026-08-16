---
name: commit
description: Records eligible reviewed local work in coherent Conventional Commits while preserving unrelated changes. Use when the user asks to commit completed work.
metadata:
    invocation: user
disable-model-invocation: true
---

# Commit

**Conventional Commits** records eligible local work in reviewable history without absorbing or disturbing unrelated changes.

## Process

### 1. Establish the eligible scope

Inspect repository instructions, the current branch, recent commit subjects, and the exact staged, unstaged, and untracked state; inspect ignored files when they may explain a change or conceal a requested artefact. Read the diffs, candidate untracked content, and any suspicious new configuration, environment, or credential artefact, then apply any user-supplied scope or message constraint. Treat the request as authority to commit work whose ownership and intent are clear, but do not assume every change belongs to it. Preserve pre-existing and unrelated work, including user-staged content. Ask only when material ownership or scope remains ambiguous after inspection.

Exclude work that is conflicted, clearly incomplete, unsafe to attribute, or contains a credential or other sensitive material, and report the exact blocker instead of changing source, tests, or documentation to make it eligible. Do not substitute implementation, review, or broad verification for this inspection. When nothing eligible remains, report the state and stop; otherwise every candidate change has an explicit owner and intent.

### 2. Group coherent changes

Partition eligible work into **atomic commits** by coherent intent. Keep code, tests, documentation, configuration, and generated output together when they realise one purpose; split genuinely independent purposes only when each resulting commit remains understandable and complete. Use hunk-level grouping when necessary and safe. When unrelated content is already staged, isolate a whole-path group with a path-limited commit only after verifying its exact content and that the existing index will be preserved; leave a partial-path or otherwise unsafe group uncommitted. Each proposed group has one truthful outcome and exact paths or hunks.

### 3. Create the commits

For each group, stage only its intended paths or hunks, then inspect the complete staged diff and staged name/status before committing; for a safely isolated path-limited group, inspect the exact content that command will record and the preserved index instead. Follow the repository's supported Conventional Commit types, scopes, bodies, and trailers where established; otherwise use `type[(scope)][!]: description`. State the intent or outcome rather than a file list, represent breaking changes accurately, and honour a requested message or scope only when it truthfully describes the complete commit content.

Create the commit with the repository's Git setup and allow its hooks to run. Do not bypass a hook, rewrite history, or use destructive cleanup. If staging, a hook, or the commit changes files or fails, inspect the resulting state, preserve it, and report the exact result instead of blindly recommitting or discarding anything. A commit exists only when Git reports a new object for the intended staged content.

### 4. Verify the result

After each commit, verify its object, hash, subject, and changed content. After all groups, inspect the branch status, staged and unstaged diffs, and remaining untracked work. Return every created hash and subject, all remaining work, and any limitation; a created commit is not evidence of a clean tree. Stop without pushing, opening or updating a pull request, merging, releasing, deploying, or changing the implementation.
