---
name: code-review
# prettier-ignore
description: Use when running /review or auditing diffs for real bugs, code-health regressions, and maintainability issues with validation-first filtering and low review noise.
---

# Agentic Code Review

Run multi-agent code review over repository diffs with strict false-positive control.

## Quick Start

    Use the code-review skill to review uncommitted changes or compare `<base>...HEAD`.

## Core Rules

- Always resolve one mode: `uncommitted` or `branch`.
- In branch mode, compare `<base>...HEAD`; if base is omitted, ask and use `main` only when the user selects the default.
- Build the changed file list first and exclude generated output unless the user explicitly asks for it.
- Always read the full contents of every changed file in scope.
- For each changed file, read at most two one-hop adjacent context files when they are directly referenced, are the likely canonical home for duplicated or misplaced logic, or are explicitly linked by the PR description or reviewed contract.
- When a PR exists, always use its title and description for intent context; only load extra planning or issue context when that artifact is explicitly linked.
- Rule sources are hierarchical:
  1) scoped `AGENTS.md` and `CLAUDE.md`
  2) touched command/skill contracts in the reviewed diff
  3) skill files loaded by touched command templates
- If multiple rule sources apply, enforce the stricter rule and cite the exact source file.
- Treat linked references as supporting context unless they state an explicit rule or contract that can be quoted exactly.
- Always run three lanes: `blocker`, `important`, and `advisory`.
- `important` findings are part of the core review surface, not optional polish.
- Report only issues the PR author would likely fix if made aware of them.
- Run independent parallel reviewers, then validate each candidate issue in a disprove-first pass.
- Keep only validated issues with concrete evidence and `file:line` references.

## High-Signal Filter

- `blocker`: deterministic bugs, definite parse/compile/type/import failures, security issues, or clear scoped rule/contract violations.
- `important`: concrete code-health regressions introduced by the diff, including wrong abstraction placement, duplicated business logic, second sources of truth, meaningful maintainability drift, requirement drift, non-trivial performance issues, and test gaps that materially weaken protection for changed behavior.
- `advisory`: non-blocking consistency or maintainability guidance with strong evidence and an actionable alignment path.
- Keep `important` and `advisory` findings objective: tie them to changed code, concrete impact, and either strong precedent or a named code-health principle.
- Never flag style nits, subjective preferences, speculative risks, pre-existing issues, or linter-catch issues.
- Discard findings with weak evidence, unclear impact, conflicting local precedents, or confidence below threshold.

## Validation Thresholds

- `blocker` findings require confidence `>= 85`.
- `important` findings require confidence `>= 80` and a concrete code-health impact.
- `advisory` findings require confidence `>= 75` and sufficient precedent or principle evidence.
- Rule/contract violations must include exact quoted rule text and source path.
- Consistency findings must cite at least one dominant precedent from the same code area.
- Principle-backed `important` findings must cite changed code, name the principle, and explain the maintenance, ownership, testing, or correctness cost.
- Inline PR comments are for validated `blocker` and `important` findings only.

## References

- [references/mode-selection.md](references/mode-selection.md) - Mode parsing and diff sources
- [references/review-axes.md](references/review-axes.md) - Canonical review dimensions and reviewer questions
- [references/high-signal-examples.md](references/high-signal-examples.md) - Report / do-not-report examples
- [references/issue-schema.md](references/issue-schema.md) - Required issue fields and dedupe key
- [references/validation-rubric.md](references/validation-rubric.md) - Disprove-first validation checklist
- [references/comment-template.md](references/comment-template.md) - Inline comment and citation format
