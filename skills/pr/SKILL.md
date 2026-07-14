---
name: pr
description: Publishes the current GitHub branch as a concise pull request. Use when work is ready to be committed, pushed, and opened for review.
metadata:
    invocation: user
disable-model-invocation: true
---

# Pull Request

**GitHub flow** publishes the current branch as a concise, ready-for-review pull
request. Invoke `$commit` when eligible uncommitted work exists; it remains
authoritative for commit selection, staging, and messages.

## Prerequisites

A GitHub remote, authenticated push and pull-request access, an attached branch,
and a distinct base branch are required. Use the user-supplied base or the
remote's default branch. Report the missing condition and stop when a
prerequisite cannot be resolved.

## Steps

1. Inspect repository instructions and pull-request templates, Git status and
   current operation, the current branch, GitHub remotes, authentication, the
   selected base, and any existing pull request for the branch. The publication
   context and applicable repository requirements are explicit before mutation.
2. Invoke `$commit` when eligible uncommitted work exists. Continue with its
   reported commits and intentionally excluded work visible.
3. Fetch the selected remote base, find its merge base with `HEAD`, and inspect
   the complete commit history and diff from that point. Stop when the branch
   has no publishable diff; otherwise the full pull-request scope is explicit.
4. Derive an accurate Conventional Commit title in the form
   `type[(scope)][!]: description` for the complete diff. Populate every required
   repository-template section; without a required template, write one short
   **BLUF** paragraph explaining what changed and why. The title and body
   represent the complete branch rather than one commit.
5. Push the current branch without rewriting remote history and create a ready
   pull request against the selected base, or a draft only when the user
   explicitly requested one. When an open pull request already represents the
   branch, use it instead of creating a duplicate. The remote branch and one
   corresponding pull request exist.
6. Verify the pull request's head, base, draft state, title, and body against the
   inspected scope and repository requirements. Return its URL and report any
   failed publication or verification with the resulting local and remote
   state.
