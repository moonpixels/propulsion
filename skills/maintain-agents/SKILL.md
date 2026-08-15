---
name: maintain-agents
description: Maintains lean root AGENTS.md files containing confirmed repository-wide guidance. Use when creating, updating, or compressing project-wide agent instructions.
metadata:
    invocation: user
disable-model-invocation: true
---

# Maintain AGENTS.md

**Progressive Disclosure** keeps root `AGENTS.md` guidance limited to behaviour every repository task needs while narrower instructions remain discoverable only when relevant.

## Process

### 1. Establish the instruction surface

Locate the repository root. Read its `AGENTS.md` when present, the applicable instruction chain, and the existing or proposed guidance confirmed by the user or caller. Inspect repository evidence only far enough to recover each rule's intent, determine whether a candidate is inferable, and verify referenced commands. Invoke `$elicit` when authority, scope, or conflicting guidance requires a material user decision. The authorised candidates and active constraints are explicit.

### 2. Allocate the guidance

Keep a rule at root only when it is confirmed, cannot be inferred reliably from repository evidence, and governs the repository as a whole. Ensure the root file itself states the immediate correction loop: when a user correction establishes a reusable repository-wide rule, ask whether to add it to `AGENTS.md`. Apply the same retention gate to checks, tools, preferences, and overrides; their existence does not authorise a new root rule.

Remove stale, inferable, explanatory, or narrower guidance. Report useful narrower guidance with its smallest discoverable owner—an invocable skill for reusable workflows, a scoped instruction file for directory rules, or executable enforcement for mechanical constraints—and leave that destination unchanged. Every candidate is retained, displaced, or removed for an explicit reason.

### 3. Write the root instructions

Create or rewrite only the root `AGENTS.md`. Use direct imperative lines and headings only when they navigate multiple instruction groups. Retain only words that require behaviour or preserve a necessary condition. State each repository policy once: merge instructions only when the same policy change would require both to change, and keep independently changeable rules separate. The root file is lean and unambiguous.

### 4. Verify and hand off

Re-read every line for confirmed authority, non-inferability, repository-wide scope, behavioural value, conflicts, and semantic duplication. Verify each referenced command and reported destination. Inspect a command's definition before running it; run applicable checks required by active confirmed guidance only when their effects are safe and authorised, otherwise report the limitation. Return the changed root file, verification evidence or limitations, displaced guidance with destinations, and unresolved conflicts. The user receives a lean verified root file without unrequested changes to narrower owners.
