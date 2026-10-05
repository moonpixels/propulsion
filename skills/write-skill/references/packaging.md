# Packaging

## Required files

Every bundle includes `SKILL.md` and `agents/openai.yaml`.

Start `SKILL.md` with YAML frontmatter:

| Field         | Requirement                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `name`        | 1–64 lowercase letters, digits, or single hyphens. Match the directory name.     |
| `description` | Non-empty string, at most 1,024 characters. State the task and decisive trigger. |

Use this minimal OpenAI adapter, replacing the illustrative values:

```yaml
interface:
    display_name: 'Reconcile Import Schema'
    short_description: 'Reconcile CSV fields against a schema'
```

## Resources and scripts

Use `references/` for conditional detail and worked examples, `assets/` for templates or copied output material, and `scripts/` for deterministic operations. Create only files with a concrete use. Link resources relative to the containing file and state when to reach them. Use called skills' public contracts without restating their procedures. Remove obsolete or orphaned resources and update affected callers.

Prefer an existing tool over a new helper. Bundle a script when recurring parsing, validation, or transformation can be made repeatable. Document its command, inputs, outputs, runtime, exit codes, and side effects where it is called. Use non-interactive arguments, bounded output, and actionable errors. Make retries idempotent where possible. Test changed helpers on valid and invalid inputs.

## Validator

Install the [validator dependencies](tokens.md) once. Use `--help` for the CLI contract. Check destination loading when discovery or invocation changes.

Errors block packaging. Warnings flag missing or misordered template headings, empty sections, and an unrecognised completion gate for review. A justified tiny or router layout can pass with warnings. Gate wording alone does not prove behaviour.
