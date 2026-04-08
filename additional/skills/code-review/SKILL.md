---
name: code-review
# prettier-ignore
description: Provide high-signal diff-based code reviews for uncommitted or branch changes with validation-first filtering, including always-on consistency checks. Use when running /review, auditing diffs, or posting validated PR comments.
---

# Agentic Code Review

Run multi-agent code review over repository diffs with strict false-positive control.

## Quick Start

    Use the code-review skill to review uncommitted changes or compare `<base>...HEAD`.

## Core Rules

- Always resolve one mode: `uncommitted` or `branch`.
- In branch mode, compare `<base>...HEAD`; default base is `main` unless user selects another.
- Rule sources are hierarchical:
  1) scoped `AGENTS.md` and `CLAUDE.md`
  2) touched command/skill contracts in the reviewed diff
  3) skill files loaded by touched command templates
- If multiple rule sources apply, enforce the stricter rule and cite the exact source file.
- If no scoped rules/contracts exist, continue with bug/security + consistency review.
- Always run two lanes: `blocker` (must-fix) and `advisory` (consistency).
- Consistency checks are always on and must compare changed code to dominant nearby patterns.
- Run independent parallel reviewers, then validate each candidate issue in a disprove-first pass.
- Keep only validated issues with concrete evidence and `file:line` references.

## High-Signal Filter

- `blocker`: deterministic bugs, definite parse/compile/type/import failures, clear scoped rule/contract violations.
- `advisory`: concrete consistency drift with precedent evidence and actionable alignment guidance.
- Never flag style nits, speculative risks, pre-existing issues, or linter-catch issues.
- Discard findings with weak evidence, conflicting local precedents, or confidence below threshold.

## Validation Thresholds

- `blocker` findings require confidence `>= 85`.
- `advisory` findings require confidence `>= 75` and precedent refs.
- Rule/contract violations must include exact quoted rule text and source path.
- Consistency findings must cite at least one dominant precedent from the same code area.

## References

- [references/mode-selection.md](references/mode-selection.md) - Mode parsing and diff sources
- [references/issue-schema.md](references/issue-schema.md) - Required issue fields and dedupe key
- [references/validation-rubric.md](references/validation-rubric.md) - Disprove-first validation checklist
- [references/comment-template.md](references/comment-template.md) - Inline comment and citation format
