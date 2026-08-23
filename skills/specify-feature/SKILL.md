---
name: specify-feature
description: Creates a decision-complete specification for one feature. Use when a high-level feature request or capability needs collaborative definition before ticket creation.
metadata:
    type: performer
disable-model-invocation: true
---

# Specify Feature

Turns one high-level feature description into one user-confirmed specification containing both feature intent and the selected buildable solution.

## Process

### 1. Build shared understanding

Inspect the request and the project evidence relevant to the feature. Resolve discoverable facts before asking the user, and distinguish evidence of the current system from intended future behaviour.

Invoke `$elicit-with-context` with the relevant evidence and unresolved decision whenever material user-held information or a decision is needed. Use its confirmed synthesis as authority for the feature direction.

Invoke `$research` when durable external evidence is needed to resolve the feature. Use its report as evidence, not as authority for a product or solution decision.

### 2. Make the feature decision-complete

Establish **feature intent** before selecting the **solution**, and visibly reopen the affected intent when solution work exposes a behavioural gap. Use the [Feature Specification Template](assets/specification-template.md) as a coverage guide rather than a checklist: depth follows ambiguity, risk, external obligation and what ticket decomposition needs.

Use goal-oriented use cases to connect actors to complete outcomes. Add triggers, preconditions, alternatives, failures and recovery where they reveal material behaviour. Use concrete context-event-outcome scenarios only where they make a rule, boundary or acceptance outcome testable through the application's interface or another stable observable boundary. Do not add user stories when they contribute no further meaning.

Keep feature intent independent of internal implementation. Put consequential system-specific choices in the selected solution: enough responsibility, boundary, contract, data, integration, failure, quality, migration, operational and verification detail to constrain implementation, but not files, classes, framework wiring, exhaustive tests or ticket breakdown. Invoke `$modular-design` when a material structural choice needs resolving.

Resolve every decision that could change scope, observable behaviour, acceptance or the material solution. An uncertainty may remain only when ticket decomposition is still safe; record its evidence, consequence, affected decisions and the condition or later user-agent step that will resolve it. Do not invent team roles, owners, approval bodies or third-party coordination.

### 3. Write the specification

Once shared understanding covers the complete feature, create `docs/features/<feature-slug>/specification.md` from the template. Record only decisions established with the user and evidence-supported facts, keeping feature intent and selected solution visibly distinct. Preserve the stable section spine, omit immaterial conditional content and link supporting product, context, decision, research, design and current-system evidence rather than duplicating it.

Use stable semantic identifiers only where they make later reference and traceability clearer. Add a concise Mermaid diagram when a state model, interaction, boundary or runtime relationship is materially easier to understand visually.

### 4. Verify and stop

Re-read the finished document against the established decisions and cited evidence. Check that it describes one coherent feature; states each rule and decision once; covers the material use cases, adverse paths, qualities and acceptance boundaries; keeps acceptance observable; distinguishes intent from solution; traces consequential solution elements to their reason; and represents uncertainty honestly.

The specification is ready when `$create-tickets` can decompose it without inventing product behaviour or selecting a material solution. Report the path, evidence used, verification performed and any non-blocking uncertainty. Do not create tickets or implement the feature.
