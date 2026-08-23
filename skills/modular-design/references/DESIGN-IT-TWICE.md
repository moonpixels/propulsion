# Design It Twice

Load this reference only for a material new or substantially changed public interface, module boundary, seam, or dependency direction.

## Form two real designs

Describe at least two alternatives that differ in ownership, caller knowledge, contract, or dependency direction. Renaming, moving the same class, changing interface syntax, or comparing a credible design with an obvious straw design does not count.

Keep each alternative only detailed enough to decide. For each, state:

- which module owns the rule, representation, sequence, and effects;
- what callers must know and do;
- what the interface promises, including failure and effects;
- which dependencies point toward which owner;
- how tests observe the promised behaviour; and
- how one plausible evidenced change propagates.

Compare interface depth, caller burden, cohesion, locality, dependency direction, testability, transition cost, and speculative machinery. Select the smallest coherent design supported by current evidence; record the losing alternative's material disadvantage and any uncertainty that could reverse the choice.

## Contrast: delivery quote boundary

Suppose checkout needs a delivery quote from one current carrier.

**Design A — concrete checkout adapter:** `DeliveryQuotes` depends directly on `FastShipDeliveryQuotes`, which translates FastShip fields and failures into checkout terms. This hides the vendor protocol with no language interface. It is preferable when one implementation is approved, the concrete adapter is replaceable at the composition root, and tests can observe policy without a distinct runtime contract.

**Design B — policy-owned port:** `DeliveryQuotes` depends on a checkout-owned `DeliveryQuoteSource`; `FastShipDeliveryQuoteSource` implements it. This adds a separate stable contract. It is preferable when isolated execution, multiple implementations, staged replacement, or an ownership boundary currently requires the policy to remain independent of the concrete adapter.

Both designs isolate vendor translation. Selecting B merely because another carrier might exist someday is speculative; selecting A when application policy must directly import vendor types leaves the boundary incomplete.
