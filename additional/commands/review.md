---
description: Run high-signal code review on uncommitted changes or current-branch diff with optional inline PR comments.
agent: plan
subtask: true
---

Load the `code-review` skill and follow it strictly.

## Input

User input: $ARGUMENTS

Interpret `$ARGUMENTS` as review mode plus optional flags:

- Modes:
  - `uncommitted`
  - `branch`
  - `branch <base-branch>`
- Optional flag:
  - `--comment` (post inline PR comments after validation)

If mode is missing, use the question tool:

- header: Review mode
- question: Which changes should I review?
- options:
  - `Uncommitted (Recommended)` - Review staged, unstaged, and untracked changes
  - `Branch diff` - Review current branch changes against a base branch

If mode is `branch` and base branch is missing, use the question tool:

- header: Base branch
- question: Compare current branch against which base branch?
- options:
  - `main (Recommended)` - Use `main...HEAD`
  - `Custom base branch` - I will provide another branch name

If custom base is selected, ask one follow-up question for the branch name.
Validate that branch exists locally or as `origin/<branch>`. If not found, ask one corrective question with the closest match.

## Diff Resolution

- `uncommitted` mode:
  - Review staged + unstaged diffs and include untracked file contents.
- `branch` mode:
  - Resolve base branch and review diff from merge-base: `<base>...HEAD`.

For both modes:

- Build changed file list first.
- Respect repository constraints (do not review generated output unless explicitly requested).

## Context Gathering

In parallel:

1. Gather relevant `CLAUDE.md` and `AGENTS.md` file paths:
   - root files if present
   - parent-directory scoped files for changed paths
2. Gather relevant workflow contracts from changed files:
   - touched command templates (`.opencode/commands/*.md` and global equivalents when available)
   - touched skills (`*/skills/*/SKILL.md`) and their linked `references/*.md`
   - if a reviewed command loads a skill, include that skill's `SKILL.md` + references
3. If current branch has an associated PR, fetch PR title + description for intent context.
4. Produce concise summary of selected diff scope and applicable rule sources.

## Review Workflow

Launch 4 parallel subagents to review selected diff:

- Reviewer 1: scoped compliance checks (`CLAUDE.md` / `AGENTS.md` + applicable skill/command contracts)
- Reviewer 2: consistency checks (alignment with dominant existing patterns in nearby code)
- Reviewer 3: bug/logic/compile checks constrained to changed code
- Reviewer 4: security checks constrained to changed code

Each reviewer returns candidate issues with:

- `file`
- `line`
- `lane` (`blocker`, `advisory`)
- `severity` (`critical`, `high`, `medium`, `low`)
- `category` (`rule-violation`, `skill-contract-violation`, `bug`, `compile-break`, `logic-error`, `security`, `consistency-drift`)
- `summary`
- `evidence` (quoted diff, quoted rule text, or quoted precedent snippet)
- `reason_flagged`
- `confidence` (0-100)
- `rule_source` (required for rule/contract violations)
- `precedent_refs` (required for consistency findings)

## High-Signal Policy

Keep two lanes, always on:

- `blocker`:
  - objective runtime/logic/security bugs in changed code
  - definite parse/compile/type/import breakage
  - clear scoped rule or skill/command contract violations with exact quoted rule text
- `advisory`:
  - clear consistency drift from dominant local patterns with direct precedent evidence
  - non-blocking, actionable guidance only

Never keep:

- style preferences or subjective suggestions without precedent evidence
- speculative concerns
- pre-existing issues outside selected diff
- issues typically caught by linters
- issues explicitly silenced inline

## Validation Pass (Required)

For each candidate issue, launch validation subagents in parallel:

- validator must attempt to disprove the issue first
- keep `blocker` only if validated with confidence `>= 85`
- keep `advisory` only if validated with confidence `>= 75` and precedent evidence is sufficient
- reject consistency findings when multiple equally accepted local patterns exist
- deduplicate by `(file, line, lane, category, normalized summary)`

If no issues remain, output exactly:

`No issues found. Checked blocker issues, consistency drift, and CLAUDE.md/AGENTS.md/skill-command compliance.`

## Output

If issues remain, output in two sections:

### Blocker Findings

### #<n> <short title>
<brief description and impact>

File: <path>:<line>

### Advisory Findings

### #<n> <short title>
<brief description and consistency impact>

File: <path>:<line>
Precedent: <path>:<line>[, <path>:<line>...]

## Optional Inline PR Comments (`--comment`)

If `--comment` is present:

- ensure branch has an associated PR
- post exactly one inline comment per unique validated issue (both lanes)
- prefix advisory comment titles with `[advisory]`
- use `gh` CLI only (prefer `gh api repos/{owner}/{repo}/pulls/{pr_number}/comments`)
- include citations and links in each comment:
  - relevant rule file link for rule/contract violations
  - changed code link with full commit SHA and `#Lx-Ly` range
  - precedent links for consistency findings
- do not post comments for filtered or unvalidated issues

After posting, output a compact list mapping each issue to comment location.
