# Harness Catalogue

Review every entry against the fixed change. Applicability comes from repository authority or the stated trigger, not from a baseline/optional tier.

## Build, compilation, and packaging

**Trigger:** A repository-required build, or changed build inputs, generated output, dependencies, packaging, compilation mode, or runtime compilation. **Narrow claim:** The selected inputs produced the identified artefact or compiled successfully in the recorded environment. **Limitations:** One build does not establish behavioural correctness, portability, reproducibility, deployability, or runtime compatibility. **Anti-gaming checks:** Confirm the intended target and configuration ran; inspect stale or cached output, ignored errors, warnings-as-errors policy, omitted packages, and changed build scripts. **Reference:** [Build, Static, and Structural Harnesses](BUILD-STATIC-STRUCTURE.md#build-compilation-and-packaging).

## Types, linting, formatting, and framework diagnostics

**Trigger:** Repository-required diagnostics, or changed code or configuration within an existing tool's scope. **Narrow claim:** The checked files satisfy the enabled rules under the recorded configuration. **Limitations:** Clean diagnostics establish only encoded properties and cannot prove behaviour, security, accessibility, or maintainability. **Anti-gaming checks:** Confirm file and rule selection is non-empty and current; inspect changed ignores, baselines, suppressions, severity, generated-file treatment, and formatter write-versus-check mode. **Reference:** [Build, Static, and Structural Harnesses](BUILD-STATIC-STRUCTURE.md#types-linting-formatting-and-framework-diagnostics).

## Behavioural and regression suites

**Trigger:** Changed observable behaviour, a defect repair, changed tests or test infrastructure, or a repository-required suite. **Narrow claim:** The exercised examples produced their independently specified outcomes; a broader unchanged suite also supplies pass-to-pass regression evidence. **Limitations:** Tests say nothing about unexercised cases, environments, or risks and are only as sound as their seams and oracles. **Anti-gaming checks:** Inspect test discovery, focused-case counts, assertions, snapshots, fixtures, doubles, retries, skips, quarantines, and whether expected values derive from production. **Reference:** [Behavioural Evidence](BEHAVIOURAL-EVIDENCE.md#behavioural-and-regression-suites).

## Coverage

**Trigger:** Execution of changed or risk-relevant paths is uncertain, coverage configuration changed, or repository authority requires the measurement. **Narrow claim:** The selected tests executed the reported code elements. **Limitations:** Execution percentage does not establish correct assertions, fault detection, requirement coverage, or overall quality. **Anti-gaming checks:** Inspect denominator and scope changes, exclusions, generated code, branch versus line criteria, merged reports, stale artefacts, and tests that execute without discriminating outcomes. **Reference:** [Behavioural Evidence](BEHAVIOURAL-EVIDENCE.md#coverage).

## Mutation

**Trigger:** Test sensitivity is materially uncertain and existing mutation tooling can assess a bounded changed area economically, or repository authority requires it. **Narrow claim:** Killed non-equivalent mutants show sensitivity to those particular injected changes. **Limitations:** Operators omit fault classes; survivors may be equivalent or irrelevant; timeouts and uncovered mutants are distinct; no score proves correctness. **Anti-gaming checks:** Inspect changed-code selection, mutant categories, exclusions, operator configuration, baseline stability, timeouts, and whether fixes merely assert implementation details. **Reference:** [Behavioural Evidence](BEHAVIOURAL-EVIDENCE.md#mutation).

## Static and security analysis

**Trigger:** Configured analysis covers the changed code, repository authority requires it, or the change affects trust boundaries, permissions, sensitive data, untrusted input, cryptography, secrets, or dependency risk. **Narrow claim:** The enabled rules reported no unresolved findings for their scanned inputs, or produced findings for appraisal. **Limitations:** Analysis approximates selected weakness classes and cannot establish absence of vulnerabilities or sound security design. **Anti-gaming checks:** Record tool and rule versions; inspect scan scope, baselines, suppressions, severity changes, ignored paths, generated findings, and dependency database age. **Reference:** [Security and Adversarial Harnesses](SECURITY-ADVERSARIAL.md#static-and-security-analysis).

## Architecture fitness rules

**Trigger:** An authoritative dependency, layer, cycle, import, ownership, or public-surface rule is already encoded and the change can affect it. **Narrow claim:** The selected source conforms to the encoded structural rule. **Limitations:** Passing cannot establish that the rule is a good architecture decision or cover omitted runtime, data, or organisational coupling. **Anti-gaming checks:** Confirm selectors and mappings match non-empty current source; inspect exemptions, generated code, renamed modules, baseline changes, and rules disabled or weakened by the change. **Reference:** [Build, Static, and Structural Harnesses](BUILD-STATIC-STRUCTURE.md#architecture-fitness-rules).

## Contracts and compatibility

**Trigger:** Changed or relied-upon APIs, events, schemas, serialization, storage formats, runtimes, browsers, databases, protocols, generated clients, or supported versions. **Narrow claim:** Named producers, consumers, examples, or matrix cells conform to the exercised contract. **Limitations:** Finite examples and environments cannot establish every consumer interpretation, historical payload, or supported combination. **Anti-gaming checks:** Confirm consumer and version inventory, matrix cells, backward/forward direction, optional and unknown fields, real serialization, stale examples, normalisation, and provider/consumer independence. **Reference:** [Contracts and Data](CONTRACTS-DATA.md#contracts-and-compatibility).

## Fuzzing and adversarial input

**Trigger:** Parsers, protocols, decoders, validators, or hostile/high-volume inputs changed, and an existing harness has meaningful crash, sanitizer, assertion, or invariant oracles. **Narrow claim:** No selected oracle failed for the exercised corpus and generated inputs, or a preserved counterexample exposed a defect. **Limitations:** Execution alone rarely establishes semantic correctness; generators and corpora sample only part of the space. **Anti-gaming checks:** Preserve corpus, seed, duration, minimized failures, oracle and sanitizer configuration; confirm non-empty input selection and inspect timeouts, rejected-input bias, coverage plateaus, and swallowed failures. **Reference:** [Security and Adversarial Harnesses](SECURITY-ADVERSARIAL.md#fuzzing-and-adversarial-input).

## Accessibility

**Trigger:** Changed visible interface, semantics, focus, input, navigation, content, contrast, zoom, motion, or assistive-technology behaviour, or repository authority requires it. **Narrow claim:** The exercised automated rules and recorded manual interactions satisfy their named criteria in the tested environment. **Limitations:** Automation alone cannot establish conformance, usability, or behaviour across assistive technologies and user contexts. **Anti-gaming checks:** Inspect tested route and state selection, hidden or disabled elements, rule suppressions, keyboard path completeness, focus order, zoom/contrast conditions, and actual assistive-technology coverage. **Reference:** [Human and Specialist Evidence](HUMAN-SPECIALIST.md#accessibility).

## Performance and load

**Trigger:** Changed hot paths, algorithms, queries, I/O, payloads, caching, memory, concurrency, capacity assumptions, or an explicit latency, throughput, or resource budget. **Narrow claim:** The representative workload met or differed from the pinned budget or baseline by the reported distribution in the recorded environment. **Limitations:** Synthetic or local results may not predict production workload, tail latency, contention, cost, or capacity. **Anti-gaming checks:** Preserve workload, data scale, warm-up, repetitions, variance, environment, correctness assertions, baseline revision, outlier policy, and measurement overhead. **Reference:** [Runtime Qualities](RUNTIME-QUALITIES.md#performance-and-load).

## Concurrency and ordering

**Trigger:** Changed shared state, locks, transactions, parallelism, asynchronous cancellation, retries, queues, ordering, or idempotency. **Narrow claim:** The exercised schedules or stresses preserved the named invariants and outcomes. **Limitations:** Bounded schedules and successful stress runs cannot prove freedom from races, deadlocks, starvation, or production-specific timing defects. **Anti-gaming checks:** Confirm the intended scenario and a relevant execution count are non-empty; preserve a schedule or seed when used; assert outcomes as well as absence of crashes; inspect hidden serialization, disabled race detection, retries, timeouts, and environment fidelity. **Reference:** [Runtime Qualities](RUNTIME-QUALITIES.md#concurrency-and-ordering).

## Resilience and fault injection

**Trigger:** Changed timeouts, retries as recovery policy, failover, partial dependency failure, recovery, rollout, or operational degradation. **Narrow claim:** The injected fault occurred and the observed system met the explicit recovery or degradation hypothesis within the exercised boundary. **Limitations:** Injected scenarios cannot enumerate production combinations or establish operational readiness outside the observed environment. **Anti-gaming checks:** Verify fault delivery, safe isolation, observability, recovery oracle, cleanup, steady state before and after, blast-radius controls, and that retries do not hide failure. **Reference:** [Runtime Qualities](RUNTIME-QUALITIES.md#resilience-and-fault-injection).

## Migration and data integrity

**Trigger:** Changed schemas, transformations, backfills, imports, storage semantics, retention, mixed-version operation, rollback, or recovery promises. **Narrow claim:** Representative source states transformed or recovered while preserving the asserted invariants. **Limitations:** Fixtures cannot represent every production distribution, invalid state, scale, lock interaction, or irreversible operational consequence. **Anti-gaming checks:** Inspect fixture provenance and diversity, row and aggregate invariants, idempotence/resume, mixed versions, failure interruption, rollback or forward recovery, constraint timing, and excluded legacy states. **Reference:** [Contracts and Data](CONTRACTS-DATA.md#migration-and-data-integrity).

## Reproducibility and provenance

**Trigger:** Changed toolchains, dependency resolution, generated artefacts, signed output, provenance metadata, or environment-sensitive builds, or an explicit reproducibility promise. **Narrow claim:** Recorded material inputs produced equivalent artefacts under the exercised comparison and variance. **Limitations:** Same-machine repetition is not cross-environment reproducibility; equivalent bytes do not establish behaviour or supply-chain trust. **Anti-gaming checks:** Record toolchain, dependencies, source revision, environment, timestamps and comparison method; vary relevant inputs; inspect caches, undeclared network/state, embedded paths, signatures, and ignored differences. **Reference:** [Build, Static, and Structural Harnesses](BUILD-STATIC-STRUCTURE.md#reproducibility-and-provenance).

## Manual and specialist QA

**Trigger:** Automation cannot faithfully assess a material visual, physical, usability, domain, operational, data, compliance, or contextual outcome. **Narrow claim:** The named procedure produced the recorded observation under its inputs and evaluator capability. **Limitations:** Results are bounded by procedure, environment, evaluator expertise and subjectivity, and do not generalise automatically. **Anti-gaming checks:** Preserve steps, inputs, versions, expected and actual results, captures, evaluator limitation, repetitions where needed, and deviations from the procedure. **Reference:** [Human and Specialist Evidence](HUMAN-SPECIALIST.md#manual-and-specialist-qa).

## Diagnostic metrics

Complexity, cognitive complexity, size, churn, coupling, and smell counts apply only when repository authority requires them or a changed hotspot needs investigation. Preserve repository thresholds. Trace the concrete control flow, ownership, dependency, or change-propagation consequence before treating a signal as actionable; a metric alone is neither a defect nor evidence that a refactor improves the change.
