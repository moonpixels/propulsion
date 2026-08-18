---
name: specify-feature
description: Defines one substantial feature or enhancement as approved, observable product intent. Use when a product capability or agreed feature idea needs a durable specification before solution design.
metadata:
    invocation: user
disable-model-invocation: true
---

# Specify Feature

Defines one substantial feature or enhancement without selecting its implementation. **Goal-oriented use cases** connect actors and beneficiaries to complete observable journeys; selective **Specification by Example** turns ambiguous rules and acceptance boundaries into discriminating examples rather than an implementation test inventory.

## Process

### 1. Inspect the feature evidence

Inspect the request, root `PRODUCT.md` and `CONTEXT.md`, repository guidance, the existing feature specification and paired solution design when present, and the project's feature-record convention. Inspect only the relevant current public contracts, documentation, tests, UI, research, and implementation evidence needed to understand observable behaviour. Treat `PRODUCT.md` as authority for the product foundation, the user as authority for the intended change, and the current system as evidence of present behaviour rather than intended future behaviour. Distinguish current, confirmed future, and unresolved claims; surface contradictions and unknowns without silently resolving them.

Accept one capability from `PRODUCT.md`, a confirmed synthesis returned by a prior `$elicit` session, or another agreed feature idea whose product context is sufficient. Do not manufacture a missing product foundation when the requested specification depends on one; report the exact prerequisite and stop. A direct agreed idea may proceed without a formal catalogue when its actors, value, and product boundary are sufficiently grounded. The source, authority, current evidence, convention, and unresolved feature decisions are explicit.

### 2. Bound one proportionate feature

Invoke `$elicit` throughout steps 2–5 for material user-held knowledge and decisions. Reuse every compatible branch from a prior confirmed synthesis and ask only about gaps exposed by inspection. Bound one coherent feature or enhancement, its problem or opportunity, beneficiaries, desired outcome, relationship to the product capability, and exclusions that separate adjacent behaviour. When inspection shows that the change is small, already understood, and needs no durable intent record, explain why a specification would add ceremony, name `$implement` as the proportionate next session, and stop without writing or invoking it. Invocation alone does not bypass this gate; proceed only when the user has separately established that a durable feature specification is required. The session owns exactly one warranted feature and a clear reason for specifying it.

Invoke `$maintain-context` inline whenever consequential project language is confirmed, changed, misused, or contradicted. It alone owns the root `CONTEXT.md` glossary update; this skill retains the specification outcome and verification.

Invoke `$research` when a material external, domain, regulatory, or standards subject could change the specification and needs durable evidence. Link its report instead of copying its findings. Invoke `$prototype` only when seeing, comparing, or interacting with the least elaborate disposable artefact would resolve one bounded visual or interactive uncertainty better than discussion. Both return evidence to this session and own neither the specification nor continuation.

Keep the specification unchanged until the complete synthesis is explicitly confirmed. Supporting utilities may perform only the mutations authorised by their own contracts before then.

### 3. Establish observable behaviour

Establish only the applicable feature-level detail: actors and their goals; scope and boundaries; externally observable behaviour and business or domain rules; material states, transitions, and lifecycle; main, adverse, recovery, and edge scenarios; and external product, regulatory, or compatibility constraints. Walk each actor from entry through goal, consequential interactions with other actors or systems, failure or refusal, recovery, and completion where applicable. Distinguish current behaviour from intended change wherever conflating them could misstate the feature.

Use concrete examples when an abstract rule, boundary, state transition, or scenario remains open to materially different interpretations. Include an example only when it discriminates valid from invalid behaviour or exposes a missing branch; do not expand the specification into exhaustive cases. Resolve contradictions and material ambiguity as they emerge. The feature's complete observable behaviour is understandable without assuming a technical solution.

### 4. Establish acceptance and traceability

State acceptance conditions as unambiguous outcomes and evidence observable by an actor, consumer, or published contract. Cover the material behaviour, rules, state transitions, adverse paths, exclusions, and external constraints established for this feature. Use exact protocol or schema detail only when it is itself a published external contract; otherwise leave endpoints, components, services, tables, internal events, data models, algorithms, frameworks, libraries, deployment, and verification implementation to solution design.

Apply the rebuild test to every proposed statement: it normally belongs in the specification only when it should remain true if the feature were rebuilt using a different architecture. Retain a system-specific statement only when it is an externally binding product, regulatory, or compatibility boundary. Link applicable product capability, research, context terms, current evidence, and stable material dependencies or assumptions without duplicating their authorities. The acceptance boundary is observable, testable, traceable, and independent of implementation.

### 5. Challenge the complete feature

Walk the feature across every material actor goal, interaction, state, rule, main path, adverse path, recovery, edge condition, acceptance outcome, and exclusion. Test counterexamples at the feature boundary and look for hidden adjacent features, conflicting rules, impossible transitions, undefined ownership, unsupported current claims, and acceptance conditions that inspect private internals or prescribe a solution. Reopen only evidence-backed branches that could materially change the specification. Stop elaborating when another case would not change externally observable intent. The proposed feature is coherent and complete at feature depth without becoming solution design or an implementation backlog.

### 6. Confirm one full synthesis

Have `$elicit` present one concise, self-contained synthesis of the problem or opportunity, desired outcome, actors and goals, scope and exclusions, observable behaviour and rules, states and transitions, material scenarios, acceptance conditions, external constraints, traceability, and unresolved limitations. Obtain explicit confirmation of the whole synthesis. Selecting an earlier option is not confirmation. If the user rejects or corrects it, leave the specification unchanged, reopen every affected evidence-backed branch, repeat the applicable walks and counterexamples, and confirm the complete revised synthesis. The confirmed synthesis supplies authority for the agreed specification write without another application prompt.

### 7. Write the specification

Follow the project's established feature-record convention. Otherwise choose a stable lowercase feature slug and create `docs/features/<feature-slug>/specification.md` using the [Feature Specification Template](assets/specification-template.md). When refining an existing specification, preserve unrelated confirmed content and its local structure when differences are stylistic. Include only material sections and omit empty boilerplate. Keep canonical meanings in `CONTEXT.md`, external evidence in research reports, and implementation choices in a distinct `solution-design.md` when one exists. The durable specification records exactly the confirmed observable intent.

### 8. Verify and stop

Verify every statement against its authority: product foundation against `PRODUCT.md`; intended change against the confirmed synthesis; terminology against `CONTEXT.md`; current behaviour against inspected evidence; and material external claims against linked research. Rewalk traceability, actors, rules, states, scenarios, acceptance conditions, exclusions, and constraints for coherence and missing branches. Apply the rebuild test and confirm that acceptance remains observable without CSS classes, DOM or private internals, architecture, endpoints unless externally contractual, detailed data models, algorithms, frameworks, deployment, ticket breakdown, estimates, priorities, roadmaps, or releases. Verify the path, links, preservation of unrelated content, separation from any solution design, and every `$maintain-context` result.

Report changed files, supporting evidence, verification, and unresolved limitations. Stop after the approved specification and applicable ubiquitous language are written and verified; do not select a solution, create tickets, scaffold, implement, publish, prioritise, or continue into another lifecycle outcome.
