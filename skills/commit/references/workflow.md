# Commit Workflow Reference

## Inputs

- Current git status: `git status --short`
- Current git diff, staged and unstaged: `git diff HEAD`
- Current branch: `git branch --show-current`

## Secret-Like Exclusions

Never commit likely secret files. Always unstage staged files matching these patterns before committing:

- `.env`
- `.env.*`
- `*.pem`
- `*.key`
- `*.p12`
- `*.pfx`
- `credentials.json`
- `*credentials*`
- `*secret*`
- `*token*`
- `.ssh/*`

## Commit Message

Use a normal imperative commit subject with this format:

- one line only
- short descriptive subject line
- imperative mood
- normal natural wording
- no trailing punctuation

## No Committable Changes Output

If no staged changes remain after exclusions, stop and output exactly:

```md
No changes to commit.
```

## Success Output

Run `git status --short` before producing the final response. When the commit succeeds, output exactly:

```md
Commit created: <hash>
Message: <final commit message>
Excluded secret-like files: <none|comma-separated paths>
```
