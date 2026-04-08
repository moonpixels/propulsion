# Pruning-First Process for AGENTS.md

Use this workflow when creating or updating AGENTS.md under the minimal-context model.

## 1) Read the Existing File First

1. Read `AGENTS.md` end-to-end.
2. Preserve or add the default correction rule before pruning anything else.
3. Treat every other line as suspect until it passes the admission test.

## Default Rule

Always keep this line, even when no repo-specific constraints survive:

```markdown
- When the user corrects your approach with a reusable, global rule for future work, ask whether they want it added to `AGENTS.md`; if they do, load the `agentic-config` skill and update `AGENTS.md`.
```

## 2) Classify Every Line

For each non-default line, decide `keep` or `remove`.

- Keep only if it is global, non-discoverable, and operationally important.
- Remove if it is discoverable from repository files.

## 3) Remove Common Redundant Buckets

Delete these by default:

- Tech stack and versions
- Key directories and architecture summaries
- Command/script inventories from `package.json`/build files
- General style conventions that tooling already enforces

## 4) Preserve Only Invisible Logic

Typical keepers:

- Environment-specific gotchas the agent cannot infer
- Hidden coupling and landmines not obvious from code structure
- Repo-wide constraints not encoded in config/tooling

## 5) Draft the Smallest Useful File

1. Prefer a short protocol-style file.
2. If no repo-specific line qualifies, keep AGENTS.md as the default rule only.
3. Push task-scoped guidance into skills/commands.

## 6) Validate Before Finalizing

1. The default rule is present exactly once.
2. Every other line passes the admission test.
3. No duplicated truths from source files.
4. No section filler added to hit a line count target.
5. Output includes a short keep/remove rationale.
