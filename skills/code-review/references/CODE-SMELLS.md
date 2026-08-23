# Fowler Code Smells

Load this complete second-edition catalogue only when a concrete maintainability shape needs recognised diagnostic vocabulary. Each cue identifies a code shape to investigate, not a finding or authority by itself. Test the relevant benign interpretation against the scoped code, repository authorities, and concrete consequence.

1. **Mysterious Name** — An identifier does not communicate its role, meaning, or unit in the surrounding domain. A repository-defined term or tightly conventional local name may already be precise.
2. **Duplicated Code** — Materially similar behaviour appears in multiple locations that may need to evolve together. Superficially similar code may represent different responsibilities or change for different reasons.
3. **Long Function** — A function contains enough distinct steps, branches, or levels of abstraction to obscure its purpose or invariants. A cohesive linear workflow may be clearer when read together.
4. **Long Parameter List** — Numerous inputs or recurring groups of related values make a callable's contract hard to understand or use safely. A boundary function may intentionally expose independent dependencies.
5. **Global Data** — Broadly accessible data creates hidden dependencies across consumers. Immutable constants or configuration with explicit ownership may not carry that risk.
6. **Mutable Data** — In-place changes or aliases make state transitions and observers difficult to reason about. Mutation with a tight owner, lifetime, and invariant may remain local and explicit.
7. **Divergent Change** — One module changes for several unrelated responsibilities within the scoped work. Multiple edits may still serve one cohesive responsibility.
8. **Shotgun Surgery** — One conceptual change requires coordinated edits scattered across many locations. Layer-specific or generated representations may legitimately change together.
9. **Feature Envy** — Behaviour depends more on another object's data or decisions than on its own owner. Orchestration, presentation, and adapter code may properly coordinate across a boundary.
10. **Data Clumps** — The same group of values repeatedly travels or appears together as an implicit concept. Coincidental co-occurrence or a constrained public boundary may not establish one shared abstraction.
11. **Primitive Obsession** — Primitive values repeatedly carry domain states, units, validation, or rules that callers must remember. Simple, local, already-constrained values may remain unambiguous.
12. **Repeated Switches** — Conditional dispatch over the same discriminator recurs across the change. A single exhaustive boundary mapping may keep variation explicit without scattering it.
13. **Loops** — Imperative iteration obscures the transformation, selection, or control intent being performed. Stateful traversal, early exit, or measured performance constraints may make the loop the clearest form.
14. **Lazy Element** — An abstraction carries little distinct behaviour, policy, or information. A small named boundary may still express a domain concept or preserve a necessary interface seam.
15. **Speculative Generality** — Flexibility, parameters, hooks, or abstractions serve only hypothetical requirements. A current specification, compatibility contract, or demonstrated extension point may make the flexibility concrete.
16. **Temporary Field** — An object's field is meaningful only during particular modes or phases, leaving other states uncertain. An explicit lifecycle with guarded access may make those states intentional.
17. **Message Chains** — A caller navigates through a sequence of collaborators and therefore depends on their internal structure. A stable data traversal or intentional fluent interface may expose that chain as its contract.
18. **Middle Man** — An element mostly forwards requests without contributing policy, translation, or information. A boundary may still provide isolation, authorisation, observability, or compatibility.
19. **Insider Trading** — Modules rely on each other's internal knowledge or backchannels beyond their stated contracts. A deliberately shared internal protocol may have clear ownership and stability.
20. **Large Class** — A class accumulates enough unrelated state or behaviour to obscure its responsibility and invariants. A cohesive aggregate may need central ownership to protect one invariant boundary.
21. **Alternative Classes with Different Interfaces** — Types serving the same conceptual role expose unnecessarily different contracts. Similar-looking types may instead represent distinct domain roles.
22. **Data Class** — A type mainly stores data while its rules or meaningful behaviour live elsewhere. A transfer object, event, or serialisation record may be intentionally data-only.
23. **Refused Bequest** — A subtype rejects, ignores, or cannot honour a substantial part of its inherited contract. A narrow implementation may still fully honour the interface actually promised.
24. **Comments** — Comments compensate for code whose intent or structure is unclear, or merely restate what it does. Rationale, safety constraints, protocol details, and public contracts may require commentary beyond the code.
