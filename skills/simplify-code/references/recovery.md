# Recovery and evidence

Keep `progress.md` compact enough to read before resuming work. Refresh current state and applicable verification in place, and label older evidence as historical. Use [the template](../assets/progress.md) for current state and durable decisions. Link larger inventories and evidence rather than copying their contents. Add companion files only when they keep the main record useful. The Git diff owns line-level change detail.

## Fix the candidate

Keep a path and content-fingerprint inventory for the complete reviewed scope and inspected implementation dependencies, including production, tests, configuration and eligible untracked files. Record deletions, file modes and relevant external source identities where applicable. Record the baseline revision and staged, unstaged and untracked starting work separately. `HEAD` alone cannot identify a dirty candidate. The measurement tool's production-only content ID cannot identify the reviewed tests or supporting implementation.

Give the inventory a compact candidate ID and retain older inventories. Record the scope and preservation baseline alongside it. Exclude the run's own logs and evidence. Recheck identity before and after reviews and checks, and after tools that can edit files. Detect newly introduced paths as well as changes to existing paths. Candidate drift invalidates affected evidence and the clean-review sequence under the root skill's counter rules.

For example, two clean reviews followed by a test deletion require three new qualifying reviews. Changing only a report's finding disposition does not alter the candidate, but an unresolved preservation gap still prevents that review from qualifying.

## Preserve usable evidence

Archive measurement, cleanup and code-review reports into the run directory as they arrive, including reports produced inside `$implement`. Preserve original findings, provenance and candidate identity. Keep caller dispositions separately in the running report. Copy linked evidence needed to understand an archived report, and verify that its references remain usable. Temporary paths alone are insufficient recovery storage.

Index checks by candidate, command, actual result and material environment limitations. Preserve earlier results as historical evidence and identify which results remain current. Record pre-existing failures separately. A matching source identity does not establish live integration compatibility or make an old external observation current.

## Checkpoint and resume

Update the record after meaningful changes, adjudications, verification, user questions and answers, blockers and counter transitions, and before ending a turn. Keep significant decisions, rejected findings and their reasons, unresolved work and the next useful action. Retain enough history to explain the final outcome without a command transcript.

After compaction or resumption, read the running report and relevant linked evidence before continuing. Reconcile the inventory, candidate, scope and preservation baseline with the actual working tree. Trust the counter only when its qualifying evidence remains current. Reconstruct missing state from available evidence, making gaps explicit. Never infer an undocumented clean sequence.
