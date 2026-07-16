# Modular Design Techniques

Load this reference only when repository evidence satisfies a technique's condition. Information hiding and the standard in `SKILL.md` remain authoritative; a pattern earns its place by solving the evidenced boundary problem.

## Protect policy from a volatile mechanism

Apply **dependency inversion** when stable domain or application policy directly knows a materially volatile framework, device, vendor, persistence, transport, or delivery mechanism. Define the smallest policy-owned contract in the policy's language and make the mechanism satisfy it. Keep a stable local concrete dependency direct when inversion would only create an interface-per-class and wiring.

## Isolate an application conversation

Apply **ports and adapters** when one application capability must support multiple technologies, replacement, isolated execution, or a material external boundary. Let a port describe the purpose of the conversation and let adapters translate UI, persistence, network, vendor, or test technology. Keep framework types at framework-owned edges and avoid wrapping every framework call.

## Separate domain models

Apply **bounded contexts** when the same term or concept has competing meanings, rules, or models. Keep one ubiquitous language inside each evidenced context and translate explicitly between them.

Apply **conceptual contours** when domain language and observed axes of change reveal a more natural capability grain than technical layers or uniform class sizes. Keep cohesive entity behaviour and invariants together; use a standalone domain service only for a significant process that belongs to no entity or value object.

## Create purposeful variation or observation

Add a **seam** when testing, diagnosis, replacement, observation, or staged migration needs controlled variation. Use the smallest existing enabling point—such as a parameter, collaborator, provider, module export, or framework facility—before adding a nominal interface. Direct behaviour remains preferable when it is already local, stable, and observable.

## Separate decisions from effects

Apply **functional core, imperative shell** when substantial deterministic policy is entangled with I/O, time, mutable state, or framework lifecycle behaviour. Express the policy as transformations of explicit values and keep effects in a thin shell. Preserve stateful objects when identity, lifecycle, effect ordering, or invariant ownership is intrinsic; do not turn the shell into the unencapsulated application.

## Preserve an architectural promise

Define an **architecture fitness function** when a material contract, dependency rule, quality threshold, or runtime characteristic has a faithful objective signal. State the property, signal, expected result, and execution point. Prefer contract tests, dependency rules, adapter conformance, cycle checks, or measured runtime thresholds; retain qualitative review when a metric would be a misleading proxy.

## Realize a capability entry point

Use an action object, use-case class, function, command, or framework-native entry point when it exposes one meaningful actor goal and hides cohesive sequencing, policy, invariants, failure handling, or transaction behaviour. Reuse the entry point when several delivery mechanisms need the same capability. Absorb or remove it when it merely forwards to another module or becomes generic for hypothetical reuse.
