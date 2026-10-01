---
name: maintain-ubiquitous-language
description: Maintain project-specific meanings in root GLOSSARY.md when terminology is added, changed, challenged, renamed, deprecated, or reconciled.
metadata:
    type: utility
---

# Maintain ubiquitous language

Keep one root `GLOSSARY.md` as the authority for project-specific terminology.

## Inputs

Use the relevant conversation or caller handoff, existing glossary, repository guidance, and the project evidence needed to understand the affected terms. A clear stable meaning in that context is resolved; a conflicting use is not.

## Method

1. Compare affected meanings with existing entries. When ambiguity, conflict, rename, or deprecation could materially change a meaning, ask one direct question distinguishing the alternatives. Preserve the entry until the meaning resolves.
2. Update resolved meanings during the surrounding work. Create the root file lazily, preserve local format and unrelated terms, and update an existing entry rather than adding a duplicate.
3. Reconcile affected entries after a resolved change. Retain aliases or deprecations only while they help interpret current project evidence.
4. Give each canonical term a short project-native definition. Group by domain when useful. General programming concepts, specifications, and implementation decisions belong in their own authorities.

## Conditional resources

Use [the glossary template](assets/glossary-template.md) when creating the first glossary.

## Finish

Return to the surrounding task after the affected meanings are consistent. Routine updates need no separate approval, verification ceremony, or handoff; use the caller's checks and reporting. If a material meaning remains unresolved, leave it unchanged and report the needed decision.
