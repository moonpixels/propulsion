# Deletion and layers

Read when unused paths, speculative options, pass-through abstractions or inheritance add machinery.

## Remove Dead Code and Speculative Generality

Delete code without a supported use, including unused helpers, parameters, modes, factories and dependencies. Apply **YAGNI** to planned flexibility that no present contract requires. Trace runtime discovery, external consumers and import-time effects first. A published API is not dead merely because the repository has no caller.

The illustrative internal API below has only one caller. The option was added for an abandoned feature, and every call passes `false`.

```ts
// Before.
function renderInvoice(invoice: Invoice, includeDraft: boolean) {
    if (includeDraft) return renderDraft(invoice);
    return renderFinal(invoice);
}
renderInvoice(invoice, false);

// After.
renderFinal(invoice);
```

Use **Remove Parameter**, then inline the empty forwarding function. Remove `renderDraft`, its private-only imports, fixtures and registrations once no supported path remains. Include changes in unchanged callers. Keep the option when a CLI, configuration file or external consumer can still select it. A default value does not prove the alternative unused.

For equivalent internal old and new APIs, inventory callers, migrate them in the same transformation and delete the old implementation. Keep a compatibility path only for an evidenced external or transition contract. Removing a legacy API without migrating its callers leaves the cleanup unfinished.

## Inline Function, Inline Class and Remove Middle Man

Remove a forwarding layer that owns no policy, translation, state or useful dependency boundary. Migrate callers to the complete existing operation.

```ts
// Before, each class has its own file and registration.
class InvoiceReader {
    read(bytes: string) {
        return parseInvoice(bytes);
    }
}
class InvoiceService {
    constructor(private reader: InvoiceReader) {}
    read(bytes: string) {
        return this.reader.read(bytes);
    }
}
const invoice = service.read(bytes);

// After.
const invoice = parseInvoice(bytes);
```

Delete both classes, files, exports and registrations. Check construction, discovery and any import-time work. Compare caller knowledge before and after. Keep a layer that hides a vendor protocol, owns caching or enforces a rule. A single caller or implementation does not invalidate such a boundary.

Inlining must preserve evaluation count, exceptions and effects. Replacing `const value = expensiveRead(); return format(value, value);` with two calls to `expensiveRead()` changes behaviour and work. Keep the local value.

## Collapse Hierarchy and Replace Subclass with Fields

Merge a subclass with its parent when their separate identity has no supported meaning. Replace constant-only variants with data when that deletes constructors, overrides and registrations.

```ts
// Before, private classes instantiated only by one local selector.
class StandardDelivery {
    days() {
        return 3;
    }
}
class ExpressDelivery {
    days() {
        return 1;
    }
}
const delivery =
    tier === 'express' ? new ExpressDelivery() : new StandardDelivery();
return delivery.days();

// After, preserving the original fallback for all other tiers.
return tier === 'express' ? 1 : 3;
```

Keep real variant behaviour. Check `instanceof`, reflection, serialised type identifiers, subclass hooks and external construction before removing class identity. A new strategy hierarchy for two constants restores the machinery being removed.

## Delete an operation whose result is unused

An unused return value does not make a call dead. `loadPlugin()` may register handlers, warm a cache or fail early on invalid configuration. Before deleting the call or its import, trace its effects and error contract. Keep those effects in the surviving path, or retain the operation. Delete a pure computation only when neither its value nor its failure is part of supported behaviour.
