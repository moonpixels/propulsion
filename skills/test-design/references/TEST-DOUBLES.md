# Test Doubles

Keep collaborators inside the system real. Substitute a boundary only when the real dependency is slow, unavailable, destructive, non-deterministic, externally mutating, or otherwise uncontrollable in this test.

## Choose the least powerful double

| Double | Supply                                             | Verify                                       |
| ------ | -------------------------------------------------- | -------------------------------------------- |
| Dummy  | An unused required value                           | Nothing                                      |
| Stub   | A controlled indirect input                        | The public outcome                           |
| Fake   | A small working boundary implementation            | The public outcome or recorded public effect |
| Spy    | A record of an otherwise invisible boundary effect | Only promised boundary facts                 |
| Mock   | An expected external interaction protocol          | Only contractually material calls            |

Prefer state verification. Interaction verification is warranted when the interaction is the promise: for example, one idempotency-keyed payment request or publishing only after a durable write.

```typescript
// Brittle: replaces internal policy and specifies its call graph.
expect(pricing.lookup).toHaveBeenCalledTimes(1);
expect(discounts.apply).toHaveBeenCalledBefore(tax.apply);

// Durable: real internal collaborators produce the supported result.
expect(await quoteOrder(order)).toEqual({ total: 108, currency: 'GBP' });
```

At an uncontrollable external boundary, record only the promised effect:

```typescript
const mailer = new RecordingMailer();
await registerUser({ email: 'ada@example.com' }, { mailer });

expect(mailer.sent).toEqual([{ to: 'ada@example.com', template: 'welcome' }]);
```

Use a mock when interaction is the provider-facing contract:

```typescript
expect(paymentGateway.charge).toHaveBeenCalledOnceWith({
    amount: 108,
    currency: 'GBP',
    idempotencyKey: order.id,
});
```

When sequencing across system boundaries is promised, record those boundary events and assert their public order:

```typescript
const events: string[] = [];
const payments = new RecordingGateway({ events, result: { paymentId: 'p-1' } });
const orders = new RecordingOrders({ events, initial: pendingOrder });

await checkout(pendingOrder.id, { payments, orders });

expect(events).toEqual(['charge-succeeded', 'order-saved']);
```

This protects a payment-before-persistence promise. Ordering between pricing helpers, mappers, or other internal collaborators remains hidden structure.

Do not assert logging, helper calls, object construction, or internal order unless those facts are externally promised.

## Preserve boundary fidelity

Derive double responses from the external contract, not copied client logic. Keep the double smaller than the real boundary. Prefer a real database or filesystem in an isolated disposable environment when its semantics matter. When feasible, use caller-selected contract evidence against the real boundary to check that a fake, stub, or recorded request remains compatible; otherwise report the untested fidelity.
