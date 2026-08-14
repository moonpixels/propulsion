---
name: prototype
description: Creates disposable visual artefacts that resolve one bounded uncertainty. Use when seeing, comparing, or interacting would answer a question better than discussion alone.
metadata:
    invocation: model
disable-model-invocation: false
---

# Prototype

Creates a temporary visual experiment that makes one uncertainty inspectable, returns what it established, and leaves no prototype code, files, records, or external effects behind.

## Process

### 1. Bound the question

Inspect the request, caller outcome, repository guidance, relevant product and implementation evidence, intended audience, and safely available data. State one uncertainty and the observations that would answer it before changing anything. For an objective question, include an observation that would support the proposed answer and one that would refute or materially qualify it; for a subjective choice, state the comparison criteria and keep the decision with the user. Invoke `$elicit` when material framing information or a user-authoritative choice remains unresolved. When a visible or explorable artefact cannot discriminate the question, return that boundary to the caller without prototyping. The question, audience, decision authority, and discriminators are explicit.

### 2. Select the representation

Apply **prototypes as filters and manifestations**: identify the qualities the artefact must expose, what it will omit, and whether an omission could distort the answer; then choose the simplest trustworthy material, resolution, scope, and project context. Use a static artefact when appearance or explanation is sufficient and interaction when behaviour, sequence, state, or experience matters. Build one focused artefact for feasibility or explanation. For comparative design, place two or three materially different alternatives in the same artefact under the same content, data, and constraints; vary structure, hierarchy, or primary interaction rather than decoration alone. The selected form exposes the decisive qualities without implying completeness.

### 3. Establish the disposable boundary

Inspect the current project state and identify every file, route, component, process, or data source the prototype will temporarily affect. Use authentic application context and safe read-only data when they materially affect the answer; otherwise work in an isolated temporary location. Temporary adjustments to an existing surface are permitted only when their exact removal can be verified without disturbing pre-existing work. Stub external writes and irreversible actions, and clearly distinguish simulated behaviour from implemented capability. The prototype has an isolated, reversible boundary with no real external mutation.

### 4. Build the artefact

Implement only the fidelity and behaviour needed to expose the discriminators. Reuse project-native layout, components, styling, and realistic content density when they affect interpretation, but do not add production hardening, reusable abstractions, tests, or unrelated infrastructure. When state or sequence matters, include guided representative and adverse scenarios and allow direct exploration when action order could reveal unexpected behaviour. Keep all prototype material clearly identifiable as temporary. One faithful disposable artefact is ready to inspect.

### 5. Render and present it

Render the artefact in its intended medium and inspect its visual output and relevant interactions. Verify that the question, alternatives or scenarios, simulated boundaries, and decisive observations are understandable to the intended audience; correct anything that could make the comparison misleading. Expose a live view or rendered capture directly in the conversation before cleanup and give the user the simplest controls needed to compare or explore it; a source listing or path that will disappear before it can be viewed is insufficient. When the environment cannot render and expose the result, remove the prototype and report the exact missing capability. The user evaluates the rendered artefact rather than its source.

### 6. Iterate to a conclusion

Revise the same artefact while comparison or exploration continues to produce useful evidence. Let the agreed observations settle an objective question and obtain the user's choice for subjective product or design direction. Stop when the uncertainty is resolved or when further useful iterations cannot distinguish the options. The experiment has a supported conclusion or an exact remaining uncertainty and missing discriminator.

### 7. Remove and return

After the rendered result has been exposed and the experiment has concluded, remove the artefact and revert only the prototype-specific project adjustments, then verify that no prototype material remains and all pre-existing work is intact. Do not promote, commit, document, deploy, or otherwise retain any prototype code or artefact. Return the concise conclusion to the current conversation or caller; when inconclusive, return the remaining uncertainty, evidence gathered, and missing discriminator instead. The caller receives the result with no durable prototype residue.
