---
name: commit
description: Create one safe local git commit from current changes. Use when asked to commit, save changes, or make a local checkpoint.
---

# Commit

Create exactly one local git commit from safe current changes and report the result.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- The current directory is inside a git repository with a writable index.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Inspect current state with `git status --short`, `git diff HEAD`, and `git branch --show-current`.
2. Stage all local changes with `git add -A`, including untracked files.
3. Unstage every staged secret-like file matching [references/workflow.md](references/workflow.md).
4. Check staged changes after exclusions. If none remain, stop and output exactly `No changes to commit.`
5. Generate a one-line imperative commit subject from the staged diff.
6. Create exactly one local commit with that subject.
7. Run `git status --short` before the final response.
8. Report the result using the exact success format in [references/workflow.md](references/workflow.md).

## Rules

These rules are MANDATORY.

- MUST create exactly one local commit when committable changes remain after exclusions.
- MUST stage with `git add -A` before applying exclusions.
- MUST unstage secret-like files before committing when they are staged.
- MUST stop with exactly `No changes to commit.` when exclusions leave no committable changes.
- NEVER commit secret-like files.
- NEVER push, open pull requests, amend, reset, force, or run destructive git commands unless user explicitly instructs.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] `git add -A` was run.
- [ ] Secret-like staged files were unstaged or none were present.
- [ ] Exactly one local commit was created, or `No changes to commit.` was returned.
- [ ] No push, pull request, amend, reset, force, or destructive git command was run.
- [ ] Final output matches the required contract.

## References

Use these references when you need detail.

- [references/workflow.md](references/workflow.md) - Secret-like exclusion patterns, commit message rules, and output contract.
