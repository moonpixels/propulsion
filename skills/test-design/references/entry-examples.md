# CLI, library and automated entries

Read when the behavioural promise belongs to a command, library or automated process. These illustrative fixtures use real internal components and isolated persistence. The caller of the entry can be a person, another programme, a scheduler or a message broker.

## CLI commands

Invoke the production command with arguments, input and environment its user can supply. Observe stdout, stderr, exit status and promised files or effects. Calling the parser alone misses command wiring and execution.

The illustrated `notes create` command must write a note that `notes show` can retrieve.

```typescript
// Bad. Checks argument parsing without running the command.
expect(parseArgs(['create', '--title', 'Release'])).toEqual({
    command: 'create',
    title: 'Release',
});

// Good. The fixture launches the real executable in an isolated data directory.
test('a created note is retrievable', async () => {
    const cli = await testCli();
    const created = await cli.run(['create', '--title', 'Release', '--json']);
    expect(created.exitCode).toBe(0);
    const { id } = JSON.parse(created.stdout);
    const shown = await cli.run(['show', id, '--json']);
    expect(shown.exitCode).toBe(0);
    expect(JSON.parse(shown.stdout)).toMatchObject({ id, title: 'Release' });
});
```

Keep exact stderr or formatting assertions when the command contract promises them. Otherwise assert the meaningful diagnostic or parsed result. The fixture must preserve command exit codes and clean up even after failure.

## Scheduled jobs and queue consumers

Invoke the entry registered with the scheduler or consumer with its supported context or message. Keep parsing and dispatch when they are part of the promise. Calling an internal worker alone cannot establish broker-message validation or scheduler registration.

This reconciliation job promises to record a provider's settled amount for a pending payment. The factory creates a real stored payment. The provider fixture supplies the external HTTP response. The entry and internal reconciliation path remain real.

```typescript
// Bad. Replaces the application behaviour and pins its internal call.
payments.update = vi.fn();
await reconcileOne({ id: 'pay-1' }, payments);
expect(payments.update).toHaveBeenCalled();

// Good. Run the same entry the scheduler invokes and observe its result.
test('reconciliation records the settled payment amount', async () => {
    const { jobs, payments, provider } = await testApp();
    const pending = await payments.factory.create({
        state: 'pending',
        providerId: 'settlement-1',
    });
    provider.respondWith(
        settlementFixture({
            id: 'settlement-1',
            amount: 1500,
            currency: 'GBP',
        }),
    );

    await jobs.reconcilePayments.run();

    expect(await payments.read(pending.id)).toMatchObject({
        state: 'reconciled',
        settledAmount: 1500,
        currency: 'GBP',
    });
});
```

Use a supported read interface where available. If the automated process's contract is the durable record or exported file itself, inspect that effect directly. Assert contractual values rather than incidental schema, SQL or intermediate flags. Await the job or its documented completion signal.

For a promised idempotent consumer, deliver the same supported message twice and observe one resulting effect. For a promised transition rule, attempt allowed and forbidden transitions through the entry. Do not set private flags merely to hit a branch. These cases belong only when their behavioural promises are in scope.

## Library products

For a library, its consumers are users. Call the supported package API directly. A unit test is sufficient when that entry exercises the promised behaviour. Exporting an application helper for convenience does not turn it into a library product.

Suppose the invoice library promises to parse this document into a public result.

```typescript
// Bad. Pins a replaceable tokenisation step.
expect(tokeniseInvoice('INV-7,125')).toEqual(['INV-7', '125']);

// Good. The supported package entry exposes the complete promised result.
import { parseInvoice } from 'invoice-library';
expect(parseInvoice('INV-7,125')).toEqual({ id: 'INV-7', total: 125 });
```

Choose the seam by its supported contract, not by the labels unit, integration or end-to-end. Keep the least machinery that exercises the complete promise.
