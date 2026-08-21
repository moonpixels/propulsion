# Implementation skills plan

## Status and authority

This is the authoritative authoring brief for Propulsion's implementation skill set. [`SKILLS_PLAN.md`](SKILLS_PLAN.md) owns the wider lifecycle catalogue and each skill's public outcome. This document owns the detailed contract, composition, teaching coverage, resource expectations and acceptance evidence for:

- `implement`
- `tdd`
- `modular-design`
- `quality-harnesses`
- `code-review`

The existing skill bundles are baseline evidence only. They may be rewritten and their resources replaced, split, combined or removed during their individual `$write-skill` sessions. Each authoring session must still establish matched baselines and prove that its final bundle is the smallest version that produces the behaviour fixed here.

The evidence basis is [`docs/research/agentic-coding-quality-guardrails-2026-08-20.md`](docs/research/agentic-coding-quality-guardrails-2026-08-20.md). That report supports a relevant portfolio of independent evidence routes rather than a universal gauntlet, score or claim that passing tools proves correctness.

## Intended outcome

Together these skills let an agent implement agreed software with enough structural guidance, test discipline, quality evidence and independent challenge that a human can manage the work from its requirements and evidence rather than line-by-line code inspection.

The system optimises for the **smallest coherent change**: the least production code, test code and supporting machinery that completely satisfies the agreed behaviour while remaining understandable and economical to change. Fewest lines or files is not the target. A small extraction may be necessary to localise knowledge; speculative abstractions, extension points, duplicate paths and unrelated cleanup are not.

## Composition model

`implement` owns the implementation session. `tdd`, `modular-design` and `quality-harnesses` are **teaching skills**: they add applicable knowledge to their caller without becoming delegated workers or owning separate workflows. `code-review` is different because context isolation is part of its outcome; it coordinates independent fresh-agent review and returns suggestions without changing the candidate.

```text
implement
    applies modular-design throughout
    applies tdd when behaviour changes and a usable suite exists
    applies relevant quality-harnesses guidance
    builds and locally checks one complete candidate
    invokes code-review
        Spec fresh agent when behavioural authority is available
        Standards fresh agent with the teaching skills
    validates and adjudicates both sets of suggestions
    applies supported changes and repeats from the affected step
```

Teaching skills state what their caller must understand and apply. They do not claim separate mutation authority, hand back a workflow verdict or require the caller to restate their internal instructions. Their direct composition must preserve:

- the caller's fixed outcome and authority;
- the teaching skill's applicable trigger and knowledge;
- the caller's ownership of edits, commands, evidence and stopping;
- no duplicated internal procedure in the caller; and
- no hidden advancement into commit, publication, release or deployment.

## Shared quality rules

All five skill contracts preserve these rules:

1. **Independent oracle before confidence.** A requirement, accepted example, protocol, invariant, trusted reference, prior accepted behaviour or explicit decision must be capable of disagreeing with the implementation. Implementation-derived expectations and regenerated outputs are not independent evidence.
2. **Behaviour before representation.** Tests and Spec review observe supported outcomes, contracts, state transitions and effects rather than private methods, internal call graphs, incidental DOM structure or storage layout unless that representation is itself promised.
3. **Relevant evidence rather than control count.** Apply each repository requirement and each catalogue harness whose trigger matches the changed risk. Do not run irrelevant tools to create confidence theatre.
4. **Metrics prompt investigation.** Coverage, mutation, complexity, size, churn, coupling and smell counts inform named questions. They are not universal thresholds, composite scores or substitutes for judgement.
5. **Measurement paths are part of the change.** Tests, fixtures, snapshots, baselines, suppressions, exclusions, quality configuration, generators, scripts and thresholds require the same scrutiny as production code.
6. **Unavailable evidence stays visible.** Missing tools, credentials, services, platforms, representative data or specialist judgement are limitations, neither passes nor evidence against the implementation.
7. **Project authority wins.** Repository instructions, accepted specifications, architecture decisions, framework conventions and configured checks override generic guidance where they conflict.
8. **No implicit infrastructure programme.** A caller may improve evidence through existing infrastructure. It does not add a project-wide framework or quality tool unless establishing that capability is explicitly part of the agreed work.

## `implement`

### Recurring job

