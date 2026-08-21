# Propulsion skills plan

## Status

This is the authoritative implementation brief for the Propulsion lifecycle skill set. It fixes the intended outcomes, composition, boundaries and acceptance conditions without prescribing the finished wording or detailed process of each skill.

The existing suite may be changed or replaced where necessary. Skill authoring remains responsible for researching credible governing methodologies, allowing a methodology-free design when none fits, testing the common successful path and handling only material exceptions.

## Objective

Propulsion is a compact, composable set of Agent Skills for practical software delivery. It supports work from initial product discovery through feature definition, planning, implementation, pull-request publication and review, debugging and retirement.

Propulsion is not a workflow platform. It does not carry a product automatically through its lifecycle, maintain its own work state or require a setup framework. A user may enter at any point where the necessary inputs already exist and leave when that session's outcome is complete.

## Design principles

1. **One bounded session outcome.** Each lifecycle skill represents a natural working session and ends with one independently useful outcome.
2. **Narrow progressively.** Product intent narrows into a decision-complete feature specification, implementation-ready tickets and, finally, one implemented body of work.
3. **Enter proportionately.** Substantial work uses the complete applicable chain. Small, understood work may begin directly with implementation.
4. **Compose within the requested outcome.** A skill may invoke another skill when its outcome is required to complete the requested session. It must not silently advance into a later lifecycle outcome.
5. **Keep authorities separate.** Product documents own intent, code and tests own implemented behaviour, Git owns change history and the configured ticket system owns work state.
6. **Document what cannot be inferred safely.** Durable documents preserve intent, language, constraints and rationale without copying observable code, configuration, CI or tracker state.
7. **Use native project tools.** Propulsion does not introduce a manifest, tracker adapter, lifecycle state model or completion-horizon schema.
8. **Treat agreement as authority.** Invoking a skill authorises the mutations intrinsic to its agreed outcome. Questions resolve the outcome; they are not followed by a redundant application gate.
9. **Make quality evidence cumulative.** Implementation satisfies project checks and adds proportionate evidence without weakening existing constraints or installing unrelated infrastructure merely to make a check available.
10. **Keep the public surface clear.** Lifecycle skills are the primary entry points. Reusable utilities remain independently useful and may be composed where their explicit trigger applies.

## Lifecycle coverage

| Area | Purpose |
| --- | --- |
| Establish | Create the durable product and system requirements foundation for a new or existing system. |
| Define | Turn one high-level feature request into an approved statement of intended behaviour and its selected buildable solution. |
| Plan | Decompose an approved specification into implementation-ready work. |
| Refine | Assess a bounded area of the current architecture and identify high-value improvements. |
| Deliver | Implement agreed work, record it, publish it for review and review work submitted by others. |
| Debug | Diagnose and repair defects. |
| Retire | Plan the safe removal of an obsolete capability and route its execution through normal delivery. |

These areas are entry points, not mandatory phase gates. Release, deployment and continuous production monitoring are outside Propulsion's core lifecycle.

## Session and authority model

Lifecycle skills are explicitly user-invokable. A lifecycle skill may call another lifecycle skill only when the subordinate outcome is necessary to finish the invoked session. For example, `pull-request` may call `commit` for eligible uncommitted work, while `create-tickets` must not silently manufacture an incomplete work definition.

Reusable utilities are user-invokable and may be model-invoked when their documented trigger is present. A caller remains responsible for verifying the utility's result and completing its own outcome.

Invoking a skill grants authority for its expected repository and external mutations once the skill has reached shared understanding. Material product, architecture, priority or scope questions remain with the user, but an agreed decision does not require a second permission prompt before it is applied. Work outside the invoked outcome remains unauthorised.

Every skill:

1. Inspects the request, repository guidance, existing artefacts and available tools before asking questions.
2. Reuses current authoritative inputs rather than recreating earlier lifecycle work.
3. Invokes required and triggered supporting skills.
4. Persists its outcome in the owning document or system.
5. Verifies the resulting artefact or external state.
6. Stops at its stated boundary and identifies the next available session without starting it automatically.

## Documentation and tool authorities

### Living project foundations

| Authority | Owns |
| --- | --- |
| `PRODUCT.md` | Product purpose, users, needs, value, outcomes, boundaries, journeys, high-level capabilities and system-wide technical requirements. |
| `CONTEXT.md` | Canonical project terms and their concise project-specific meanings. |

