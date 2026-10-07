# Test arrangements and doubles

Read when tests need external responses, effect recording, controlled time or randomness. Use real application-owned collaborators, database access and disposable persistence. A repository mock cannot detect a broken query or transaction.

## Factories and fixtures

Follow the repository's arrangement conventions. When it uses model factories, create a missing factory rather than scattering raw inserts through tests. Give factories valid defaults and explicit overrides for the values relevant to the promise. Keep each instance independent. Use plain fixture data where that is the established convention. Keep the action under test out of the factory.

```typescript
// Bad in a repository with model factories. Repeats incidental setup.
await db.insert('payments', {
    id: 'pay-1',
    accountId: 'account-1',
    state: 'pending',
    amount: 1500,
    currency: 'GBP',
    createdAt: '2026-01-01',
});

// Good. The factory owns valid construction and persistence.
const pending = await paymentFactory.create({ amount: 1500, currency: 'GBP' });
```

Build missing launch, authentication, data-isolation and cleanup facilities within the existing framework. Reuse available infrastructure before adding machinery. Production API changes need behavioural or ownership justification beyond making mocks convenient.

## Double only the external boundary

Use the installed framework's interception or injection facility at the production boundary. Preserve the internal path that creates the request and handles the response. Replace external API calls with fixtures, not live provider calls.

| Need                                  | Suitable double            | Observe                        |
| ------------------------------------- | -------------------------- | ------------------------------ |
| Supply a provider response or failure | Stub or response fixture   | Application outcome            |
| Record an externally promised effect  | Spy or recording fake      | Contractual payload and effect |
| Check an external protocol            | Mock                       | Required protocol facts        |
| Control time or randomness            | Controlled clock or source | Application outcome            |

Derive response fixtures from the provider's documented contract or an approved representative response. Include required shape and status. A type cast does not establish fidelity. Keep the fixture smaller than a simulated provider application. Report material unverified fidelity when it limits the result.

```typescript
// Bad. Bypasses the provider adapter and application pricing.
pricing.total = vi.fn().mockReturnValue(1500);
await checkoutInternal(cart);
expect(pricing.total).toHaveBeenCalled();

// Good. The seeded cart is £15. Only the external provider is controlled.
provider.respondWith(paymentAcceptedFixture({ id: 'charge-1' }));
const response = await client.request('/checkout', {
    method: 'POST',
    body: JSON.stringify({ cartId: 'cart-1' }),
});
expect(response.status).toBe(201);
expect(await response.json()).toMatchObject({ state: 'confirmed' });
expect(provider.requests).toEqual([
    { amount: 1500, currency: 'GBP', idempotencyKey: 'cart-1' },
]);
```

The outgoing payload is itself promised in this example. Assert counts or order only when the external protocol requires them. Internal helper order is replaceable structure. For an external refusal, provide its contract-faithful response and check the promised refusal and unchanged payment state.

## Control nondeterminism

Use explicit relevant factory values, controlled boundary clocks and seeded random sources. Keep identifiers or incidental timestamps out of exact equality unless promised. Give tests independent database state, temporary directories and ports. Restore patched globals and stop processes the fixture started in guaranteed teardown.

```typescript
// Bad. Sleeps on real time and depends on machine load.
await sleep(1000);
expect(await client.invoice()).toMatchObject({ state: 'expired' });

// Good. The contract expires an invoice at this instant.
clock.set('2026-01-01T12:00:00Z');
expect(await client.invoice()).toMatchObject({ state: 'expired' });
```

If timer callbacks drive the transition, advance the controlled timers and await their completion before observing it. A frozen wall clock alone does not run queued work. For concurrency promises, coordinate the competing actions through supported entries and observable barriers rather than relying on arbitrary sleeps.
