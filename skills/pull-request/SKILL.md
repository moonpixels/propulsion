---
name: pull-request
description: Publishes the current branch as one concise verified pull request. Use when the branch is ready for external review.
metadata:
    invocation: user
disable-model-invocation: true
---

# Pull Request

Publishes the complete branch for review without advancing it further.

## Process

Assign the entire process below to one fresh agent with the user's request and repository path. Have it invoke `$commit` when eligible uncommitted work belongs to the branch, compare the whole branch with its base, then use the repository's native tools to push without rewriting history before creating or updating one pull request.

Use one **Conventional Commit** title for the complete outcome. Write the first body paragraph as three short sentences covering what, why, and how. Add a short testing paragraph only when existing tests provide material behavioural evidence; describe the behaviour covered and any material gap, not the suite, coverage, metrics, or publication-time execution, and do not run tests.

Have the fresh agent read back the title, URL, head, base, state, and published revision. Return the title and URL, adding only a material blocker or excluded work when necessary, and retain only that result. Stop without reviewing, merging, releasing, or deploying.
