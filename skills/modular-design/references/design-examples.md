# Design examples

These original examples show how to reduce caller knowledge. Judge the entire contract, including effects and failures. Shorter code that conceals a needed guarantee is not a better interface.

## Ask the owner for a fact

Delivery quotes and warehouse labels both need the order's total weight. Each currently knows the order's storage layout and weight calculation.

```ts
// Before, repeated in both consumers.
const grams = order.rows.reduce(
    (sum, row) => sum + row.product.shipping.grams * row.quantity,
    0,
);

// After, each consumer asks the order.
const grams = order.totalWeightGrams();
```

The order owns quantities and product weights, so it owns this derived fact. Its private implementation can change without edits to delivery or labels. Keep the delivery provider's size limit in delivery policy. Moving that independent rule into the order would mix ownership.

## Complete the operation behind the interface

A reservation must validate availability, transition state, commit it, then publish confirmation. Consumers currently repeat the sequence.

```ts
// Before.
reservation.checkAvailability(command);
reservation.markConfirmed(command);
await reservation.save();
await reservation.publishConfirmation();

// After.
const outcome = await reservation.confirm(command);
```

Define the outcome and failure contract, including what happens if publication fails after commitment. The reservation capability owns sequencing. The caller handles the documented outcome. Keep lower-level operations public only when supported consumers independently need their contracts. A one-line wrapper that forwards `confirm` unchanged would hide no additional decision.

## Translate a vendor at the boundary

Checkout currently interprets the payment provider's statuses and optional wire fields.

```ts
// Before, checkout knows the provider protocol.
const response = await sdk.createPaymentIntent(providerPayload);
if (response.status === 'requires_action') {
    return { kind: 'challenge', url: response.next_action.redirect_to_url.url };
}

// After, checkout knows its own payment contract.
const outcome = await payments.authorise({ orderId, amount, currency });
if (outcome.kind === 'challenge')
    return { kind: 'challenge', url: outcome.url };
```

The payment module owns payload construction, provider statuses and error translation. Its domain outcomes must represent real success, rejection and challenge states. One concrete adapter can do this. A generic provider registry, factory and interface per SDK method add machinery without hiding more knowledge. Keep an adapter even with one consumer when it isolates this substantial protocol.

## Encode the invariant in the representation

A completion flag and optional timestamp require callers to reason about combinations that should never exist.

```ts
// Before.
type Work = { completed: boolean; completedAt?: Date };

// After.
type Work = { kind: 'open' } | { kind: 'complete'; completedAt: Date };
```

The new model removes the contradictory completed-without-time state. When the timestamp alone expresses the contract, use `completedAt: Date | null` and derive completion instead. Keep a plain list for summation because an empty list sums to zero. Introducing a non-empty list type there would solve no partial operation.

## Choose ownership before file count

`InvoiceLoader`, `InvoiceValidator` and `InvoiceFormatter` all know one invoice grammar. A grammar change requires all three files and their pass-through interfaces. A single invoice module with private parsing helpers can hide that knowledge behind `readInvoice(bytes)`.

Conversely, a billing module that mixes invoice grammar with a carrier's delivery protocol has two independent reasons to change. Give the carrier translation its own contract. Splitting by a real decision removes unrelated knowledge. Splitting each parsing phase into a class merely spreads one decision.

## Compare viable designs

Checkout needs quotes from one current carrier. Both designs must hide its wire format.

| Design                                 | Caller contract              | What it hides                                        | When it earns its cost                                                                           |
| -------------------------------------- | ---------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Concrete `DeliveryQuotes` module       | `quote(destination, parcel)` | Carrier protocol and failure mapping                 | One current integration with a replaceable composition point                                     |
| Checkout-owned quote port plus adapter | The same domain operation    | Protocol plus independence from the concrete adapter | Real isolated execution, concurrent implementations or an active migration requires substitution |

Trace a change to the carrier's response format. It should affect the adapter alone in both shapes. The port wins only when the extra dependency boundary serves a current requirement. A possible second carrier someday does not earn it.
