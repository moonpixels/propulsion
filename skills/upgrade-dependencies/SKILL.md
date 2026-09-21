---
name: upgrade-dependencies
description: Upgrades project packages and toolchain dependencies with compatibility checks and required migrations. Use when refreshing dependencies or upgrading their versions.
metadata:
    type: performer
disable-model-invocation: true
---

# Upgrade Dependencies

Deliver compatible dependency upgrades, required migrations and verified local changes.

## Process

### 1. Establish scope

Inspect the request, repository guidance and working tree; preserve unrelated changes. Resolve unclear scope through `$elicit-with-context`: patch/minor upgrades only or majors too; package dependencies only or the full project toolchain. Reuse explicit answers. Include development packages in package scope. Toolchain scope includes project runtime versions, package-manager pins, container images and CI actions. Machine-wide changes, publication and deployment need separate authorisation.

### 2. Discover compatible targets

Identify the existing package managers, workspaces, manifests, lockfiles, runtime requirements and CI/deployment constraints. Record current versions and relevant baseline check failures. Run each manager's outdated command before dependency research, such as `composer outdated --locked --format=json`, `npm outdated --json`, `pnpm outdated` or `bun outdated`; check the installed CLI's help for supported options. For selected toolchain components without an outdated command, compare their pins with official release listings.

Distinguish installed, allowed and latest versions. Check candidate metadata, peer dependencies, framework compatibility, runtime/extension requirements and platform support together before selecting targets. Use solver diagnostics or dry runs where available, such as Composer's `why-not`. Select a compatible stable set within scope; a major upgrade allowance does not require incompatible latest versions. Treat pre-1.0 compatibility according to the ecosystem's rules. Explain blockers rather than bypassing peer, platform or security constraints.

### 3. Read the selected upgrade guidance

Send a fresh research agent the selected versions, compatibility evidence, scope, relevant project constraints and known documentation links. Have it consult official upgrade guides and release notes across the installed-to-target interval, including required intermediate upgrades. Return source links, required migration steps, compatibility findings and separately labelled optional improvements; stop at research. Keep version selection and changes in the main thread. Reassess targets if research reveals a blocker. Report missing documentation rather than inventing migration requirements.

### 4. Upgrade and migrate

Use official package-manager or framework upgrade commands first. Use explicit target versions or bounded ranges when a general update would miss permitted upgrades or exceed scope. Preserve dependency classification, range conventions and workspace ownership. For example, Composer `update` resolves existing constraints while `require` changes them; npm `update` respects ranges while `install package@range` can change them. Verify options against the installed tool. Let the manager generate lockfiles. Edit manifests or toolchain configuration directly only where no suitable official command exists.

Apply coupled upgrades and required migration steps in the documented order. Update affected code and configuration while preserving behaviour. When toolchain upgrades are included, align project, container and CI pins, preserve existing immutable pinning and verify release identifiers against their official source. Distinguish project pins from the runtime actually used locally or by a deployment provider.

After resolution, inspect the actual manifest and lockfile diff. Check compatibility and official release/migration guidance for additional changed packages, including transitives, using their resolved versions rather than predicted targets. Reconcile unexpected changes with scope before proceeding. Repeat this reconciliation if the resolved set changes again.

Apply changes required by the upgrade guides. Record optional newer APIs, simplifications and larger refactors for the final handoff; leave their adoption to the user.

### 5. Verify and hand off

Verify reproducible installation from the resulting lockfiles, dependency/platform validity and the project's required checks, including relevant tests, static analysis and builds. Use available security checks and report unresolved findings. Check migrated behaviour with existing coverage; add focused regression coverage where a material gap remains. Separate pre-existing failures from upgrade regressions and state unavailable checks honestly.

Rerun outdated discovery and review the final diff for unintended source, generated-file or toolchain changes. Explain remaining upgrades instead of treating a nonempty outdated report as failure. Stop with verified local changes, or clearly identified blockers when completion is not possible.

Return a concise account of old-to-new versions, required migrations, validation results, held-back upgrades with reasons and optional improvements tied to affected code and official guidance. Do not claim remote CI or deployment success from local checks.