Turn one implementation-ready ticket or small confirmed body of work into a minimal local change whose applicable tests and quality checks pass and whose current candidate has completed independent Spec and Standards review.

### Triggers and non-triggers

Use for a ticket, bug repair handed off from diagnosis, or small agreed software change that is sufficiently defined to build. A ticket or feature document is not mandatory when the request itself is clear.

Do not use it to discover product direction, conduct exploratory research, create specifications or tickets, commit, publish, release or deploy. It does not invoke `research`; implementation should already have its material external knowledge. If implementation exposes a missing behavioural, contract, architecture, scope or acceptance decision, invoke `elicit-with-context`. That skill owns any resulting ubiquitous-language or decision-record maintenance.

### Required sequence

1. **Fix the implementation basis.** Inspect the work authority, repository instructions, current code, tests, relevant contracts and complete repository state. State the observable outcome, exclusions, material risks and completion evidence. Resolve discoverable facts directly; use `elicit-with-context` only for a material user-held gap.
2. **Load the teaching knowledge.** Apply `modular-design` and `quality-harnesses`. Apply `tdd` when the work changes observable behaviour and a usable test suite exists. Keep the knowledge active throughout implementation rather than treating it as a final checklist.
3. **Select the smallest coherent slice.** Trace the next production addition to one current requirement, caller or necessary support responsibility. Use a tracer bullet for the smallest end-to-end observable result. Avoid speculative flexibility, unrelated cleanup and broad refactoring.
4. **Implement test-first when applicable.** Let the caller perform the Red–Green–Refactor cycle taught by `tdd`, carrying the modular constraints and relevant quality risks into test and production design. For work outside TDD's trigger, use the smallest project-native feedback path without claiming TDD.
5. **Maintain structural locality.** Keep each rule with its coherent owner, retain or establish the smallest justified interface, and perform conditional Design It Twice before a material new or changed boundary is fixed.
6. **Apply relevant harnesses.** Review the quality catalogue, load the detailed references for every matching entry, run or perform the applicable repository-native harnesses, and preserve their exact evidence and limitations. Do not silently replace an unavailable harness with a weaker check.
7. **Inspect the complete candidate.** Read the entire diff and every in-scope untracked file. Account for each production and test addition, dependency, generated artefact and measurement-path change. Remove superseded paths, dead helpers, duplication and speculative code made unnecessary by the final design.
8. **Rationalise retained tests.** After production refactoring has stayed green with unchanged tests, review the suite for obsolete, duplicative, brittle or implementation-coupled cases. Merge, rewrite or delete a test only when every unique promised behaviour and oracle remains protected and the revised suite still detects the realistic defects it is meant to catch.
9. **Freeze and review.** Freeze one exact, complete, locally checked candidate and invoke `code-review`. Do not send an incomplete slice or changing target.
10. **Adjudicate objectively.** Validate each suggestion against its authority, the code and the strongest benign interpretation. Classify it as a required correction, proportionate improvement, rejected finding or user decision. Consequence rank orders attention but never decides the classification.
11. **Correct and repeat.** Apply required corrections and worthwhile in-scope improvements using the teaching skills. Ask the user only when resolution changes agreed behaviour, architecture or scope. Rerun every affected test and harness. Material candidate changes require a new frozen review; continue until no applicable change remains.
12. **Hand off locally.** Report delivered behaviour, changed artefacts, applicable TDD and modular-design decisions, checks and results, unavailable evidence, residual risks, both review results and every disposition. Stop without committing or publishing.

### Completion boundary

Successful completion requires:

- the agreed behaviour exists locally;
- every production addition has a current purpose;
- TDD was applied wherever its trigger held;
- relevant project and catalogue harnesses passed or their unavailable evidence is explicit;
- the current candidate, not an earlier revision, received applicable Spec and Standards review;
- every suggestion was validated and no applicable correction or accepted improvement remains; and
- no in-scope failure is hidden by a weakened test, threshold, baseline, exclusion or suppression.

### Authoring and evaluation evidence

The future `$write-skill` session must test at least:

- a clear ticket needing no elicitation or research;
- a material specification gap discovered during implementation;
- a behaviour change with a usable suite;
- a non-behavioural change for which TDD must not be manufactured;
- a repository missing a relevant harness;
- a review containing a high-ranked false positive and a lower-ranked required correction;
- a material correction that invalidates the previous review; and
- unrelated dirty work that must remain untouched.

