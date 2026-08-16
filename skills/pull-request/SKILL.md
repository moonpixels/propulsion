---
name: pull-request
description: Publishes the current branch as one accurate pull request. Use when the branch is ready for external review.
metadata:
    invocation: user
disable-model-invocation: true
---

# Pull Request

Publish the current branch through the repository's available setup and represent its complete committed work in one verified pull request. Treat invocation, plus resolution of any material ambiguity, as authority for its intrinsic commit, push, and pull-request mutations; do not ask for a separate application confirmation.

## Process

### 1. Establish the publication target

Inspect repository instructions and pull-request templates, Git status, the current branch and revision, remotes and upstreams, the repository's default or user-supplied base, remote branch state, available host tooling and authentication, and every pull request associated with the head branch. Resolve the exact head, base, remote, and existing pull request from this evidence. Ask only when branch ownership, the base, the remote, or a requested draft-state transition remains materially ambiguous.

Use the repository's native publication path. When none is available or authenticated, report the exact access requirement and stop. Do not publish from the default or another inappropriate protected branch; when a matching pull request is closed, merged, or otherwise not safely editable, ask how the user wants to proceed rather than creating a duplicate. The intended publication target and the one pull request to create or update are explicit before mutation.

### 2. Resolve local work

Inspect the content and ownership of all staged, unstaged, and untracked changes. When eligible coherent work belongs to the requested branch outcome, invoke `$commit` with that scope, then re-inspect the branch, revision, and complete worktree. Leave ambiguous, unrelated, ineligible, or intentionally excluded work untouched and disclose it; a dirty tree does not prevent publication when the branch's committed result is complete.

Compare the complete branch history and whole-branch diff against the chosen base, not only the latest commit or current transcript. When the base has no meaningful branch change, report that state and stop. The exact committed outcome to publish is fixed.

### 3. Prepare the complete pull request

Shape the title through **Conventional Commits** as `type[(scope)][!]: description`, truthfully summarizing the whole branch. Apply **BLUF** by starting the body directly with what the grouped change does and why. Then include concise material verification evidence and limitations, linked issue or specification context supported by the branch evidence, and breaking, migration, compatibility, or operational effects when present.

Follow explicit repository templates and instructions where they require a different shape. Do not invent tests, issue-closing keywords, links, rollout claims, or verification. Prefer an outcome summary over a commit list or file inventory. The title and body account for all material branch work without overstating its evidence.

### 4. Publish one pull request

Push the current revision with the repository's normal mechanism, setting its upstream when needed. Do not rewrite history or force-push. When the remote cannot fast-forward, authentication fails, or publication otherwise fails, preserve the current state, report the exact blocker, and stop rather than substituting a destructive or different publication route.

Create one pull request when none exists, or update the matching pull request's base, title, and body as needed for the confirmed outcome. Make a new pull request ready for review unless the user requested a draft or ready status would be dishonest. Preserve an existing pull request's draft or ready state unless the user requested or confirmed a transition, and preserve unrelated labels, reviewers, discussion, and review state.

### 5. Verify the published result

Read back the remote head revision and the pull request's identity, URL, head, base, title, complete body, and draft or ready state. Verify that the remote head equals the intended local revision and every field matches the confirmed publication. Correct an unambiguous in-scope discrepancy and read it back again; otherwise report the exact unsupported capability or external blocker.

Return whether the pull request was created or updated, its URL and verified head/base/state, the verification evidence represented, and any excluded local work or limitation. Stop without merging, approving, reviewing the author's work, releasing, deploying, deleting a branch, changing tracker state beyond supported pull-request text, or beginning implementation.
