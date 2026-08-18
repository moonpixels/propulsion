---
name: maintain-ubiquitous-language
description: Maintains confirmed project-specific language in CONTEXT.md. Use when explicitly invoked to add, change, challenge, rename, deprecate, or reconcile a project term.
disable-model-invocation: true
---

# Maintain Ubiquitous Language

Adapted **Ubiquitous Language** keeps project-specific terminology consistent in one root `CONTEXT.md` glossary.

## Process

### 1. Inspect the language

Inspect the relevant conversation or caller handoff, root `CONTEXT.md`, applicable repository guidance, and only the project evidence needed to understand the introduced, changed, misused, or contradicted language. Challenge inconsistent uses of established terms. Make the candidate term, current meaning, and any contradiction explicit without loading unrelated project context.

### 2. Resolve the meaning

Accept terminology established by authoritative project evidence or explicitly agreed with the user. A caller's agreed in-scope update supplies authority to persist that meaning without another permission prompt. When a material meaning, conflict, rename, or deprecation remains unresolved, ask the user one direct question that distinguishes the current and proposed meanings and recommends one only when the evidence supports it. Leave the existing glossary unchanged until the answer confirms one meaning.

### 3. Update the glossary inline

As confirmed language arises, update `CONTEXT.md` before the surrounding work continues. Create the root file lazily from the [context template](assets/context-template.md). Preserve unrelated terms and the document's local format; edit only affected entries and prefer changing an existing entry to adding a duplicate. Reconcile a confirmed change across affected entries. Retain an alias or deprecation only while it helps interpret current project evidence, and remove obsolete wording only when its replacement is confirmed and losing it will not obscure that evidence.

Keep `CONTEXT.md` as a glossary of project-specific domain language. Give each canonical term one short paragraph, normally one or two sentences, using project-native wording; group terms by domain only when useful. Leave implementation and specifications to their authoritative sources.
