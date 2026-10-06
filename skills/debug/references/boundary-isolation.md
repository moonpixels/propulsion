# Boundary Isolation

Use this reference when a failure crosses a short component, process, service, pipeline, request, or data path with observable boundaries. The result is the earliest boundary where a valid state or invariant becomes invalid.

## Narrow the path

Map the smallest relevant path and define the expected input, output, state, and invariant at each material boundary. Follow one request, event, job, transaction, or datum using its correlation identity and environment or version context.

For a short path, walk boundaries in order. For a large path with trustworthy midpoints, observe the midpoint, keep the failing half, and repeat. Inject or replay known data only when doing so preserves the conditions relevant to the hypothesis.

Capture only the fields needed to distinguish the current hypotheses. Treat absent, sampled, delayed, or uncorrelated telemetry as an evidence limitation rather than a healthy result. Redact secrets and unnecessary personal or production data; retain an external pointer when the workspace cannot store the artefact safely.

## Transfer the result

A divergent boundary localises the fault but does not explain the internal cause. Record the last valid state, first invalid state, correlation evidence, replay fidelity gaps, and components excluded. Then return to the main causal loop and use origin tracking, comparison, or a targeted experiment inside the remaining boundary.

Stop when one component or transition remains, or when the next observation needs unavailable access or external mutation. Remove owned temporary boundary probes after use. If a repair does not move the earliest divergence as predicted, reject the repair hypothesis.