## `tdd`

### Recurring job

Teach a caller to implement observable behaviour through disciplined Red–Green–Refactor and leave a small, durable suite whose oracles can detect realistic defects while surviving behaviour-preserving structural change.

### Applicability

Apply when both conditions hold:

1. the work adds, changes or repairs observable behaviour; and
2. an existing usable test suite can exercise that behaviour through a credible seam.

Do not apply to documentation, human prose, dependency-only updates, configuration-only maintenance without an exercisable effect, generated artefacts or other non-behavioural changes. When behaviour changes but no usable suite exists, the caller proceeds without claiming TDD, uses the strongest available project-native feedback and reports the evidence limitation. Creating a suite or framework is permitted only when it is explicitly part of the agreed work.

### Required teaching

#### Establish the slice, seam and oracle

- Start from one observable outcome and use a **tracer bullet** to select the smallest complete vertical slice.
- Choose the narrowest seam that exposes the promised result, hides structure allowed to change and retains the production risk that matters.
- Derive expected results independently before Green. Prefer requirements, accepted worked examples, contracts, invariants, trusted references, separate models or accepted prior behaviour.
- Treat current output capture as characterization, not proof of correctness.
- Name the realistic production break each retained test must catch and the hidden structural changes it must survive.

#### Red

- Write one focused behavioural test before the corresponding production change.
- Arrange only necessary state, act through the supported seam, assert the complete promised outcome and material unchanged state, then clean up acquired resources.
- Run the focused test and require the intended behavioural failure. A pass, syntax error, fixture failure or environment error is not Red.
- For bugs, reproduce the incorrect result and assert the desired one; a crash or implementation-derived expectation is not automatically a valid regression oracle.

#### Green

- Add only enough production code to satisfy the current behaviour.
- Do not anticipate later cases, introduce hypothetical options or refactor unrelated code.
- Run the focused test and relevant nearby tests. Fix production code rather than weakening the test when its independent oracle remains valid.

#### Refactor

- Refactor production design only while the behaviour is green.
- Keep tests unchanged during behaviour-preserving production refactoring. If hidden structural movement breaks a test, move its observation back to the promised outcome.
- Improve naming, cohesion, duplication and ownership without adding behaviour.
- Rerun the focused tests after each material step.

#### Rationalise the suite

- After production refactoring, reassess whether every retained test still protects a unique behaviour, boundary, invariant or risk.
- Remove duplicate examples that add no distinct failure detection; combine related cases with table-driven or property forms when that makes the oracle clearer.
- Remove obsolete implementation-detail assertions and broad snapshots whose only value is change detection.
- Preserve readable specification value and failure diagnosis; fewer tests are better only when no unique protection is lost.
- Apply a mental mutation check to wrong constants, wrong branches, missing effects, empty/default results and missing validation. Use actual mutation or coverage tooling only through applicable `quality-harnesses` guidance.

### Required example coverage

The final bundle must use concrete good/bad pairs to teach:

- an independent literal or invariant versus a tautological expected value;
- a public result versus a private method or internal call graph;
- user-visible UI semantics versus CSS classes, wrapper elements or child indexes;
- persistence through supported write/read behaviour versus private schema inspection;
- a real internal collaborator versus unnecessary mocking;
- a focused fake, stub or mock at an uncontrollable external boundary;
- legitimate protocol interaction assertions versus incidental call choreography;
- a failing bug regression before its repair;
- deterministic time, randomness and cleanup;
- property, model-based, metamorphic and differential tests with their triggers and oracle limitations; and
- consolidation of several brittle examples into a smaller behaviourally equivalent test form.

Examples should be small and concrete enough for an agent to imitate while explaining the decision independently of one language or framework. Core every-run examples belong on the loaded path; conditional techniques may use direct references.

### Ownership-aware test-first rule

When the current agent writes production behaviour before demonstrating Red, discard only that agent-owned implementation and restart test-first. Never delete or overwrite pre-existing or user-owned work. For an existing partial implementation, demonstrate sensitivity against the pre-change revision, a safely disabled behaviour or a controlled known-bad variant. When that cannot be done, label the retained test accurately as characterization or regression evidence rather than claiming TDD.

