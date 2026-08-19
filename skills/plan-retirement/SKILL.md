---
name: plan-retirement
description: Plans the safe retirement of one obsolete capability. Use when deprecation, migration, disablement, removal, archival, or recovery need an approved durable plan before delivery work.
metadata:
    invocation: user
disable-model-invocation: true
---

# Plan Retirement

Turns evidence and user-authoritative decisions into one proportionate, reversible plan for retiring an obsolete capability. The plan reduces total system complexity without treating missing usage evidence as proof that no one depends on the capability or crossing into retirement execution.

## Process

### 1. Establish the retirement evidence

Inspect the request, repository guidance, product intent and system-wide requirements in `PRODUCT.md`, `CONTEXT.md`, applicable ADRs, prior decisions and plans, and the smallest sufficient current implementation and runtime evidence. Trace the capability through entry points; users, tenants, callers, and operators; internal and external dependencies; public and private interfaces, APIs, events, schemas, configuration and flags; data ownership, flows, access, retention, archival, and recovery; integrations and providers; permissions and trust boundaries; observability; runbooks, support and communications; documentation; and known replacements.

Treat code, tests, contracts, configuration, telemetry, inventories, tracker records, and operational systems as evidence within their actual scope and freshness. Distinguish confirmed use, confirmed non-use, and unknown use. Absence of observed traffic, repository references, or known consumers is not proof of no dependence. Identify lifecycle authorities and contradictions without copying mutable operational or tracker state into the plan. The capability boundary, evidence provenance, affected parties, obligations, current unknowns, and accessible authority are explicit.

### 2. Resolve retirement intent and obligations

Invoke `$elicit-with-context` and retain responsibility for the plan, writes, verification, and stopping boundary. Give it the inspected evidence and use one dependency-ordered question at a time to resolve the obsolete capability and reason for retiring it; acceptable end state and non-goals; timing or obligation trade-offs; consumer and operator migration; replacement expectations; compatibility and coexistence; data retention, deletion, archival, access, and recovery; integration and provider obligations; communication and support; security, privacy, compliance, and contractual constraints; acceptable reversibility and risk; ownership; and observable completion. Reuse compatible confirmed answers and ask only about material gaps.

Invoke `$research` only when a material external legal, regulatory, provider, protocol, standards, or deprecation subject could change the plan and needs durable evidence. Read its report before using its findings; treat research as evidence, not authority to invent a project obligation. Invoke `$maintain-ubiquitous-language` inline when independently confirmed consequential project language is introduced, changed, misused, or contradicted; defer any design-dependent terminology or qualifying ADR until the complete retirement synthesis is confirmed. Each utility owns only its contract-specific result and returns control here.

Keep every retirement-plan artefact unchanged until the complete synthesis is explicitly confirmed. The intended retirement outcome, authoritative obligations, unresolved decisions, and conditions that must gate irreversible work are honest and explicit.

### 3. Compare proportionate retirement strategies

Compare the status quo, replacement or migration, disablement without removal, staged retirement, and immediate removal where each is credible. Assess intended benefit, affected parties, consumer and operational risk, evidence gaps, cost and complexity, residual obligations, reversibility, recovery, and the condition that ends any temporary compatibility path. Prefer the least irreversible strategy that can produce the required outcome and evidence. Do not introduce permanent coexistence, shims, flags, duplicate data, or compatibility scaffolding without an explicit exit condition.

Apply supporting techniques only when their runtime trigger is present:

- Use **API deprecation and sunset semantics** for an externally consumed contract, distinguishing notice of discouragement from the planned end of availability and retaining direct consumer evidence, migration guidance, compatibility obligations, and completion signals.
- Use **Parallel Change** when an incompatible interface or schema must coexist while consumers or data migrate; plan the expansion, observed migration, and contraction gates without assuming the final removal is safe.
- Use the **Strangler Fig pattern** only when a substantial capability is being replaced incrementally across a stable routing or responsibility seam; keep ownership, coexistence, and the removal condition explicit.
- Use **controlled stop and recovery** when use is dormant, uncertain, or operationally mediated; plan a reversible disablement, evidence window, counter-signals, tested recovery, abort authority, and reassessment before removal.

