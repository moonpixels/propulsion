# AGENTS.md Examples

These examples show minimal protocol-style `AGENTS.md` files and pruning decisions.

## Default Rule Only

Use this when no repo-specific rule passes the admission test.

```markdown
# AGENTS.md

- When the user corrects you with a reusable, global rule, ask if they want it added to `AGENTS.md`.
```

## Environment Gotcha

Keep invisible environment constraints that can cause repeated failures.

```markdown
# AGENTS.md

- When the user corrects you with a reusable, global rule, ask if they want it added to `AGENTS.md`.
- This repo is developed inside a Linux container mounted from macOS; run file-watching commands inside the container to avoid missed changes.
```

## Hidden Landmine

Keep repo-wide operational facts that code structure hides.

```markdown
# AGENTS.md

- When the user corrects you with a reusable, global rule, ask if they want it added to `AGENTS.md`.
- `legacy/` appears unused but is imported dynamically in production; do not delete or bulk-move it without explicit approval.
- Never regenerate checked-in fixtures in `fixtures/prod/`; they are hand-sanitized production snapshots.
```

## Pruning Examples

Remove discoverable project summaries:

```markdown
- This project uses Bun, TypeScript, and React.
```

Reason: package and config files reveal the stack.

Keep mandatory verification timing when the obligation or timing is not discoverable:

```markdown
- After implementing changes run `bun run test` before handoff.
```

Reason: this is not a command inventory; it defines mandatory per-change timing that scripts alone do not reveal.

Remove command inventories:

```markdown
- Run `bun test` for tests and `bun run lint` for linting.
```

Reason: scripts and CI already document commands. Keep only a non-discoverable command caveat, such as a cache flag required to avoid false positives.

Challenge vague preferences:

```markdown
- Write clean code and keep files organized.
```

Reason: not operationally specific. Ask for a concrete repo-wide failure mode or delete it.

Relocate task-specific workflow:

```markdown
- For payment changes, update the billing PRD and run card network sandbox tests.
```

Reason: not global to every task. Move to a domain skill, command, or docs unless it truly applies to all sessions.

## Anti-Patterns

- Architecture overviews copied from docs or inferred from folders.
- Full setup instructions copied from README.
- Formatting or naming rules already enforced by tooling.
- Multiple paragraphs explaining why a rule exists inside `AGENTS.md`.
- Product-specific agent instructions instead of generic agent protocol.
