# Boundary Evidence

Use this reference when the fault crosses components, processes, services, environments, or an authorised production boundary. The goal is to identify the earliest boundary whose observed output or invariant diverges, using the least sensitive evidence that distinguishes the hypotheses.

## Trace one event

Map the smallest relevant path and select one request, event, job, or transaction. Preserve its correlation identifier and environment or version context. At only the boundaries that distinguish the leading hypotheses, record applicable input, output, state, configuration, timing, status, and correlation.

Apply **backward causal tracing** from the symptom until the earliest invalid transition is visible. Continue inside that component rather than widening instrumentation across the whole system. Treat missing, sampled, or uncorrelated telemetry as an evidence limitation rather than a healthy verdict.

## Capture and replay safely

Capture the smallest authorised request, event, trace, payload, or state slice. Redact secrets and unnecessary personal or production data before retaining it; preserve an external pointer or correlation identifier when the workspace is not authorised to store the artefact.

Replay at the nearest stable seam only when the replay preserves the hypothesis-relevant environment, ordering, dependencies, identity, and state. Record every fidelity gap. When replay would erase the suspected cause, prefer a targeted external probe or temporary boundary instrumentation within the user's authority.

When the next discriminating observation requires new access, privileged instrumentation, or production mutation, leave implementation unchanged and report the required evidence and authority as a blocker.

## Clean up and verify

Tag temporary probes so they can be found mechanically. Remove them after diagnosis, or retain them deliberately as documented diagnostics with an explicit data and access boundary. Re-run the original correlated event or nearest faithful reproduction after repair, then verify focused regression and repository checks.

If a repair does not move the earliest divergent boundary as predicted, record the result and revert the attempt before revising the causal path.
