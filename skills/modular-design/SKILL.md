---
name: modular-design
description: Teaches structural design through information hiding, deep modules, cohesive ownership, stable interfaces, and change locality. Use when writing or assessing code, boundaries, contracts, dependencies, seams, or change propagation.
disable-model-invocation: false
---

# Modular Design

Teaches a caller to make the smallest coherent change through deep modules whose owned knowledge and likely changes remain local.

## Process

### 1. Fix the structural basis

Read the confirmed behaviour, caller outcome, repository guidance, domain language, architecture decisions, relevant source, contracts, and tests. Follow explicit project authorities and established language and framework idioms when they conflict with this baseline.

Treat a **module** as any cohesive capability with an interface and implementation: a function, object, component, package, process, service, or tier-spanning slice. Treat its **interface** as everything callers must know, including operations, data, invariants, ordering, errors, configuration, effects, and material performance characteristics. Do not equate modules with files, classes, layers, or deployment units.

Use confirmed behaviour and applicable quality requirements as constraints on ownership, boundaries, and contracts. Do not redefine those requirements during structural design.

### 2. Assign each decision to one owner

Name the behaviour and every rule, invariant, protocol, representation, sequence, side effect, or framework decision it introduces or changes. Keep each with its natural existing owner when that owner remains coherent; otherwise create the smallest boundary that owns the complete concern. An owner has the knowledge and authority needed to uphold the decision, not merely the nearest file or conventional technical layer.

Represent each material decision once. Co-locate elements that change for the same current, evidenced reason. Separate elements when their responsibilities and axes of change differ. Prefer domain and capability boundaries over uniform file sizes or technical-layer symmetry.

Keep derived knowledge behind the owner of its source representation. When another module needs a fact such as a total, classification, eligibility, or transition derived from owned state, use or add a domain-meaningful owner operation instead of making the caller traverse that state. Let the caller derive it only when the representation is deliberately public and the derivation belongs to the caller's own policy.

Check these contrasts:

- **Local rule:** put a pricing threshold in the pricing policy that decides it. **Leaked rule:** repeat it in a controller, job, validator, and their tests.
- **Owned derivation:** ask an order for `totalWeightGrams()` when it owns line weights and quantities. **Leaked derivation:** make delivery, fulfilment, and reporting each traverse order lines to reconstruct that fact.
- **Cohesive size:** keep a large parser together when its grammar and invariants change as one concern. **Fragmented size:** split it only to satisfy a line or class count, making one grammar change cross several files.
- **Damaging coordinator:** reconsider even a short coordinator when it knows every participant's order, data shape, and error handling; brevity does not make scattered knowledge cohesive.

### 3. Design a deep interface

Apply **information hiding** and **deep modules**. Give callers substantial cohesive capability through a comparatively simple, domain-meaningful contract. Minimise what callers must know rather than method count. Hide representations, mechanisms, sequencing, framework details, and policies that callers do not need. Make required inputs, outcomes, failures, ordering, and effects explicit.

Keep the contract narrower and more stable than the decisions behind it without combining unrelated knowledge merely to appear deep. A design interface does not require a language `interface`, base class, wrapper, or extra file.

Check these contrasts:

- **Deep:** `reservation.confirm(command)` owns validation, state transition, persistence sequencing, and the confirmation outcome. **Shallow:** callers invoke `validate`, `markConfirmed`, `save`, and `publish` in the required order.
- **Hidden vendor protocol:** an adapter accepts checkout terms and maps vendor fields, units, and expected failures. **Leaked protocol:** controllers and policies know `vendorAmount`, vendor error classes, and response codes.
- **Owned boundary:** retain a layer that translates, authorises, applies policy, preserves compatibility, observes, or coordinates an application conversation. **Pass-through:** absorb a layer whose only act is forwarding the same arguments and result to another contract.

### 4. Keep the change coherent and earned

Make the least production, test, and supporting change that completely delivers the confirmed behaviour and leaves its knowledge local. Fewest lines or files is not the goal. Permit a bounded enabling refactor only when the behaviour cannot fit coherently without it; alter no more surrounding structure than the behaviour needs.

Keep a stable local concrete dependency direct. Add an abstraction only for current evidence of meaningful variation, isolated observation, replacement, staged migration, a volatile external mechanism, a material technology or ownership boundary, or separation of stable policy from mechanism. Reuse an existing extension point only when its contract fits the present behaviour. Do not add hypothetical implementations, options, generic services, interface-per-class, universal repositories, plugin systems, or unrelated cleanup.

Use objects for cohesive identity, state, lifecycle, and invariants when they fit. Use functions, closures, structural types, modules, components, composition, and framework primitives when they preserve the same ownership with less machinery. Use inheritance only for genuine substitutability or a required framework extension.

### 5. Compare material structural choices

When introducing or substantially changing a public interface, module boundary, seam, or dependency direction, load [Design It Twice](references/DESIGN-IT-TWICE.md). Produce at least two genuinely different responsibility or contract designs, compare them, and select the smallest design supported by current evidence. Routine work that fits an established coherent boundary proceeds directly.

The caller produces and selects the alternatives inside its own workflow. Do not dispatch a design workflow, require parallel agents, or turn the comparison into a separate artefact unless the caller's outcome requires one.

### 6. Apply only triggered techniques

Classify triggers from the evidence already loaded, then read only the smallest applicable reference. An ordinary ownership choice, one domain vocabulary, one conditional, or the mere possibility of future change is not a trigger:

- Load [Dependency Techniques](references/DEPENDENCY-TECHNIQUES.md) when stable policy directly knows a volatile mechanism; a material technology or ownership boundary needs translation; controlled substitution, observation, replacement, or migration is required; composition competes with inheritance; or polymorphic substitutability is in question.
- Load [Domain Techniques](references/DOMAIN-TECHNIQUES.md) only when one term has evidenced competing meanings or rules, domain language and observed change patterns disagree with the current boundary, or co-location versus extraction remains a material choice after the ownership analysis. Do not load it for a single coherent domain model or an ordinary file-placement choice.
- Load [Decision and Effect Techniques](references/EFFECT-TECHNIQUES.md) only when substantial deterministic policy across multiple cases or transitions is entangled with I/O, time, mutable state, or framework lifecycle effects. Do not load it for one calculation or conditional merely because the surrounding operation performs I/O.

Do not load references to search for a reason to use a technique. Use one fitting mechanism when triggers overlap. Treat SOLID and named patterns as diagnostic vocabulary, not mandatory architecture; treat smells and metrics only as prompts to investigate a concrete mechanism and consequence.

### 7. Trace locality

Trace one plausible current-project change through the proposed owner, interface, consumers, implementation, and tests. Prefer a change suggested by requirements, integrations, repository history, or present volatility over an imagined future.

Reconsider the design when the same decision remains duplicated, elements that always change together are split, an owner changes mostly for unrelated reasons, callers still coordinate hidden sequencing, or one conceptual change requires scattered edits. Do not substitute file size, class count, method count, churn, coupling scores, complexity thresholds, or speculative agent-context savings for this trace.

Finish with the owner, caller-visible contract, hidden decisions, locality trace, triggered technique or material comparison, and unresolved structural uncertainty. The caller retains its outcome, edits, commands, tests, verification, review findings, artefacts, and stopping decision.

## Rules

- Prefer project evidence over generic architecture advice.
- Preserve the complete confirmed behaviour while improving structure; do not trade correctness or scope for aesthetic purity.
