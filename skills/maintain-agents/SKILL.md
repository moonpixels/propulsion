---
name: maintain-agents
description: Initializes and compresses repository-wide agent guidance. Use when creating or improving a root AGENTS.md.
metadata:
    invocation: user
disable-model-invocation: true
---

# Maintain AGENTS.md

**Lossless compression** turns repository-wide constraints into the smallest
durable instruction surface an agent needs before reading the code.

## Steps

1. Locate the repository root and inspect the root `AGENTS.md`, applicable
   instruction layers, and task-relevant repository evidence. Read manifests,
   task-runner configuration, CI, and contributor documentation only far enough
   to identify the canonical project harness and recover the intent of existing
   guidance. The target file, active instruction chain, and candidate harness
   are explicit.
2. Classify every existing and proposed instruction. Keep only succinct
   project-wide behaviour that applies across tasks and cannot be reliably
   inferred from the relevant code, configuration, or documentation, plus a
   canonical command whose selection prevents ambiguous verification. Remove
   stale guidance, rationale, boilerplate, repository description, duplicated
   enforcement, personal preferences, and task-specific workflows. Report each
   useful displaced instruction with its smallest appropriate destination, such
   as an existing skill, a scoped instruction file, or executable enforcement;
   leave those destinations unchanged. Every retained instruction earns its
   permanent context cost.
3. Ensure the file states: `When the user corrects you with a reusable,
project-wide rule, ask whether to update AGENTS.md.` Inspect available check
   entry points and select one safe aggregate harness that represents completed
   work. When alternatives materially differ or a candidate has external side
   effects, invoke `$elicit`; when no trustworthy aggregate exists, omit the
   check instruction rather than inventing one. The correction feedback loop
   and, when available, one canonical completion check are explicit.
4. Create or rewrite only the root `AGENTS.md`. Use direct imperative lines,
   merge overlapping meanings, remove headings that add no navigation, and
   apply lossless compression until every word changes agent behaviour or
   preserves a necessary condition. The file contains one authoritative
   expression of each retained rule.
5. Re-read every line against its repository-wide scope and runtime value.
   Verify the selected harness exists and run it when it is safe and applicable.
   Return the changed file, harness result or limitation, removed instructions
   with destinations, and any unresolved conflict in the active instruction
   chain. The user receives a thin verified root instruction file and a visible
   account of displaced guidance.
