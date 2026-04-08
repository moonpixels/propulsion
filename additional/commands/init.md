---
description: Create or prune AGENTS.md into minimal global steering for this project
agent: build
---

You are initializing OpenCode by creating or pruning AGENTS.md into minimal global steering.

## Your Task

Load the `agentic-config` skill and follow it strictly.

## Process

1. **Load the skill**
   Load `agentic-config` immediately.

2. **Read existing AGENTS.md first**
   If `AGENTS.md` exists, read it end-to-end before editing.

3. **Prune aggressively**
   Remove anything discoverable from repository files, including:
   - Tech stack summaries
   - Directory maps
   - Script/command inventories
   - Architecture recaps
   - Generic style/process rules already enforced by tooling

4. **Keep only invisible global constraints**
   Keep or add a line only if all are true:
   - Global: applies to every task
   - Non-discoverable: cannot be reliably inferred from files
   - High impact: likely to cause mistakes if missing

5. **Write the smallest useful file**
   Prefer a short protocol-style AGENTS.md (often 0-20 lines).
   If no qualifying constraints exist, leave the file near-empty.

6. **Explain the changes**
   Report:
   - What was kept and why
   - What was removed and why
   - Where removed information is already discoverable

## Principle

Trust exploration for discoverable facts. Use skills/commands for task-scoped steering. Keep AGENTS.md minimal.

## Output

Create or update `AGENTS.md` in the project root, then provide a concise keep/remove rationale.
