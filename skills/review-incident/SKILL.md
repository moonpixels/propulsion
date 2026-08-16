---
name: review-incident
description: Reviews stabilised production incidents into durable, blameless explanations and owned follow-up work. Use when active incident response has ended.
metadata:
    invocation: user
disable-model-invocation: true
---

# Review Incident

Explains one stabilised incident from evidence and records the smallest useful set of owned learning outcomes without reopening active response or implementing the resulting work.

## Prerequisites

Require one fixed incident identity, its owning incident record, and current evidence that production is stable. Re-read the latest service state and its evidence window rather than trusting a resolved label or an earlier handoff. When impact is still active, stability is uncertain, or a bounded observation remains under incident command, stop the review and route the incident to a later `$respond-to-incident` session with the exact current signal, owner, and missing evidence. Do not operate production, change communications, or perform learning analysis as a substitute for stabilisation.

Require enough incident evidence to distinguish what happened from what is merely believed: the timeline and its revisions, impact, detections, actions and reversals, mitigations, communications, current state, unresolved data or service risks, and relevant technical, operational, product, architecture, and context authorities. When a material gap prevents a responsible explanation, identify the evidence, source, and owner needed and stop without manufacturing a narrative. A gap that can remain explicit without distorting the review is an unknown, not a reason to invent certainty.

## Process

### 1. Establish the review and evidence boundary

Inspect the request, repository guidance, owning incident system and project review convention, complete response handoff, current product and architecture context, available tools, evidence revisions, participants, owners, and access limits. Preserve the incident system as authority for live incident state and the project convention as authority for the durable review. Use a repository record only when durable learning belongs there; it must not become a mirror of volatile operational or tracker state.

Set the incident scope, affected period, systems and populations, review participants, evidence cut-off, and the sensitivity of logs, communications, customer or personnel data, security details, and forensic material. Retain secrets, credentials, personal data, exploit detail, and other restricted evidence only in an appropriate access-controlled owner; cite a stable evidence identity or a safe summary elsewhere. When no available owner can preserve a required sensitive conclusion safely, report that exact persistence blocker instead of exposing or erasing it.

Record each material statement as an observed fact with its source and time, an interpretation supported by named evidence, or an unknown. Preserve conflicting sources and superseded timeline entries with their provenance until the conflict is resolved; a later edit is evidence, not permission to rewrite history silently. The review has one bounded, current, and inspectable evidence base.

### 2. Reconstruct the incident

Build a timestamped sequence from initial conditions through impact, detection, escalation, response, mitigation, recovery, and the verified stable state. Account for who or what observed each event, the information available at that moment, decisions and actions, expected and observed results, communications, reversals, and revisions. Distinguish detection delay, response delay, recovery delay, and incomplete visibility when the evidence supports them. Do not infer an event time from record order or collapse contradictory clocks into false precision.

Apply **local rationality** to explain why decisions and adaptations made sense to participants with the goals, pressures, signals, tools, permissions, and uncertainty available then. Compare **work-as-done** with documented or assumed work only when the difference reveals a material operating condition; neither deviation nor human error is a sufficient causal conclusion. Counter hindsight by asking what evidence would have made a different action reasonable at the time. State a counterfactual only when evidence supports both its changed condition and plausible consequence.

Explain the interacting technical, process, organisational, tooling, environmental, and dependency conditions that shaped the outcome. Examine intended and actual defenses; what worked, failed, was missing, or created surprise; detection and escalation; communication flow; mitigation effectiveness and side effects; latent conditions; goal conflicts; previous relevant signals; and credible recurrence paths. Treat a trigger as distinct from the conditions that allowed impact and recovery. Preserve multiple contributing conditions and uncertainty rather than forcing a single root cause, stopping at individual action, or making responsibility blameless by making it vague.

Invoke `$research` only when one material external conclusion must survive the review, then read and verify its cited report before relying on it. Research does not replace incident evidence or turn a plausible industry explanation into a fact about this incident. The reconstructed account explains the incident proportionately without blame or false certainty.

### 3. Derive proportionate learning outcomes

Identify only follow-up outcomes that directly address an evidenced contributing condition, recurrence path, defense gap, response weakness, or material learning unknown. For each candidate, state the incident evidence and rationale, the desired outcome rather than an unsupported implementation prescription, one accountable owner, the appropriate later lifecycle route, and observable evidence that will show completion and, where meaningful, effectiveness. Distinguish reducing recurrence likelihood, reducing impact, improving detection or response, and resolving an unknown.

