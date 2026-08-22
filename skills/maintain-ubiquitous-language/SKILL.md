---
name: maintain-ubiquitous-language
description: Maintains project-specific language in CONTEXT.md. Use when explicitly invoked to add, change, challenge, rename, deprecate, or reconcile a project term.
disable-model-invocation: true
---

# Maintain Ubiquitous Language

Applies **Ubiquitous Language** by keeping project-specific terminology consistent in one root `CONTEXT.md` glossary.

## Process

### 1. Inspect the language

Inspect the relevant conversation or caller handoff, root `CONTEXT.md`, applicable repository guidance, and only the project evidence needed to understand the language. Treat a stable project-specific meaning as resolved when that context makes it clear. Challenge uses that conflict with an established term.

### 2. Update inline

Update `CONTEXT.md` as each meaning resolves, before the surrounding work continues. Do not request approval or announce the skill. Add no separate verification or handoff for a routine glossary update; follow the surrounding task's normal checks and reporting.

When ambiguity, conflict, rename, or deprecation could materially change the meaning, ask one direct question that distinguishes the alternatives. Preserve the existing entry until the answer resolves the meaning.

Create the root file lazily from the [context template](assets/context-template.md). Preserve unrelated terms and local format. Edit only affected entries, prefer updating an entry to adding a duplicate, and reconcile resolved changes across affected entries. Retain an alias or deprecation only while it helps interpret current project evidence.

Keep `CONTEXT.md` a glossary, not a specification or implementation record. Give each canonical term one short project-native paragraph; group terms by domain only when useful.
