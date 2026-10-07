# Boundaries and protection

Read when redundant validation, error handling, comments or test scaffolding may be removable.

## Delete a proven redundant defence

Keep validation where untrusted input enters. Delete repeated internal checks only after tracing the runtime guarantee through every supported entry and mutation path. A TypeScript annotation, cast or assertion signature alone does not enforce a value.

```ts
// Before, inside a private operation.
if (
    typeof config.timeoutMs !== 'number' ||
    !Number.isFinite(config.timeoutMs)
) {
    throw new Error('Invalid timeout');
}
return waitForReply(config.timeoutMs);

// After, only with the runtime guarantee below established.
return waitForReply(config.timeoutMs);
```

The guarantee must show that every entry uses a validator enforcing a finite numeric timeout, the operation cannot receive unchecked construction, and the value cannot become invalid after validation. Keep the check when configuration is mutable or another entry bypasses parsing.

Retain boundary validation for network payloads, persisted data, environment values and third-party responses. Retain permission, balance and state checks whose truth can change between validation and use. Remove duplicated parsing only when retaining one parse preserves error timing and precedence.

Trust established invariants rather than trusting internal type declarations unconditionally.

## Reuse a predicate's complete guarantee

Check the actual library or native predicate before adding or retaining another guard. JavaScript's [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) rejects every non-number without coercion, so a separate type check on the same stable value is redundant.

```ts
// Before.
if (typeof value !== 'number' || !Number.isFinite(value)) reject();

// After.
if (!Number.isFinite(value)) reject();
```

Keep nullability checks needed before accessing a property and checks that supply required static narrowing. Preserve evaluation count when property reads involve getters or proxies. The global `isFinite` coerces input and cannot supply the same guarantee. Generalise this technique by reading the predicate's contract, rather than assuming every validator checks types.

## Delete empty error machinery and unjustified fallbacks

Remove a catch that only rethrows the same error.

```ts
// Before.
try {
    return await sendInvoice(invoice);
} catch (error) {
    throw error;
}

// After.
return await sendInvoice(invoice);
```

Keep logging, translation, cleanup, cancellation and required async boundaries. Removing `await` can change stack traces or whether `finally` runs before completion. Keep error identity and propagation where they are contractual.

A fallback may be redundant when the missing case is unreachable under established runtime construction. If it handles supported missing or invalid input, retain its outcome. Turning a silent fallback into a thrown error is a behaviour change. Identify that decision separately, rather than hiding it inside cleanup.

For **Incomplete Library Class**, first check whether the installed library already supplies the required operation. Remove bespoke adaptation only when its semantics match. Keep the smallest adapter for an actual external mismatch.

## Replace explanatory narration with names

Rename a misleading symbol instead of adding a comment to explain it. Delete commented-out code, stale instructions and narration of obvious statements.

```ts
// Before.
// Calculate the number of visible rows.
const n = visibleRows.length;

// After.
const visibleCount = visibleRows.length;
```

Keep public contract documentation, legal headers, factual external constraints and explanations of irreducible algorithms. Comments recording an important reason can be the least code needed to preserve maintainability.

## Delete tests that add no unique protection

Trace the behaviour each test actually observes. Keep the smallest set protecting supported behavioural promises. Delete obsolete fixtures, private-delegation assertions and duplicate cases only when useful protection survives elsewhere or they protect no supported behaviour.

```ts
// Before, after a forwarding class is removed.
expect(reader.read).toHaveBeenCalledWith(bytes);

// After, retaining the existing entry-point assertion.
expect(parseInvoice(bytes)).toEqual({ id: 'INV-7', total: 125 });
```

The illustrated literal must come from an independently established contract or worked example. If the entry-point assertion already exists, delete the obsolete delegation test. If the obsolete test held unique protection, propose transferring that protection before removing it. This example is a proposed transformation, not authority to write new tests during read-only review.

Keep legitimate absence assertions such as no charge on rejection, exact public outputs and useful compile-time checks. A test count or coverage improvement is not the objective. Keep cases exercising distinct user behaviour even when setup looks duplicated.

Reuse existing behavioural checks or a focused safe comparison for preservation evidence. Follow [test design](../../test-design/SKILL.md) when assessing new-test eligibility or test quality. New coverage for a behaviour-preserving refactor requires explicitly requested testing work. Leave a preservation gap visible rather than expanding the test scope. Respect the skill's silent exit without a framework.
