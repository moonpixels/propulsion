---
name: maintain-agents
description: Create, refine, or assess concise root AGENTS.md guidance when a repository-wide agent rule needs a durable home.
---

# Maintain AGENTS.md

Keep root agent guidance concise, confirmed, and relevant across the repository.

## Inputs

Use the requested addition, refinement, or assessment, the relevant user decision or caller handoff, and the root `AGENTS.md`. Locate the repository root and preserve unrelated guidance.

## Method

1. Read the existing file or create it when needed. Keep this line exactly once at the top, moving or replacing equivalent wording:

    ```markdown
    - When a user correction establishes a reusable repository-wide rule, ask whether to invoke `$maintain-agents` to add it.
    ```

2. Recommend guidance that is user-confirmed, materially changes behaviour, applies repository-wide, and cannot be inferred reliably from repository evidence. A caller's confirmed instruction supplies confirmation. If a proposed rule fails these conditions, explain the concern and obtain the user's decision before adding it; follow that decision.
3. Apply the requested change using a direct imperative with its necessary conditions. Update equivalent wording instead of adding a duplicate. Recommend the existing local authority for task-specific detail rather than expanding root guidance, unless the user directs otherwise.
4. Re-read the file for the requested effect, canonical first line, and semantic duplication.

## Finish

Return the change, supported no-op, or requested advice with any unresolved concern. Stop at root `AGENTS.md`; changes to tooling, skills, or other instruction files need their own task scope.
