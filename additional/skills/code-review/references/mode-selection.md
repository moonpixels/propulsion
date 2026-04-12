# Mode Selection

Use this reference when resolving review scope.

## Accepted forms

- `#<pr-number>`
- `uncommitted`
- `branch`
- `branch <base-branch>`

No other scope forms are supported.

## PR-first scope rule

- If an explicit PR reference is provided, that is the primary review scope.
- Resolve explicit PR references with `gh pr view <number> --json number,title,body,baseRefName,headRefName,files`.
- For explicit PR review, use GitHub PR metadata for base branch, head branch, changed files, title, body, and linked artefact discovery.
- If the current branch has an associated PR, prefer the PR as review scope for branch review.
- If the current branch has an associated PR, prefer the PR title, description, and explicitly linked artefacts as intent context even for local fallback review.
- If no PR exists, fall back to the requested local mode.
- If no PR exists, use explicit user-stated review goals when intent context is needed.

## Uncommitted mode

- Scope includes staged, unstaged, and untracked files.
- Review only workspace changes, not prior commits.

## Branch mode

- Default base branch is `main` when the user selects the default.
- Custom base branch is allowed and must be validated.
- Use merge-base diff: `<base>...HEAD`.

## Validation checks

- Confirm explicit PR references match `#<number>`.
- Confirm branch exists locally or as `origin/<base>`.
- If PR lookup fails, ask one corrective follow-up instead of guessing another PR.
- If base is missing or invalid, ask one corrective follow-up.
- If mode is missing, ask the user to choose PR review, `branch`, or `uncommitted`.
- If the resolved scope has no reviewable file changes, still return the standard review report and state that the scope was empty.

## Rules

- DO accept only the documented mode forms.
- ALWAYS preserve explicit PR scope before branch or uncommitted fallback.
