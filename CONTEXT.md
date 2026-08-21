# Propulsion Context

## Language

### Skill model

**Predictability**: The degree to which a skill makes the agent follow the same process on every run, without requiring the same output.

**User-invoked skill**: A skill the user selects explicitly. This is the default skill type in Propulsion.

**Model-invoked skill**: A skill the agent may select autonomously or invoke from another skill. Use this exception only when autonomous discovery would naturally help during ordinary coding work often enough to earn its permanent context cost.

**Invocation policy**: Client-specific metadata within a skill bundle that controls whether an agent may select that skill implicitly. The same intent may require different policy fields in different clients.

### Composition

**Router skill**: A lightweight skill that invokes other skills to produce a combined outcome. It contains only coordination unique to that outcome; called skills remain authoritative and the router neither repeats nor overrides their context.
