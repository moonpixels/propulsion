---
name: modular-design
description: Design or assess code ownership, interfaces, dependencies, and change locality through information hiding and deep modules.
---

# Modular design

Keep the smallest coherent change behind contracts that hide knowledge callers do not need. Preserve confirmed behaviour and explicit project decisions.

## Inputs

Use confirmed requirements, repository guidance, domain language, architecture decisions, affected source, contracts, and tests. Read only missing or stale evidence. Follow explicit project authorities and established language and framework idioms when they conflict with this guidance.

A **module** is a cohesive capability with an interface and implementation, from a function to a service or complete feature slice. Its **interface** is everything callers must know: operations, data, invariants, ordering, errors, configuration, effects, and material performance. Files, classes, and technical layers do not determine ownership.

## Method

1. **Assign knowledge to its owner.** Identify changed rules, invariants, protocols, representations, sequences, and effects. Keep each with the coherent existing owner or form a boundary that owns the complete concern. Co-locate elements that change for the same evidenced reason; separate unrelated axes of change. Represent each material decision once.
2. **Hide derived knowledge.** Ask the owner for facts derived from its state, such as totals or eligibility, rather than making consumers traverse its representation. A caller may derive a fact when the representation is deliberately public and the rule belongs to its own policy.
3. **Design a deep interface.** Give callers substantial cohesive capability through a simple domain contract. Hide mechanisms, representations, sequencing, and vendor or framework details they do not need. Make required inputs, outcomes, failures, ordering, and effects explicit. Depth concerns caller knowledge, not method count or implementation size.
4. **Earn new machinery.** Keep stable local dependencies direct. Add an abstraction for current variation, controlled observation, replacement, migration, a volatile external mechanism, or a material ownership boundary. Use objects, functions, composition, structural types, or framework facilities according to the concern. Use inheritance for genuine substitutability or required framework extension. Limit enabling refactors to what the confirmed behaviour needs.
5. **Compare material choices.** For a new or substantially changed public interface, owner boundary, seam, or dependency direction, read [design comparison](references/DESIGN-IT-TWICE.md). Compare a genuinely contrasting design before selecting. Routine changes that fit an established coherent owner proceed directly.
6. **Trace locality.** Trace an evidenced plausible change through owner, interface, consumers, implementation, and tests. Reconsider duplicated decisions, separated elements that always change together, mixed responsibilities, or callers coordinating hidden sequencing. Scores, file sizes, and hypothetical future flexibility do not substitute for that trace.

For example, `reservation.confirm(command)` can own validation, transition, persistence order, and outcome. Exposing `validate`, `markConfirmed`, `save`, and `publish` makes each caller know that sequence. Likewise, ask an order for its total weight when it owns line weights and quantities. Keep a cohesive parser together when splitting its grammar would scatter one decision.

## Conditional resources

Read a resource only for an evidenced unresolved decision:

- [Dependency techniques](references/DEPENDENCY-TECHNIQUES.md): stable policy knows a volatile mechanism, a material boundary needs translation, controlled substitution is needed, or composition and substitutability are in question.
- [Domain techniques](references/DOMAIN-TECHNIQUES.md): competing meanings or observed change patterns disagree with ownership, or co-location versus extraction remains material.
- [Decision and effect techniques](references/EFFECT-TECHNIQUES.md): substantial deterministic policy across cases or transitions is entangled with I/O, time, mutation, or framework lifecycle effects.
- [Design comparison](references/DESIGN-IT-TWICE.md): a material interface or ownership choice needs contrasting contracts and change traces.

An ordinary file-placement choice, single domain vocabulary, local conditional, or possibility of future change does not alone trigger these resources. Named patterns and smells are diagnostic vocabulary; choose the mechanism that addresses the actual concern.

## Finish

Keep the owner, caller contract, hidden decisions, locality trace, consequential comparison or technique, and unresolved structural uncertainty explicit in the caller's work. Done when the confirmed behaviour fits a coherent owner and callers need no avoidable internal knowledge. Leave implementation and broader workflow actions to the caller.
