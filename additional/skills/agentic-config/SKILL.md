---
name: agentic-config
description: Create or prune AGENTS.md into minimal global steering for agentic tools. Use when initializing projects, reducing redundant context, or updating reusable repo-wide agent rules.
---

# Create Minimal AGENTS.md

AGENTS.md should be a tiny global protocol, not a repository overview.

## Quick Start

```
1) Read AGENTS.md if present.
2) Preserve or add the default correction rule.
3) Remove anything discoverable from source (stack, dirs, scripts, architecture summaries).
4) Keep only non-discoverable, repo-wide, high-impact constraints.
```

## Default Rule

Always retain this line, even if it is the only line left in the file:

```markdown
- When the user corrects your approach with a reusable, global rule for future work, ask whether they want it added to `AGENTS.md`; if they do, load the `agentic-config` skill and update `AGENTS.md`.
```

## Line Admission Test

Keep every non-default line only if all are true:

- Global: applies to every task/session in this repo.
- Non-discoverable: the agent cannot reliably infer it from files.
- Operationally critical: likely to cause mistakes if missing.

If any check fails, remove the line.

## Keep

- The default correction rule above.
- Environment gotchas the agent cannot infer (path/platform quirks).
- Hidden operational landmines (legacy coupling, unsafe directories).
- Repo-wide constraints not encoded elsewhere.

## Remove

- Tech stack, versions, key directories, architecture summaries.
- Command/script inventories copied from package files.
- Style guidance already enforced by lint/format/tests.
- Task-specific workflows that belong in skills or commands.

## Output Contract

- Produce the smallest useful AGENTS.md after the default rule (often 1-20 lines).
- If no repo-specific constraints qualify, leave AGENTS.md as a one-rule file and explain why.
- Report removed categories and where that truth is already documented.

## References

- [Research process](references/research-process.md)
- [Examples](references/examples.md)
