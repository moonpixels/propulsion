---
name: prototype
description: Creates disposable visual experiments that answer one bounded question. Use when seeing, comparing, or interacting with an artefact would resolve uncertainty better than discussion.
metadata:
    invocation: model
disable-model-invocation: false
---

# Prototype

Creates the least elaborate temporary visual experiment that can answer one bounded question, then returns the evidence and removes all prototype material.

## Process

### 1. Bound the experiment

Inspect the request, caller outcome and authority, repository guidance, relevant authentic runtime context, intended evaluators, and safely available data. State one question and the observable reaction, comparison, or result that would answer it before changing anything. For an objective question, include an observation that would support the proposed answer and one that would refute or materially qualify it; for a subjective choice, state the decision criteria and keep the choice with the user. Invoke `$elicit` only when user-held information is needed to bound this visual question; return broader discovery to the caller. When a visual artefact cannot discriminate the question, stop and return that boundary without prototyping. The question, audience, criteria, decision authority, and discriminators are explicit.

### 2. Confirm presentation and disposal

Inspect the current project state, available rendering or viewing capability, and a safe reversible workspace. Confirm a real presentation path that can expose a live view or rendered capture directly to the user, and record the pre-existing state needed to verify cleanup. If the result cannot be rendered and presented, stop before building, clean any preliminary attempt, and report the missing capability. Identify every file, route, component, process, dependency, fixture, branch, data source, and external effect the experiment could touch. The experiment has a presentation path and an exact disposable boundary before construction begins.

### 3. Choose the representation

Choose the simplest trustworthy sketch, static mock-up, interactive stub, or other visual manifestation that exposes the discriminators. Identify the qualities it must show, what it may omit, and whether an omission could distort the answer. Use interaction only when behaviour, sequence, state, or experience is material. When comparing alternatives, show the materially different options under the same content, data, and constraints. The selected form exposes the decisive qualities without implying production completeness.

### 4. Build the artefact

Build only the fidelity and behaviour needed to expose the discriminators. Use authentic project layout, components, styling, content, or safe read-only data only when they materially affect interpretation and remain behind the reversible boundary; otherwise use isolated temporary material. Keep live systems read-only, stub external writes and irreversible actions, do not expose credentials, and distinguish simulated behaviour from implemented capability. Do not widen the experiment into production architecture, reusable abstractions, tests, hardening, or unrelated polish. One faithful disposable artefact is ready to render.

### 5. Render and present it

Render the artefact in its intended medium and inspect its visual output and relevant interactions. Verify that the question, alternatives or scenarios, simulated boundaries, omissions, and decisive observations are understandable to the intended audience; correct anything that could make the experiment misleading. Present the live view or rendered capture directly to the user before cleanup, keep it available while evaluation requires it, and provide only the controls needed to compare or explore it. Source inspection or a path that will disappear before viewing is not presentation. The user has an opportunity to inspect the visual result.

### 6. Iterate to a conclusion

Revise the same artefact only when another pass could change the answer to the bounded question. Let the agreed observations settle an objective question and obtain the user's choice for a subjective one. Stop when the question is answered or further useful iteration cannot discriminate it. If the user instead requests a durable or production outcome, stop the prototype and return that changed outcome to the appropriate caller or downstream skill rather than retaining or converting the experiment. The experiment has a supported conclusion or an exact remaining uncertainty and missing discriminator.

### 7. Remove and return

After the user has had the opportunity to inspect the result and the experiment has concluded, remove every prototype artefact, dependency, fixture, branch, process, and temporary change. Revert only prototype-specific adjustments, then compare with the recorded starting state and verify that all pre-existing work remains intact. Preserve no prototype report, code, data, branch, or capture by default. Return the answer or explicitly inconclusive result in the current session or caller handoff with the evidence, limitations, remaining uncertainty, and missing discriminator where applicable. The caller retains every product, specification, architecture, implementation, and durable-update decision; it receives the result with no prototype residue.