`CONTEXT.md` remains live throughout the lifecycle. Any skill that establishes or changes consequential domain language invokes `maintain-ubiquitous-language` inline.

`PRODUCT.md` records requirements-first system constraints that later feature solutions must respect without selecting their internal implementation. `maintain-decision-records` creates focused ADRs only when a consequential or surprising technical or architectural decision needs durable rationale beyond the product foundation or feature records.

### Feature records

A substantial feature uses the project convention where one exists, otherwise:

```text
docs/features/<feature-slug>/specification.md
```

The feature specification contains two visibly distinct semantic parts inside one authority. Feature intent owns the problem, outcomes, scope, actors, observable behaviour, qualities, scenarios and acceptance. Selected solution owns the system-specific responsibilities, boundaries, contracts, data, integrations, controls, migration, operational effects and verification seams. The distinction prevents implementation ideas from masquerading as requirements without creating another document or session handoff.

Small, understood changes do not require feature documents merely to enter implementation.

### Bounded supporting records

Research reports, architecture reviews and retirement plans are repository artefacts only when their conclusions and rationale need to survive the session. They must not duplicate live operational, tracker or implementation state.

### Ticket destination

The project's ticket destination must be named in `AGENTS.md`, for example `The project uses Linear for tickets.` or `The project uses local Markdown for tickets.` A ticket-creating skill that cannot find this preference asks the user which destination the project uses, invokes `maintain-agents` to record it and then resumes its original outcome.

Local Markdown uses one file per ticket under `docs/features/<work-slug>/tickets/`. An external destination uses its native items, estimates, relationships and statuses. If the named external tool is unavailable or not writable, the skill stops with the exact access requirement. It does not guess or fall back silently to Markdown or another tracker.

## Lifecycle skill catalogue

### Establish

#### `define-product`

- **Outcome:** A user-confirmed product and system requirements foundation broad enough to guide later feature specification without becoming one.
- **Inputs:** The product idea, existing `PRODUCT.md` and `CONTEXT.md`, applicable ADRs, representative repository evidence and applicable external evidence.
- **Output:** `PRODUCT.md` and the corresponding ubiquitous language in `CONTEXT.md`.
- **Composition:** Requires `elicit-with-context`; conditionally invokes `research`.
- **Stops:** After purpose, users, needs, value, outcomes, boundaries, journeys, high-level capabilities and material quality, interface, data, integration, security, compliance, platform and operational requirements are documented. It does not define detailed feature behaviour, select feature-specific implementation or architecture, create priorities or create tickets.

### Define

#### `specify-feature`

- **Outcome:** One approved, decision-complete feature specification containing both feature intent and its selected buildable solution.
- **Inputs:** Any high-level feature request, conversation, product capability or existing specification, plus whatever project and current-system evidence is available. No earlier lifecycle artefact is mandatory.
- **Output:** `docs/features/<feature-slug>/specification.md`, or the project's equivalent.
- **Composition:** Requires `elicit-with-context`; conditionally invokes `research` and `modular-design`.
- **Stops:** After the problem, actors, use cases, behaviour, rules, states, qualities, experience, scenarios, acceptance, selected responsibilities, contracts, data, integrations, controls, migration, operational effects and verification seams are resolved enough for ticket decomposition. It does not create tickets or implement the feature.

### Plan

#### `create-tickets`

- **Outcome:** One approved work definition is represented by confirmed, implementation-ready, dependency-aware tickets in the project's configured destination.
- **Inputs:** One sufficiently complete approved document or confirmed conversation, plus relevant project guidance and implementation evidence.
- **Output:** One local Markdown file or external native item per coherent vertical outcome, with bounded context, requirements, applicable constraints, observable acceptance, Fibonacci complexity and genuine blocking relationships.
- **Composition:** Conditionally invokes `elicit-with-context` for unresolved decomposition and `maintain-agents` when the ticket destination is missing.
- **Stops:** After the created tickets and relationships are read back and verified. It does not schedule the work or begin implementation.

### Refine

#### `review-architecture`

- **Outcome:** A bounded, evidence-backed assessment identifies a small number of high-value architecture or maintainability improvements.
- **Inputs:** An explicitly scoped codebase area, `PRODUCT.md`, `CONTEXT.md`, applicable ADRs and current implementation evidence.
- **Output:** An independently useful architecture review report with prioritised findings, evidence, benefits and trade-offs.
- **Composition:** Requires `modular-design`; conditionally invokes `research`.
- **Stops:** After reporting. It does not refactor the code or create speculative tickets automatically.

