# Worked examples

## One coherent workflow

Use this pattern when one requested outcome combines inspection, a proposed transformation, and a report. Preserve authoritative inputs, make coverage explicit, and route recovery only when needed.

```markdown
---
name: reconcile-import-schema
description: Reconcile a CSV import with its supplied JSON schema when fields or types fail validation.
---

# Reconcile an import schema

Produce a proposed mapping and a reconciliation report. Preserve the source CSV
and schema. Treat schema field names and declared types as authoritative.

## Inputs

Use the supplied CSV and schema paths. If either is missing, locate it in the
user's stated workspace or ask for the missing path. If the schema version is
ambiguous, resolve that version before proposing type conversions.

## Method

1. Read schema fields, types and required status. Inspect the CSV header and a
   representative sample; scan the complete file for the final coverage check.
2. Account for every CSV column as mapped, intentionally ignored or unresolved.
   Prefer an exact declared match. Propose a renamed match only with evidence.
3. Record transformations in a mapping file. For each conversion, state the
   rule and how invalid values are handled. Leave ambiguous mappings unresolved.
4. Validate the mapping against the schema and check all rows for violations.
   If an existing validator is provided, use it. Otherwise perform the same
   contract checks and state how they were implemented.

## Conditional resources

Read `references/error-recovery.md` only when encoding, delimiter or malformed
row errors prevent inspection. Use `assets/reconciliation-report.md` for the
report structure.

## Finish

Report mapping coverage, invalid-row counts and unresolved fields with examples.
Done when every input column is accounted for and every proposed schema field
exists. Include the validation evidence and any blocker. Application of the
mapping to another system is a separate user-authorised action.
```

Create a referenced resource only when its content serves the actual skill. Example filenames do not justify empty files. Adapt inspection steps when the target agent already handles them reliably; preserve the source authority, coverage, and mutation boundary.

## Companion output template

Use an asset when a concrete output format makes the result easier to inspect or compare.

```markdown
# Import reconciliation

Source: [path]; schema: [path and version]

| Input column | Schema field | Transformation | Status and evidence |
| ------------ | ------------ | -------------- | ------------------- |

Validation: [command/method, checked rows, outcome]
Unresolved items: [field, reason and necessary decision]
Next action: [review or authorised application, if requested]
```

## Router for distinct branches

Keep the common invariant visible. Read only branches relevant to the request, and keep each branch's contract and dependencies clear.

```markdown
---
name: import-reconciliation
description: Resolve import validation failures or review an import mapping.
---

# Import reconciliation

Preserve the original input and use the declared schema as the source of truth.

- For an existing mapping review, read `references/review.md`.
- For failed source fields, read `references/repair.md`.
- For a changed schema version, read `references/version-change.md`.

Read the relevant branch before making its changes. Each branch defines its
inputs, output and checks. If the request spans branches, preserve their shared
mapping artefact and run the checks required by the branches used.
```

A router that always loads all three branches should be reconsidered. A wrapper that only forwards to one skill may serve a useful invocation alias, but its cost includes the target's full active path.
