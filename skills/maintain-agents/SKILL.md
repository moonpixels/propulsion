---
name: maintain-agents
description: Maintains lean root AGENTS.md files containing confirmed repository-wide guidance. Use when creating, updating, or compressing project-wide agent instructions.
metadata:
    invocation: model
disable-model-invocation: false
---

# Maintain AGENTS.md

**Progressive Disclosure** keeps root `AGENTS.md` guidance limited to confirmed, non-inferable behaviour that governs the repository as a whole, while narrower guidance stays with its discoverable owner. Adapt **Minimalist Instruction** and **DRY** to preserve each behavioural policy once in the fewest words that retain its conditions.

## Process

### 1. Establish the instruction surface

Locate the repository root. Read its `AGENTS.md` when present, the applicable instruction chain, and the existing or proposed guidance confirmed by the user or caller. Treat a caller handoff carrying an agreed preference as authority; do not ask for duplicate permission to record it. Inspect repository evidence only far enough to recover intent, scope, inferability, conflicts, and referenced commands. Invoke `$elicit-with-context` only when material authority, scope, or conflict remains unresolved. The authorised candidates and active constraints are explicit.

### 2. Allocate the guidance

Keep a rule at root only when it is confirmed, cannot be inferred reliably from repository evidence, governs the repository as a whole, and materially changes agent behaviour. Apply every gate equally to checks, tools, preferences, and overrides. A paired-repository relationship or the user's exact task-management tool choice can qualify; mere tool or script existence, framework convention, code inventory, task status, product language, workflow procedure, or directory-only rule cannot.

Ensure the root file itself contains one immediate correction loop: when a user correction establishes a reusable repository-wide rule, ask whether to add it to `AGENTS.md`. Preserve project-native wording when an equivalent confirmed rule already exists; do not add a duplicate.

Remove stale, inferable, explanatory, or narrower guidance. Report useful narrower guidance with its smallest discoverable proposed owner: an invocable skill for a reusable workflow, a scoped instruction file for a directory, executable enforcement for a mechanical rule, or the applicable product, context, or architecture authority. Leave those owners unchanged. Every candidate is retained, displaced, or removed for an explicit reason.

### 3. Write the root instructions

Create or update only the root `AGENTS.md`, preserving unrelated user work. If no candidate survives allocation or the current wording is already equivalent, make no change. Use direct imperative lines and headings only when they navigate multiple instruction groups. Retain only words that require behaviour or preserve a necessary condition. State each repository policy once: merge instructions only when the same policy change requires both statements to change, and keep independently changeable rules separate. Do not add a manifest, lifecycle state, task-tool adapter, exhaustive command list, architecture or code documentation, or skill procedure. The root file is lean and unambiguous.

### 4. Verify and hand off

Re-read every line against authority, non-inferability, repository-wide scope, behavioural value, conflicts, and semantic duplication. Verify each proposed owner and every referenced command definition before deciding whether to run it. Run applicable checks required by active guidance only when their effects, including aggregate command writes, are safe and authorised; otherwise report the limitation without weakening or replacing the check. Return the changed root file or no-op, verification evidence or limitations, displaced guidance with proposed destinations, and unresolved conflicts. Invocation authorises the agreed root edit without another application prompt. The user receives a lean verified root file without unrequested changes to narrower owners.
