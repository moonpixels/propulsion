---
name: modular-design
description: Applies an evidence-backed structural-maintainability standard. Use when designing or assessing ownership, boundaries, contracts, dependencies, seams, or change propagation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Modular Design

Supplies structural constraints inside a caller's workflow by locating each material decision with a coherent owner, making the smallest complete change, and keeping caller knowledge proportionate to the capability provided.

## Process

### 1. Fix the behaviour and evidence

Apply this standard inside the caller's workflow. Use the scoped behaviour, project guidance, architecture decisions, domain language, and relevant implementation evidence; explicit project authorities govern when they conflict with this baseline. Let the caller own inspection, design comparison, implementation, verification, and artifacts. Leave correctness, testing, security, performance, formatting, and general style to their applicable authorities rather than selecting their methods or outputs here. The behaviour, evidence, and material structural decision are explicit.

### 2. Assign the affected knowledge

Identify the representation, invariant, policy, protocol, sequencing, or framework decision the behaviour introduces or changes. Keep it with its natural existing owner when that owner remains coherent; otherwise establish the smallest justified boundary around the complete concern. Represent each material rule once, and let code that changes for the same evidenced reason change together. The affected knowledge has one coherent owner rather than being repeated across callers.

### 3. Make the smallest coherent change

Deliver the complete scoped behaviour without speculative abstraction or unrelated cleanup. Permit a bounded enabling refactor only when the behaviour cannot fit cleanly without it; change no more surrounding structure than the new behaviour needs. Keep a stable local concrete dependency direct unless meaningful variation, isolation, observation, migration, or policy ownership justifies a boundary.

Realize the design through established project and framework idioms. Objects may own identity, state, invariants, and cohesive behaviour; functions, closures, structural types, language modules, components, and framework primitives are equally valid when they preserve the same ownership and contract. Introduce a language interface only when callers need a stable contract distinct from its realization, and use inheritance only for genuine substitutability or a required framework extension. The result is the smallest idiomatic change that completely delivers the behaviour.

### 4. Keep the contract deep

Treat a module as a cohesive capability, whether code expresses it as a function, object, package, process, or tier-spanning slice. Its contract is everything callers must know, including behaviour, data, invariants, ordering, errors, configuration, side effects, and material performance characteristics.

Apply **deep modules**: make the caller-visible contract markedly simpler than the cohesive capability and knowledge hidden behind it. Absorb or remove shallow forwarding layers that merely repeat another contract or redistribute navigation; retain a layer when it owns translation or another evidenced boundary responsibility. The contract repays its caller burden without combining unrelated knowledge to appear deeper.

### 5. Check locality and applicable techniques

Trace plausible project-evidenced changes through the owner, contract, callers, and affected code. Reconsider the boundary when one owned decision would still require scattered changes, when several elements must always change together, or when only an unrelated part of the proposed owner would change. Do not substitute file size, class count, method count, dependency scores, or speculative agent-context savings for this evidence.

Decide from the current evidence whether it presents a policy-to-mechanism dependency, an application-to-technology conversation, competing domain models, a need for controlled substitution or observation, or deterministic decisions entangled with effects. When none is present, keep [Modular Design Techniques](references/TECHNIQUES.md) unloaded and continue with the direct process; do not open it merely to confirm that a condition is absent. Otherwise read the reference and apply only the technique whose stated condition is present. The resulting structure keeps the owned knowledge and its likely changes local without introducing an unevidenced abstraction.
