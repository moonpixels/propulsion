# Propulsion Skill Format

## Naming

Use lowercase letters, digits, and hyphens, keep the name within 64 characters, and match the directory name.

Prefer the shortest command that fits naturally in a user instruction:

1. One imperative verb: `implement`, `brainstorm`, `review`.
2. A short imperative phrase when its object adds clarity: `write-skill`, `fix-ci`.
3. An established noun when it already names the operation clearly: `pr`.

## Invocation

Declare one mode in `metadata.invocation` and keep both client controls in sync:

| `metadata.invocation` | `disable-model-invocation` | `agents/openai.yaml`               |
| --------------------- | -------------------------- | ---------------------------------- |
| `user`                | `true`                     | `allow_implicit_invocation: false` |
| `model`               | `false`                    | `allow_implicit_invocation: true`  |

Default to user invocation. Choose model invocation only for skills expected to run often enough that automatic or cross-skill discovery earns the permanent context cost.

Write a one-line description that states what the skill does and adds a concise `Use when`, `Use for`, or `Use to` clause:

- For user invocation, start with `User-invoked` and describe when a human should select it.
- For model invocation, represent every genuine trigger branch once using words users naturally put in prompts. Use the dominant established concept when it is also a real trigger.

Keep `agents/openai.yaml` limited to the invocation policy unless custom interface presentation has a concrete use case.

## Body

Use only the sections the skill needs, in the order the work makes natural. The patterns below are guidance, not a complete schema:

- `## Prerequisites` verifies conditions whose failure stops the workflow or routes it elsewhere. Put conditions the agent can establish itself in the first step instead, and place genuine prerequisites before the work.
- `## Steps` contains executable work. Use numbering for dependencies, `###` headings for stages or branches, and bullets for independent actions or checks. Make the postcondition of every ordered step observable without requiring a separate label.
- `## Rules` contains invariants that constrain multiple steps or the finished output. Keep a constraint used by one step beside that step.
- `## Handoff` transfers completed work to another skill, person, or later workflow. Keep anything required to finish the current job in the steps.
- Use descriptive sections such as `## Examples` or `## Output` when they organise necessary instructions more clearly.

Place each reference link once beside the branch or condition that requires it. Keep references one level from `SKILL.md`, and omit a separate reference catalogue.

## Bundled resources

- `references/` holds substantial context needed by a real branch.
- `scripts/` holds deterministic operations or code the agent would otherwise recreate repeatedly. Exercise every changed script.
- `assets/` holds files the skill's output consumes or preserves.
- `agents/openai.yaml` holds the Codex invocation policy and any justified interface metadata.

Apply the Rule of Three before extracting repeated work, except when a fragile operation needs deterministic execution on its first use. Apply YAGNI to empty directories, speculative examples, and unreferenced files.
