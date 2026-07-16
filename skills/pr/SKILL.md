---
name: pr
description: Publishes the current branch and creates or updates its pull request. Use when committed work is ready for review.
metadata:
    invocation: user
disable-model-invocation: true
---

# Pull Request

Publish the current branch through the repository's available setup and represent its complete work in one pull request.

## Process

### 1. Inspect the repository setup

Inspect repository instructions, Git status, the current branch, its remote and base, available publication tooling, and any existing pull request for the branch. Use the user-supplied base or the repository default. When no usable publication path exists, report the blocker; otherwise the publication context is explicit.

### 2. Establish the grouped work

Invoke `$commit` when eligible changed work remains, then inspect the commit history and **whole-branch change scope** against the base. When the branch has no publishable change, report it and stop; otherwise the complete pull-request scope is explicit.

### 3. Write the pull request

Write a `type[(scope)][!]: description` title that summarizes the complete grouped work. Apply **BLUF** by writing one succinct paragraph that begins directly with what the grouped work changes and why. Follow additional repository requirements only when they explicitly mandate them.

### 4. Publish and verify

Use the available repository mechanism to publish the current branch without rewriting remote history and create or update its one pull request. Make it ready for review unless the user requested a draft. Verify the head, base, title, body, and review state, then return the pull-request URL.
