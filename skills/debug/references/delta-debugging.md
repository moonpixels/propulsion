# Delta Debugging

Use this reference when a large input, request, configuration, dataset, trace, sequence, state, or change set can be classified automatically or cheaply. The result is a smaller case that preserves the same failure.

## Reduce against one oracle

Freeze a classifier that distinguishes the exact failure from a pass and from an invalid or unresolved candidate. Remove a large partition, run the unchanged classifier, retain the removal only when the same failure remains, and increase granularity when a coarse partition cannot be removed. Continue with the reduced case.

Preserve ordering and dependencies that make a candidate valid. Record unresolved candidates separately; do not treat them as passes or failures. For generated or fuzzed input, retain the seed and original counterexample before reducing it.

Manual minimisation uses the same discipline: remove one coherent dimension at a time, retest, and keep only evidence-preserving reductions. Do not rewrite the oracle to accommodate a smaller case.

## Preserve representativeness

The result is minimal only relative to the tried partitions and granularity; it need not be globally smallest. Interdependent elements can prevent further reduction, and a reduced case can omit the interaction that makes the production scenario representative.

Stop when no remaining unit can be removed at the chosen granularity without losing the exact signal, or when further reduction is more expensive than investigating the bounded case. Use the reduced case to localise or form hypotheses, but keep the original unminimised signal for repair verification.
