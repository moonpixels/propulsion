---
name: elicit-with-context
description: Elicit confirmed project understanding while maintaining domain context when a bounded software task needs clarification or stress-testing.
---

# Elicit with context

Return confirmed shared understanding while keeping relevant project terminology and qualifying decision rationale current throughout the dialogue.

## Inputs

Use the bounded software task, conversation, caller's evidence and unresolved questions, and repository guidance. Supply the caller's outcome and authority boundary to the loaded skills.

## Method

1. **Load and keep active.** Read and invoke [$elicit](../elicit/SKILL.md) and [$maintain-ubiquitous-language](../maintain-ubiquitous-language/SKILL.md) **before the first question**. Apply both to the incoming context and throughout the dialogue.
2. **Dispatch ADR maintenance.** When an accepted technical or architectural choice may warrant durable rationale, or an existing ADR needs maintenance, read and invoke [$maintain-decision-records](../maintain-decision-records/SKILL.md). Supply the relevant evidence and prior decisions.
3. **Compose one dialogue.** Route the maintainers' unresolved questions through the active `$elicit` dialogue.

The maintainers own their artefacts. `$elicit` owns questioning and confirmation.

## Finish

Return `$elicit`'s confirmed synthesis and the maintainers' reports.

**Done only when** each invoked skill has fulfilled its contract. Report any unmet gate and dependent work.
