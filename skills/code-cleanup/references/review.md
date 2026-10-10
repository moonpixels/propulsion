# Independent cleanup review

Find ambitious, concrete simplifications in the supplied candidate. Review read-only, without further delegation. Write only your temporary report and disposable probe artefacts. Preserve source, tests, snapshots, dependencies, Git state and durable data. Run a safe focused probe only to settle a concrete uncertainty. Leave repairs and the full check suite to the caller.

## Inspect and challenge

1. Read the packet, repository instructions and behavioural authorities. Confirm the candidate and scope. Requirements and documented contracts govern supported behaviour. Existing structure and comments are claims to examine.
2. Inventory all in-scope source and associated tests and configuration. For a diff, inspect complete affected files and trace the whole capability through entry points, owned rules, effects and consumers. Unchanged files can contain the best simplification. For a whole-codebase request, cover every owned capability. Inspect generated or third-party code through its source or contract, rather than proposing hand edits to generated output.
3. Read [the technique index](refactorings.md). Consider every relevant family, loading its reference when the observed code shape matches. Account for every file, class, helper, option, branch and test. Ask what supported use or hidden knowledge earns its existence. Seek transformations that delete whole paths, repeated decisions, layers or synchronisation work. A local rename pass is insufficient while structural opportunities remain.
4. Trace ordinary and implicit uses before proposing deletion. Check exports, framework discovery, reflection, manifests, configuration and import-time effects. A search with no matches is a lead, not proof of disuse. Follow proposed caller migrations through orphaned files, exports, registrations, tests and dependencies.
5. Falsify each candidate. Look for useful policy, genuine variation, external compatibility, ordering or lifecycle guarantees that justify the structure. Preserve results, errors, effects, state, ordering and required performance. Explain how existing checks observe that contract. Distinguish source reasoning, supplied check evidence and probes actually run. Compilation alone does not demonstrate equivalence.

Apply **YAGNI** to speculative machinery and **DRY** to repeated knowledge. Prefer deletion, consolidation and direct code before extraction. Keep a new boundary only when it removes more reader burden than it adds. Count layers to trace and mutable state to hold. A lower line count or metric cannot justify dense code or displaced complexity.

Flag common, reusable machinery that could be replaced by an established package when the code demonstrates a concrete maintenance burden. Identify the supported behaviour and preservation gaps, then refer candidate selection to the caller through [$select-packages](../../select-packages/SKILL.md). Leave package discovery and installation outside this review.

## Build the report

Use [the report template](../assets/cleanup-report.md). Create a unique file such as `code-cleanup-<unique-id>.md` in the OS temporary directory. Record a compact candidate identity rather than a table of file hashes. Put a file path and verified line or symbol in every candidate index row. Use repository-relative paths in the index and absolute paths in the details. Keep one candidate per coherent transformation, including all related-file changes. Merge overlapping observations. Order by maintenance benefit, then strength of preservation evidence. Include every justified candidate without a quota.

Use these cleanup priorities, independent of defect severity or authorisation:

| Priority | Concrete benefit                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------- |
| High     | Removes substantial machinery, a parallel implementation or a rule scattered across a capability. |
| Medium   | Removes meaningful local duplication, indirection, branching or state management.                 |
| Low      | Removes a small evidenced burden through a narrow change.                                         |

State confidence through the preservation evidence, without numerical scores. Include a concrete promising candidate whose preservation is uncertain, with the exact gap and resolving check or decision beside it. Mark it `Needs evidence`. Reserve `Supported` for transformations whose preservation is backed by traced contracts and consumers. Both still need caller verification after implementation. Omit speculation without demonstrated simplification benefit.

If a candidate changes supported behaviour, identify the separate decision rather than prescribing it as cleanup. Record a discovered defect only as a concrete out-of-scope limitation. Keep this a cleanup review.

## Complete the review

Make a final pass over the scope inventory and technique families. Follow every proposed removal to its newly orphaned artefacts. Continue until that pass reveals no missed supported or concrete uncertain candidate. List inspected scope, family coverage, probes and material limitations compactly. Avoid repeating each symbol solely to prove coverage.

Use `No findings.` only when a completed review has no justified candidates. Omit candidate details for that result and keep the coverage proportionate to scope. Missing authority, unavailable source or uninspected scope must remain explicit. Save the report, read it back and verify its candidate identity, candidate index, details and coverage agree. Confirm the reviewed source has not changed during the review. If it has, refresh the affected inspection or mark the report incomplete.

Return only the report's absolute path. If saving fails, return the exact blocker. Stop without editing or adjudicating the code.
