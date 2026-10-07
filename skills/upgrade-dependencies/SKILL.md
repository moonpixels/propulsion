---
name: upgrade-dependencies
description: Upgrade a codebase's dependencies when the user requests package, build, CI, or runtime version updates.
---

# Upgrade dependencies

Deliver the newest compatible stable dependencies within scope through **incremental migration**. Preserve existing behaviour and unrelated work.

## Inputs

Take the codebase and limits from the request. By default, include major upgrades, development packages, package-manager pins, CI actions, and build or container dependencies. Change language/runtime versions only when requested. Prefer the newest compatible LTS, or actively supported stable release where LTS does not exist. Explicit limits take precedence.

Use repository instructions, manifests, lockfiles, workspace ownership, runtime pins, and CI or deployment constraints. Resolve discoverable facts first. Invoke [$elicit-with-context](../elicit-with-context/SKILL.md) only for unresolved material decisions, such as expanding scope to unblock a target. Leave commits, publication, deployment, and machine-wide changes to separately authorised work.

## Method

1. **Establish the baseline.** Identify dependency managers and actual tool/runtime versions. Inspect the working tree, run repository-required checks and available audits, and record existing failures. Inventory installed, allowed, and latest versions with native outdated commands. Include versioned CI and container references that these commands miss. Establish a way to restore only your changes before upgrading.
2. **Research before changing.** For each proposed batch, consult current official releases, support policies, compatibility metadata, changelogs, and upgrade guides across the entire installed-to-target interval. Map relevant breaking changes to code and configuration. Check peers, plugins, extensions, runtimes, platforms, affected workspaces, and known consuming projects. Record target versions, source links, required migrations, and compatibility evidence. Use solver diagnostics or dry runs where supported. Missing documentation is not proof of compatibility. Resolve missing evidence through official source or maintainer guidance, or block that target.
3. **Sequence verifiable batches.** Prioritise critical security fixes and blocking dependencies. For stale dependencies, bring the current major to its latest compatible patch/minor before major migration. Keep coupled dependencies together. Default to one major at a time, using each major's latest compatible patch. Take a shorter path only when official guidance explicitly supports it. Follow documented migration order and ecosystem pre-1.0 rules. Hold back unsupported, withdrawn, or incompatible targets with reasons. Preserve security policies and resolve conflicts rather than bypassing checks.
4. **Upgrade with native tools.** Use package-manager or framework upgrade commands and official codemods, with researched targets or bounded ranges. Verify command semantics against the installed CLI. Preserve dependency classification, range conventions, and workspace ownership. Let the manager generate lockfiles. Edit version declarations directly only where native tooling cannot express the change. Apply all required code and configuration migrations. Align affected project, container, and CI pins within scope, verifying release identifiers and preserving immutable pins. Read [upgrade techniques](references/upgrade-techniques.md) when targeting commands, coupled migrations, runtime constraints, or recovery need examples.
5. **Verify every batch before continuing.** Inspect actual resolved versions, manifest and lockfile diffs, unexpected transitive changes, and codemod output against the research and scope. Investigate newly exposed compatibility or migration requirements. Run repository-required checks and relevant behaviour tests. Add focused regression coverage where a migration exposes a material gap. Diagnose regressions and repair or restore the batch before dependent work continues. Preserve prior verified batches and unrelated edits. Continue independent work where safe, recording any blocked remainder.
6. **Prove the final state.** Reproduce installation from the final lockfiles with the configured tooling. Verify the resolved dependency graph and platform requirements, then run all required checks, available audits, and affected behaviour checks under the target runtime. Distinguish configured pins from versions actually tested. Rerun outdated discovery and review the complete diff. Account for every in-scope upgrade as applied or held back with evidence. Report unavailable checks and inherited failures separately from regressions.

## Finish

Return the upgraded codebase, old-to-new versions, required migrations and sources, validation commands and results, held-back items and reasons, and remaining limitations. Keep optional API changes and larger refactors separate. Local checks prove only the environments exercised.

**Done only when** every in-scope item is accounted for, the chosen set installs reproducibly, required migrations are complete, and compatibility, required checks, and affected behaviour pass. A blocker or unavailable verification leaves the affected work incomplete. Report the exact constraint, verified progress, and next action rather than claiming completion.
