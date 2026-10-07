# Propulsion Glossary

## Language

### Skill invocation

**Explicit invocation**: A skill is selected by name in the request. This is Propulsion's default entry mode.

**Implicit invocation**: The agent selects a skill without a named request because its trigger applies.

**Composed invocation**: A skill invokes another skill as part of its workflow, using the called skill's public contract. Composition is distinct from implicit selection.

**Duplicated procedure**: A composing skill or supporting resource repeats execution rules owned by a skill it delegates to. Caller-specific inputs, sequencing, authority boundaries and outcome checks define composition rather than duplicated procedure.

### Software quality

**Deterministic measurement**: A reproducible tool-produced observation of one named property of a fixed software candidate, with its scope, components, configuration, limitations, and comparison basis preserved. An attention threshold requires appraisal but is not by itself a defect, an overall quality score, or permission to weaken behaviour or design.
