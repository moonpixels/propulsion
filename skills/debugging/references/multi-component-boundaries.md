# Multi-Component Boundaries

Use this reference when the failure crosses processes, services, queues, APIs, browsers, databases, or external systems.

Run this branch when the main question is which boundary first turned expected behavior into wrong behavior.

1. Draw the boundary path.

- List each hop the request, event, or value crosses.
- Name the ingress and egress you can observe at each hop.
- Record versions, configs, and correlation identifiers for the participating components.

2. Trace ingress and egress at each boundary.

- Capture the input entering the boundary and the output leaving it.
- Prefer structured logs, traces, or dumps that preserve IDs and payload shape.
- Confirm whether each boundary preserved, transformed, delayed, duplicated, or dropped the signal.

3. Compare broken and working paths.

- Diff one failing trace against one passing trace when possible.
- Find the first boundary where the two paths diverge materially.
- If config or deployment drift appears, switch to `references/environment-and-config.md` for the mismatch itself.

4. Collapse the system under test.

- Replace remote dependencies with stable seams only when that preserves the same failure.
- Narrow from end-to-end to the smallest boundary pair that still demonstrates the bug.
- Keep the reduced boundary pair tied to the original symptom.

## Rules

- Do not blame the last component in the chain without boundary evidence.
- Record the first boundary where the observed contract changes.
- Keep identifiers consistent across all evidence so later stages can follow the same path.
