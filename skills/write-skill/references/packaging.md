# Packaging

## Required files

Every bundle produced here includes `SKILL.md` and `agents/openai.yaml`. The OpenAI file is an authoring convention for this workflow, beyond the portable Agent Skills core.

Start `SKILL.md` with YAML frontmatter:

| Field                      | Requirement                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `name`                     | 1–64 lowercase letters, digits, or single hyphens. Match the directory name.        |
| `description`              | Non-empty string, at most 1,024 characters. State the task and decisive trigger.    |
| `metadata`                 | Optional map of string keys to string values.                                       |
| `license`, `allowed-tools` | Optional strings. Check destination support for tool restrictions.                  |
| `compatibility`            | Optional non-empty string, at most 500 characters, for actual runtime requirements. |

Use this minimal OpenAI adapter, replacing the illustrative values:

```yaml
interface:
    display_name: 'Reconcile Import Schema'
    short_description: 'Reconcile CSV fields against a schema'
```

The adapter fields follow [OpenAI's skill metadata guidance](https://learn.chatgpt.com/docs/build-skills#optional-metadata) and [metadata validation requirements](https://developers.openai.com/plugins/deploy/submission-errors#skill-agent-metadata-errors). Verify client-specific extensions against their current destination documentation.

## Resources and scripts

Use `references/` for conditional detail and worked examples, `assets/` for templates or copied output material, and `scripts/` for deterministic operations. Create only files with a concrete use. Link resources relative to the containing file and state when to reach them. Use called skills' public contracts without restating their procedures. Remove obsolete or orphaned resources and update affected callers.

Prefer an existing tool over a new helper. Bundle a script when recurring parsing, validation, or transformation can be made repeatable. Document its command, inputs, outputs, runtime, exit codes, and side effects where it is called. Use non-interactive arguments, bounded output, and actionable errors. Make retries idempotent where possible. Test changed helpers on valid and invalid inputs.

## Validator

The validator requires Bun with `Bun.YAML`, reads local files, makes no changes or network requests, and returns JSON. Exit 0 means packaging passed, 1 means invalid packaging, and 2 means incorrect usage. Fix reported defects and rerun.

It checks core frontmatter, local Markdown links outside literal examples, and OpenAI adapter metadata. It does not establish client loading, interpret paths inside code examples, or prove behaviour. Exercise required resources in the scenario and check destination loading when discovery or invocation changes.
