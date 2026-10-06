# Origin Tracking

Use this reference when a bad value, state transition, side effect, or decision is observed far downstream from where it arose. The result is the earliest demonstrated valid-to-invalid transition and its responsible conditions.

## Trace backwards

Start at the first observed invalid state. Identify its data definitions, callers, controlling conditions, prior state, and external inputs. Move backwards through the call and data flow, checking the relevant invariant at each step, until the last valid and first invalid states are adjacent.

Choose the smallest project-native observation that can expose the transition:

- a conditional breakpoint for a local state and condition;
- a watchpoint for an unexpected mutation;
- a targeted trace for a call or effect path;
- record/replay or reverse execution when the platform supports it; or
- a focused dynamic or static slice when many statements may influence the value.

Record both the responsible operation and the inputs, state, ordering, or control condition that made it harmful. An assignment or stack frame alone is not a causal account.

## Bound the claim

Static slices may over-approximate, debugger facilities have platform and threading limits, and tracing can perturb execution. If instrumentation changes the failure, route that evidence through nondeterministic guidance.

Stop at the earliest invalid transition that explains the downstream symptom. Return the transition and conditions to the hypothesis loop and test whether controlling them changes the original signal as predicted.
