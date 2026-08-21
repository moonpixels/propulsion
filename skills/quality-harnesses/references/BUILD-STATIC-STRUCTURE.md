# Build, Static, and Structural Harnesses

## Build, compilation, and packaging

Use the repository-owned command, target, production mode, and dependency state. Record the source revision, environment, toolchain, inputs, output artefact, exit status, and material warnings. Confirm that the command rebuilt the intended target rather than accepting stale or cached output; inspect changed scripts, lockfiles, generators, ignored failures, omitted workspaces, and warning policy.

A clean result supports only that the recorded inputs compiled or assembled in that environment. It does not execute promised behaviour or establish portability, compatibility, deployment, or reproducibility. When packaging changes, inspect the produced archive or manifest for required files, entry points, permissions, metadata, and absence of unintended material rather than relying on exit status alone.

Representative procedure: resolve the authoritative build command; clear or invalidate only project-sanctioned disposable output when needed; run the exact target; verify a fresh artefact and its manifest; preserve salient output and environment. If cleanup is unsafe or unauthorised, record the cache limitation.

## Types, linting, formatting, and framework diagnostics

Resolve the configured check command and its real file, project, rule, and mode scope. Run repository-required checks even when a narrower invocation already passed. For changed configuration, compare selection, rule severity, exclusions, suppressions, baselines, generated-code treatment, and formatter check/write mode before interpreting the result.

A clean type check supports only relationships encoded by that type system and configuration. A linter or framework diagnostic supports only enabled rules. Formatting supports only the selected canonical representation. Confirm a non-empty target and preserve warnings or diagnostics that the command reports without failing.

Do not add suppressions, widen ignores, lower severity, regenerate a baseline, or format unrelated files merely to make a check green. An authorised exception remains an explicit limitation with its scope and rationale.

## Architecture fitness rules

First identify the authoritative structural decision the rule encodes. Run the existing rule only when the change can affect its dependency, layer, cycle, import, ownership, or public-surface selection. Confirm that source selectors, module mappings, and expected violations are non-empty and still match renamed or moved code. Inspect changed exemptions, baseline files, generated-source treatment, and rule configuration.

A pass supports conformance to the encoded rule for the selected source. It cannot decide whether the rule is desirable, whether omitted boundaries are healthy, or whether runtime, data, semantic, or organisational coupling is acceptable. Use `$modular-design` for structural judgement when its public trigger applies; do not turn a new architectural preference into a gate without project authority.

Representative contrast: a dependency rule that scans 86 current modules and finds no forbidden imports is evidence; the same green command after its package selector matches zero modules is not.

## Reproducibility and provenance

Identify the promised equivalence: byte-identical artefacts, canonical content, generated-source stability, dependency provenance, or signed-output traceability. Record source revision, toolchain, resolved dependencies, environment, locale, time inputs, network access, generation command, and comparison method. Repeat under the relevant independent variance rather than only rerunning against the same caches and machine state.

Inspect embedded timestamps and paths, undeclared state, caches, dependency drift, ignored comparison fields, signatures, attestations, and whether regenerated output was reviewed and checked into the intended boundary. A successful same-machine repeat is useful determinism evidence but not cross-environment reproducibility. Equivalent artefacts do not establish behavioural correctness or trustworthy provenance by themselves.