### Deliver

The detailed authoring contract for the implementation skills is maintained in [`IMPLEMENTATION_SKILLS_PLAN.md`](IMPLEMENTATION_SKILLS_PLAN.md). This plan retains their lifecycle outcomes and composition; the implementation plan owns their teaching content, internal sequence, resources and evaluation expectations.

#### `implement`

- **Outcome:** One ticket or small agreed body of work exists as a minimal, locally checked and independently reviewed change.
- **Inputs:** The stated ticket or confirmed work, linked product and technical authorities, repository guidance and current code.
- **Output:** Working code, retained tests and other in-scope artefacts, applicable quality evidence and limitations, and no unresolved applicable review change.
- **Composition:** Applies the teaching guidance from `modular-design` and `quality-harnesses`, applies `tdd` for behaviour-changing work when a usable suite exists, requires independent `code-review`, and conditionally invokes `elicit-with-context` when implementation exposes a material missing detail or decision.
- **Stops:** After the agreed behaviour is implemented, applicable checks pass, unavailable evidence is explicit and the current candidate has completed the review-and-correction loop. It does not commit or publish the change.

#### `commit`

- **Outcome:** Eligible reviewed work is recorded in one or more coherent Conventional Commits.
- **Inputs:** The current Git state, repository guidance, recent history and any user-supplied scope.
- **Output:** Verified atomic commits that preserve unrelated staged, unstaged and untracked work.
- **Composition:** No required utility.
- **Stops:** After reporting created commits and remaining work. It does not push or create a pull request.

#### `pull-request`

- **Outcome:** The current branch and its complete committed work are represented by one accurate pull request.
- **Inputs:** The current branch, its base, full branch history, repository guidance and any existing pull request.
- **Output:** A pushed branch and created or updated pull request whose title and body describe the whole branch.
- **Composition:** Conditionally invokes `commit` when eligible uncommitted work remains.
- **Stops:** When the published head, base, content and review state are verified. It does not merge, release or deploy the work.

#### `review-pull-request`

- **Outcome:** Someone else's pinned pull request receives an independent, evidence-backed assessment.
- **Inputs:** The complete pull-request change, originating specification or work item, repository standards and relevant product and technical authorities.
- **Output:** Prioritised findings covering behavioural conformance, regressions, minimality, conventions, maintainability, architecture and verification evidence.
- **Composition:** Requires `code-review`, whose Standards axis applies the implementation teaching skills; conditionally invokes `research` when external evidence is material to the review.
- **Stops:** After reporting findings. It does not change the contributor's branch or publish comments, approvals or requested changes unless the user's invocation includes that outcome.

### Debug

#### `debug`

- **Outcome:** A defect has an evidence-backed root cause and, when authorised by the requested outcome, a minimal verified repair.
- **Inputs:** Expected and observed behaviour, the failing signal, relevant environment evidence and current implementation authorities.
- **Output:** A reproducible diagnosis and, for repair work, regression protection plus a reviewed local change.
- **Composition:** Repair applies `modular-design` and `quality-harnesses`, applies `tdd` for behaviour-changing work when a usable suite exists, and requires `code-review`; conditionally invokes `research` and `elicit-with-context` when their triggers apply.
- **Stops:** At the diagnosis boundary when requested, otherwise after the original failure and regression evidence verify the repair. It does not commit or publish the change.

### Retire

#### `plan-retirement`

- **Outcome:** An obsolete capability has an approved plan for safe retirement.
- **Inputs:** The capability, product intent, users, dependencies, interfaces, data, integrations, support obligations and current implementation evidence.
- **Output:** A retirement plan covering deprecation, migration, communication, removal, archival, access, recovery and observable completion conditions.
- **Composition:** Requires `elicit-with-context`; conditionally invokes `research`, `maintain-ubiquitous-language` and `maintain-decision-records`.
- **Stops:** After the retirement outcome and obligations are approved. Execution returns to `create-tickets`, `implement`, `commit` and `pull-request` in later sessions.

## Reusable utility catalogue

