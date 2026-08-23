# Dependency Techniques

Load only for a triggered dependency, technology boundary, seam, composition, or substitutability decision. A contract in design does not require a language `interface`.

## Invert volatile mechanism knowledge

Apply **dependency inversion** when stable domain or application policy directly knows a materially volatile framework, device, vendor, persistence, transport, or delivery mechanism. Define the smallest policy-owned contract in policy language and make the mechanism satisfy it.

- **Good:** invoicing policy asks a `TaxRateSource` for the rate and the vendor adapter owns authentication, wire fields, and response mapping.
- **Bad:** invoicing imports vendor request types and switches on vendor status codes, or adds an interface that repeats one stable local calculator without changing dependency knowledge.

Cost: an owned contract and composition wiring must be maintained. Keep a stable local concrete dependency direct when inversion creates only interface-per-class indirection.

## Isolate a material boundary

Apply **ports and adapters** when an application-purpose conversation must remain independent of a material external technology or ownership boundary, isolated execution, replacement, staged migration, or multiple implementations. State the port in the application's language; let adapters translate UI, persistence, network, vendor, or test technology. Framework types stay at framework-owned edges.

- **Good:** `PlaceOrder` accepts an application command and returns an application outcome while HTTP and database adapters translate at the edges.
- **Bad:** wrap every framework call, mirror a vendor SDK method-for-method, or add a generic provider registry for one fixed integration.

Cost: translation, wiring, and sometimes duplicated boundary types. A concrete adapter without a language interface can still be the right port boundary when it hides the protocol and no separate runtime contract is earned.

## Add a controlled seam

Add a **seam** when substitution, observation, replacement, or staged migration requires behaviour to vary without editing the calling location. Use the smallest enabling point: a parameter, callback, collaborator, provider, module export, composition-root binding, or framework facility.

- **Good:** inject a clock where expiry policy needs deterministic time.
- **Bad:** introduce factories and provider interfaces around every deterministic local function in case tests might mock it.

Cost: another variation point callers and maintainers must understand. Prefer direct behaviour when it is local, stable, and observable through its supported outcome.

## Prefer composition and delegation

Use composition or delegation when a capability can be assembled from independently owned behaviours without claiming an is-a relationship. Keep delegation deep: the composing owner must add policy, translation, sequencing, or a simpler capability rather than merely repeat another contract.

- **Good:** a `Checkout` delegates tax calculation and payment authorisation while owning their ordering and checkout outcome.
- **Bad:** `PaymentService.process()` only forwards to `PaymentProcessor.process()` with identical inputs, outputs, and responsibility.

Cost: extra navigation and wiring. Absorb a delegation layer that owns no decision.

## Require genuine substitutability

Use inheritance or polymorphism only when every subtype can honour the complete base contract for all supported callers without strengthened preconditions, weakened outcomes, surprising effects, or type tests. Prefer composition for optional behaviour or shared implementation that does not form a stable substitutable concept.

- **Good:** supported storage adapters honour the same explicit read/write/error contract.
- **Bad:** `ReadOnlyRepository extends Repository` but throws from inherited `save`, forcing callers to inspect its concrete type.

Cost: base-contract evolution constrains every subtype. A required framework extension is valid when its lifecycle contract is honoured, even when composition would otherwise be preferred.
