# Propulsion Context

## Language

### Skill model

**Predictability**: The degree to which a skill makes the agent follow the same process on every run, without requiring the same output.

**User-invoked skill**: A skill the user selects explicitly. This is Propulsion's default invocation mode.

**Model-invoked skill**: A skill the agent may select autonomously or invoke from another skill. Use this exception only when autonomous discovery would naturally help during ordinary coding work often enough to earn its permanent context cost.

**Invocation policy**: Client-specific metadata within a skill bundle that controls whether an agent may select that skill implicitly. The same intent may require different policy fields in different clients.

### Skill types

**Skill type**: The authority category recorded in a skill's frontmatter as `metadata.type`. Propulsion uses exactly `performer`, `router`, `teaching`, or `utility`.

**Performer skill**: Owns one bounded requested outcome end to end, including its actions, artefacts, verification, handoff, and stopping boundary.

**Router skill**: Resolves the inputs needed to coordinate other skills and returns their results. It contains only routing unique to that outcome; called skills remain authoritative and the router neither repeats nor overrides their context.

**Teaching skill**: Supplies knowledge and decision rules inside a caller's workflow. It does not own an independent operation, mutation, artefact, verification, handoff, or stopping decision.

**Utility skill**: Owns one bounded reusable operation and returns its result, whether the operation runs in the calling agent, a fresh agent, or a deterministic tool.

### Software quality

**Deterministic measurement**: A reproducible tool-produced observation of one named property of a fixed software candidate, with its scope, components, configuration, limitations, and comparison basis preserved. An attention threshold requires appraisal but is not by itself a defect, an overall quality score, or permission to weaken behaviour or design.

### Skill benchmarking

**Authentic workflow arm**: One isolated benchmark run that gives a skill set the same implementation task, starting repository, model, tools, permissions, and environment as the other arms while allowing it to load and follow its own required skills and workflow.

**Adaptive single-run comparison**: One fresh run per benchmark arm, followed by another run only for an arm whose result is tied, failed, or surprising enough that run-to-run variation could materially change the conclusion.

**Skill-context tokens**: The exact tokenizer count of a benchmark arm's skill discovery metadata and every skill or reference file loaded during the run, reported separately from whole-run model usage.

**Runtime token usage**: The execution harness's complete input, cached-input, output, and reasoning-output token counts for one benchmark arm, excluding the independent quality evaluator.
