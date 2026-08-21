# Test Design

Apply this guide to every retained test.

## Select a durable seam

Use the narrowest seam that is:

- **Observable:** exposes a supported result, state, error, effect, persistence, navigation, or user-perceivable outcome.
- **Stable:** hides algorithms, collaborator graphs, storage layouts, rendering wrappers, generated selectors, and other replaceable decisions.
- **Predictive:** exercises the behaviour and technology whose production failure matters.

Add a broader companion test only when the narrower seam cannot retain a material integration risk. Test a pure rule through its public function, a database guarantee against the real engine when its semantics matter, and an end-user interaction through the rendered application when wiring or accessibility is part of the promise.

| Concern | Brittle or circular test | Durable behavioural test |
| --- | --- | --- |
| Expected value | Repeats the production reduction to calculate `expected` | Uses the accepted example `10 + 5 = 15` or an independent invariant |
| Domain result | Calls a private pricing method or asserts helper delegation | Calls the supported quote operation and asserts its public result |
| UI | Asserts CSS classes, wrapper tags, child indexes, or DOM depth | Interacts by role or label and asserts visible text, value, focus, state, or navigation |
| Persistence | Inspects private tables, columns, or ORM calls | Writes and reads through supported interfaces; reloads when durability matters |
| Error | Asserts a private branch or stack shape | Asserts caller-visible type, code, promised message, recovery, and unchanged state |
| Snapshot | Accepts a broad incidental object or markup snapshot | Asserts selected semantic fields, unless exact bytes or markup are the contract |
| Bug | Treats the existing crash or output as the expected result | Reproduces the wrong result, then asserts a requirement-derived correction |

Representation is valid only when that representation is itself a published contract.

## Build an independent oracle

Prefer, in order:

1. a confirmed requirement, accepted worked example, published protocol, or domain decision;
2. a law, invariant, or contract independent of the production algorithm;
3. a trusted external reference or separately implemented model; or
4. accepted prior behaviour when preservation is the requirement.

Encode the expectation as an independently reasoned literal or predicate. Never call the production helper, copy its algorithm, approve newly captured output, or assert only that execution completed unless completion is the entire promise. When no credible oracle exists, return the missing behavioural decision.

## Make the test deterministic and complete

Arrange local explicit state, perform one meaningful action, assert the complete promised outcome, then release acquired resources. Add a negative or unchanged-state assertion only when the requirement makes it material and the action has a real causal path to the observed value. Do not clone, replace, or otherwise isolate that value before the action and then claim its preservation as evidence. One behaviour may need several cohesive assertions; split multiple independent actions or rules.

Control time and randomness through an injected clock or deterministic source at the system boundary. Use fixed instants and seeds and preserve a minimized failing counterexample. Give each test isolated data and restore process state, files, transactions, services, timers, and environment values it changes. Avoid sleeps, execution order dependencies, live external services, and shared mutable fixtures.

```typescript
// Brittle: wall-clock timing and an assertion too weak to catch the wrong expiry.
expect(issueToken().expiresAt).toBeGreaterThan(Date.now());

// Durable: controlled time and the exact promised interval.
expect(issueToken({ now: fixedClock('2030-01-01T00:00:00Z') }).expiresAt).toBe(
    '2030-01-01T01:00:00Z',
);
```

## Challenge and rationalise

Ask both counterfactuals before retaining a test:

- If promised behaviour broke, would this test fail?
- If only hidden structure changed, would this test remain unchanged and pass?

After refactoring, map every affected test to unique protection. A focused example remains useful when it specifies a distinct rule or gives a clearer failure than a consolidated form. Otherwise remove duplicates or combine them:

```typescript
// Repetition with no distinct structure.
expect(priceFor(1)).toBe(10);
expect(priceFor(2)).toBe(20);
expect(priceFor(3)).toBe(30);

// One rule with the same protection and clearer extension.
for (const [quantity, expected] of [
    [1, 10],
    [2, 20],
    [3, 30],
]) {
    expect(priceFor(quantity)).toBe(expected);
}
```

Do not consolidate cases with materially different setup, outcome, boundary, or diagnostic value. Fewer tests are better only when no unique defect detection is lost.
