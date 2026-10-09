# Recovery and evidence

Keep `progress.md` compact enough to read before resuming work. It is the sole durable recovery record. Refresh current state and applicable verification in place, and label older evidence as historical. Use [the template](../assets/progress.md) for current state and durable decisions. Summarise all information needed to resume in the report itself. Link larger inventories and evidence as disposable supporting artefacts in the temporary run directory. The Git diff owns line-level change detail.

## Fix the candidate

Keep a path and content-fingerprint inventory for the complete reviewed scope and inspected implementation dependencies, including production, tests, configuration and eligible untracked files. Record deletions, file modes and relevant external source identities where applicable. Record the baseline revision and staged, unstaged and untracked starting work separately. `HEAD` alone cannot identify a dirty candidate. The measurement tool's production-only content ID cannot identify the reviewed tests or supporting implementation.

Give the inventory a compact candidate ID and retain older inventories. Record the candidate ID, inventory reconstruction basis, scope and preservation baseline in `progress.md`. Exclude the run's own logs and evidence. Recheck identity before and after reviews and checks, and after tools that can edit files. Detect newly introduced paths as well as changes to existing paths. Candidate drift invalidates affected evidence and the clean-review sequence under the root skill's counter rules.

For example, at iteration 9 of 10, a test deletion resets two clean reviews to zero but leaves only one outer iteration available. Finish that iteration and verification, then report the limit rather than commissioning three more reviews. Changing only a report's finding disposition does not alter the candidate, but an unresolved preservation gap still prevents that review from qualifying.

## Preserve usable evidence

Collect measurement, cleanup and code-review reports in the temporary run directory as they arrive, including reports produced inside `$implement`. Preserve original findings, provenance and candidate identity there. Record essential findings, dispositions, measurements, review coverage and conclusions in `progress.md`, including the candidate and provenance for each. Temporary links supplement this recovery information.

Index checks by candidate, command, actual result and material environment limitations. Preserve earlier results as historical evidence and identify which results remain current. Record pre-existing failures separately. A matching source identity does not establish live integration compatibility or make an old external observation current.

## Checkpoint and resume

Update the record after meaningful changes, adjudications, verification, user questions and answers, blockers and counter transitions, and before ending a turn. Keep significant decisions, rejected findings and their reasons, unresolved work and the next useful action. Retain enough history to explain the final outcome without a command transcript.

After compaction or resumption, read the running report and any available relevant linked evidence before continuing. Reconstruct a missing inventory using the report and reconcile the candidate, scope and preservation baseline with the actual working tree. Trust the clean-review counter only when its qualifying evidence recorded in the report remains current. Missing disposable files alone do not restart the run or reset its counters. Preserve the total iteration count and configured limit across resumption, including an iteration already commissioned before interruption. Reconstruct missing counts from recorded outer review attempts, never from clean reviews alone. Make reconstruction gaps explicit rather than granting a fresh budget. If the limit is already reached, finish outstanding verification and hand back without another outer review. Never infer an undocumented clean sequence.