### Expected resources

The authoring session should evaluate a concise every-run `SKILL.md` plus directly linked references covering test design and oracles, doubles and boundaries, conditional generative techniques, and suite rationalisation. Existing reference names are not constraints; merge or split them only when their loading triggers differ materially.

### Authoring and evaluation evidence

Forward tests must distinguish this skill from generic “write a failing test first” behaviour. Cases must expose tautological tests, internal mocks, CSS/DOM coupling, invalid Red signals, overbuilt Green code, tests changed during refactoring, duplicated post-refactor tests, absence of a usable suite and pre-existing user code that must not be deleted.

## `modular-design`

### Recurring job

Teach a caller to place behaviour and knowledge in deep, cohesive modules with small stable interfaces so current and plausible evidenced changes remain local.

### Governing doctrine

Use **information hiding** and **deep modules** as the backbone:

- A module is any cohesive capability with an interface and implementation, regardless of whether code expresses it as a function, class, package, process or tier-spanning slice.
- Its interface includes everything callers must know: operations, data, invariants, ordering, errors, configuration, effects and material performance characteristics.
- A deep module gives callers substantial capability through a comparatively simple interface.
- Hide volatile design decisions and keep each material rule, invariant, protocol or representation with one coherent owner.
- Code that changes for the same evidenced reason should live together; one conceptual change should not require scattered knowledge across callers.
- Prefer established language, framework and repository idioms. An interface in the design sense does not require a language `interface`, class hierarchy or wrapper.

### Required teaching

#### Assign ownership

Identify the behaviour, rule, invariant, protocol, representation, sequencing or side effect being introduced or changed. Keep it with its existing natural owner when that owner remains coherent; otherwise establish the smallest justified boundary around the complete concern. Represent each decision once.

#### Design the interface

Minimise caller knowledge rather than raw method count. Hide decisions the caller does not need, choose domain-meaningful inputs and outcomes, make failure and side effects explicit, and avoid leaking framework or storage mechanics across an established domain or application seam.

Reject shallow forwarding layers that only repeat another contract. Retain adapters or coordinators that own translation, policy, authorisation, compatibility, observation or another evidenced responsibility.

#### Control coupling and change propagation

Trace one plausible current-project change through the proposed owner, interface, consumers and tests. Reconsider the design when the same rule remains duplicated, elements that always change together are split, or one change still requires scattered edits. Do not substitute file size, class count or an abstract coupling score for this trace.

#### Keep abstraction earned

Keep stable local concrete dependencies direct. Add a seam, port or inversion only when current evidence requires substitution, isolated observation, multiple implementations, staged migration, a volatile external mechanism or separation of stable policy from mechanism. Avoid interface-per-class, universal repositories, generic service layers and hypothetical extension hooks.

#### Design It Twice

For a material new or substantially changed public interface, module boundary, seam or dependency direction, produce at least two genuinely different designs before selecting one. Compare them on interface depth, caller burden, cohesion, locality, dependency direction, testability and likely change propagation. Routine changes that fit an established coherent boundary proceed directly.

The teaching skill supplies the comparison method; the calling agent owns producing and selecting the alternatives. It does not dispatch its own design workflow or require parallel agents.

#### Apply conditional techniques

Teach explicit triggers, trade-offs and good/bad examples for:

- dependency inversion toward stable policy;
- ports and adapters at material technology or ownership boundaries;
- bounded contexts where one term has competing domain meanings;
- conceptual contours where domain language and change patterns reveal the natural capability grain;
- functional core/imperative shell where deterministic decisions are entangled with effects;
- seams for controlled substitution, observation or migration;
- composition and delegation;
- genuine substitutability when inheritance or polymorphism is considered; and
- co-location or extraction when it improves evidenced cohesion and locality.

SOLID and design patterns are diagnostic tools, not mandatory architecture. Fowler smells belong to `code-review` as prompts for investigation, while this skill supplies the structural mechanisms needed to understand and correct a concrete concern.

### Required example coverage

Use concrete contrasted examples for deep versus shallow interfaces, information leakage, shotgun change propagation, pass-through layers, earned versus speculative seams, policy depending on mechanism, functional decisions mixed with effects, competing domain meanings and two alternative interface designs. Examples must show consequences for callers and future change rather than relying on labels alone.

