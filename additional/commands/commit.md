---
description: Automatically stage safe changes and create one local commit
agent: build
---

## Inputs

- Current git status: !`git status --short`
- Current git diff (staged and unstaged): !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Instructions

1. Create exactly one commit from current local changes.
2. Auto-stage relevant changes with `git add -A`, including untracked files.
3. Unstage excluded files before commit when they are staged.
4. If there are no committable changes after exclusions, stop and output exactly:
    - `No changes to commit.`
5. Generate a normal imperative commit subject from the diff, and enforce this format:
    - one line only
    - short descriptive subject line
    - imperative mood
    - normal natural wording
    - no trailing punctuation

## Rules

- NEVER commit likely secret files, ALWAYS unstage them if applicable. Exclude these patterns:
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
- DO NOT push, open PRs, amend, reset, or force anything.

## Output

Use this exact format for your output when the commit succeeds:

- Run `git status --short` before producing the final response.

```md
Commit created: <hash>
Message: <final commit message>
Files: <none|comma-separated paths>
Excluded secret-like files: <none|comma-separated paths>
```
