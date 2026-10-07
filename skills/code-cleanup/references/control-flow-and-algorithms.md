# Control flow and algorithms

Read when nested branches, repeated outcomes, control flags or bespoke algorithms obscure a complete operation.

## Replace Nested Conditional with Guard Clauses

Handle rejection cases first, leaving a direct successful path. Preserve the first failing reason, condition evaluation and effects.

```ts
// Before.
if (customer.active) {
    if (!customer.suspended) return makeOffer(customer);
    return { kind: 'suspended' };
}
return { kind: 'inactive' };

// After.
if (!customer.active) return { kind: 'inactive' };
if (customer.suspended) return { kind: 'suspended' };
return makeOffer(customer);
```

An inactive suspended customer must still receive `inactive`. Keep structured nesting or `try/finally` where an early return would bypass resource release. A getter or condition can have effects, so moving or duplicating it needs evidence.

## Consolidate Conditional Expression and Duplicate Conditional Fragments

Join checks with one outcome when their short-circuit order is equivalent. Move a repeated fragment to one location only when it runs on exactly the same paths, at the same point relative to other effects.

```ts
// Before.
if (invoice.paid) return { kind: 'blocked' };
if (invoice.cancelled) return { kind: 'blocked' };

// After, retaining left-to-right short-circuiting.
if (invoice.paid || invoice.cancelled) return { kind: 'blocked' };
```

```ts
// Before.
if (express) {
    total += expressFee;
    emitTotal(total);
} else {
    total += standardFee;
    emitTotal(total);
}

// After.
total += express ? expressFee : standardFee;
emitTotal(total);
```

Keep separate branches when messages, failures or sequencing differ. Moving `emitTotal` before the addition changes its payload. Moving it outside a branch that can return changes whether it runs. Keep readable statements rather than compressing several decisions into nested ternaries.

## Remove Control Flag

Replace a flag that merely steers loop termination with direct control flow. Preserve iteration, return values and any work after the loop.

```ts
// Before.
let found = false;
let match;
for (const row of rows) {
    if (!found && row.id === id) {
        match = row;
        found = true;
    }
}
return match;

// After, for an ordinary array with no observable later iteration.
return rows.find((row) => row.id === id);
```

Check sparse arrays, custom iterators, getters and predicate effects. A loop that must consume the remaining stream cannot stop at the first match. A flag representing persistent domain state earns a different treatment from a local termination flag.

## Centralise variant data

Replace repeated literal mappings with one owner. Use a local exhaustive switch when variants have different effects. Data can replace constant-only strategies without creating callback registries.

```ts
// Before, duplicated across consumers.
if (tier === 'express') return 1;
if (tier === 'standard') return 3;
return 7;

// After, with the same unknown-tier outcome.
const deliveryDays = new Map([
    ['express', 1],
    ['standard', 3],
]);
return deliveryDays.get(tier) ?? 7;
```

Keep the mapping in one owner and reuse it across consumers. For runtime-validated closed variants, a record can cover every variant and use direct lookup. For open input, retain the unknown case. Plain `record[tier]` can change the fallback or expose prototype properties. A short local branch can be simpler than a table plus validation when no duplication exists.

## Substitute Algorithm and reuse existing operations

Prefer an existing project or standard-library operation over a hand-written equivalent. Check equality, ordering, duplicates, missing values, Unicode, failure behaviour and required performance. A shorter implementation with different semantics is not cleanup.

```ts
// Before, unique ids in first-seen order using primitive equality.
const unique: string[] = [];
for (const id of ids) {
    if (!unique.includes(id)) unique.push(id);
}

// After.
const unique = [...new Set(ids)];
```

This equivalence is for strings. Do not extend it to structural deduplication of objects. Replacing a streaming operation with a materialised collection may violate memory or latency requirements. Include such costs in preservation evidence.
