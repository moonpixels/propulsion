# Ticket destinations

Apply the branch selected by project guidance. Establish access and required capabilities before publishing. Keep exact destination operations in its current tool or CLI documentation.

## Local Markdown

Use one file per ticket beside an existing specification in its `tickets/` directory. Without a specification, follow project conventions or default to `docs/features/<work-slug>/tickets/`.

Allocate stable sequential IDs such as `TKT-001` in dependency order, using `<ticket-id>-<ticket-slug>.md`. Preserve existing IDs and status. Start newly created tickets at `Todo`. Local statuses are `Todo`, `In Progress`, `Done` and `Cancelled`. Link blockers to real files and name the predecessor outcome each supplies.

Before creating files, inspect existing tickets and any specification checklist. Reuse matching work rather than duplicate it. If existing scope differs materially, resolve the difference through the dialogue. Verify every new file and relative link after writing.

## External tracker

Inspect the installed integration's writable destination, item body, initial status, parent relationships, blocking links and read-back operations. Missing required access blocks publication to that destination. Report the missing capability rather than switching destination silently.

Create items in dependency order and record actual identifiers before wiring relationships. Use native blocking links where supported. Otherwise preserve blockers in the body with real links and report the representation limit. Use a native parent only when the source is a suitable existing tracker item. Parentage and blocking are different relationships.

Apply destination-native initial status. Set other fields only when the user or project guidance supplies them. After a failed or unknown write outcome, inspect existing state before retrying. Verify item bodies and relationships independently. Report created items, remaining writes and mismatches if publication is partial.

## Specification checklist

After tickets exist, add or reconcile the specification's last `## Tickets` section in the confirmed order:

```markdown
## Tickets

- [ ] [TKT-001: Save and restore a date filter](tickets/TKT-001-save-date-filter.md)
- [ ] [TKT-002: Save a named filter set](tickets/TKT-002-save-named-set.md)
- [ ] [TKT-003: Save and restore a text-query filter](tickets/TKT-003-save-text-query.md)
```

Use real external URLs for tracker items and preserve valid unrelated entries. Keep each ticket's acceptance criteria in that ticket. The specification checklist tracks tickets rather than copying their acceptance criteria. Creating tickets does not mark implementation complete.
