# Minimal AGENTS.md Examples

These examples show protocol-style files. They only include invisible, global constraints.

## Example 1: Environment Gotcha Only

```markdown
# AGENTS.md

- When the user corrects your approach with a reusable, global rule for future work, ask whether they want it added to `AGENTS.md`; if they do, load the `agentic-config` skill and update `AGENTS.md`.
- You are running in WSL on Windows; use POSIX paths and avoid Windows drive assumptions.
```

## Example 2: Hidden Landmine

```markdown
# AGENTS.md

- When the user corrects your approach with a reusable, global rule for future work, ask whether they want it added to `AGENTS.md`; if they do, load the `agentic-config` skill and update `AGENTS.md`.
- `legacy/` appears unused but is imported dynamically in production; do not delete or bulk-move it.
- Always run integration tests with `--no-cache`; cached fixtures cause false positives.
```

## Example 3: Default Rule Only

```markdown
# AGENTS.md

- When the user corrects your approach with a reusable, global rule for future work, ask whether they want it added to `AGENTS.md`; if they do, load the `agentic-config` skill and update `AGENTS.md`.
```

## Anti-Patterns to Avoid

- Full command lists copied from `package.json`.
- "Project overview" sections (stack, folder map, architecture recap).
- Generic coding style rules already enforced by tools.