| Utility | Independently useful outcome |
| --- | --- |
| `elicit` | Resolves dependency-ordered material information and user decisions one question at a time until shared understanding is confirmed. |
| `elicit-with-context` | Routes software-project elicitation through `elicit` while maintaining confirmed project language and qualifying ADRs. |
| `research` | Investigates a material subject using high-trust evidence and creates a trusted cited report for the consumer to synthesize. |
| `maintain-ubiquitous-language` | Keeps `CONTEXT.md` aligned inline with confirmed project-specific language. |
| `maintain-decision-records` | Preserves rare accepted technical and architectural decisions whose rationale warrants a focused ADR. |
| `modular-design` | Teaches callers to structure code through information hiding, deep modules, cohesive ownership, stable interfaces, locality and conditional design techniques. |
| `tdd` | Teaches callers to implement observable behaviour through red-green-refactor and retain a small, durable, independently meaningful test suite. |
| `quality-harnesses` | Teaches callers to select and apply relevant quality harnesses from a trigger-led catalogue without overstating their evidence. |
| `code-review` | Independently reviews a fixed change through isolated Spec and Standards agents and returns consequence-ranked suggestions for its caller to adjudicate. |
| `maintain-agents` | Records confirmed, non-inferable repository-wide agent guidance while keeping permanent context lean. |

Software-project skills route user-held questions through `elicit-with-context`. Base `elicit` remains available for non-software work and as that router's questioning component.

`write-skill` remains a separate suite-development tool. It is not presented as part of the software-delivery lifecycle.

## Implementation quality model

### Research prerequisite

Before finalising `implement`, `tdd`, `modular-design`, `quality-harnesses` or `code-review`, conduct focused research using primary technical sources, established standards and credible field practices. Persist one cited report that establishes:

- the obligations common to implementation regardless of harness selection
- selection triggers for additional harnesses
- what each harness can and cannot demonstrate
- ways metrics and tests can be gamed
- how executable evidence and engineering judgement complement each other
- how to report incomplete confidence when required infrastructure is absent

The research evaluates practices used successfully in real projects without turning every available harness into mandatory ceremony.

The current evidence is recorded in [`docs/research/agentic-coding-quality-guardrails-2026-08-20.md`](docs/research/agentic-coding-quality-guardrails-2026-08-20.md). The detailed implementation-skill decisions derived from it are fixed in [`IMPLEMENTATION_SKILLS_PLAN.md`](IMPLEMENTATION_SKILLS_PLAN.md).

### Teaching utilities

`modular-design`, `tdd` and `quality-harnesses` are teaching skills. They supply the calling agent with applicable knowledge; they do not become delegated workers, mutate independently, return separate workflow verdicts or take ownership from their caller. `implement` uses that knowledge to write and assess code. The Standards agent created by `code-review` uses the same knowledge to review code and evidence.

### Quality-harness catalogue

`quality-harnesses` directs its caller to inspect the change, repository requirements and material risks, then review a compact catalogue and apply every relevant entry. Each catalogue entry states its trigger, the narrow claim it can support, its limitations, its anti-gaming checks and the detailed reference to load when applicable. The catalogue may include:

- unit, acceptance, integration, contract and system tests
- executable business examples such as Gherkin where they improve precision
- static types, linting, formatting and framework diagnostics
- coverage analysis and mutation testing
- security, accessibility, performance, compatibility and resilience checks
- reproducible manual or specialist QA procedures

The catalogue does not divide controls into a mandatory baseline and optional extras. Applicability governs selection. Complexity, size, coverage, mutation and other metrics remain evidence for a named question rather than universal gates or composite quality scores.

The repository's existing constraints remain authoritative. A caller may strengthen evidence through the existing test and quality infrastructure but must not weaken or skip required checks silently.

When an existing project lacks an applicable harness, the caller records the missing evidence and residual risk. It does not install a project-wide test framework or quality tool unless establishing that infrastructure is explicitly part of the agreed work. New projects establish required infrastructure through their architecture and initial delivery tickets.

### Maintainability judgement

Passing checks does not prove that a change is well designed. `implement` applies `modular-design` throughout the change, and the independent Standards review uses `modular-design`, `tdd` and `quality-harnesses` to assess whether the implementation:

- contains only the behaviour and code needed for the agreed outcome
- follows the language, framework and repository conventions
- reuses established helpers and abstractions where they fit
- avoids duplication, speculative generality and recognised code smells
- preserves or improves information hiding and module boundaries
- remains understandable and economical to change

Spec and Standards suggestions are ranked high, medium or low by consequence. Severity never decides remediation. The implementation owner validates each suggestion against its authority and evidence, applies required corrections and proportionate in-scope improvements, rejects unsupported or out-of-scope findings, and returns material behaviour, architecture or scope decisions to the user. Review repeats after material candidate changes until no applicable change remains.

