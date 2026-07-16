# Test Doubles

Use this guide before replacing a collaborator or asserting calls. Keep collaborators inside the system real; substitute a boundary when the real dependency is slow, unavailable, non-deterministic, externally mutating, or otherwise uncontrollable in the test.

## Choose the least powerful double

Start with the real collaborator, then introduce only the capability the test needs:

| Double | Use it to | Verification |
| --- | --- | --- |
| Dummy | Fill an unused required parameter | None |
| Stub | Supply a controlled indirect input | Assert the public outcome |
| Fake | Run a working, simplified boundary implementation | Assert the public outcome or recorded public effect |
| Spy | Record an otherwise invisible boundary effect | Inspect only promised boundary facts |
| Mock | Specify a required external interaction protocol | Verify only contractually material calls |

Prefer state verification: act through the public seam, then inspect its result or a recorded boundary effect. Use interaction verification when the interaction is itself observable behaviour, such as one idempotency-keyed payment request or committing only after a durable write.

## Keep the contract visible

Specify the external fact that matters and leave the internal route free to change.

```typescript
// Couples the test to internal delegation.
expect(pricingService.lookup).toHaveBeenCalledTimes(1);
expect(discountCalculator.apply).toHaveBeenCalledBefore(taxCalculator.apply);

// Observes the public result with real internal collaborators.
expect(await quoteOrder(order)).toEqual({ total: 108, currency: 'GBP' });
```

At an uncontrollable boundary, record the promised effect without specifying internal calls:

```typescript
const mailer = new RecordingMailer();
await registerUser({ email: 'ada@example.com' }, { mailer });

expect(mailer.sent).toEqual([{ to: 'ada@example.com', template: 'welcome' }]);
```

Use an expectation mock when the external protocol is the outcome:

```typescript
await submitPayment(order, paymentGateway);

expect(paymentGateway.charge).toHaveBeenCalledOnceWith({
    amount: 108,
    currency: 'GBP',
    idempotencyKey: order.id,
});
```

Here the amount, currency, single request, and idempotency key are provider-facing promises. Do not add expectations for logging, helper calls, object construction, or other internal routing.

## Preserve boundary fidelity

A double can make an impossible system look correct. Keep its behaviour smaller than the production boundary and derive responses from the provider contract rather than copied client logic. Where feasible, run focused contract tests against the real boundary to confirm that the fake, stub, or recorded request still matches it. Otherwise report the unverified fidelity as a limitation.

Control time and randomness by injecting a clock or deterministic source at the system boundary. Prefer a real test database or filesystem in an isolated disposable environment when its semantics are material; use a fake only when its behavioural differences cannot invalidate the test's claim.
