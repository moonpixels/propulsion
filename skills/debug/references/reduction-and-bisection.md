# Reduction and bisection

Read when a trigger is large or the failure appeared between ordered states. Both techniques narrow the search. Neither establishes a causal mechanism by itself. Examples are illustrative.

## Delta debugging

Freeze an oracle that recognises the exact failure, a pass and an invalid or unresolved candidate. Preserve the original input, seed, ordering and environment. Remove a coherent partition, run the unchanged oracle and retain the removal only when the same failure remains. Try complementary removals and finer partitions when coarse removal fails. Preserve dependencies and syntax needed for a valid candidate.

Stop when no remaining unit can be removed at the selected granularity without losing the failure, or when the bounded case is more useful to investigate than further reduction. State the reduction boundary. **1-minimality** means no single remaining element can be removed. It does not mean globally smallest.

### Worked example, two interacting rows

An import of 10,000 rows rejects two records with the same identifier. It should report the duplicate and leave storage unchanged.

```text
Oracle: exact duplicate-ID error and unchanged storage.
Unresolved: invalid CSV, missing headers or a different exception.

Remove the second half: passes.
Remove the first half: passes.
Conclusion: neither half alone carries the failure.
Next: remove smaller complementary chunks while retaining cross-half pairs.
Reduced case: header plus two distant rows with the same identifier.
```

Both rows are load-bearing together. Do not classify the original failure as unreproducible because each half passes. An oracle that accepts any exception could instead reduce to a malformed header and investigate the wrong defect. Use the smaller case to form hypotheses, then verify a repair against the original full import.

## Change bisection

Use bisection when one property is reliably absent at a good endpoint and present at a bad endpoint. States can be revisions, versions, configurations or ordered inputs. Confirm both endpoints with the same classifier before choosing midpoints. A noisy classifier needs the nondeterministic method before ordinary bisection is trustworthy.

Test the midpoint, record its exact state and verdict, retain the interval containing the transition and repeat. Keep toolchains and dependencies comparable. Use an isolated worktree or disposable copy for historical states when the current checkout contains work to preserve. Exit the owned bisect session when finished and retain its log.

For `git bisect run`, exit `0` means good, `1` through `127` except `125` mean bad, and `125` means untestable. Translate setup failures explicitly. A build failure unrelated to the symptom is not evidence of the target regression.

### Worked example, separate setup from row loss

```text
Known good: revision A exports all three fixture rows in order.
Known bad: revision Z exports only two.
Classifier: build the revision, export the same fixture, compare exact rows.

Midpoint M cannot build with the available toolchain -> untestable.
Midpoint P builds and loses the last row -> bad.
Search result: Q introduced row loss, or Q/R remain candidates after skips.
```

Inspect the semantic change and test its predicted effect on iteration or flushing. A first bad revision is localisation evidence. Skipped neighbours may leave several candidates. Environment drift, interaction with other changes, or a property that fails, recovers and fails again can invalidate a simple first-transition interpretation. Report that limit rather than invent a unique cause.
