# Skill Sections

Structure serves behaviour. Every `SKILL.md` has frontmatter, a human-readable
H1, a strong introduction, and one `## Process` section. Use the fewest other
clear headings that make the confirmed instructions easy to execute.

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

## Process

Every skill uses `## Process` for its instructions. Use direct prose or
descriptive H3 headings when order does not matter. When order matters, use
numbered H3 headings with the instructions in paragraphs beneath them. For
branched processes, use unnumbered H3 branch headings and numbered H4 step
headings within each branch. End each ordered step in an observable
postcondition through **design by contract**.

## Optional Headings

These H2 headings are available when their inclusion criterion is met. Rename,
combine, or omit them when another structure communicates the behaviour more
directly.

### Prerequisites

Use when external conditions must already be true before execution can begin.
State the condition and the safe route when it is absent. This heading may
precede `## Process`. Put setup work the agent can perform in `Process`.

### Rules

Use for an invariant that constrains multiple instructions or the finished
result. Keep a condition used by only one step beside that step.

### Handoff

Use when completion creates a meaningful transfer to the user or another skill.
State the result, evidence, and unresolved uncertainty that cross the boundary.

## Bundled Resources

Use **progressive disclosure** and **YAGNI** to add only resources required by a
confirmed use case:

- `references/` holds conditional knowledge loaded into context.
- `assets/` holds files used in generated output.
- `scripts/` holds deterministic, repeated, or fragile operations.

Place each resource pointer beside the instruction or branch that loads or uses
it.
Execute every script and keep each meaning in one authoritative location.
