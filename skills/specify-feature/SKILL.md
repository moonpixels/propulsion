---
name: specify-feature
description: Create a user-confirmed, decision-complete specification for one feature when a high-level request needs definition before ticket creation.
---

# Specify feature

Produce one specification with confirmed feature intent and a selected buildable solution. It is ready when tickets can be created without inventing behaviour or choosing a material solution.

## Inputs

Use the feature request and relevant product, glossary, ADR, research, and current-system evidence. Resolve discoverable facts first. Invoke `$elicit-with-context` whenever material user-held information or a decision remains throughout the work. Distinguish current behaviour from intended change, preserve unrelated decisions, and keep the scope to one coherent feature.

## Method

1. **Establish intent.** Resolve material outcomes, scope, actors, goals, rules, adverse paths, qualities, and acceptance boundaries. Use confirmed elicitation as authority for the feature direction. Invoke `$research` when durable external evidence is needed; its report supports facts, not product decisions.
2. **Connect complete outcomes.** Use goal-oriented use cases. Add triggers, preconditions, alternatives, failures, and recovery when they expose material behaviour. Add context-event-outcome scenarios only where they make a rule or boundary observable through an application interface or stable contract. Omit user stories that add no meaning.
3. **Select the solution.** Keep intent independent of internal implementation. Resolve consequential responsibilities, boundaries, contracts, data, integrations, failure handling, quality, migration, operation, and verification seams to the depth needed for safe ticket decomposition. Invoke `$modular-design` when a material structural choice needs resolution. Reopen intent if design reveals a behavioural gap. Leave files, classes, framework wiring, exhaustive test lists, and ticket breakdown to implementation planning.
4. **Resolve consequential uncertainty.** Settle every decision that could change scope, observable behaviour, acceptance, or the material solution. A remaining uncertainty needs evidence, consequence, affected decisions, and a resolution condition or later user-agent step that leaves ticket decomposition safe. Introduce other people or coordination only when the task or evidence requires them.
5. **Write the confirmed specification.** Create `docs/features/<feature-slug>/specification.md` using the template. Keep its stable section spine, omit immaterial conditional content, and distinguish intent from solution. Link supporting authorities instead of copying them. Use identifiers where later reference needs them and a concise diagram when it materially clarifies a state, interaction, or boundary.

## Conditional resources

Use [the specification template](assets/specification-template.md) as a coverage guide when defining and writing the feature. Depth follows ambiguity, risk, external obligations, and decomposition needs.

## Finish

Re-read the document against confirmed decisions and evidence. Check one-feature scope, material use cases and adverse paths, observable acceptance, honest uncertainty, and the reason for each consequential solution element. State each decision once and make intent-to-solution traceability clear.

Return the path, evidence, checks, and non-blocking uncertainty. Stop before ticket creation or implementation. If a material decision remains open, report it and the dependent work rather than declaring readiness.
