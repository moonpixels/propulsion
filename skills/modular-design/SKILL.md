---
name: modular-design
description: Defines an evidence-backed modular architecture standard. Use when designing or assessing modules, interfaces, dependencies, ownership, or seams.
metadata:
    invocation: model
disable-model-invocation: false
---

# Modular Design

**Information hiding** makes code safer to change by assigning cohesive knowledge and change-prone decisions to modules whose callers learn only a small, stable contract.

## Process

Apply this standard inside the caller's workflow. Let the caller own repository inspection, quality priorities, design comparison, implementation, verification, and artifacts; this skill supplies architecture knowledge without starting a separate process or producing its own output. Explicit project constraints, domain language, and architecture decisions govern where they conflict with the baseline.

## Standard

### Name the architecture precisely

- A **module** is a cohesive capability with an interface and implementation, regardless of whether code expresses it as a function, object, package, process, or tier-spanning slice.
- An **interface** is everything callers must know to use the module correctly, including behaviour, data shapes, invariants, ordering, errors, configuration, side effects, and material performance characteristics. It is broader than a language `interface` declaration.
- An **implementation** is the hidden representation, policy, algorithm, sequencing, framework detail, and collaboration that fulfils the interface.
- A **seam** is a controlled place where behaviour can be observed or substituted without editing the calling location.
- An **adapter** translates between a module's contract and a technology, protocol, framework, or external system.

Use this vocabulary for reasoning while preserving established project and framework names in code and reports.

### Hide owned knowledge

Decompose around difficult, consequential, or change-prone knowledge. Give one module ownership of each representation, invariant, policy, protocol, sequencing rule, or framework decision that other modules should not repeat. A change to hidden knowledge should remain behind its interface unless the promised behaviour changes.

### Prefer deep cohesive modules

Apply **deep modules**: make the caller-visible interface markedly simpler than the cohesive capability it exposes. Remove or absorb shallow wrappers that repeat another interface, scatter one decision across callers, or add navigation without hiding knowledge.

Use **cohesion and coupling** qualitatively. Keep knowledge that changes for the same reason together; separate unrelated actors, models, or policies. Reduce cross-module knowledge, coordination, cycles, and change propagation while retaining necessary collaboration. Do not optimize file size, class count, method count, or mechanical coupling scores as substitutes for architectural evidence.

### Choose an idiomatic realization

Prefer object-oriented realization where the language and framework make it natural: objects own identity, state, invariants, and cohesive behaviour; purposeful action or use-case entry points hide a complete operation; collaborators are composed; and nominal interfaces express meaningful variation or ownership boundaries.

Treat functions, closures, structural types, and language modules as equivalent realizations when they provide the same ownership, contract, and hiding. In frontend frameworks, keep components and framework-specific state or effect primitives focused on presentation and interaction, and place durable policy behind framework-neutral modules when that separation is cohesive. Framework-owned code may use framework types at its own edge.

### Load only applicable techniques

Read [Modular Design Techniques](references/TECHNIQUES.md) when evidence presents a volatile mechanism, application-to-technology boundary, competing domain model, need for controlled observation or substitution, entangled deterministic policy and effects, or an architectural promise that needs repeatable protection. Use only the technique whose stated condition is present.

## Rules

- Keep a stable local concrete dependency direct when no meaningful knowledge, variation, isolation, observation, or migration need justifies another abstraction.
- Introduce a language interface only when callers need a stable contract distinct from a realization; an interface that mirrors one concrete type without hiding knowledge is ceremony.
- Let a cohesive module contain several internal actions. A class or function with one entry point is valuable only when it hides a complete capability rather than forwards the call.
- Prefer composition in object-oriented code; use inheritance for a genuine substitutable type or required framework extension contract.
- Optimize the knowledge callers require, not repository fragmentation or speculative token savings. Reduced agent context is an inference to verify, not proof of correctness.
