# Skill Sections

Structure serves behaviour. Every `SKILL.md` has frontmatter, a human-readable
H1, and a strong introduction; every other heading is optional. Use the fewest
clear headings that make the confirmed workflow easy to execute. A small router
may finish after its introduction.

## Frontmatter

Include the skill's discovery and invocation contract:

- `name` matches its directory, uses lowercase letters, digits, and single
  hyphens, and reads naturally when invoked.
- `description` is one action-oriented line that states both capability and
  natural trigger conditions. Put all triggering guidance here because the body
  loads only after invocation.
- `metadata.invocation` records `user` or `model`.
- `disable-model-invocation` and `agents/openai.yaml` use the matching policy.

Use user invocation by default. Use model invocation when composition or broad
reuse justifies the permanent description context.

| Invocation | `disable-model-invocation` | `policy.allow_implicit_invocation` |
| ---------- | -------------------------- | ---------------------------------- |
| `user`     | `true`                     | `false`                            |
| `model`    | `false`                    | `true`                             |

Add `agents/openai.yaml` with a human-readable `interface.display_name`, a
25–64-character `interface.short_description`, and the matching policy.
`interface.default_prompt` remains optional.

## H1

Start the body with one human-readable H1 that makes the skill immediately
recognisable. It may expand an abbreviated directory name when that improves
clarity.

## Introduction

For a workflow skill, lead with the canonical governing methodology in bold and
state how it governs the capability in one strong sentence or short paragraph.
Explain only the context-specific adaptation and keep source attribution in the
research evidence rather than the skill.

For a router, directly invoke the called skills and state only coordination
unique to their combined outcome. The router leaves their methodologies and
instructions authoritative.

## Common Headings

These headings are available when their inclusion criterion is met. Rename,
combine, nest, or omit them when another structure communicates the behaviour
more directly.

### Prerequisites

Use when external conditions must already be true before execution can begin.
State the condition and the safe route when it is absent. Put setup work the
agent can perform in `Steps`.

### Steps

Use for executable work whose sequence matters. Number dependent actions,
introduce branches or stages only for distinct flows, and end each step in an
observable postcondition through **design by contract**.

### Rules

Use for an invariant that constrains multiple steps or the finished result.
Keep a condition used by only one step beside that step.

### Handoff

Use when completion creates a meaningful transfer to the user or another skill.
State the result, evidence, and unresolved uncertainty that cross the boundary.

## Bundled Resources

Use **progressive disclosure** and **YAGNI** to add only resources required by a
confirmed use case:

- `references/` holds conditional knowledge loaded into context.
- `assets/` holds files used in generated output.
- `scripts/` holds deterministic, repeated, or fragile operations.

Place each resource pointer beside the step or branch that loads or uses it.
Execute every script and keep each meaning in one authoritative location.
