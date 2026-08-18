---
name: respond-to-incident
description: Stabilises active production incidents through coordinated, evidence-led mitigation and verified service recovery. Use when current production impact requires an emergency response.
metadata:
    invocation: user
disable-model-invocation: true
---

# Respond to Incident

An **adapted Incident Command System** scales clear command, operations, and communications ownership to the active incident so responders can reduce user impact safely and establish the resulting service state.

## Process

### 1. Establish the incident basis

Inspect the request, repository guidance, current incident and communication records, operational authorities, runbooks, available tools and controls, relevant product and architecture constraints, and current production evidence. Resolve the incident identity; source-reported time; current impact and affected users, tenants, regions, systems, data, and dependencies; known recent changes; safety, privacy, security, compliance, and support constraints; current responders and owners; evidence sources and freshness; and accessible mutation boundary. Use the project's severity meaning only when it changes the response; do not invent a severity scheme or guess current production state.

Define the signals that can distinguish continued impact, partial recovery, and credible stability before taking action. Prefer the owning incident, observability, and operational systems over copied state. When evidence is stale, contradictory, or unavailable, seek the smallest safe current observation; if no trustworthy signal or safe observation exists, keep production unchanged and establish the exact evidence or access blocker and next owner. The active impact, response authority, and evidence boundary are explicit.

### 2. Establish proportionate command

Map the project's current incident roles onto three responsibilities: incident command owns impact, priorities, mutation decisions, coordination, escalation, and the stopping decision; operations owns bounded technical investigation and controlled action; communications owns factual updates and the response timeline. One responder may retain every responsibility; delegate only when incident complexity or concurrent work requires it, and preserve existing project-native command and handoff authority.

Adopt the owning incident record and established communication channel where available. Keep current impact, status, mitigation, command and action owners, next communication time, blockers, and unresolved risks current there. Maintain one concise timeline throughout: timestamp, observation or decision, action and actor, expected result, observed result, and reversal when applicable. When the owning record is inaccessible, retain a bounded session timeline and identify the exact record-update handoff rather than creating a competing repository record. The response has one visible command owner and one current factual account.

### 3. Select the safest useful mitigation

Prioritise reducing user impact over broad root-cause work. Start with applicable runbook or automated recovery actions and compare credible mitigation options by expected impact reduction, time, reversibility, blast radius, operational and data risk, dependencies, and signals capable of verifying direct effect and user or service health. Prefer the reversible, low-blast-radius option that is likely to stabilise service while preserving evidence. A successful command, quiet alert, or plausible diagnosis is not recovery evidence.

Ask the incident commander or user to resolve a material trade-off when an option changes intended product behaviour, risks data loss or integrity, affects security or compliance, has a material irreversible effect, exceeds accessible authority, or requires a genuinely command-owned priority. Present the live evidence, viable options, consequences, exact target, intended effect, and available rollback or containment. Once the mitigation is agreed, the invocation supplies authority for its intrinsic mutations without a redundant application prompt; still satisfy required external confirmations and obtain any distinct operational authority the environment requires. One authorised mitigation and its expected evidence are explicit.

### 4. Execute and appraise one controlled action

Immediately before action, re-read the target and relevant service state, resolve its exact identity and scope, and record the expected result plus safe rollback or containment. Use least privilege and the narrowest native operational control. Preserve logs, traces, data, and unrelated user work; avoid destructive, broad, recursively targeted, glob-selected, or evidence-erasing operations. For a security or data-integrity incident, restrict exposure and preserve forensic evidence; defer destructive eradication, rebuild, or data repair until its targets, consequences, authority, and recovery path are exact.

Record the action and actor, execute only the agreed operation, read back the mutated target, and immediately inspect both its direct effect and current user or service signals, including a credible counter-signal. When the action fails or worsens impact, perform only a pre-agreed safe rollback or containment, verify that result, preserve the contradictory evidence, and return to mitigation selection. Do not stack unsupported actions or interpret command success as service recovery. Each attempt leaves a timestamped, read-back result and either one supported current state or an explicit uncertainty.

Invoke `$debug` only when a bounded causal diagnosis or local repair is necessary to stabilise this incident. Supply the exact signal, production boundary, time constraint, and stopping condition; retain ownership of impact, mitigation, production actions, communications, and recovery. Do not let diagnosis become open-ended or delay a safe mitigation. Invoke `$verify-change` for a frozen local code or configuration repair, or a fixed operational change that existing harnesses can appraise; its verdict supplements but never replaces current production recovery evidence. Invoke `$research` only for one material external subject that needs durable evidence.

Do not commit, push, publish, release, or deploy a repair. When stabilisation requires one of those project-specific actions, stop that route with the exact external handoff, owner, artefact, required mechanism, and service risk rather than performing or improvising it inside Propulsion.

### 5. Establish the service state

After an effective action, observe the direct effect, user and service health, and counter-signals across the evidence window warranted by the system, runbook, traffic pattern, and incident risk. Do not invent an arbitrary duration. Check for partial or regional recovery, tenant or cohort skew, retries and hidden backlog, delayed processing, data damage, dependency degradation, recurrence, and changed alert or metric coverage when applicable. Distinguish mitigated impact, restored service, and remaining unknowns; silence alone does not establish stability.

Keep the incident record and communications current as evidence changes. State observed facts, affected scope, action underway, user guidance, and next update without speculative root cause, blame, fabricated metrics, or unsupported recovery times. Service is stable only when trustworthy current signals and counter-signals support that conclusion within the stated scope and limitations.

### 6. Conclude the active response

Conclude with exactly one terminal state: verified mitigation or recovery with bounded ongoing observation and ownership, or an exact external blocker, escalation, or handoff. Read back the owning incident record where accessible and report current impact, stability evidence and its window, timeline, actions and reversals, communications, unresolved data or service risk, remaining observation and owner, access or authority limitations, and follow-up needs. Do not call the incident resolved merely because symptoms quieted or a mitigation executed.

Stop before the later learning session. Do not write a postmortem or root-cause narrative, create speculative follow-up tickets, perform broad cleanup, plan a release, continuously monitor beyond bounded recovery evidence, retire a capability, or invoke `$review-incident`. The active incident response ends with a credible service state or precise handoff; later `$review-incident` owns blameless learning and follow-up routing.
