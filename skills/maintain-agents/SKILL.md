---
name: maintain-agents
description: Creates and compresses lean root AGENTS.md files. Use when initializing or improving repository-wide agent guidance.
metadata:
    invocation: user
disable-model-invocation: true
---

# Maintain AGENTS.md

**Progressive Disclosure** keeps root `AGENTS.md` guidance limited to behaviour every repository task needs while narrower instructions remain discoverable on demand.

## Process

### 1. Inspect the instruction surface

Locate the repository root. Read the root `AGENTS.md`, applicable instruction layers, and enough manifests, task runners, CI, and contributor documentation to recover each rule's intent and identify project checks. The target, instruction chain, rules, and check entry points are explicit.

### 2. Allocate the guidance

Classify every existing and proposed instruction by runtime scope. Retain only concise behaviour governing the whole repository, plus the required correction and completion instructions. Report useful narrower guidance with its smallest discoverable owner: an invocable skill for reusable workflows, a scoped instruction file for directory rules, or executable enforcement for mechanical constraints. Leave destinations unchanged. Discard stale guidance, rationale, boilerplate, repository description, personal preferences, and task-, component-, or workflow-specific instructions. Every retained rule earns its permanent context cost.

### 3. Establish the required guidance

Ensure the file states: `Ask immediately whether to add a reusable repository-wide rule to AGENTS.md when a user correction establishes it.` When project checks exist, add one instruction to run them after implementation and before handoff. Prefer one canonical aggregate command covering the configured suites; otherwise list every applicable individual command. Invoke `$elicit` when candidates materially differ or a command has unusual external effects. Omit the instruction only when no project checks exist. The correction loop and completion commands are explicit.

### 4. Write the root instructions

Create or rewrite only the root `AGENTS.md`. Use direct imperative lines. Remove headings unless they navigate multiple instruction groups. Apply **Minimalist Instruction** until every word changes behaviour or preserves a necessary condition. Apply **DRY** to meaning: when changing one rule requires changing multiple instructions, merge them into one authoritative expression. No semantic duplicates remain.

### 5. Verify and hand off

Re-read every line for repository-wide scope, behavioural value, and semantic duplication. Verify each command exists; run the checks after implementation and before handoff when safe and applicable. Return the changed file, check results or limitations, displaced guidance with destinations, and unresolved conflicts. The user receives a lean verified root file and a visible account of displaced guidance.
