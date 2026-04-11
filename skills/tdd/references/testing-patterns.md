# Testing Patterns

Use this reference during red-green. Choose tests that prove behaviour, not today's implementation.

## Default Move

Start with the highest-level public interface that proves the behaviour cheaply.

- Prefer the API a caller, user, or upstream module actually uses.
- Drop to a lower seam only when the public path is too slow, too broad, or too hard to control.
- If you drop lower, choose a stable seam with business meaning, not a private helper.

```typescript
// Good: public interface, observable result
test('creates a retrievable user', async () => {
    const user = await createUser({ name: 'Adam' });
    const retrievedUser = await getUser(user.id);

    assertMatches(retrievedUser, { name: 'Adam' });
});

// Bad: reaches through internals
test('calls insertUserRow', async () => {
    const insertUserRowCalls = recordCalls(dbModule, 'insertUserRow');

    await createUser({ name: 'Adam' });

    assertEqual(insertUserRowCalls.count(), 1);
});
```

## Strong Test Patterns

### Test observable behaviour

Assert on outputs, returned state, emitted events, persisted state visible through a supported read path, or externally visible side effects.

- Good: `checkout(cart)` returns `confirmed`.
- Good: `publishPost()` makes the post appear in `listPublishedPosts()`.
- Bad: `checkout()` called `paymentService.charge()` exactly once.

### Test through public interfaces

Use exported functions, HTTP endpoints, CLI commands, UI interactions, message handlers, or other supported entry points.

- Good: `login(email, password)` rejects invalid credentials.
- Bad: `validatePasswordHash()` was called from inside `login()`.

### Choose one behaviour per test

Keep each test focused on one behaviour. Multiple assertions are fine when they describe one outcome from one cause.

```typescript
test('rejects checkout when cart is empty', async () => {
    const result = await checkout(emptyCart());

    assertEqual(result.ok, false);
    assertEqual(result.error, 'Cart is empty');
});
```

Those assertions belong together because they describe one outcome. Split the test only when failures would point to different behaviours.

### Prefer realistic setup over elaborate stubbing

Use simple builders, fixtures, or in-memory adapters when they keep the test closer to production behaviour.

- Prefer `createCart({ items: [book()] })` over six mocks.
- Prefer a fake mailer that records sent messages over mocking every mailer method.

### Mock only at unstable or expensive boundaries

Mock payment gateways, clocks, UUID generation, network calls, file systems, or other boundaries that are slow, nondeterministic, or outside the unit of behaviour.

Keep the logic under test real.

```typescript
// Good: keep business logic real, isolate time
test('marks subscription expired after due date', () => {
    const clock = fakeClock(new Date('2026-04-10T12:00:00Z'));
    const subscription = createSubscription({ endsAt: '2026-04-09T12:00:00Z' });

    assertEqual(isExpired(subscription, { clock }), true);
});
```

### Prefer stable seams when public paths are too broad

If the true public interface needs too much setup, drop to the narrowest stable seam that still has domain meaning.

- Good seam: `PriceCalculator.calculate(order)`.
- Weak seam: `applyDiscountStep2()`.

The seam should still represent behaviour another part of the system could reasonably depend on.

## Anti-Patterns

### Implementation-detail tests

These tests fail when refactoring changes structure without changing behaviour.

Red flags:

- Spying on private or internal collaborators.
- Asserting call counts, call order, or which helper ran.
- Reaching into private state not exposed by the interface.
- Naming tests after how the code works rather than what it does.

```typescript
// Bad: proves structure, not behaviour
test('sends audit event after saving', async () => {
    const events = recordCallOrder(repo, 'save', auditBus, 'emit');

    await registerUser(input);

    assertSequence(events, ['save', 'emit']);
});
```

Prefer a result that matters to a caller, such as the user being created and an audit entry being visible through a supported query.

### Over-mocking

If most of the test is mock setup, the test is probably proving that the mocks agree with each other.

Red flags:

- Mock setup is longer than the assertions.
- You mocked every collaborator "just to be safe".
- Removing one mock changes the entire test shape.
- You cannot explain which boundary the mock isolates.

Prefer a more integrated test with fewer doubles.

### Incomplete mocks

Partial mocks often pass until real code touches a field the fake omitted.

```typescript
// Bad: omits fields real consumers may depend on later
const paymentResponse = {
    status: 'approved',
    transactionId: 'txn_123',
};

// Better: mirror the real shape completely
const paymentResponse = {
    status: 'approved',
    transactionId: 'txn_123',
    currency: 'USD',
    createdAt: '2026-04-10T12:00:00Z',
    risk: { score: 12, decision: 'approve' },
};
```

When you must mock data, mirror the real schema, not just the subset your current assertion happens to use.

### Mocking at the wrong level

Do not mock away the very behaviour the test is meant to prove.

- Bad: mocking `UserRepository.create()` in a test for "creates a user".
- Better: use a real repository with an in-memory store and mock the email provider if needed.

### Speculative coverage

Do not write tests for behaviour you have not been asked to deliver yet.

Red flags:

- "We might need this edge case later."
- "I am already here, so I may as well add three more tests."
- Adding tests for options, flags, or failure modes with no current requirement.

Speculative tests calcify design and create noise during refactor. Add the next test only when the next required behaviour appears.

### Test-only production seams

Do not add public methods, flags, or branches only so tests can inspect internals.

- Bad: `order._debugState()` added only for tests.
- Better: assert through existing outputs, or extract a real stable seam with production value.

## Gate Questions

Ask these questions before keeping a test:

1. What behaviour does this test prove for a caller or user?
2. Would the test still pass if I rewrote the internals but kept behaviour the same?
3. Am I asserting through a public interface or a stable seam with domain meaning?
4. Is every mock isolating a real boundary rather than replacing core logic?
5. Does each mock preserve the parts of reality the test depends on?
6. If this test fails, will the failure describe a broken behaviour rather than a refactor?
7. Am I adding this test because of a current requirement, not because it feels thorough?

If any answer is "no" or "I am not sure", simplify the test before proceeding.

## Red-Green Heuristics

When choosing the next test:

- Start with the smallest missing behaviour that changes what a caller can observe.
- Prefer one test that opens a path forward over a "complete" matrix up front.
- Make the failure message specific enough that you know what code to write next.
- Stop once the required behaviour is covered; breadth can come later if a requirement demands it.

Good next tests during red-green:

- "returns `not_found` for an unknown order id"
- "applies percentage discount before tax"
- "rejects duplicate email addresses"

Weak next tests during red-green:

- "calls helper with transformed payload"
- "invokes parser twice"
- "supports five hypothetical invalid payloads" when only one matters now

## Failure Smells

Pause and rewrite the test if:

- The assertion mentions mocks more than domain outcomes.
- The setup requires deep knowledge of internal object graphs.
- A refactor with unchanged behaviour breaks many tests.
- The only way to verify success is to inspect a private field.
- The test title starts with "calls", "uses", "sets", or "invokes" instead of a behaviour.

## Quick Comparison

| Prefer                           | Avoid                          |
| -------------------------------- | ------------------------------ |
| Public interfaces                | Private helpers                |
| Observable outcomes              | Internal call assertions       |
| Minimal boundary mocks           | Mocking core logic             |
| Complete realistic test doubles  | Partial hand-waved mock shapes |
| Required next behaviour          | Speculative coverage           |
| Stable seams with domain meaning | Test-only seams                |

## Bottom Line

Strong tests survive refactor because they describe behaviour. Weak tests break when code moves because they describe implementation.

When in doubt, test what a caller can observe, keep mocks at real boundaries, and write only the next test needed to move red to green.
