# Domain Techniques

Load only when domain meanings, observed change contours, or co-location and extraction are materially in question.

## Separate competing meanings

Apply **bounded contexts** when the same term has competing meanings, rules, lifecycles, or representations. Keep one ubiquitous language and model inside each evidenced context; translate explicitly at their boundary.

- **Good:** Sales `Customer` owns prospects and purchasing eligibility while Support `Customer` owns service entitlement, with an explicit identity translation.
- **Bad:** one universal `Customer` accumulates nullable sales, billing, fulfilment, and support state, so every change affects unrelated callers.

Cost: translation and explicit context ownership. Do not create bounded contexts merely because departments or folders have different names.

## Follow conceptual contours

Apply **conceptual contours** when domain language and observed axes of change reveal a more natural capability grain than current technical layers or uniform class sizes. Keep entity identity, state, invariants, and cohesive behaviour together. Use a standalone domain service only for a significant process that belongs naturally to no entity or value object.

- **Good:** an `Allocation` owns quantity invariants and release behaviour that always change together.
- **Bad:** split `AllocationValidator`, `AllocationUpdater`, and `AllocationRules` by technical action, making one invariant change cross all three.

Cost: a domain-shaped module may be larger or cross conventional layer boundaries. That is acceptable when its contract remains clear and changes stay local.

## Co-locate or extract for evidenced locality

Co-locate code when it shares one owner and changes for the same evidenced reason. Extract when a complete sub-concern has a distinct contract, reuse by real consumers, independent volatility, or enough hidden knowledge to repay navigation.

- **Good co-location:** keep a component's one-use rendering helper beside the component while they evolve together.
- **Bad extraction:** move every small helper into a global utilities module, coupling unrelated capabilities to a grab bag.
- **Good extraction:** isolate a tax-jurisdiction rule used by checkout and invoicing behind one policy-owned contract.
- **Bad co-location:** duplicate that rule in both consumers to avoid adding a file.

Cost: extraction adds naming, navigation, and a contract; co-location can overload an owner when change reasons diverge. Decide from ownership and propagation rather than size.
