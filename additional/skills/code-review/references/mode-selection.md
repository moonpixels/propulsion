# Mode Selection

Use these parsing rules for `/review` input.

## Accepted forms

- `uncommitted`
- `branch`
- `branch <base-branch>`
- optional `--comment` flag in any position

## Uncommitted mode

- Scope includes staged, unstaged, and untracked files.
- Review only workspace changes, not prior commits.

## Branch mode

- Default base branch is `main` when user selects default.
- Custom base branch is allowed and must be validated.
- Use merge-base diff: `<base>...HEAD`.

## Validation checks

- Confirm branch exists locally or as `origin/<base>`.
- If base is missing or invalid, ask one corrective follow-up.
- If mode is missing, ask user to choose `uncommitted` or `branch`.