Choose direct atomic removal only when current evidence demonstrates that the change is local and reversible and that no consumer, data, public contract, integration, support, security, compliance, or recovery obligation requires a staged transition. Otherwise select only the applicable stages from deprecate, migrate or coexist, disable, observe, remove, and archive or close. The selected strategy is justified by evidence and confirmed trade-offs rather than ceremony or a preferred migration pattern.

### 4. Build the complete retirement plan

Define the selected end state and explicit non-goals, affected parties, prerequisites, owners, contract and deprecation policy, migration and compatibility path, communication and support plan, data disposition and access rules, integration and provider handling, operational and monitoring effects, security and compliance checks, archival and recovery, unresolved risks and decisions, and observable completion conditions.

For each applicable stage, state its bounded outcome, entry evidence and prerequisites, affected contracts or state, owner, verification and counter-signals, abort conditions and authority, rollback or recovery route, residual obligations, and evidence required to exit. Use confirmed dates, deadlines, notice periods, adoption claims, retention rules, and production mechanisms only when their authority exists; otherwise preserve the unknown and its resolution gate. Ensure the final removal and closure eliminate temporary paths and stale obligations rather than merely hiding the capability.

Trace every stage and obligation back to retirement intent, a consumer or dependent, current evidence, an external authority, or an explicit user decision. Compare the selected plan with the credible alternatives and retain only the rejected choices necessary to understand a material consequence or reversal. The proposed plan is safe to decompose later without becoming a file-by-file implementation plan, task list, estimate, sprint, release, or deployment procedure.

### 5. Confirm the complete synthesis

Have `$elicit-with-context` present one concise, self-contained synthesis covering the evidence boundary and unknown use, retirement outcome and non-goals, affected parties and obligations, alternatives, selected strategy, stages and ownership, migration and compatibility, communications and support, data and integrations, operations, security and compliance, verification, abort and recovery, completion conditions, unresolved risks, context changes, durable destination, and exact proposed write. Obtain explicit confirmation of the whole synthesis; selecting an earlier option is not confirmation.

If the user rejects or revises it, leave the retirement plan and design-dependent context unchanged, reopen every affected evidence, obligation, option, stage, owner, and completion branch, and confirm the complete revised synthesis. Independently confirmed glossary updates already applied inline remain valid. The confirmed synthesis supplies authority for its agreed plan and context writes without another application prompt.

### 6. Write and verify the durable plan

Immediately before writing, refresh mutable usage, dependency, contract, provider, retention, and operational evidence that could change the confirmed plan. When drift materially changes the strategy, obligation, stage, owner, risk, or completion claim, leave the plan unchanged and return to complete-synthesis confirmation.

Follow the project's established retirement-record convention. Otherwise choose a stable lowercase capability slug and create `docs/retirements/<capability-slug>.md` using the [Retirement Plan Template](assets/retirement-plan-template.md). Preserve unrelated confirmed content and local structure when refining an existing plan. Include only material sections, link authorities and mutable owning systems instead of duplicating them, and distinguish confirmed current evidence, approved future action, and unresolved gated decisions.

After writing the plan, invoke `$maintain-ubiquitous-language` for confirmed design-dependent terminology and `$maintain-decision-records` for any qualifying ADR whose durable-rationale agreement was included in the synthesis. Re-read the plan against product intent, repository and runtime evidence, context and architecture authorities, external research, and the confirmed synthesis. Verify all paths and links; end-to-end dependent coverage; stage entry, exit, evidence, abort, rollback and recovery; owner and obligation coverage; data, integration, communication, support, security and compliance treatment; removal of temporary paths; and observable completion. State evidence limitations and never describe unknown or future evidence as established.

Report the plan path, selected strategy, affected parties and obligations, stage and completion outline, confirmed context changes, supporting evidence, verification, unresolved gated decisions, and limitations. Stop after the approved retirement plan and applicable context records are written and verified. Do not create tracker items, invoke downstream lifecycle skills, implement or decommission the capability, disable or delete code, data, configuration or infrastructure, contact consumers, commit, push, open a pull request, release, deploy, or continuously monitor. Later sessions own `$create-tickets`, `$implement`, `$commit`, and `$pull-request`.
