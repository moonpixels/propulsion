---
description: Run high-signal senior-style code review on uncommitted changes or current-branch diff with optional inline PR comments.
agent: build
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

- Build the changed file list first.
- Respect repository constraints (do not review generated output unless explicitly requested).
- Read the full contents of every changed file in scope.

## Context Gathering

In parallel:

1. Gather relevant `CLAUDE.md` and `AGENTS.md` file paths:
   - root files if present
   - parent-directory scoped files for changed paths
2. Gather relevant workflow contracts from changed files:
   - touched command templates (`additional/commands/*.md`, `.opencode/commands/*.md`, and global equivalents when available)
   - touched skills (`*/skills/*/SKILL.md`)
   - linked `references/*.md` only as supporting context unless they contain exact quoted rule text
   - if a reviewed command loads a skill, include that skill's `SKILL.md` + references
3. If current branch has an associated PR, fetch PR title + description for intent context.
4. If the PR description explicitly links a repo file path, a docs plan under `docs/propulsion/`, or an issue/PR identifier, fetch only those explicitly linked artifacts for requirement context.
5. If no PR exists, use any explicit user-stated review goal from the surrounding request as intent context; otherwise do not infer hidden requirements.
6. For each changed file, gather at most two one-hop adjacent context files when they are:
   - directly imported or referenced by the changed code
   - the likely canonical home for duplicated or misplaced logic in the same module area
   - explicitly linked by the PR description or reviewed contract
7. Produce a concise summary of selected diff scope, gathered context, and applicable rule sources.

## Review Workflow

Launch 7 parallel subagents to review the selected diff:

- Reviewer 1: scoped compliance checks (`CLAUDE.md` / `AGENTS.md` + applicable skill/command contracts)
- Reviewer 2: correctness, runtime, logic, and compile checks constrained to changed code
- Reviewer 3: security and non-trivial performance checks constrained to changed code
- Reviewer 4: architecture, abstraction placement, duplication, ownership boundaries, and maintainability regressions
- Reviewer 5: tests and verification quality for changed behavior
- Reviewer 6: consistency checks against dominant nearby patterns
- Reviewer 7: PR-intent and requirement-alignment checks using PR title/description when available, otherwise any explicit user-stated review goal, plus any explicitly linked planning artifacts

Each reviewer returns candidate issues with:

- `file`
- `line`
- `lane` (`blocker`, `important`, `advisory`)
- `severity` (`critical`, `high`, `medium`, `low`)
- `category` (`rule-violation`, `skill-contract-violation`, `bug`, `compile-break`, `logic-error`, `security`, `performance`, `architecture`, `maintainability`, `duplication`, `test-gap`, `requirement-drift`, `consistency-drift`)
- `summary`
- `evidence` (quoted diff, quoted rule text, quoted precedent snippet, or concrete principle-backed code evidence)
- `evidence_type` (`diff`, `rule-text`, `precedent`, `principle`, `intent-context`)
- `impact`
- `confidence` (0-100)
- `rule_source` (required for rule/contract violations)
- `precedent_refs` (required for consistency findings and precedent-backed non-blockers)
- `intent_refs` (required for requirement-drift and intent-backed important findings)
- `principle_basis` (required for principle-backed non-blockers)

## High-Signal Policy

Keep three lanes, always on:

- `blocker`:
  - objective runtime/logic/security bugs in changed code
  - definite parse/compile/type/import breakage
  - clear scoped rule or skill/command contract violations with exact quoted rule text
- `important`:
  - duplicated business logic or second sources of truth introduced by the diff
  - wrong abstraction or ownership placement for changed behavior
  - meaningful maintainability or complexity regressions with concrete impact
  - requirement drift from stated PR intent or explicitly linked plan context
  - test gaps that materially weaken protection for changed behavior
  - non-trivial performance or resource regressions in changed code
- `advisory`:
  - clear consistency drift from dominant local patterns with direct evidence
  - non-blocking maintainability guidance with a concrete alignment path

Never keep:

- style preferences or subjective suggestions without strong precedent or principle evidence
- speculative concerns
- pre-existing issues outside selected diff
- routine lint, formatter, or typecheck-only issues already expected from CI, unless the issue is a deterministic blocker directly evident in the diff
- architecture complaints that rely on hypothetical future needs

## Validation Pass (Required)

For each candidate issue, launch validation subagents in parallel:

- validator must attempt to disprove the issue first
- keep `blocker` only if validated with confidence `>= 85`
- keep `important` only if validated with confidence `>= 80` and the code-health impact is concrete
- keep `advisory` only if validated with confidence `>= 75` and supporting evidence is sufficient
- reject consistency findings when multiple equally accepted local patterns exist
- reject maintainability, architecture, duplication, and test-gap findings when evidence is vague, impact is weak, or the issue is too small for a real review comment
- deduplicate by `(file, line, lane, category, normalized summary)`

If no issues remain, output exactly:

`No issues found. Checked blocker issues, important code-health regressions, advisory consistency or maintainability drift, and CLAUDE.md/AGENTS.md/skill-command compliance.`

If something relevant remained unverified, add one short follow-up line:

`Residual risk: <brief unverified area>`

## Output

If issues remain, output in this order:

### Blocker Findings

### #<n> <short title>
<brief description and impact>

File: <path>:<line>

### Important Findings

### #<n> <short title>
<brief description and why the author should fix it before merge>

File: <path>:<line>

Include one of:
- Precedent: <path>:<line>[, <path>:<line>...]
- Principle: <named principle>
- Intent: <PR description or linked artifact ref>

### Advisory Findings

### #<n> <short title>
<brief description and consistency or maintainability impact>

File: <path>:<line>

Include one of:
- Precedent: <path>:<line>[, <path>:<line>...]
- Principle: <named principle>
- Intent: <PR description or linked artifact ref>

### Assessment

Ready: `yes`, `with fixes`, or `no`

Reasoning: <1-2 concise sentences>

## Optional Inline PR Comments (`--comment`)

If `--comment` is present:

- if mode is `uncommitted`, do not attempt posting; append `Inline comments skipped: --comment requires branch mode with an associated PR.`
- ensure branch has an associated PR
- post exactly one inline comment per unique validated `blocker` or `important` issue
- never post `advisory` findings as inline comments
- prefix blocker comment titles with `[blocker]`
- prefix important comment titles with `[important]`
- use `gh` CLI only (prefer `gh api repos/{owner}/{repo}/pulls/{pr_number}/comments`)
- include citations and links in each comment:
  - relevant rule file link for rule/contract violations
  - changed code link with full commit SHA and `#Lx-Ly` range
  - precedent links for consistency or precedent-backed important findings
- name the principle explicitly for any principle-backed important finding
- do not post comments for filtered or unvalidated issues

After posting, output a compact list mapping each posted issue to comment location.
