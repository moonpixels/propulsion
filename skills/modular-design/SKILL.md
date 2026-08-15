---
name: modular-design
description: Applies an evidence-backed structural-maintainability standard. Use when designing or assessing ownership, boundaries, contracts, dependencies, seams, or change propagation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Modular Design

Supplies structural findings and constraints inside a caller's workflow by locating each material decision with a coherent owner, making the smallest complete change, and keeping caller knowledge proportionate to the capability provided.

## Process

### 1. Fix the behaviour and evidence

Start from confirmed scoped behaviour and runtime-available caller and project evidence: project guidance, architecture decisions, domain language, relevant source, contracts, and tests. Explicit project authorities and established language and framework conventions govern when they conflict with this baseline. Keep the assessment structural: ownership, information hiding, cohesion, coupling, contracts, dependencies, seams, invariants, policies, protocols, sequencing, side effects, and change propagation. Leave product authority, behavioural correctness, security, performance, accessibility, formatting, testing, and general style to their applicable authorities except where they materially shape a contract or boundary. The behaviour, evidence, and material structural decision are explicit.

### 2. Assign the affected knowledge

Identify the representation, contract, invariant, policy, protocol, sequencing, side effect, or framework decision the behaviour introduces or changes. Keep it with its natural existing owner when that owner remains coherent; otherwise establish the smallest justified boundary around the complete concern. Represent each material rule once, and let code that changes for the same project-evidenced reason change together. The affected knowledge has one coherent owner rather than being repeated across callers.

### 3. Make the smallest coherent change

Deliver the complete scoped behaviour without speculative abstraction or unrelated cleanup. Permit a bounded enabling refactor only when the behaviour cannot fit coherently without it; change no more surrounding structure than the new behaviour needs. Keep a stable local concrete dependency direct unless meaningful variation, isolation, observation, migration, a technology boundary, or policy-mechanism separation justifies a seam.

Realize the design through established project and framework idioms. Objects may own identity, state, invariants, and cohesive behaviour; functions, closures, structural types, language modules, components, and framework primitives are equally valid when they preserve the same ownership and contract. Introduce a language interface only when callers need a stable contract distinct from its realization, and use inheritance only for genuine substitutability or a required framework extension. The result is the smallest idiomatic change that completely delivers the behaviour.

### 4. Keep the contract deep

Treat a module as a cohesive capability, whether code expresses it as a function, object, package, process, or tier-spanning slice. Its contract is everything callers must know, including behaviour, data, invariants, ordering, errors, configuration, side effects, and material performance characteristics.

Apply **deep modules**: make the caller-visible contract markedly simpler than the cohesive capability and knowledge hidden behind it. Absorb or remove shallow forwarding layers that merely repeat another contract or redistribute navigation; retain a layer when it owns translation or another evidenced boundary responsibility. The contract repays its caller burden without combining unrelated knowledge to appear deeper.

### 5. Check locality and applicable techniques

Trace plausible current-project changes through the owner, contract, consumers, and affected code. Reconsider the boundary when one owned decision would still require scattered changes, when several elements must always change together but are split, or when the proposed owner changes mostly for unrelated reasons. Do not substitute file size, class count, method count, dependency scores, abstract metrics, or speculative agent-context savings for this evidence.

Load [Modular Design Techniques](references/TECHNIQUES.md) only when current evidence already presents one of its conditions: policy directly depends on a volatile mechanism; an application conversation needs independence from technologies, replacement, isolated execution, or a material external boundary; domain meanings or change contours compete; controlled substitution, observation, or migration is needed; or deterministic decisions are entangled with effects. Do not open the reference to discover whether a condition exists. Apply only the fitting technique. The resulting structure keeps the owned knowledge and its likely changes local without introducing an unevidenced abstraction.

## Handoff

Return the structural findings or constraints, their runtime evidence, the responsible owner and contract, the change-locality trace, any triggered technique, and unresolved structural uncertainty. The caller retains elicitation, requirements, architecture and review artifacts, implementation, tests, verification, external mutation, and the decision to continue or stop its workflow.
