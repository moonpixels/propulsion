---
name: maintain-agents
description: Create or update a project's root AGENTS.md when the user or a caller requests project instructions.
---

# Maintain AGENTS.md

Keep root `AGENTS.md` lean through **progressive disclosure**. Write short instructional sentences, one concept per bullet.

## Inputs

Use the requested change, established user decisions, and existing file. Locate the project root. Treat explicit user or caller instructions as authority. Ask only about material ambiguity.

## Method

1. Read the existing file. For setup, create a missing file with only this default line. Keep it first and present exactly once, replacing equivalent wording:

    ```markdown
    - When a user correction establishes a durable project-wide instruction needed in every session, ask whether to invoke `$maintain-agents` to add it.
    ```

2. Apply the requested change with direct instructions. Preserve necessary conditions and exact commands. Update equivalent wording rather than adding duplicates. Preserve unrelated guidance during a targeted edit.
3. For a whole-file tidy, remove repetition and obsolete material while preserving intended behaviour. Ask before a substantive deletion whose intent is uncertain.
4. Follow explicit requests to include task-specific content. Apply the default line's strict reuse test only to proactive suggestions.

## Finish

Return the change or supported no-op and any unresolved ambiguity. Edit only root `AGENTS.md`.

**Done only when** rereading confirms the requested effect, short instructions, preserved meaning, no semantic duplicates, and the canonical first line exactly once.
