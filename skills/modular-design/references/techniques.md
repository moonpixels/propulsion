# Design techniques

Choose a technique for an observed ownership or dependency problem. A pattern name does not justify extra code. Use the repository's language and framework idioms. Existing-code transformations live in [code cleanup](../../code-cleanup/references/refactorings.md).

## Information hiding and single responsibility

Own a coherent body of domain knowledge behind one interface. Apply the **single responsibility principle** to reasons for change, not one class per operation. A parser can own loading, validation and decoding when they protect one grammar. A module serving unrelated domain policies needs separate owners.

Keep related state and behaviour together. Consumers should ask `order.totalWeightGrams()` rather than repeat knowledge of its line representation. Keep consumers' independent policies with those consumers. Follow an actual change trace before deciding to combine or separate owners.

## Dependency inversion and ports and adapters

Apply **dependency inversion** when domain policy knows a volatile external mechanism. State the smallest contract in the policy's language. An adapter translates the external protocol into that contract.

For example, invoicing asks a rate source for a jurisdiction's tax rate. Its vendor adapter owns authentication, response fields and provider errors. Invoicing importing the vendor's response type leaks that protocol. Mirroring every SDK operation behind an interface preserves the leak and adds navigation.

Use **ports and adapters** where an application operation must remain independent of delivery or persistence technology. A concrete module can hide the mechanism without a language interface. Add a substitution seam only when current execution, replacement or integration requires it. A clock parameter can make expiry policy deterministic. A factory hierarchy around every local helper adds needless variation.

## Constructive modelling and one source of truth

Use **algebraic data types** or the language's equivalent to make invalid combinations unrepresentable. Model meaningful variants, exhaust them, and derive duplicated state. Parse untrusted input at the real boundary. Internal type annotations alone provide no runtime validation.

Choose structures that remove actual branching. A lookup table suits fixed mappings. A state machine suits valid lifecycle transitions. A reducer can give state updates one owner. Keep a simple exhaustive conditional when it already expresses the rule directly. Do not create a class hierarchy just to disguise that conditional.

Derive types and registrations from their authoritative schema or definition where practical. Two hand-maintained lists of the same variants create coordinated edits. Keep one source and derive the other, or enforce agreement mechanically when independent definitions are required.

## Functional core, imperative shell

Separate substantial deterministic decisions from I/O when explicit values give them a clear contract. A renewal policy can receive subscription state and the current time and return a decision. A narrow job handler loads the inputs and applies that decision.

Keep transactional ownership and effect ordering together. A trivial comparison does not need a separate policy class. A shell that exposes every intermediate mutation to callers loses the invariant the separation should protect.

## Composition and substitutability

Prefer **composition** for assembled capabilities. Each collaborator must own meaningful policy or mechanism. A checkout that coordinates payment and stock can be deep. A service forwarding the same call to another service owns nothing new.

Apply the **Liskov substitution principle** when using inheritance. Every subtype must honour supported preconditions, outcomes, errors and effects. A read-only repository that inherits `save` and throws violates its writable base contract. Use a narrower contract or composition. Required framework inheritance remains valid when its lifecycle contract is honoured.

## Bounded contexts and conceptual contours

Use **bounded contexts** when the same word has different meanings and invariants. Sales eligibility and support entitlement may have separate customer models with explicit identity translation. A universal customer full of optional fields couples unrelated policies. Different folder names alone do not establish different meanings.

Use **conceptual contours** to keep identity, state and invariants together at a natural domain grain. A standalone domain service earns its place for a process that belongs to no existing entity or value object. A generic utilities module collecting unrelated rules gives them no coherent owner.
