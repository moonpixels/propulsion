# Data-Dependent Failures

Use this reference when the bug appears only for certain inputs, records, tenants, payload shapes, locales, or historical state.

Run this branch when changing the data changes the outcome more than changing the code path.

1. Isolate the smallest failure-inducing data.

- Reduce the input, record set, payload, or fixture until the smallest practical failing example remains.
- Keep a matching passing example for comparison.
- Record which fields, values, ordering, or historical facts still matter.

2. Compare passing and failing data precisely.

- Diff structure, nullability, ranges, encoding, locale, timestamps, ordering, and cardinality.
- Check whether stale, missing, duplicated, or out-of-contract data is involved.
- Avoid summarizing away the exact field or shape difference.

3. Trace the value backward.

- Follow the suspect value from the symptom to the point it was parsed, derived, transformed, fetched, or persisted.
- Identify the last known-good representation and the first bad representation.
- Use `references/multi-component-boundaries.md` when the value crosses services or storage layers.

4. Test the governing invariant.

- State the expected data contract or invariant.
- Run one experiment that proves whether the failure comes from invalid input, bad transformation, stale state, or wrong interpretation.
- Record the falsifier and eliminated alternatives in `debug.md`.

## Rules

- Reduce the data before inventing broad theories about the whole dataset.
- Keep one passing comparison case beside the failing case.
- Prove where the data first becomes wrong, not merely where the app finally rejects it.
