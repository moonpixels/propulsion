# Mode Selection

Use this reference when resolving review scope.

## Accepted Forms

- `#<pr-number>`
- PR URL
- `base...head`

No other scope forms are supported.

## PR Scope

- Confirm explicit PR numbers match `#<number>`.
- Accept GitHub PR URLs as explicit PR scope.
- Require `gh` installed, authenticated, and able to access the repository only for PR scopes.
- Resolve PR scope with `gh pr view <number-or-url> --json number,title,body,baseRefName,headRefName,headRefOid,baseRefOid,files,url`.
- Use GitHub PR metadata for base ref, head ref, changed files, title, body, and linked artefact discovery.
- If PR lookup fails, ask one corrective follow-up for a valid PR number or URL instead of guessing another PR.

## Range Scope

- Confirm range input contains exactly one `...` separator with non-empty `base` and `head` refs.
- Validate both refs with `git rev-parse --verify <ref>^{commit}` before reviewing.
- If either ref is missing or invalid, ask one corrective follow-up for a valid `base...head` range; do not substitute another ref.
- Review the merge-base diff for the exact range, equivalent to `git diff <base>...<head>`.
- Use changed files from the exact merge-base diff.
- Use explicit user-stated review goals when intent context is needed.

## Validation Checks

- If scope is missing or unclear, ask the user for a PR number, PR URL, or `base...head` before review begins.
- If the resolved scope has no reviewable file changes, still return the standard review report and state that the scope was empty.

## Rules

- DO accept only the documented scope forms.
- DO NOT infer scope from the current checkout.
- DO NOT require GitHub CLI for `base...head` range review.
