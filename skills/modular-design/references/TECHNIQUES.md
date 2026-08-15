# Modular Design Techniques

Load this reference only when repository evidence satisfies a technique's condition. The direct process in `SKILL.md` remains authoritative; use one mechanism to satisfy overlapping conditions when possible rather than adding duplicate layers.

## Direct dependencies towards policy

Apply **dependency inversion** when stable domain or application policy directly knows a materially volatile framework, device, vendor, persistence, transport, or delivery mechanism. Define the smallest policy-owned contract in the policy's language and make the mechanism satisfy it. Keep a stable local concrete dependency direct when inversion would only create an interface-per-class and wiring.

## Isolate an application conversation

Apply **ports and adapters** when an application-purpose conversation must remain independent of multiple technologies, replacement, isolated execution, or a material external boundary. Let the port state the application's need and let adapters translate UI, persistence, network, vendor, or test technology. Keep framework types at framework-owned edges and avoid wrapping every framework call.

## Separate domain models

Apply **bounded contexts** when the same term or concept has competing meanings, rules, or models. Keep one ubiquitous language inside each evidenced context and translate explicitly between them.

Apply **conceptual contours** when domain language and observed axes of change reveal a more natural capability grain than technical layers or uniform class sizes. Keep cohesive entity behaviour and invariants together; use a standalone domain service only for a significant process that belongs to no entity or value object.

## Create controlled variation or observation

Add a **seam** when substitution, observation, replacement, or staged migration needs behaviour to vary without editing the calling location. Supply the smallest enabling point that selects the behaviour, such as a parameter, collaborator, provider, module export, or framework facility. The caller owns the reason and verification; direct behaviour remains preferable when it is already local, stable, and observable.

## Separate decisions from effects

Apply **functional core, imperative shell** when substantial deterministic decisions are entangled with I/O, time, mutable state, or framework lifecycle behaviour. Express the decisions as transformations of explicit values and keep effects at a narrow edge. Preserve stateful ownership when identity, lifecycle, effect ordering, or invariant enforcement is intrinsic; do not leave an unencapsulated application in the shell.
