# Writing examples

These illustrative pairs show how to make an instruction shorter or more exact. The stronger wording must fit the confirmed task. Examples demonstrate a rule, rather than adding another authority for it.

## Recognise the method

Name an established methodology when its meaning fits the user's description. Keep any task-specific qualification beside it. Here, tests must demonstrate missing behaviour before implementation begins.

```markdown
// Before
Write some tests before you implement the code. Then make the code work and improve its structure.

// After
Use **TDD**, one behaviour at a time: red, green, refactor. Observe the test fail for the missing behaviour before implementing it.
```

The name recruits familiar knowledge. The final sentence preserves the specific requirement. A label alone cannot supply a local variation or an essential gate.

## Preserve behavioural force

Retain the method, persistence, and coverage when revising. In this elicitation example, a plausible first answer must lead to further questioning where material branches remain.

```markdown
// Before
Ask questions to clarify the user's requirements, then summarise what you understand.

// After
Relentlessly traverse the **decision tree**, one question at a time. Follow each answer into its dependent branches. Continue until every material branch is resolved, explicitly delegated, or excluded by the agreed scope.
```

## Make actions concrete

Replace a quality adjective with the evidence or action it requires. For this import workflow, the schema owns field names and incomplete mappings must stay visible.

```markdown
// Before
Carefully reconcile the data and handle problems appropriately.

// After
Use the schema's declared field names. Account for every CSV column as mapped, intentionally ignored, or unresolved. For each unresolved column, report the conflicting evidence or missing decision.
```

## Define the completion gate

Name the condition that distinguishes done from unfinished. Here, the conversation requires both full branch coverage and confirmed understanding.

```markdown
// Before
Finish when you have a good understanding of the user's needs.

// After
**Done only when** every material branch has a supported disposition, a fresh coverage pass opens none, and the user confirms the complete synthesis. An unanswered question leaves its dependent work unresolved.
```

Check intermediate stages too. “Observe red before implementation” gives the TDD step a local gate. Add such gates where premature progression would change the result.

## Give references a trigger

Tell the agent when the reference becomes useful and what it resolves.

```markdown
// Before
See references/error-recovery.md for more information.

// After
Read [error recovery](references/error-recovery.md) when encoding or delimiter errors prevent reading the CSV.
```

Keep a non-obvious gotcha inline when the agent would need to know it to recognise the loading condition.

## Apply DRY to meaning

Give each instruction one authoritative home. Refer to schemas, configuration, types, and tool help for discoverable facts instead of copying them into prose. Here, the schema already defines the import fields.

```markdown
// Before
Require customer_id as a string and total as a number. The schema also defines customer_id as a string and total as a number.

// After
Read the supplied schema for field names, types, and required fields. Validate every row against it.
```

A completion gate may refer to the same requirement to define the achieved state. Repeated terminology is not duplicated authority.

## Keep conditions beside the rule

Co-locate the action, its conditions, and consequential exceptions. Here, the agent must distinguish a broken input path from a missing decision.

```markdown
// Before
Ask the user about missing inputs.
Elsewhere: inspect supplied paths first. Ask only if inspection cannot resolve the missing input.

// After
Inspect supplied paths first. If a required input remains unavailable, ask the user for it before dependent work.
```

## State the intended action

Tell the agent what to do when the boundary matters. Here, an ambiguous mapping must stay visible in the output.

```markdown
// Before
Do not guess ambiguous mappings.

// After
Keep ambiguous mappings unresolved and report the missing evidence.
```

## Write the discovery description

Write one sentence naming the task and a decisive “when…” trigger, following [the template](../assets/skill-template.md). Name distinct trigger branches rather than a string of synonyms. Keep execution steps and completion gates in the body.

```yaml
# Before
description: Help with importing, processing, handling, and managing data effectively.

# After
description: Reconcile a CSV import with its supplied JSON schema when fields or types fail validation.
```

## Format examples for their job

Use a short inline example when a phrase is enough: “be thorough” → “account for every input column”. Use a fenced block when literal Markdown, a complete instruction, or a before-and-after pair makes the distinction easier to see. Precede it with the rule and enough context to interpret it. Label illustrative facts and placeholders.

Explain a rule only when its reason changes how the agent applies it. Preserve exact technical literals.
