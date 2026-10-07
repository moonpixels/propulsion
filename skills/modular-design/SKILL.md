---
name: modular-design
description: Design simple interfaces over deep modules when a code change creates or alters ownership, domain rules, or dependencies.
---

# Modular design

Give callers a simple contract that hides substantial domain knowledge. Choose the smallest coherent design that satisfies the confirmed behaviour. **Information hiding** and **deep modules** reduce the code and context callers need.

## Inputs

Start from the confirmed requirements and affected interfaces. Inspect their owners and consumers. Existing code shows current structure, not a requirement to preserve it. A module can be a function, object or feature. Its interface includes inputs, outcomes, errors, effects, ordering and invariants callers must understand.

## Method

1. **Start with the caller.** Write realistic usage before choosing signatures or classes. State what the caller needs to accomplish and observe. Read [design examples](references/design-examples.md) when introducing an interface or judging whether a boundary hides enough knowledge.
2. **Choose one owner per decision.** Put each rule, representation, state and sequence with the capability that owns it. Callers ask that owner for derived facts or complete operations. Repeated eligibility checks across consumers belong in the domain owner. Group code that changes for the same reason. Separate independent responsibilities.
3. **Design a deep module.** Keep the public contract small and cohesive. Hide storage layouts, vendor protocols and internal stages. `reservation.confirm(command)` can own the transition and effect ordering. Separate public `validate`, `markConfirmed`, `save` and `publish` operations make callers learn that sequence. Depth means knowledge hidden, not a long call chain or a large class.
4. **Earn every abstraction.** Keep direct local code when it is already clear. Add a boundary for substantial hidden knowledge, real variation or an existing external dependency. Apply **YAGNI**. A language interface, class, factory or separate file must remove more caller burden than it adds. Read [design techniques](references/techniques.md) for a concrete dependency, invariant, state or ownership problem.
5. **Design it twice for material choices.** For a consequential new or changed public interface, owner or dependency direction, compare two viable shapes. Show caller usage, hidden decisions and how an evidenced change propagates through each. Choose the smaller coherent contract. A routine change inside an established owner needs no design ceremony.
6. **Trace locality.** Walk a plausible requirement change through the owner and its consumers. Revise designs that repeat a decision, expose internals or require callers to coordinate hidden stages. Use [refactoring and deletion techniques](../code-cleanup/references/refactorings.md) when reshaping existing code. Invoke [$code-cleanup](../code-cleanup/SKILL.md) when an independent cleanup review is needed.

## Finish

Return the chosen owner, caller contract, hidden decisions and locality trace. Include a material alternative and trade-off when step 5 applies. Leave implementation and independent review to the caller.

**Done only when** the confirmed behaviour has coherent ownership, callers need no avoidable internal knowledge, and each new abstraction earns its cost. Report unresolved contractual or structural decisions before dependent implementation.
