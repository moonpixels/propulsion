---
name: pull-request
description: Push a ready branch and create or update one pull request describing its complete outcome and validation evidence.
metadata:
    type: utility
---

# Pull request

Publish the complete branch for review using the repository's host and conventions.

## Inputs

Use the repository, current branch, intended base, request, and existing validation evidence. Resolve the host and target repository before external operations. Check the working tree and whole branch diff, including all commits since the comparison base. Ask only when the target or eligible work is materially ambiguous.

## Method

1. Invoke `$commit` when eligible uncommitted work belongs to the branch. Reuse its result and preserve excluded work.
2. Inspect the complete branch against its base. Describe the final problem, resulting behaviour, and approach for a reviewer who has not seen the conversation. Follow a repository PR template when present; otherwise use a concise summary and material validation evidence. Include test commands, outcomes, gaps, migration needs, or risks when they help assess the change. Use a Conventional Commit title unless repository guidance requires another form.
3. Push the intended branch without rewriting remote history. Create or update one matching pull request. Preserve the requested base and readiness state; avoid creating a duplicate after an uncertain tool result. Read host state before retrying a mutation.
4. Read back the published title, URL, head, base, state, and revision. Confirm that the published revision matches the intended local head and that the body describes the complete diff.

Reuse current checks; run additional validation only when required by repository instructions or needed to resolve a material evidence gap. Distinguish local evidence from remote CI status.

## Finish

Return the title and URL with any material blocker, excluded work, or validation limitation. Done when the matching pull request contains the intended revision and description. Stop before review, merge, release, or deployment.
