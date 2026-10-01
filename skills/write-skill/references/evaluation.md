# Evaluate a skill

## Define success and cases

Define a small task-specific rubric before drafting or materially revising the skill. Use actual artefacts, resulting state, and meaningful invariants. Assess correctness, completeness, scope, error handling, usability, and efficiency as relevant. Avoid grading by headings, instruction count, a checklist's presence, or the agent's assertion that it validated the work.

Maintain realistic cases covering successful execution, missing inputs, recoverable and blocking failures, consequential scope boundaries, and adjacent tasks. Preserve held-out cases when tuning. Label ambiguous cases by the correct next action rather than forcing a complete output from insufficient inputs.

## Trigger suite

Test **activation** separately from execution quality:

| Case                       | Check                                                                   |
| -------------------------- | ----------------------------------------------------------------------- |
| Direct invocation          | The named skill is found and actually loaded.                           |
| Indirect request           | The intended skill loads when implicit invocation is allowed.           |
| Contextual request         | Realistic surrounding detail does not obscure the task.                 |
| Missing prerequisite       | Relevant guidance loads and requests or locates the missing input.      |
| Near miss or adjacent task | The skill stays unloaded when its contract does not apply.              |
| Scope boundary             | The agent respects the authorised work and identifies the extra action. |
| Competing skills           | The appropriate skill is selected without unrelated loads.              |

Respect the chosen invocation policy when defining expected labels. An explicit-only skill should not be marked defective for staying unloaded on an indirect request. Confirm actual body and reference reads from traces, not self-report. Measure false positives, false negatives, and relevant coverage. Test the installed catalogue when overlaps are plausible, including description truncation or omitted catalogue entries. Explicit invocation does not establish implicit-routing quality.

## Outcome comparisons

Run paired tasks from clean snapshots against **no skill**, the **candidate**, and the **previous version** for revisions. Hold task inputs, model identity, effort, runtime, tools, permissions, and time limits constant. Prevent one run's artefacts or conclusions from leaking into another. Retain failures. Randomise order when service variation or caching could affect the comparison.

Inspect the actual deliverable or environment state first, then use the transcript to diagnose how it arose. Use deterministic validators for mechanical contracts. For design, prose, or usefulness, use calibrated human or model review with a stable rubric. Blind judges to model and skill version, avoid candidate-visible evaluative labels, and withhold prior conclusions or intended answers unless the task requires them. Independent review should add confidence rather than merely repeat the author.

Scale case coverage and repeated runs to risk and the uncertainty that could change the decision. A few runs can reveal a gross problem; they cannot substantiate a small gain. Record single-run performance and across-run reliability separately. A best-of-many success rate does not describe normal single-run reliability.

Test the intended models and runtime configurations rather than transferring one configuration's result to all others. A model or effort change can alter how much checking, persistence, and procedural detail helps.

When behaviour is equivalent, prefer lower context and execution burden. When the agent already performs the task reliably without guidance, test removing redundant instructions or whether the skill remains justified. Do not delete a requested capability solely because one baseline succeeds. If evidence is inconclusive, retain consequential guardrails, improve the test, or narrow the claim.

## Execution cost and diagnosis

Measure the **active path**, including catalogue metadata, activated bodies, references actually read, tool schemas and outputs, task artefacts, conversation context, and child-agent context and returned results. Record actual input, cached-input, output, and reasoning tokens when available, alongside wall time, reads, calls, retries, and iterations. State unavailable telemetry. File words, characters, and tokenizer estimates are storage or text proxies, not whole-run usage or effectiveness.

Read successes as well as failures. Distinguish routing defects, missing knowledge, stale references, unsupported tools, ambiguous criteria, overconstraint, premature stopping, and unnecessary work. Look for repeated reads, irrelevant compulsory branches, large tool outputs, circular invocation, and costly orchestration.

## Targeted experiments

Change one important factor at a time and rerun affected cases:

| Comparison                                                       | Question                                                       |
| ---------------------------------------------------------------- | -------------------------------------------------------------- |
| Same body, revised description                                   | Does routing precision or recall improve?                      |
| Same information, removed repetition                             | Does duplication help or impose cost?                          |
| Required versus conditional preparation or review                | Does scaffolding change the outcome?                           |
| Inline versus conditional references                             | Does disclosure reduce cost without losing needed knowledge?   |
| Positive instruction versus prohibition with alternative         | Which prevents the consequential failure?                      |
| Examples or explanation present versus absent                    | Which information contributes?                                 |
| Matched Markdown versus XML boundaries                           | Does representation matter for the target runtime?             |
| Concise versus long body, with length-matched irrelevant control | Does the content help beyond the effect of additional context? |
| Same bundle, different model or effort                           | Which guidance depends on the configuration?                   |

Use these experiments to resolve a live uncertainty, not as a compulsory matrix. Change description and body separately when diagnosing their effects. Compare paired versions on retained regression and held-out cases. Choose the shortest tested version that preserves required outcomes and reliability within the acceptable cost envelope.

## Evidence record

Keep cases, run traces, artefacts, rubric, and conclusions in author-maintenance material outside routine instructions. Record the exact bundle revision, resource and domain versions, resolved model, effort, client, tool configuration, permissions, and known limitations. Distinguish demonstrated outcomes from untested assumptions, static inspection, and historical advice. Popularity, a polished example, or several accounts of the same underlying experiment do not establish independent validation.