### Expected resources

Keep the always-applicable ownership, interface, depth, locality and minimality rules on the loaded path. Link conditional technique detail and Design It Twice at their triggers. The future authoring session may reuse, replace or split the current `TECHNIQUES.md` according to observed loading needs.

### Authoring and evaluation evidence

Cases must test a simple change that needs no new abstraction, a material interface needing Design It Twice, a volatile external mechanism, a shallow forwarding layer, competing domain meanings, a large but cohesive module, a short but damaging coordinator and a request that would tempt speculative generality.

## `quality-harnesses`

### Recurring job

Teach a caller to select, apply and interpret the quality harnesses relevant to a fixed change without confusing execution, metrics or control count with proof of correctness.

### Loading path

The final `SKILL.md` instructs the caller to:

1. inspect the changed behaviour, implementation, repository requirements, measurement-path changes and material risks;
2. load and review the complete compact harness catalogue;
3. identify every catalogue entry whose trigger applies;
4. load the detailed reference for each applicable entry;
5. apply that knowledge within the caller's own workflow; and
6. preserve exact results, limitations, unavailable evidence and residual risk.

The skill does not split entries into baseline and optional sections. A repository-required check is applicable because the repository requires it; another harness is applicable because the change exposes its named risk. Irrelevant entries are not loaded or run.

### Catalogue contract

Each catalogue entry contains one short paragraph with:

- **Trigger:** the concrete repository requirement, change shape or risk cue that makes the harness relevant.
- **Narrow claim:** what an honestly clean result can support.
- **Limitations:** the important properties, environments or failure classes it cannot establish.
- **Anti-gaming checks:** how tautological oracles, exclusions, thresholds, suppressions, stale baselines, unrepresentative inputs, flaky retries or empty selectors could make the result misleading.
- **Reference:** the detailed instructions and examples to load only when the entry applies.

The catalogue covers at least:

| Harness family | Applicability and intended teaching |
| --- | --- |
| Build, compilation and packaging | Apply when repository-required or when build inputs, generated output, dependencies, packaging or runtime compilation change. Record the exact environment and artefact; one build does not establish portability or behavioural correctness. |
| Types, linting, formatting and framework diagnostics | Apply configured checks to their actual scope. Inspect baselines, exclusions and changed configuration; a clean result proves only encoded enabled rules. |
| Behavioural and regression suites | Apply focused evidence for changed behaviour and the repository-required broader suite. Distinguish new-behaviour evidence from pass-to-pass regression evidence and appraise the oracle through `tdd`. |
| Coverage | Use to locate changed or risk-relevant paths that no test executes. Never treat execution percentage as correctness, effectiveness or a target without repository authority. |
| Mutation | Use when test sensitivity is materially uncertain and existing tooling can assess a bounded change economically. Appraise surviving mutants and equivalent or irrelevant cases; never treat the score as correctness. |
| Static and security analysis | Apply configured analysis when changed code reaches its rules, and security-focused controls for trust boundaries, permissions, sensitive data, untrusted input, cryptography or dependency risk. Record rules, versions, suppressions and blind spots. |
| Architecture fitness rules | Apply when an authoritative dependency, layer, cycle, import or public-surface constraint is encoded. Check selectors and mappings are non-empty and current; passing rules cannot establish that the architecture decision itself is good. |
| Contracts and compatibility | Apply when APIs, events, schemas, serialization, storage formats, runtimes, browsers, databases or supported versions change. Record consumers and matrix coverage; finite examples cannot establish all consumer semantics. |
| Fuzzing and adversarial input | Apply to parsers, protocols and hostile or high-volume input when existing harnesses have meaningful crash, sanitizer, assertion or invariant oracles. Preserve corpora, seeds and minimized failures; execution alone rarely proves semantic correctness. |
| Accessibility | Apply when visible UI, semantics, focus, input, navigation, contrast or assistive-technology behaviour changes. Combine configured automation with required manual or specialist evidence; automation alone does not establish conformance. |
| Performance and load | Apply to hot paths, queries, I/O, algorithms, memory, caching or explicit budgets. Use representative workloads, pinned baselines, repeated measurements and correctness assertions; record variance and environment. |
| Concurrency and ordering | Apply to shared state, locks, transactions, asynchronous cancellation, retries, queues or idempotency. Use supported race detection, deterministic schedules, models or seeded stress; bounded success does not prove freedom from races. |
| Resilience and fault injection | Apply to timeouts, failover, partial dependency failure, recovery, rollout or operational degradation. Require an explicit hypothesis, safe boundary, recovery oracle and observability; injected faults cannot enumerate production combinations. |
| Migration and data integrity | Apply transformations to representative legacy states and verify invariants, mixed-version compatibility and rollback or forward recovery where promised. Fixtures cannot represent every production distribution or invalid state. |
| Reproducibility and provenance | Apply when toolchains, generated artefacts, signed output or environment-sensitive builds change. Record material inputs and comparison method; same-machine repetition is not cross-environment reproducibility. |
| Manual and specialist QA | Apply when automation cannot faithfully assess visual, physical, usability, domain or contextual outcomes. Preserve steps, inputs, versions, expected and actual results and evaluator limitations. |

