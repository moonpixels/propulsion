# Ownership and state

Read when repeated knowledge, scattered phases, leaked representation or mutable relationships inflate a capability.

## DRY and Move Function or Method

Consolidate one domain rule with its owner. **DRY** removes repeated knowledge, not every similar expression. Use **Move Function**, **Move Method** or **Hide Delegate** when consumers reconstruct an owner's decision or navigate private representation.

```ts
// Before, repeated by a toolbar and a menu.
button.disabled = document.status !== 'published' || document.locked;
menu.disabled = document.status !== 'published' || document.locked;

// After, both use the document's existing eligibility operation.
button.disabled = !document.canArchive();
menu.disabled = !document.canArchive();
```

If the owner lacks that operation, a single local predicate can earn its cost by replacing the repeated rule. Include its full cost. Keep the archive command's own current-state enforcement. Eligibility may change after rendering. Moving the rule must preserve rejection precedence and messages, not invent a richer error model.

Do not merge similar predicates for independent policies. `canArchive` and `canPublish` can look alike today yet belong to different contracts. A generic `canPerform(action, flags)` can add dispatch and caller knowledge instead of removing duplication.

## Gather one capability and delete fragmented APIs

**Shotgun Surgery** occurs when one rule requires scattered edits. Temporal decomposition splits ownership by execution phase. Consolidate shared grammar and lifecycle behind a complete operation.

```ts
// Before, callers know the required sequence across three modules.
const raw = invoiceLoader.load(bytes);
const decoded = invoiceDecoder.decode(raw);
return invoiceValidator.validate(decoded);

// After, one module owns the grammar and private sequence.
return parseInvoice(bytes);
```

Migrate every internal caller, then delete obsolete phase classes, public intermediate types and registrations. Private phases can remain if they clarify substantial work. Preserve parsing failures, validation order and effects. An externally supported intermediate operation may need to survive.

Unify alternative internal classes or paired hierarchies only when they represent the same capability or variation. Similar methods on unrelated external libraries justify an adapter only if repeated adaptation exists.

## Separate independent knowledge

**Divergent Change** means an owner changes for unrelated reasons. Extract a complete concern when it simplifies each caller contract. A billing module that also translates a carrier's label protocol may benefit from one carrier adapter. A cohesive large algorithm does not benefit from extraction solely because it is long.

For **Refused Bequest**, narrow an inherited contract or replace inheritance with delegation when the subtype rejects the base promise. Count forwarding methods and new seams as costs. Keep framework inheritance that honours the actual contract. Prefer deleting an unnecessary hierarchy over replacing it with several composition layers.

## Replace Derived Variable with Query

Store one authoritative value and derive its cheap projections. Delete the duplicated field, setters, invalidation paths and synchronisation tests together.

```ts
// Before.
this.visibleRows = rows.filter(isVisible);
this.visibleCount = this.visibleRows.length;
// Other mutations must also remember to update visibleCount.

// After.
this.visibleRows = rows.filter(isVisible);
get visibleCount() { return this.visibleRows.length; }
```

Keep a cache for measured cost or an evidenced observation contract. A getter can change snapshot timing, serialisation or notification semantics. If those are unknown, mark the candidate's preservation gap rather than assuming equivalence.

## Remove Temporary Field and shrink mutable scope

Move per-operation scratch state from fields to locals when it has no persistent lifecycle. This removes reset paths and interference between calls.

```ts
// Before, a synchronous private operation uses a scratch field.
this.total = sum(rows);
return formatTotal(this.total);

// After.
const total = sum(rows);
return formatTotal(total);
```

Trace all readers before deleting the field. Keep state that is observed across calls. Prefer values returned from an operation over mutations of shared scratch objects when that reduces coordination. Preserve object identity where callers observe it.

## Simplify representation and arguments

Remove unused arguments or derive owner-held values before grouping parameters. **Introduce Parameter Object** earns its cost for a real **Data Clump**, such as the same date range repeatedly passed and validated together. A bag of unrelated options hides a long parameter list.

For **Primitive Obsession**, choose the smallest representation that removes repeated interpretation or invalid internal combinations. If `completed` always equals `completedAt !== null`, keep one authoritative field and derive the other. If distinct variants own different data and transitions, a discriminated union can replace synchronised flags. Preserve wire schemas through existing translation, or identify the required compatibility decision. A new wrapper type around every primitive creates more code without necessarily reducing a rule.

A **Data Class** is useful as a transport record. Move behaviour to it only when consumers repeatedly own its domain rules. Keep independent scalar inputs and plain records where their operations are already simple and total.
