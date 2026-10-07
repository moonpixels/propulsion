# Test techniques

Read before writing or repairing behavioural tests. These bad/good pairs are illustrative TypeScript. Adapt syntax and fixture names to the repository. Fixtures boot the real application with isolated state and own cleanup. The contracts stated beside each example supply its expectations.

## Arrange–Act–Assert through the real entry

Arrange relevant starting state, act through the supported entry, then assert the promised outcome. Keep the action under test visible in the test body. A read used to observe a write belongs to Assert. Several related assertions can establish one promise.

For an HTTP profile service, saving a name must make it retrievable. Testing internal delegation cannot establish routing or persistence.

```typescript
// Bad. The mock supplies the result and the assertion pins delegation.
const profiles = { save: vi.fn().mockResolvedValue({ name: 'Ada' }) };
await updateProfileHandler({ name: 'Ada' }, profiles);
expect(profiles.save).toHaveBeenCalledWith({ name: 'Ada' });

// Good. The real write and read establish the promise.
test('a saved profile name is retrievable', async () => {
    // Arrange.
    const { app, users } = await testApp();
    const ada = await users.create();
    const client = app.asUser(ada);

    // Act.
    const saved = await client.request('/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: 'Ada' }),
    });

    // Assert.
    expect(saved.status).toBe(200);
    const profile = await client.request('/profile');
    expect(await profile.json()).toMatchObject({ name: 'Ada' });
});
```

Choose the entry for the actual promise. An HTTP check does not establish that a UI button works. An isolated component is appropriate when the component itself is the delivered product. An internal component test does not replace the application journey that connects its collaborators.

## Use an independent oracle

An **oracle** supplies the expected result. Use a requirement, independently worked example or contractual predicate. A £10 item and a £5 item must yield a £15 cart. Observe the application, rather than a value assembled by the test.

```typescript
// Bad. The expected value repeats production's calculation.
expect(total(items)).toBe(items.reduce((sum, item) => sum + item.price, 0));

// Good. The cart fixture contains the two known items.
const response = await client.request('/cart/cart-1');
expect(await response.json()).toMatchObject({ total: 1500, currency: 'GBP' });
```

Prefer precise values to `toBeTruthy()` or `not.toThrow()` when the promise supplies a result. Generated identifiers can use contractual predicates, such as a returned ID that retrieves the saved record. Exact values are useful when independently known, not because every output must be a literal.

## Select representative cases

Use **equivalence partitioning** to group inputs the contract treats alike. Use **boundary value analysis** at promised thresholds. These techniques select meaningful cases rather than multiplying fixtures or chasing coverage percentages.

Suppose an API accepts integer seat counts from 1 to 5. Many interior values repeat the same protection. The adjacent valid and invalid values distinguish the two limits.

```typescript
// Bad. Repeats the accepted interior without testing either limit.
test.each([2, 3, 4])('accepts %i seats', assertSeatsAccepted);

// Good. Helpers send real requests and check contractual results.
test.each([
    [0, 422],
    [1, 201],
    [5, 201],
    [6, 422],
])('%i seats returns %i', assertSeatResponse);
```

For combined business conditions, use a small **decision table** of meaningful outcomes. For stateful behaviour, use **state transition testing** through supported actions. Include material refusals, retries or concurrent actions only when their promises require them. Test the transition and resulting state, rather than assigning an internal state flag and asserting it back.

## Test reachable invalid inputs

Send invalid values through the boundary that can receive them. Trace validation, construction and mutation paths before deciding that an internal state is impossible. Static types alone do not validate HTTP bodies, environment values, stored data or provider responses.

```typescript
// Bad. Fabricates a private state after the entry has validated it.
await expect(saveProfile({ name: null } as any)).rejects.toThrow();

// Good. The contract rejects an invalid network payload.
const response = await client.request('/profile', {
    method: 'PATCH',
    body: JSON.stringify({ name: null }),
});
expect(response.status).toBe(422);
expect(await response.json()).toMatchObject({ error: 'name must be a string' });
```

The bad test earns no protection if every runtime path enforces a string before that private call. A real unchecked path changes that conclusion. Propose a redundant-defence deletion only with evidence covering every supported path and later mutation.

## Preserve meaningful absence checks

A refusal must sometimes leave state unchanged. Establish that the action occurred and inspect the relevant result. A successful acknowledgement alone cannot establish that a forbidden effect did not happen.

```typescript
// Bad. Reads the starting fixture without attempting the forbidden action.
expect(await owner.profile()).toMatchObject({ name: 'Ada' });

// Good. A stranger is forbidden to change Ada's name.
const refused = await stranger.renameProfile(ada.id, 'Changed');
expect(refused.status).toBe(403);
expect(await owner.profile()).toMatchObject({ name: 'Ada' });
```

Empty results, unchanged state and no-charge assertions can be the promise. Retain them when they can detect a real violation. Imagining a no-op implementation is a useful sensitivity check, not a blanket ban on absence assertions or a requirement to mutate production code.

## Use stable UI actions and observable completion

For UI behaviour, interact as a user does. Prefer accessible roles, labels and stable explicit contracts to CSS classes or DOM position. Use the framework's user-interaction helpers and retrying assertions. Await completion rather than guessing a sleep duration.

```typescript
// Bad. Pins styling and assumes completion timing.
await page.locator('.save-button:nth-child(2)').click();
await page.waitForTimeout(500);
expect(await page.locator('.toast').isVisible()).toBe(true);

// Good. The promised saved name appears after Save completes.
await page.getByRole('textbox', { name: 'Display name' }).fill('Ada');
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByRole('heading', { name: 'Ada' })).toBeVisible();
```

A visibility assertion is meaningful when that element is the promised result. If persistence is promised, also reload or reopen through the supported UI. Restyling alone does not justify tests for pixel values. A change to keyboard access, focus or visibility can be a behavioural change even when implemented in CSS.

## Assert the contract's scope

Assert promised fields without pinning incidental output. Use exact equality when the entire output is contractual. Broad snapshots often couple tests to unrelated markup, diagnostics or metadata.

```typescript
// Bad. Pins the whole response, including incidental metadata.
expect(await response.json()).toMatchSnapshot();

// Good. The promise concerns the saved name.
expect(await response.json()).toMatchObject({ name: 'Ada' });
```

An explicitly requested visual regression or exact-format contract can warrant an approved snapshot. Review it against that authority. An automatic snapshot update does not establish correctness.

## Replace rather than layer

Repair or remove internal-delegation tests once their useful promises are protected through the supported entry. Preserve unique protection before deleting its old home.

```typescript
// Before. Three tests pin the same implementation chain.
expect(handlerCallsService).toBe(true);
expect(serviceCallsRepository).toBe(true);
expect(repositoryCallsInsert).toBe(true);

// After. The existing entry test observes the promised saved result.
expect(await client.profile()).toMatchObject({ name: 'Ada' });
```

The after assertion must follow the actual save action shown in the first example. A renamed helper, merged service or changed query should leave the behavioural test green. A broken save must turn it red.

## Keep TDD in vertical slices

Plan the required promises, then write and run one test before its implementation. A list of cases is planning. Writing every test and then all production code is **horizontal slicing**.

```text
Bad: write success, refusal and retry tests → implement all three → run tests
Good: success red → green → refactor → refusal red → green → refactor
```

If implementing a shared rule also satisfies a required retry case, retain that case when it adds useful protection. Do not remove correct logic to manufacture red. Behaviour-preserving refactors keep tests green. They do not initiate a new coverage campaign.
