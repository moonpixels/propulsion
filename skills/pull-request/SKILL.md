---
name: pull-request
description: Publish a branch with a Conventional Commit title and succinct description when asked to open or update its pull request.
---

# Pull request

Publish the complete branch as **one matching open pull request** with a relevant title and description.

## Inputs

Use the request, repository guidance, Git configuration and state, and live host state. Resolve the host, target repository, named head branch, and base before publication. Use an existing matching PR's base and readiness unless the request changes them. Ask only when inspection leaves a material ambiguity.

## Method

1. Read [$commit](../commit/SKILL.md) for the title conventions. Invoke it whenever uncommitted changes exist. Continue only after it completes.
2. Inspect the complete branch diff against its base, including earlier commits. Invoke [$write-prose](../write-prose/SKILL.md) for a Conventional Commit title summarising the full change and a succinct description covering **what changed, why, and the resulting behaviour**. Keep required PR template fields and material evidence or limitations. Reuse valid checks and distinguish local evidence from remote CI status.
3. Push the intended branch without rewriting remote history. Reuse a matching open PR and check its title and description against the full diff and these requirements. Update either when stale or noncompliant. Otherwise create one PR, ready by default. Preserve an existing PR's readiness unless directed to change it. After an uncertain mutation result, read host state before retrying to avoid duplicates.
4. Read back the PR's URL, title, body, head, base, readiness, and published revision. Verify that the revision matches the intended local head and that the metadata describes the complete change.

## Finish

Return the PR title and URL with any blocker or material validation limitation.

**Done only when** all uncommitted work is recorded and the matching open PR contains the intended revision, base, readiness, title, and description. Report failures with remaining work preserved. Stop before review, merge, release, deployment, or ongoing CI monitoring.
