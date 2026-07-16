# Test Quality

Use this guide when choosing a seam or oracle, or when an assertion may couple the test to representation rather than promised behaviour.

## Choose the test seam

Test the narrowest boundary that satisfies all three conditions:

- **Observable:** it exposes the requested return value, public state, error, emitted effect, persistence, navigation, or user-perceivable result.
- **Stable:** it hides algorithms, collaborator graphs, storage layouts, rendering wrappers, generated selectors, and other decisions that may change while behaviour remains fixed.
- **Predictive:** exercising it provides credible evidence that the behaviour will work in production.

Use a coarser companion test only when the narrow seam cannot predict a material integration outcome. A substitutable private hook is not a suitable assertion boundary merely because it is convenient to replace.

## Construct the oracle

Derive the expected outcome before implementing Green. Prefer, in order:

1. A requirement, accepted example, published protocol, or explicit domain decision.
2. A law, invariant, or contract independent of the production algorithm.
3. A trusted external reference or separately implemented model.
4. Prior accepted behaviour when preserving that behaviour is the requirement.

Encode the oracle as an independently reasoned literal or predicate. A small calculation is suitable when it expresses a different trusted rule; reusing the production helper or repeating its algorithm can only reproduce the same defect.

```typescript
// Repeats the implementation's likely algorithm.
const expected = items.reduce((sum, item) => sum + item.price, 0);
expect(calculateTotal(items)).toBe(expected);

// Uses the accepted worked example as an independent oracle.
expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
```

When no credible oracle exists, return the missing behavioural decision instead of inventing the expected result. Treat output captured from the current implementation as characterization, not proof of correctness.

## Structure one behaviour

Use Arrange-Act-Assert:

1. **Arrange** only the state and collaborators needed for the behaviour.
2. **Act** once through the selected public seam.
3. **Assert** the complete promised outcome and material unchanged state.

One behaviour may require several cohesive assertions. Split a test when it contains multiple independent Acts or when its name cannot state one behavioural rule. Clean up resources or external state acquired by the test.

## Apply the Test Desiderata

Retain tests that are isolated, composable, deterministic, fast, writable, readable, behavioural, structure-insensitive, automated, specific, predictive, and inspiring. Treat the properties as trade-offs: a slower test can earn its cost through prediction, while a faster test still needs credible production evidence.

Use two counterfactuals:

- If promised behaviour changed, would the test result change?
- If only hidden structure changed, would the test and result remain unchanged?

A useful test answers yes to both. Move a structure-sensitive observation outward to the supported result; move a behaviour-insensitive assertion toward the actual promise.

## Observe promised outcomes

| Concern | Durable observation | Replace structure coupling with | Representation is valid when |
| --- | --- | --- | --- |
| Domain result | Public operation against an independently justified example or invariant | A literal, contract, or independently reasoned predicate instead of the production algorithm | The representation is part of the domain contract |
| Public state | Supported command followed by a documented query or return value | Public state instead of private fields, methods, or patched internals | Diagnostic state is an intentional supported interface |
| Error | Caller-visible type, code, material message, and promised recovery or unchanged state | Stable error meaning instead of a private branch, stack shape, or helper call | Exact wording is a documented user or API contract |
| UI | Role, label, text, displayed value, accessible state, focus, or navigation | User-perceivable outcome instead of classes, wrapper tags, child indexes, or DOM depth | Visual appearance or semantic markup is the promised behaviour |
| Persistence | Write and read through supported interfaces, with reload or restart when durability matters | Public retrieval instead of private tables, columns, ORM calls, or storage layout | The schema is a published integration contract |
| External effect | Recorded boundary request or fake mailbox, queue, or provider outcome | Promised payload and result instead of internal delegation | Count, order, or arguments are part of the external protocol |
| Snapshot or serialization | Small reviewed public artifact or selected semantic fields | Focused compatibility facts instead of broad structural snapshots | Exact bytes, markup, or object shape are the published format |
| Configuration | Configured system exercised through its observable effect | Runtime result instead of parser calls or incidental internal objects | Generated configuration text is itself the public artifact |

For UI behaviour, interact as a user would and assert what a user or assistive technology can perceive:

```typescript
// Couples the test to generated styling and DOM structure.
expect(button.className).toBe('btn btn-primary px-4');
expect(container.children[0]).toBe(button);

// Observes the supported interaction and visible result.
await user.click(screen.getByRole('button', { name: 'Save' }));
expect(screen.getByText('Changes saved')).toBeVisible();
```

For side effects, observe the system boundary rather than the internal route. Assert call count or order only when duplicate suppression, transaction ordering, or protocol sequencing is the behaviour. See [Test Doubles](TEST-DOUBLES.md) for boundary substitutes and interaction assertions.
