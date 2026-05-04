# Minimal AGENTS.md Process

Use this workflow when creating, pruning, or updating `AGENTS.md` under the strict minimal-context policy.

## 1. Inspect Before Editing

Launch a fresh explorer subagent to read enough repository evidence to avoid duplicating discoverable facts:

- Existing `AGENTS.md` files, including parent or nested files that may apply.
- Package manifests, task runners, Makefiles, build files, and test configs.
- Formatter, linter, TypeScript, CI, and editor config.
- Docs that already describe setup, scripts, architecture, or conventions.
- Source layout and naming patterns when they answer a proposed rule.

Do not add repository summaries. Inspection exists to identify what does not belong in `AGENTS.md`.

## 2. Ask For Invisible Rules

Use the existing `interrogate` skill to ask the user for rules the repository cannot reliably reveal. Focus on:

- Human protocol that must persist across sessions.
- Hidden operational landmines, unsafe directories, or legacy coupling.
- Environment quirks not encoded in config.
- Repo-wide constraints not enforced by code, tests, lint, CI, or docs.
- Mandatory verification timing that applies to every change but is not reliably encoded in scripts, docs, or CI.

If the user gives candidate rules, classify them instead of accepting them uncritically.

## 3. Preserve The Default Correction Rule

Keep this rule near the top, even when it is the only surviving rule:

```markdown
- When the user corrects you with a reusable, global rule, ask if they want it added to `AGENTS.md`.
```

Do not keep older variants that prescribe loading a skill or editing the file after the user answers. Replace them with the ask-only wording.

## 4. Apply The Admission Test

Keep every non-default line only if all checks pass:

- Global: applies to every task or session in this repository.
- Non-discoverable: an agent cannot reliably infer it from repository files, tooling, docs, or scripts.
- Operationally important: missing it is likely to cause mistakes, wasted effort, unsafe edits, or broken workflow.

Mandatory per-change verification timing can pass the non-discoverable check when the obligation or handoff timing is not reliably encoded in tooling, scripts, docs, or CI.

If any check fails, challenge the rule or remove it.

## 5. Challenge Weak Instructions

Push back on candidates that are:

- Discoverable from source, config, package files, or docs.
- Task-specific workflows that belong in a skill, command, issue, or PRD.
- Style preferences enforced by formatter, linter, types, or tests.
- Generic good advice that applies to all repositories.
- Vague intent without operational consequence.
- Bloated multi-line explanations that can be compressed into one actionable rule.

When challenging, explain the failed admission check and suggest the smaller replacement, a better home, or deletion.

## 6. Draft The Smallest Useful File

Prefer a short protocol file:

1. Put the default correction rule first or near the top.
2. Put always-followed repo-wide rules immediately after it.
3. Group only when grouping improves scanning; avoid section filler.
4. Keep only the final accepted rules, not the rationale.
5. If nothing repo-specific qualifies, leave a one-rule file.

## 7. Validate Before Handoff

Before finishing, verify:

- The default correction rule appears exactly once and is ask-only.
- Every retained non-default line passes the admission test.
- Discoverable facts are not duplicated from repository evidence.
- Always-followed rules remain near the top.
- Existing intended behaviour is preserved unless explicitly removed after challenge.
- Handoff reports kept, removed, challenged, and relocated categories.
