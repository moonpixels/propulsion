---
name: implement
description: Implements one ticket or small agreed software change with proportionate quality evidence. Use when the user asks to build confirmed work locally.
metadata:
    invocation: user
disable-model-invocation: true
---

# Implement

A tailored **Software Formal Inspection** lifecycle implements one confirmed body of work, independently reviews a fixed candidate, and verifies that same candidate. TDD supplies the implementation method only when its prerequisites hold.

## Process

### 1. Fix the outcome

Inspect the stated ticket or agreed work, repository instructions, linked product and technical authorities, current code and tests, and the complete repository state. A clear small request is sufficient authority; do not manufacture a ticket, specification, or other ceremony. Invoke `$elicit-with-context` one question at a time only when user-held ambiguity could materially change behaviour, contracts, architecture, scope, or acceptance. State the observable outcome, exclusions, applicable structural constraints, material risks, and evidence expected before editing. The implementation basis is explicit and bounded.

### 2. Build the smallest complete change

Follow established language, framework, and repository conventions and reuse fitting helpers. Add only the production code, tests, documentation, configuration, generated output, or other artefacts required by the outcome. Avoid speculative flexibility, unrelated cleanup, broad refactors, and generated churn. Invoke `$modular-design` when the work presents a material ownership, boundary, contract, dependency, seam, or change-propagation decision, then carry its constraints through the change. Invoke `$research` only for a material external-knowledge subject that needs durable evidence, and treat its cited report as an explicit in-scope artefact. Use `$maintain-ubiquitous-language` when independently confirmed durable terminology arises and `$maintain-decision-records` when a rare qualifying decision needs durable rationale; each utility returns control to this outcome.

Invoke `$tdd` only when an existing runnable test suite can credibly exercise the requested observable behaviour at a stable boundary with an independent oracle. When evidence already shows any prerequisite is absent, keep control here rather than invoking TDD merely to receive that result. Let TDD own the Red-Green-Refactor cycles and returned code and tests when it applies. Otherwise implement through the smallest conventional path and use the strongest available project-native feedback; update existing tests only when they can meaningfully express changed behaviour. Do not install or invent a test or quality framework to satisfy this process. When meaningful infrastructure is absent, preserve the limitation for verification and recommend separately planned work rather than adding unrelated harness infrastructure.

Inspect the resulting diff and every in-scope untracked file. Account for each production addition against the agreed outcome or a necessary supporting change, and identify every change to tests, snapshots, baselines, suppressions, dependencies, quality configuration, scripts, or generated artefacts as part of the measurement path. The candidate is minimal, coherent, and ready for independent inspection.

### 3. Review a fixed candidate

Freeze the complete candidate, including its exact diff or revisions, changed and untracked paths, repository state, intended-behaviour authority, applicable structural constraints, and named risks. Invoke `$code-review` independently on that basis. If the basis drifts or either applicable review axis is stale or unperformed, re-freeze and repeat the review when the scope and ownership remain clear; otherwise stop with the exact blocker. Do not treat implementation self-inspection, tests, or verification as a substitute for the independent review.

Validate every Standards and Spec finding against the confirmed request, its authorities, and current code, then give it one technical disposition:

- A required correction is a verified violation of confirmed behaviour, the specification, a repository rule, or a necessary safety boundary, or another defect that leaves the change untrustworthy.
- A proportional improvement is valid but non-blocking; accept it only when its concrete benefit justifies the added change and complexity.
- A rejected finding is falsified, unsupported, superseded, or outside the confirmed scope.
- A user decision is required when accepting or rejecting the finding would change behaviour, contracts, architecture, or scope, or when its evidence cannot be obtained safely.

For a user-decision finding, invoke `$elicit-with-context` and stop mutation, further adjudication, and verification until its confirmed synthesis returns. Resume from the fixed outcome; when the decision changes the candidate or any review authority, freeze the resulting basis and repeat independent review.

Treat priority as evidence of impact and ordering, not remediation authority. Apply every accepted correction through `$tdd` when its prerequisite applies and otherwise through the conventional path. After any candidate change, freeze the complete new candidate and repeat independent review. Continue until every finding has a supported disposition, no required finding remains unresolved, and the complete current candidate has been independently reviewed. The reviewed candidate is fixed and current.

### 4. Verify the reviewed candidate

Invoke `$verify-change` on the exact reviewed candidate, supplying its authorities, named risks, review dispositions, relevant implementation evidence, and identified measurement-path changes. Let it select and run every applicable repository-required and risk-triggered existing harness and return claim-level evidence, reproducible commands, limitations, residual risks, and one honest verdict. Metrics support only their named claims; they never prove quality alone.

When verification exposes an in-scope failure, repair it through the applicable TDD or conventional path, then repeat independent review and verification on the new fixed candidate. When verification evidence is stale because source or measurement-path state changed, establish ownership and scope, then re-freeze, re-review, and re-verify; do not silently retarget old evidence. Preserve a pre-existing or out-of-scope required-gate failure as a blocker rather than broadening the work. When missing infrastructure leaves the result partially verified or unverified and no in-scope repair can supply faithful evidence, report that limitation and explicit planned work without manufacturing a harness or claiming successful completion.

### 5. Hand off the local result

Report the agreed behaviour delivered, changed artefacts, review scope and every finding disposition, verification scope and verdict, exact commands and material results, limitations, residual risks, and any blocker or planned follow-up. Claim successful completion only when the behaviour exists locally, applicable tests and artefacts are present, the complete current candidate has a current independent review with no unresolved required finding, and verification passed within its stated scope. A partial, unverified, or failed verdict is an explicit incomplete or blocked handoff. Stop without committing, pushing, opening a pull request, releasing, deploying, changing tracker state, or authoring unrelated product, specification, or design documents.
