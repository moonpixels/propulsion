---
name: init-project
description: Create or prune AGENTS.md into minimal global steering for agents. Use when initializing, updating, or reducing repo-wide agent rules.
---

# Init Project

Create or prune `AGENTS.md` as tiny global protocol, not a repo overview.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Launch a fresh explorer subagent before editing to inspect existing `AGENTS.md` files, package/tool configs, docs, scripts, and visible conventions.
2. Load `interrogate` to gather global, non-discoverable instructions the repository cannot reveal, including human protocol, hidden landmines, environment gotchas, and verification timing.
3. Preserve or add the default correction rule near the top of `AGENTS.md`.
4. Apply the line admission test to every candidate rule: global, non-discoverable, and operationally important.
5. Challenge weak or bloated candidates before keeping them; remove rules that fail the admission test or belong in code, config, docs, skills, or commands.
6. Draft the smallest useful `AGENTS.md`, keeping always-followed rules near the top.
7. Handoff with the changed file path plus kept, removed, and challenged rule categories.

## Rules

These rules are MANDATORY.

- MUST launch a fresh explorer subagent before creating, pruning, or rewriting `AGENTS.md`.
- MUST use `interrogate` skill for human-only, repo-wide rules that repository inspection cannot discover.
- MUST keep only rules that pass all admission checks: global, non-discoverable, operationally important.
- MUST challenge or remove vague, task-specific, discoverable, duplicated, or low-impact instructions.
- MUST use this default correction rule: "- When the user corrects you with a reusable, global rule, ask if they want it added to `AGENTS.md`."
- DO NOT include tech stack summaries, folder maps, command inventories, architecture recaps, or style rules already enforced by tooling.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Fresh explorer subagent completed repository inspection before edits.
- [ ] `interrogate` skill was used for non-discoverable global rules or existing user-provided rules were explicitly classified.
- [ ] Default correction rule is present once and near the top.
- [ ] Every retained non-default line passes the admission test.
- [ ] Weak or bloated candidates were challenged or removed.
- [ ] Intended `AGENTS.md` behaviour is preserved and summarised before handoff.

## References

Use these references when you need detail.

- [references/process.md](references/process.md) - End-to-end creation and pruning process for minimal `AGENTS.md` files.
- [references/examples.md](references/examples.md) - Good examples, pruning examples, and anti-patterns.
