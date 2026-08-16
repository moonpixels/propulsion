---
name: triage-work
description: Triages bounded incoming software requests into verified native tracker dispositions and lifecycle routes. Use for recurring intake review before backlog refinement.
metadata:
    invocation: user
disable-model-invocation: true
---

# Triage Work

Determines what each selected incoming request is, records an evidence-led native disposition, and routes it to the right later lifecycle session without performing that work.

## Prerequisites

Require an explicitly bounded set of incoming items or queue. When the scope is unclear, resolve only the selection before inspecting or mutating items outside it.

Require the project's task-management tool to be named in the root `AGENTS.md`. When the preference is absent, ask the user which tool the project uses, invoke `$maintain-agents` with the confirmed preference, verify the root instruction, and resume. Never guess a tool or add a Propulsion manifest, adapter, configuration, or state model. When the configured tool, account, selected queue, source evidence, or required write operation is unavailable, stop the affected item with the exact access or connection needed rather than falling back to Markdown or another tracker.

## Process

### 1. Establish the intake surface

Inspect the request, repository guidance, configured tool, selected items, and their current native state before mutation. Inspect the tool's available item types, statuses, resolutions, labels or classifications, comments, links, duplicate and related relationships, transfer or routing operations, and read-back capabilities. Use only concepts and meanings the current project and tool actually support.

For each selected item, read its description, attachments, discussion, source report, prior dispositions, and linked work. Treat reporter wording as a claim rather than the classification. When the source is not yet represented in the tracker, include the smallest native intake record needed to preserve its evidence and route in the later proposal; do not turn it into an implementation ticket. The bounded items, available evidence, native capabilities, and access limits are explicit.

### 2. Establish enough evidence to classify

Inspect the current `PRODUCT.md`, `CONTEXT.md`, feature records, `ARCHITECTURE.md`, ADRs, documentation, public contracts, tests, code, operational evidence, and external authorities only as far as each item needs. Distinguish intended behaviour, current observable behaviour, reported observation, and unsupported inference. Seek enough corroboration to decide a disposition, not a root cause or solution. A safe focused observation may establish that a defect report is credible; full reproduction, causal investigation, mitigation, repair, or feature discovery belongs to its later routed session.

Search open and closed tracker work and relevant repository records using source identifiers, authoritative links, actors, outcomes, symptoms, affected concepts, and discriminating details. Classify a candidate internally as exact match, possible overlap, related work, or unrelated. Mark a duplicate only when the evidence establishes the same requested outcome or fault; preserve an uncertain resemblance as related or unresolved and state what would distinguish it.

When a material external evidence question could change the disposition and its answer must survive this session, invoke `$research` with that bounded question, then read and verify the report's material claims and citations before using it. Invoke `$maintain-context` only when the evidence independently confirms consequential durable project language or qualifying rationale; a proposed classification or route alone does not establish either. Verify its returned context result before continuing. The evidence for classification, duplicate confidence, and remaining uncertainty is explicit.

### 3. Choose one honest disposition per item

Classify each item by the lifecycle outcome it actually needs:

- route a new or changed externally observable capability to a later `$specify-feature` session;
- route incorrect existing behaviour to a later `$debug` session;
- route active production impact requiring stabilisation to a later `$respond-to-incident` session;
- route removal or deprecation intent to a later `$plan-retirement` session;
- link an exact existing representation and use the supported duplicate or equivalent native resolution;
- link actionable work whose intent and solution are already defined to its existing appropriate work without creating another specification, design, or ticket; or
- close answered, invalid, not-actionable, or out-of-scope requests only with a concise reason grounded in inspected evidence.

When evidence cannot yet support one of those outcomes, retain an honest native needs-information or unresolved disposition when available and identify the minimum missing fact and who can supply it. Invoke `$elicit` only when that fact or a materially different classification or disposition depends on user-held knowledge or authority. Supply the evidence and viable consequences, use only its confirmed synthesis, and retain ownership of proposal, mutation, verification, and stopping. Do not ask the user for repository or tracker facts that inspection can establish.

For each item, prepare a proposed native disposition containing its classification, concise evidence-led reason, exact duplicate or related links, supported state and field changes, precise next route and required input, and any native capability limitation. Do not add priority, readiness, estimates, iteration placement, ticket decomposition, root cause, solution, or speculative downstream work. Every selected item has one supported disposition or one explicit evidence blocker.

### 4. Confirm the mutation plan

Recheck each proposal against the source evidence, current authorities, possible duplicates, and the native meanings discovered in step 1. Present the complete material mutation plan: records to create, close, update, transfer, comment on, classify, or link; exact relationship meanings and targets; reasons; routes; no-op items; and limitations. Keep the tracker unchanged while resolving material decisions.

Obtain explicit user confirmation of the complete plan. Selecting an earlier classification option is not confirmation of all mutations. If the user rejects or revises a proposal, reopen every affected evidence, classification, duplicate, and routing decision and present the complete revised plan. Confirmation supplies authority for exactly the agreed mutations, including uncontroversial native fields mechanically entailed by them, without another application prompt.

### 5. Apply and verify the agreed dispositions

Immediately before writing, re-read every affected item, relationship, and duplicate candidate. If drift changes an agreed disposition or target, leave that item unchanged and return its revised complete proposal for confirmation; continue independent batch items only when their plans remain safe.

Apply only the agreed native mutations and relationships. Preserve unrelated content, discussion, fields, and metadata. When the tool lacks an agreed classification, resolution, link, or route, use another supported native operation only when it preserves the exact confirmed meaning; otherwise leave that part unapplied and report the capability limit rather than simulating it with a misleading field or relationship.

Read back every affected record and relationship. Verify source preservation, classification, reason, state, fields, duplicate or related target and direction, next route, and absence of unintended changes against the confirmed plan. Correct an exact in-scope discrepancy when the agreed value and target are unambiguous; otherwise stop that item and report the mismatch. Each applied disposition is verified in its owning system.

### 6. Report and stop at intake

Report every selected item with its native link, applied or no-op disposition, evidence basis, duplicate or related work, next lifecycle route or missing input, read-back evidence, limitations, and unresolved uncertainty. Distinguish completed, blocked, and unchanged items so a blocker on one does not overstate or erase safe batch progress.

Stop after the native dispositions and routes are verified. Do not invoke the routed lifecycle skill or perform feature elicitation or specification, solution design, ticket decomposition, backlog scope or readiness refinement, priority or iteration planning, root-cause debugging, repair, incident stabilisation, retirement planning, implementation, commit, publication, release, or deployment. Live work state remains in the configured tracker rather than a repository mirror.
