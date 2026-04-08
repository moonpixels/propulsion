---
description: Auto-stage safe changes and create an ultra-concise commit
agent: build
subtask: true
---

User input: $ARGUMENTS

## Context

- Current git status: !`git status --short`
- Current git diff (staged and unstaged): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits (style reference): !`git log --oneline -10`

## Task

Create exactly one commit from current local changes.

## Rules

1. Auto-stage relevant changes (`git add -A`), including untracked files.
2. Never commit likely secret files. Exclude these patterns:
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
3. If excluded files are staged, unstage them before commit.
4. If there are no committable changes after exclusions, stop and output exactly:
   - `No changes to commit.`
5. Generate a commit message from the diff and recent commit style, but enforce this format:
   - one line only
   - 2-5 words preferred (hard max 6 words)
   - extremely concise
   - grammar may be rough
   - omit filler words (`the`, `a`, `an`, `to`, `for`, `of`, `and`)
   - no trailing punctuation
6. If `$ARGUMENTS` is not empty, treat it as an intent hint for wording.
7. Do not push, open PRs, amend, reset, or force anything.

## Output

After committing, run `git status --short` and report:

- commit hash
- final commit message
- files included in commit
- excluded secret-like files (if any)
