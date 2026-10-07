---
name: upgrade-dependencies
description: Upgrade project dependencies and toolchain versions with compatibility checks, required migrations, and local validation.
---

# Upgrade dependencies

Deliver compatible upgrades and required migrations within the requested scope. Preserve unrelated changes and existing behaviour.

## Inputs

Take the upgrade scope from the request. Inspect manifests, lockfiles, runtime pins and CI or deployment constraints. Reuse explicit scope decisions. If patch/minor versus major allowance or package versus toolchain scope remains material and unclear, invoke `$elicit-with-context`. Package scope includes development packages; toolchain scope includes project runtimes, package-manager pins, container images, and CI actions. Machine-wide changes, publication, and deployment need corresponding authorisation.

## Method

1. Identify managers, workspaces, dependency ownership, and relevant baseline failures. Use each installed manager's outdated command and supported options to distinguish installed, allowed, and latest versions. Compare toolchain pins with official releases when no outdated command exists.
2. Select a **compatible stable set** within scope. Check peer dependencies, framework compatibility, runtimes, extensions, and platform support together. Use solver diagnostics or dry runs where available. Major allowance does not require incompatible latest versions; apply the ecosystem's pre-1.0 rules. Explain blockers rather than bypassing peer, platform, or security constraints.
3. Read official release notes and upgrade guides across the installed-to-target interval, including required intermediate upgrades. Record source links, required migrations, and optional improvements separately. Reassess targets if a guide exposes a blocker; report missing documentation instead of inventing migration requirements. Delegate a bounded documentation investigation only when a separate evidence path helps, keeping target selection and changes with the upgrading agent.
4. Use official manager or framework upgrade commands first. Use explicit targets or bounded ranges when a general update would exceed scope or miss permitted upgrades. Preserve dependency classification, range conventions, and workspace ownership. Let the manager generate lockfiles. Apply coupled upgrades and migrations in documented order. For toolchain scope, align project, container, and CI pins, preserve immutable pinning, and verify release identifiers.
5. Inspect the **resolved manifest and lockfile diff**, including unexpected transitive changes. Check their actual versions against compatibility and migration guidance; reconcile them with scope before proceeding. Repeat only if the resolved set changes. Apply required migrations; leave optional APIs and larger refactors for the handoff.
6. Verify reproducible installation, dependency and platform validity, project-required checks, and migrated behaviour. Use available security checks and report unresolved findings. Add focused regression coverage when a material gap remains. Separate baseline failures from regressions and distinguish configured pins from the runtime actually used. Rerun outdated discovery and inspect the final diff for unintended changes; explain held-back upgrades rather than treating every remaining outdated item as failure.

## Finish

Return old-to-new versions, required migrations, validation, held-back upgrades and reasons, and optional improvements tied to code and official guidance. Done when the chosen set installs reproducibly and required behaviour and checks pass, or the exact blocker is recorded. Do not claim remote CI or deployment success from local checks.
