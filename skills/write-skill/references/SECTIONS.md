# Skill Sections

Use this reference when invocation metadata, optional sections, or bundled resource placement needs more detail than the fixed skill spine.

## Frontmatter

Include the skill's discovery and invocation contract:

- `name` matches its directory, uses lowercase letters, digits, and single hyphens, and reads naturally when invoked.
- `description` is one action-oriented line containing the capability and natural trigger conditions.
- `metadata.invocation` records `user` or `model`.
- `disable-model-invocation` and `agents/openai.yaml` use the matching policy.

Use user invocation by default. Use model invocation only when autonomous discovery would naturally help during ordinary coding work often enough to earn the permanent description context.

| Invocation | `disable-model-invocation` | `policy.allow_implicit_invocation` |
| ---------- | -------------------------- | ---------------------------------- |
| `user`     | `true`                     | `false`                            |
| `model`    | `false`                    | `true`                             |

Add `agents/openai.yaml` with a human-readable `interface.display_name`, a 25–64-character `interface.short_description`, and the matching policy.

## Introduction

The fixed spine and emphasis rules in the main workflow are authoritative. State the skill's purpose concisely. When the user selected a governing methodology, explain only its context-specific adaptation; a methodology-free skill needs no substitute label.

## Process details

Within `## Process`, use numbered H3 headings when order matters, descriptive H3 headings for distinct non-sequential concerns, or direct prose for a truly thin process. For branches, use descriptive H3 headings and numbered H4 steps only when the nested sequence improves execution. Each section carries one coherent behavioural idea; each ordered step ends in an observable postcondition.

## Optional sections

Add an H2 when it communicates the content more clearly than placement beside the process instruction it governs:

- `## Prerequisites` states external conditions and the safe route when absent.
- `## Rules` holds invariants that constrain multiple instructions or the finished result.
- `## Handoff` states a meaningful transfer, its evidence, and unresolved uncertainty.

Rename or combine optional sections when that improves the confirmed behaviour. Every optional section earns its place through clearer execution.

## Bundled resources

Use progressive disclosure through the Agent Skills loading hierarchy:

- Put discovery conditions in frontmatter metadata.
- Keep instructions required on every invocation in `SKILL.md`.
- Put conditional or extensive runtime guidance in `references/`.
- Put files consumed or copied into generated output in `assets/`.
- Put deterministic, repeated, or fragile operations in `scripts/`.

Add a resource only when retained conditional depth improves execution. Link every resource directly from `SKILL.md` beside the condition that loads it. Keep references one level deep and each meaning in one authoritative location. References contain runtime guidance rather than general concept explanations.