Complexity, cognitive complexity, size, churn, coupling and Fowler smell counts may identify a hotspot for investigation. Preserve repository-owned thresholds, but do not introduce universal thresholds or treat a metric as a finding without a concrete mechanism and consequence.

### Infrastructure and authority boundary

The calling workflow owns commands, mutations and remediation. This teaching skill does not run a verifier, return a pass/fail verdict or install tooling. A caller may add better behavioural tests through the existing suite when the implementation requires them. It must not introduce project-wide harness infrastructure unless that work is explicitly authorised. Missing relevant infrastructure is reported with the claim and risk left unassessed.

### Expected resources

Create a compact catalogue that is always reviewed when this skill applies. Link each entry to detailed reference material with selection guidance, execution boundaries, honest interpretation, anti-gaming examples and representative commands or procedures. References may group closely coupled harnesses when their triggers and evidence boundaries align; they must remain directly reachable from each catalogue entry.

### Authoring and evaluation evidence

Cases must include a small change with only repository-required checks, a security-sensitive change, changed tests that inflate coverage without an oracle, mutation survivors of mixed relevance, an empty architecture selector, a flaky check, unavailable specialist infrastructure and an irrelevant expensive harness that must not be selected.

## `code-review`

### Recurring job

Independently review one fixed code change through isolated Spec and Standards agents and return consequence-ranked, falsifiable suggestions for a caller to validate and adjudicate.

### Fixed candidate

Resolve one explicit non-empty diff, revision range, branch comparison, pull-request revision, repair or local candidate. Capture its changed and in-scope untracked files, complete relevant source and tests, repository state and exact revision identifiers where available. If the target changes during review, mark affected results stale rather than silently retargeting them.

### Review axes

#### Spec

Run this axis only when a behavioural authority is reasonably available: a feature specification, ticket, acceptance criteria, confirmed request, contract or another project source that states intended behaviour independently of the implementation.

Give the fresh Spec agent:

- the fixed candidate and complete changed files;
- the behavioural authority and relevant affected contracts or consumers;
- the consequence ranking and finding format; and
- a read-only boundary.

Direct it to account for every applicable requirement in code and retained tests, account for introduced behaviour against authority, and follow states, contracts, data shapes, errors, effects and consumers far enough to find missing, partial, conflicting, excessive or regressed behaviour.

Do not give it Standards findings, implementation-thread rationale, conversation history or the Standards packet. When no authority is reasonably available, do not infer intent from code or commits and do not stop Standards; report `Spec not performed: no behavioural authority reasonably available.`

#### Standards

Give a separate fresh Standards agent:

- the same fixed candidate and complete changed files;
- repository instructions, conventions, architecture decisions and configured checks;
- relevant surrounding implementation, tests and supplied quality evidence;
- the full Fowler second-edition smell catalogue as diagnostic vocabulary;
- the applicable `modular-design`, `tdd` and `quality-harnesses` teaching paths;
- the consequence ranking and finding format; and
- a read-only boundary.

Direct it to understand every changed line in its necessary context and assess correctness and regression risks, minimality, project and framework conventions, changed-test validity, modular ownership and interfaces, quality-harness selection and evidence integrity, recognised smells, and specialist risks exposed by the change.

