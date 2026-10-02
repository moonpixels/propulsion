---
name: elicit-with-context
description: Resolve material user-held information and decisions in a software project while maintaining its shared terminology and qualifying decision rationale.
---

# Elicit with context

Return confirmed shared understanding with relevant project context kept current.

## Inputs

Use the bounded software task, conversation, caller's evidence and unresolved questions, and applicable project guidance. Keep the caller's intended output and authority boundary explicit.

## Method

Maintain context before dependent questioning and throughout the dialogue, including meanings and accepted decisions already resolved in the supplied context:

- Apply `$maintain-ubiquitous-language` as project-specific meanings resolve.
- Invoke `$maintain-decision-records` when an accepted technical or architectural decision may warrant durable rationale.
- Invoke `$elicit` to resolve the remaining user-held information and decisions.

Rely on each skill's public contract. Keep implementation, product or feature documents, tickets, and external actions with the caller.

## Finish

Return `$elicit`'s confirmed synthesis and any material context change or blocker. Completion requires confirmed understanding; a glossary or ADR update does not substitute for it.
