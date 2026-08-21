# Security and Adversarial Harnesses

## Static and security analysis

Map the change through trust boundaries, identities, permissions, untrusted inputs, sensitive data, secrets, cryptography, deserialization, dependencies, and external effects. Apply repository-required or already configured analysis to the code it actually covers. Add risk-focused negative or abuse-case procedures only for the changed surface and established authority.

Record tool, rule set and vulnerability database versions, scanned inputs, build mode, findings and suppressions. Inspect changed baselines, ignored paths, generated-code treatment, severity thresholds, stale dependency data, secret-history scope, and whether the scan completed. Appraise findings against reachable code and concrete consequences; do not suppress a false positive without preserving why it is false.

A clean scan supports only absence of findings from enabled rules over scanned inputs. It cannot establish safe design, complete data flow, correct authorization, absence of unknown weaknesses, or runtime protection. When specialist penetration or threat assessment is materially required but unavailable, record the unassessed claim and risk.

Representative procedure: identify the changed trust-boundary claim; run existing configured analysis; exercise one authorised and one unauthorised or malformed case through the supported boundary where in scope; inspect data and effects; preserve blind spots.

## Fuzzing and adversarial input

Use an existing fuzz or generative harness for changed parsers, protocols, validators, decoders, or hostile/high-volume input only when it has a meaningful oracle: crash, sanitizer, invariant, differential result, resource bound, or assertion. Define the target and rejection semantics before execution.

Preserve corpus provenance, seed, generator distribution, duration or iteration budget, sanitizer and assertion configuration, coverage or state progress, timeouts, and every minimized failing input. Confirm the selected corpus and generated-case count are non-empty. Inspect swallowed exceptions, over-filtered inputs, biased generators, duplicate cases, resource exhaustion mistaken for a product defect, and failures discarded after minimization.

No crash establishes robustness only for exercised inputs and enabled detectors. It rarely establishes semantic correctness. A preserved counterexample becomes regression evidence only after an independent oracle identifies the correct outcome.