Route a behaviour or product change to a later `$specify-feature` session; a technical solution or decomposition to later `$design-feature` or `$create-tickets` sessions once their authorities exist; an evidenced defect to `$debug`; backlog health or priority to `$refine-backlog`; an architecture hotspot to `$review-architecture` or the normal design path; operational runbook work to its project-native owner; repository-wide agent guidance to `$maintain-agents` only when its allocation gates hold; durable terminology or rare accepted rationale to `$maintain-context`; and removal to `$plan-retirement`. Record the route without invoking downstream lifecycle work.

Challenge candidates against recurrence value, impact reduction, evidence strength, ownership, observability, cost, and overlap with current work. Reuse or link an exact existing outcome, preserve related work as related, merge duplicates, and remove generic reminders, `be more careful` actions, speculative backlog dumping, and action inflation. Zero follow-ups is valid when the evidence supports no useful new outcome. A critical learning action without an owner remains an explicit completion blocker rather than becoming anonymous backlog work.

When agreed follow-ups need tracker mutations, require the task-management tool named in the root `AGENTS.md`. If absent, ask the user which tool the project uses, invoke `$maintain-agents` with that confirmed preference, verify the root instruction, and resume. Inspect relevant open and closed native tracker state, schema, relationships, and read-back operations before proposing changes. When the configured tool or account is unavailable or not writable, preserve the review and report the exact tracker blocker; do not fall back to Markdown, another tracker, or a repository backlog mirror.

The candidate set is small, evidence-traceable, owned, observable, duplicate-aware, and routed without prescribing or performing later work.

### 4. Confirm the complete review

Choose the owning incident system or established project convention for the durable review. When neither exists and a repository record is appropriate and safe, propose `docs/incidents/YYYYMMDD-{incident-slug}-review.md`; preserve an unrelated existing path with a numeric suffix unless replacement is explicit. Keep a repository review durable and concise: incident identity and status, impact, evidence boundary and limitations, timestamped sequence, contributing conditions, defenses and response learning, follow-up outcomes and routes, and unresolved unknowns. Link to the owning incident and tracker records rather than copying their changing state.

Present one complete synthesis for confirmation: the factual account, supported interpretations, contradictions and unknowns, contributing conditions and recurrence paths, defenses and response learning, proposed durable owner and exact write, sensitive-evidence treatment, and every follow-up create, update, link, reuse, owner, route, and effectiveness measure. Keep all durable systems unchanged while material review conclusions or ownership remain open.

Obtain explicit user confirmation of the complete synthesis and mutation plan. If the user rejects or revises it, reopen every affected timeline, explanation, condition, action, owner, route, sensitivity, and persistence decision and present the complete revised synthesis. Confirmation authorises exactly the agreed review and tracker writes without another application prompt. Independently confirmed durable project terminology may invoke `$maintain-context` inline; terminology or rationale established by this review waits until the complete synthesis is confirmed. Verify its returned change before continuing.

The user and agent share one exact, blameless explanation and owned persistence plan.

### 5. Persist and verify the agreed outcome

Immediately before mutation, re-read the current incident state, material evidence revisions, target review record, matching tracker items, owners, and affected relationships. When drift makes the incident active or stability uncertain, leave the review and tracker unchanged and route back to `$respond-to-incident`. When drift materially changes the explanation, follow-up set, owner, route, or target, leave coupled mutations unchanged and return to complete-review confirmation. Continue an independent agreed write only when the drift cannot change its meaning.

Write the confirmed review in its owning system or project location and apply exactly the confirmed native tracker creates, updates, links, owners, and routes that remain valid. Preserve unrelated record content, access controls, discussion, fields, and relationships. Use only native concepts whose meanings match the agreed plan; leave an unsupported part unapplied and report the capability limit rather than simulating it with a misleading field or document.

Read the durable review, each affected tracker item, owner, link, and relationship back from its owning system. Verify the incident identity and stable status, evidence labels and provenance, timeline and contradictions, impact, contributing conditions, defenses, mitigation effects, limitations, follow-up rationale, ownership, lifecycle route, observable completion or effectiveness evidence, relationship meaning and direction, sensitive-data boundary, and preservation of unrelated state. Correct an exact in-scope discrepancy when the agreed value and target are unambiguous; otherwise report the mismatch and partial completion without widening authority.

The owning systems contain the confirmed review and every safely applicable follow-up, verified against current state.

### 6. Report and stop after learning

Return the durable review link or path, incident and evidence boundary, stabilisation evidence, concise explanation, contradictions and unknowns, follow-up links with owners and routes, no-op or zero-action result, read-back verification, partial completion, access or capability limitations, and any unresolved critical action. Distinguish observed fact, supported interpretation, and remaining uncertainty in the handoff.

Stop without operating production, resuming incident command or communications, implementing fixes, changing code, specifying or designing features, decomposing general delivery work, refining priorities, selecting an iteration, committing, pushing, opening or reviewing a pull request, releasing, deploying, or continuously monitoring. Later lifecycle sessions own every routed outcome.
