# Independent review

Review only your assigned axis. Use [the finding format and severity definitions](../assets/review-report.md). Return your axis, candidate identity, authorities, coverage, probes, limitations and all supported findings. Do not spawn another reviewer.

## Inspect and falsify

Read every in-scope source file and enough surrounding code, consumers, tests and configuration to understand the contracts. For a diff, understand every changed line in complete-file context. For a codebase, account for every owned capability. Inspect generated and third-party code through its source or contracts rather than proposing hand edits to generated output.

Trace each concern through a reachable execution path or demonstrate a concrete maintenance burden. Try to disprove it using existing handling, contrary evidence, sanctioned exceptions, a focused counterexample and the strongest benign interpretation. A smell, weak metric or preferred alternative is a lead, not proof. Omit generic advice, speculative improvements and trivia already enforced by tooling.

For a diff, retain pre-existing issues only when the change worsens them or makes them newly consequential. For a file, module or codebase review, include existing in-scope issues. A concern outside the requested scope belongs in limitations, not the findings list.

Run a safe focused probe only to settle a concrete concern. Confine writes to disposable scratch artefacts and reports. Preserve source, tests, snapshots, dependencies, Git state and durable data. Do not repair, install tools or repeat the caller's full check suite. Distinguish source reasoning, supplied evidence and probes actually run.

## Complete coverage

Revisit the inventory and every applicable review lens. Follow unresolved leads until they are supported, disproved or blocked by a named evidence gap. Continue until a final coverage pass exposes no missed in-scope concern. Include every supported finding without a quota.

State uninspected scope and material evidence limits explicitly. Use `No findings.` only for a completed current assessment with no surviving concern. Return missing prerequisites without inventing intent, measurements or a clean verdict.
