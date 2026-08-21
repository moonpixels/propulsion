---
name: maintain-agents
description: Maintains concise root AGENTS.md instructions. Use when creating the file or adding, refining, or assessing repository-wide agent guidance.
disable-model-invocation: true
---

# Maintain AGENTS.md

Uses **Progressive Disclosure** to keep the repository's always-loaded agent guidance relevant to every request.

## Process

### 1. Establish the file

Locate the repository root and read its `AGENTS.md` when present. Create it when absent. Ensure this line appears exactly once at the top, replacing or moving equivalent wording:

```markdown
- When a user correction establishes a reusable repository-wide rule, ask whether to invoke `$maintain-agents` to add it.
```

### 2. Assess the guidance

Recommend an instruction when it is user-confirmed, cannot be inferred reliably from repository evidence, governs the repository as a whole, and materially changes agent behaviour. Treat a composing caller's confirmed instruction as user-confirmed. When an instruction fails a gate, explain the concern and ask for the user's final decision; follow that decision.

### 3. Write the instruction

Apply only the requested addition, refinement, or assessment. Use the shortest direct imperative sentence that preserves the required behaviour and conditions. State each policy once; update equivalent wording instead of adding a semantic duplicate. Leave unrelated instructions unchanged.

### 4. Verify the result

Re-read `AGENTS.md`. Confirm the canonical first line, requested outcome, minimal wording, and absence of semantic duplication. Return the change, no-op, or requested advice with any concerns.
