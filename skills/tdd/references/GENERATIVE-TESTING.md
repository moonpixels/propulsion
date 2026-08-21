# Generative Testing

Use an example test by default. Select one of these techniques only when its trigger applies and its oracle is independently justified.

| Technique          | Trigger                                                                                                       | Oracle and limitation                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Property-based** | Stable invariants over many values; parsers, serializers, algebra, collections, boundary-rich pure logic      | Assert an independent invariant. Biased generators and tautological properties can pass indefinitely.                                                                 |
| **Model-based**    | Stateful workflows or protocols where sequences and invalid transitions matter                                | Compare with a smaller independent state model. A model copied from production repeats its defects and can suffer state explosion.                                    |
| **Metamorphic**    | Direct expected outputs are unavailable but relationships between executions are known                        | Assert relations such as round-trip, permutation invariance, monotonicity, or scaling. A relation detects inconsistency, not necessarily the uniquely correct result. |
| **Differential**   | Two genuinely comparable implementations, versions, backends, or conforming tools can receive the same inputs | Compare normalized outcomes. Agreement may be jointly wrong; shared code or assumptions weaken independence.                                                          |

## Apply the selected technique

1. State the rule and its authority before writing the generator or model.
2. Constrain generated data to valid and deliberately invalid domains that exercise the promised behaviour.
3. Reject vacuous properties, unreachable model states, shared oracle logic, and normalization that erases material differences.
4. Run with a recorded seed. Minimize a failure and retain the smallest counterexample as a focused regression test.
5. Report the sampled scope and the oracle's limitation; a passing generated run is not proof over the full space.

```typescript
// Tautological: repeats the implementation's sorting comparison.
property(array(integer()), (values) =>
    expect(sort(values)).toEqual(values.toSorted(productionComparator)),
);

// Independent metamorphic relation: permutation cannot change the multiset.
property(array(integer()), (values) =>
    expect(frequencies(sort(values))).toEqual(frequencies(values)),
);
```

For stateful behaviour, keep the model smaller than production and express only authoritative states and transitions. For differential testing, first identify allowed variation and normalize only that variation. Preserve every meaningful discrepancy until it is explained as a candidate defect, an oracle defect, or permitted divergence.
