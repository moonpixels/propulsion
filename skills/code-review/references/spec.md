# Spec assessment

Account for every applicable requirement against implementation-independent behavioural authority. Code and author rationale cannot establish missing intent. State the specific limit when authority is partial or contradictory.

Trace supported entries through contracts, states, data, errors, effects and consumers. Find omitted, partial, incorrect, excessive and regressed behaviour. For a diff, cover every introduced behaviour and its effect on existing promises. For existing-code scope, assess its current behaviour against applicable promises.

Follow success, failure, retry and concurrent paths wherever they can break a promise. When an external effect precedes acknowledgement or durable state, inspect failure between them and what a retry repeats. Check that supplied tests assert the required outcome rather than repeat the implementation.

For each finding, cite the authoritative requirement, reachable triggering case, implementation evidence, consequence and corrective outcome. Leave engineering quality to Standards unless the same defect also breaks a requirement.