## Representative flows

### Establish a product

```text
define-product
```

Product definition stops after the confirmed breadth-first product and system requirements foundation.

### Deliver a substantial feature

```text
specify-feature
    → later create-tickets
    → implement each selected ticket in a separate session
    → commit whenever a coherent unit is ready
    → pull-request when the branch is ready for human review
```

### Deliver a small understood change

```text
elicit-with-context when needed
    → implement
    → commit
    → pull-request
```

### Debug a known defect

```text
debug
    → commit
    → pull-request
```

### Retire a capability

```text
plan-retirement
    → later create-tickets
    → normal implementation and publication sessions
```

### Review another contributor's work

```text
review-pull-request
```

The author's normal flow does not invoke `review-pull-request`; `implement` already includes independent change review.

## Implementation order

1. Complete the quality-harness research and implementation-skill authoring plan.
2. Align the shared utilities: `elicit`, `elicit-with-context`, `research`, `maintain-ubiquitous-language`, `maintain-decision-records`, `modular-design`, `tdd`, `quality-harnesses`, `code-review` and `maintain-agents`.
3. Build the progressive foundation path: `define-product`, `specify-feature` and `create-tickets`.
4. Build the delivery path: `implement`, `commit`, `pull-request` and `review-pull-request`.
5. Build the architecture-assessment path: `review-architecture`.
6. Build the remaining paths: `debug` and `plan-retirement`.
7. Align software-project elicitation through `elicit-with-context`, update the README around the lifecycle areas and independently invokable utilities, and run the suite-wide acceptance pass.

### Implementation checklist

- [x] Complete quality-harness research
- [x] Define the implementation-skill authoring plan
- [x] Update `elicit` skill
- [x] Update `research` skill
- [x] Create `maintain-ubiquitous-language` skill
- [x] Create `maintain-decision-records` skill
- [x] Update `modular-design` skill
- [x] Update `tdd` skill
- [x] Create `quality-harnesses` skill
- [x] Update `code-review` skill
- [x] Update `maintain-agents` skill
- [x] Update `define-product` skill
- [x] Create `specify-feature` skill
- [x] Create `create-tickets` skill
- [x] Update `implement` skill
- [x] Update `commit` skill
- [x] Replace `pr` with `pull-request`
- [x] Create `review-pull-request` skill
- [-] Update `review-architecture` skill
- [-] Update `debug` skill
- [-] Create `plan-retirement` skill
- [x] Restore `elicit-with-context` skill
- [-] Update the README
- [-] Run the suite-wide acceptance pass

Each skill is authored and forward-tested as one coherent work unit. The rewrite branch may contain incomplete groups during development, but the public cutover occurs only when the final catalogue composes coherently and replaces obsolete guidance.

## Acceptance conditions

The revised suite is ready when:

- every common lifecycle task has one obvious user-facing entry point
- every lifecycle skill produces one bounded outcome and stops at its documented boundary
- substantial work narrows cleanly from product foundation through decision-complete specification, tickets and per-item implementation
- small, clear work can enter implementation without ceremonial documents or tickets
- required and conditional composition is explicit and does not duplicate supporting skill instructions
- ticket-creating skills use the local Markdown or external destination named in `AGENTS.md` and preserve its exact concepts without Propulsion configuration
- documentation preserves enduring intent without copying observable implementation or live tool state
- implementation always applies the relevant modular-design, TDD and quality-harness guidance and completes independent review
- absent quality infrastructure is reported honestly and never causes unrelated tooling to be installed implicitly
- external mutations remain within the outcome authorised by the invoked skill and are read back after application
- release, deployment and continuous monitoring remain outside the suite
- each skill passes a fresh-agent common-path test and every material permission, missing-input and stopping boundary identified during authoring
- representative cross-session flows pass without transcript dependency or an orchestrating lifecycle skill
- `bun run checks` and `git diff --check` pass

## Explicit non-goals

Propulsion will not:

- provide a lifecycle navigator or end-to-end delivery orchestrator
- require a Propulsion manifest, setup skill, state model, completion horizon or tracker adapter
- impose a project-management method
- create separate skills for individual test types, metrics or quality commands
- require discovery, architecture or feature documents for small work that is already sufficiently understood
- duplicate code, CI, tracker or production state in prose documents
- release, deploy or continuously monitor software
- merge a pull request merely because it has been created or reviewed
- perform retirement implementation or production decommissioning inside `plan-retirement`
