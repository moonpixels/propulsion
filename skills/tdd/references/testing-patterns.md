# Testing Patterns

Use this reference before writing or keeping a TDD test. Keep tests behavioural, refactor-safe, and cheap enough to run during red-green.

## When TDD Applies

Use TDD when the task changes observable behaviour, a public contract, or durable business logic.

Do not force TDD for prose-only docs, comments, prompts, formatting, config text, dependency bumps, generated files, or pure refactors with no behaviour change. Record the no-test rationale and run fallback verification instead.

If a task mixes behaviour with maintenance, TDD only the behaviour-changing slice.

## Test Type Choice

Choose the highest-level test that proves the behaviour while staying quick, deterministic, and cheap.

1. Prefer feature or integration tests first. Test the public path a caller, user, endpoint, CLI, message handler, or upstream module uses.
2. Use unit tests second for isolated important logic, especially rules with many cases, edge conditions, or awkward setup through the full path.
3. Use browser or end-to-end tests sparingly for UI interaction patterns, smoke coverage, or behaviour that lower-level tests cannot prove.

Drop lower only when the higher-level path is slow, flaky, too broad, or expensive to control. Drop to a stable seam with domain meaning, not a private helper.

## Red-Green Test Quality

Write one failing test for one missing behaviour.

Good red tests:

- name the behaviour in caller language;
- fail for the expected reason before production changes;
- tell you the next smallest code change;
- assert an observable outcome;
- avoid future requirements.

Weak red tests:

- assert helper calls, call order, source text, hook names, class names, or private state;
- require large mock choreography;
- fail when internals move but behaviour stays the same;
- cover hypothetical edge cases not requested now.

## Refactor-Safe Tests

Refactor-safe tests keep passing when internals are rewritten but behaviour stays the same.

Assert through public interfaces or stable seams:

- returned values;
- persisted state through supported reads;
- visible UI or announced accessibility output;
- emitted domain events;
- externally visible side effects.

Avoid private helpers, hidden fields, internal modules, source-string checks, AST shape, broad snapshots, and internal call choreography.

```typescript
// Good: public behaviour
test('rejects checkout when the cart is empty', async () => {
    const result = await checkout(emptyCart());

    assertEqual(result.ok, false);
    assertEqual(result.error, 'Cart is empty');
});

// Bad: implementation detail
test('calls validateCart before createOrder', async () => {
    const calls = recordCallOrder(
        cartModule,
        'validateCart',
        orderModule,
        'createOrder',
    );

    await checkout(emptyCart());

    assertSequence(calls, ['validateCart', 'createOrder']);
});
```

## Good Tests

Good tests prove a behaviour someone depends on.

- Test through exported functions, endpoints, commands, UI interactions, handlers, or stable domain seams.
- Keep setup small and realistic.
- Use multiple assertions only when they describe one outcome from one cause.
- Prefer builders, fixtures, in-memory adapters, and real collaborators when they stay cheap.
- Make failures describe broken behaviour, not changed structure.

Examples:

- `login(email, password)` rejects invalid credentials.
- `publishPost()` makes the post visible in `listPublishedPosts()`.
- Clicking `Save` shows a success message.

## Bad Tests

Reject tests that prove structure instead of behaviour.

- `checkout()` calls `paymentService.charge()` once.
- `login()` calls `validatePasswordHash()`.
- A component contains `aria-label` as source text.
- A broad snapshot proves a button opens a menu.
- A test exists only because an edge case might matter later.

Replace bad tests with behavioural assertions. If none exists, do not keep a weak test; document the no-test rationale and run fallback verification.

## Mocks And Doubles

Mock only real boundaries that are external, slow, unstable, nondeterministic, or too expensive for the selected scope.

Good mock targets:

- payment gateways;
- clocks and time;
- UUID/randomness;
- network calls;
- file systems;
- third-party APIs.

Keep core logic real. Prefer fakes that preserve behaviour, such as an in-memory repository or mailer that records sent messages.

Avoid over-mocking. If mock setup dominates the test, the test likely proves mocks agree with each other. If mock data is required, mirror the real schema enough that consumers cannot accidentally rely on missing fields.

## Anti-Patterns

Do not keep these as behavioural proof:

- source-string checks;
- private-structure checks;
- internal call counts or order;
- broad snapshots for dynamic markup;
- test-only production flags or methods;
- partial hand-waved mocks;
- tests for speculative requirements;
- mocking away the behaviour under test.

## Gate Questions

Ask before writing or keeping a test:

1. What behaviour does this prove for a caller or user?
2. Would it pass after an internal rewrite with the same behaviour?
3. Is the assertion through a public interface or stable domain seam?
4. Is every mock isolating a real boundary?
5. Is this the next required behaviour, not a future guess?
6. Will failure point to broken behaviour rather than changed structure?

If any answer is no, rewrite the test. If no valuable behavioural test remains, document why and run the strongest fallback verification: existing related tests, typecheck, lint, build, CLI smoke check, browser check, or manual reproduction.
