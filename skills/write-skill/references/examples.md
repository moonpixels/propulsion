# Worked examples

## A complete workflow

This illustrative skill has a bounded output, authoritative inputs, concrete coverage, and a completion gate. Its short instructions leave implementation choices open while defining what must be accomplished. It needs no additional references or helpers.

```markdown
---
name: reconcile-import-schema
description: Reconcile a CSV import with its supplied JSON schema when fields or types fail validation.
---

# Reconcile an import schema

Produce a proposed mapping and reconciliation report. Preserve the source CSV and schema. Treat declared schema fields and types as authoritative.

## Inputs

Use the CSV and schema paths supplied by the caller. Locate a missing file in the stated workspace or ask for its path. Resolve an ambiguous schema version before proposing conversions.

## Method

1. Read the schema's fields, types, and required status. Inspect the CSV header and values.
2. Account for every CSV column as mapped, intentionally ignored, or unresolved. Prefer an exact declared match. Propose a renamed match only with supporting evidence.
3. Write `mapping.json`. For each mapped column, record its schema field, any conversion rule, and how invalid values are handled. Keep ambiguous mappings unresolved.
4. Check all rows against the proposed mapping and schema. Use an existing validator when available. Report violations with row numbers and examples.

## Finish

Return `mapping.json` and a report containing column coverage, invalid-row counts, unresolved mappings, and the validation command or method.

**Done only when** every CSV column is accounted for, every proposed schema field exists, and every row has been checked. If a missing input blocks validation, report that input and the dependent work.
```

Ship the adapter alongside it:

```yaml
# agents/openai.yaml
interface:
    display_name: 'Reconcile Import Schema'
    short_description: 'Reconcile CSV fields against a schema'
```

A useful scenario supplies a declared field, a renamed column, an unknown column, and an invalid value beyond the first few rows. Inspect the mapping and report for complete coverage, preserved source files, and the distant invalid row. A plausible header-only mapping would fail the completion gate.

## A justified tiny layout

This illustrative reference skill has no ordered operations or special inputs. The purpose, rule, and stopping condition still remain explicit.

```markdown
---
name: prefer-guard-clauses
description: Flatten nested control flow when early returns make a function easier to follow.
---

# Prefer guard clauses

Use guard clauses to handle exceptional cases before the main path. Preserve return values, side-effect order, and cleanup.

Finish when the main path is flat and behaviour is unchanged. Keep nesting where an early return would obscure the logic or bypass cleanup.
```

## A router for distinct branches

A router earns its layout when selecting a branch avoids unrelated instructions. Keep the shared purpose and final outcome explicit. For example, an import router could direct a mapping review to one reference and a failed import repair to another. Each branch must supply its own inputs, method, and completion gate. A short root that loads every branch is not a lean active path.