Do not give it Spec findings, implementation-thread rationale, conversation history or the Spec packet. The teaching skills inform its judgement without becoming nested delegated workflows.

### Independent execution

Run the applicable fresh agents in parallel. Their isolation prevents one review axis from anchoring or suppressing the other; a fresh context alone is not treated as proof of statistical independence.

Each reviewer may run a safe, focused, non-mutating command only when it can confirm or falsify a concrete concern. It does not repeat the implementation's whole quality portfolio, edit code or tests, update snapshots or baselines, install dependencies, modify durable data or repair a finding.

Before retaining a suggestion, the reviewer must try to disprove it using contradicting authority, existing handling, repository-sanctioned exceptions, surrounding code, a focused counterexample and the strongest benign interpretation. Unsupported generic advice, tooling-enforced nits and speculative best practices are omitted.

### Consequence ranking

- **High:** a credible path to materially wrong required behaviour, security or privacy compromise, data loss or corruption, major production or reliability failure, or a structural, test or evidence defect that makes the change untrustworthy.
- **Medium:** a concrete defect, regression risk or significant maintainability, modularity, test-quality or harness-integrity weakness with a bounded material consequence.
- **Low:** a local but evidenced issue whose correction has a concrete benefit. Personal taste, hypothetical flexibility and inconsequential style are not findings.

Rank communicates consequence and attention only. It never directs the caller to implement a suggestion automatically; a high finding may be false, and a lower-ranked finding may still be a required repository or behavioural correction.

### Output

Keep `## Standards` and `## Spec` separate. Do not merge, deduplicate, suppress or cross-axis rerank their results before returning them to the caller. For an applicable clean axis, report `No findings.` For an omitted or stale axis, state that status explicitly.

Each suggestion contains:

```markdown
### [high|medium|low] Concise finding

- Evidence: exact code location, applicable authority or criterion, and observed fact
- Consequence: concrete behavioural or code-health impact
- Suggested direction: the narrow outcome that would address the concern without prescribing an unverified patch
```

End with axis-specific counts and review scope. Do not issue an approval, verification or completion verdict. The caller owns validation, deduplication during adjudication, remediation, re-review and any publication decision.

### Authoring and evaluation evidence

Cases must include two axes with conflicting-looking but independently valid results, no Spec authority, a standards concern requiring teaching-skill knowledge, a high-ranked false positive, a low-ranked genuine requirement violation, an unsupported generic suggestion that must be removed, a targeted probe, scope drift and a clean axis.

## Cross-skill acceptance

The implementation group is ready only when matched fresh-agent evaluation demonstrates:

- `implement` behaves as a small process owner and does not duplicate the teaching skills;
- the three teaching skills materially change caller behaviour without taking workflow ownership;
- TDD produces tests that fail for the intended reason, rely on independent oracles, survive structural change and can be rationalised without losing behaviour;
- modular design improves ownership, interface depth and change locality without automatic abstraction or class proliferation;
- quality-harness selection is complete for evidenced risks, excludes irrelevant controls and reports absent infrastructure honestly;
- Spec and Standards reviews are isolated, falsifiable and consequence-ranked;
- implementation rejects false positives rather than blindly obeying review;
- a changed candidate invalidates earlier review and affected quality evidence;
- the group composes for local implementation, debug repair and pull-request review without duplicating another review or verification method; and
- all skills stop before commit or publication unless a later lifecycle skill is explicitly invoked.

## Authoring order

Refine the skills in dependency order so later evaluations consume published contracts rather than provisional internals:

1. `modular-design`
2. `tdd`
3. `quality-harnesses`
4. `code-review`
5. `implement`

For each skill, use `$write-skill` to confirm the closed contract, establish no-skill and current-skill baselines where applicable, draft outside the destination, validate mechanically, compare through isolated fresh agents and publish only the smallest behaviourally justified bundle. Mark its checklist item in [`SKILLS_PLAN.md`](SKILLS_PLAN.md) complete only after that full authoring and evaluation pass.

## Current cutover boundary

This planning session creates this brief, updates the lifecycle plan and removes the obsolete `verify-change` bundle. It does not rewrite the five surviving skills, `debug`, `respond-to-incident`, `review-pull-request` or the README. Those files may temporarily describe the previous composition until their scheduled authoring sessions align them with this authority.
