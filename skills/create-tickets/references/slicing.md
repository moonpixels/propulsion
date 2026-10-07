# Slice the work

Use **tracer bullets** to deliver narrow, complete paths through the layers they need. A slice should make a meaningful outcome demoable or verifiable from its stated starting state. A completed slice can contribute to a feature without making the entire feature release-ready.

## Find the smallest meaningful outcome

Start with the simplest supported end-to-end outcome. Include its data, logic, interface and verification as needed. Split further by independently useful operation, business-rule variation, data variant, interaction or integration. Prefer a split whose later part could be deferred while the earlier part remains a coherent supported capability.

Stop splitting when another cut produces only a layer, an uncheckable fragment, a duplicated invariant or excessive repeated setup with no useful intermediate result. A ticket touching several layers can be smaller in responsibility than a single-file ticket containing unrelated outcomes. Use outcome, variation and verification to judge size, rather than estimates or fixed file counts.

Carry ownership, validation, security and required failure guarantees with the first slice that needs them. Narrow supported cases to reduce scope. Every supported case must still satisfy its applicable requirements.

## Worked splits

These illustrative outcomes assume the rules described have already been confirmed. They are not default product policies.

| Feature           | Coherent slices                                                                                   | Boundaries to preserve                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Room booking      | Book one fixed-duration room slot through confirmation. Add cancellation. Add recurring bookings. | The first booking enforces permissions and conflict prevention, with defined failure feedback. Cancellation depends on an existing booking. Recurrence may need separate conflict rules. |
| Catalogue import  | Import one CSV schema through validation to stored records. Add another schema. Add preview.      | The first import includes agreed duplicate handling, atomic or partial failure and resource limits. Parser, storage and UI are steps inside a slice.                                     |
| Saved searches    | Save and restore one supported filter. Add named search sets. Add another filter type.            | Ownership and persistence are verified in the first slice. Named sets and another filter may be sibling tickets after that contract exists.                                              |
| Job notifications | Notify completion through one agreed channel. Add another channel. Add preferences.               | Each supported channel honours the feature's duplicate-delivery and failure contract. Do not leave required reliability to an undefined later ticket.                                    |

## A concrete ticket and graph

Assume an application already has identity, a filter editor and a saved-filter contract. The agreed feature adds one persisted date filter, named sets and text-query filters.

1. **Save and restore a date filter.** No blockers. Implement persistence, API and editor integration as one outcome. Verify reopening the editor, ownership denial, invalid dates and persistence failure.
2. **Save a named filter set.** Blocked by ticket 1's persisted-filter contract. Add name validation and set selection through the needed layers.
3. **Save and restore a text-query filter.** Blocked by ticket 1's persisted-filter contract. Extend the supported shape and editor. It can proceed independently of named sets.

A date-filter ticket might contain this body excerpt:

```markdown
## Implementation guidance

Extend the established saved-filter representation with the confirmed date range. Connect the existing filter editor to the save and load contract. Keep ownership validation at the existing boundary. Treat storage failure according to REQ-04. Inspect the repository's current persistence and editor entry points before choosing the exact internal edits.

## Verification

Exercise saving and reopening through the supported editor. Verify the stored range through a second read. Cover invalid ranges, another user's access and the agreed storage-failure result. Run the project's required checks.

## Acceptance criteria

- [ ] Reopening restores the saved date range under REQ-01.
- [ ] Invalid ranges leave the previous saved value unchanged under REQ-02.
- [ ] Another user cannot read or replace the range under REQ-03.
- [ ] A failed save reports the agreed failure and preserves the previous value under REQ-04.
```

Replace illustrative rules with the actual authority. Include inspected paths or commands when they help the real implementer. Do not present a hypothetical entry point as existing code.

“Create the table”, “write the API”, “build the editor” and “test the feature” would usually be horizontal fragments of ticket 1. Keep those steps together. If a reusable external API is itself an agreed capability with independent consumers and acceptance, it can instead justify its own ticket.

## Enabling work and migrations

Absorb ordinary setup into the earliest outcome needing it. Separate an enabler only when a necessary contract, risk reduction or compatible state can be verified independently, especially when several slices rely on it. State the dependent feature, exact output and verification. Avoid speculative infrastructure and unrelated cleanup.

For a broad migration, prefer **expand-contract** when compatibility is required. Add the new compatible form, migrate independently verifiable consumer groups, then remove the old form after all consumers have moved. Each dependency names the state the next ticket needs.

If no intermediate edit can be verified independently, group the coupled work into one bounded ticket with internal steps and an explicit integration check. Resolve a larger decomposition or different verification boundary with the user instead of representing broken fragments as finished vertical outcomes. Resolve unknown consequential design before ordinary dependent implementation tickets.

## Audit coverage and dependencies

Map every scoped requirement to its tickets and every ticket back to its justified source. Several tickets may collectively fulfil a requirement. Check that their union covers its states, variants and constraints without inventing new scope.

Add an edge for a required predecessor outcome, not simply display order, shared files or shared terminology. If a cycle appears, revisit the boundaries, merge coupled outcomes or settle the shared contract. Among unblocked tickets, recommend an order by value, learning and risk without creating false blockers.
