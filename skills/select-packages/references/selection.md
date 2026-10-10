# Candidate evaluation

Perform this assignment directly. Use read-only project inspection and browsing. Preserve files, dependencies and Git state. Do not install or execute candidate code, run probes, create scratch files or save reports. Return material user-held questions to the caller before dependent conclusions.

## Discover relevant solutions

1. Establish the required behaviour, decisive edge cases and target environment. Inspect supplied project paths for constraints, existing usage, manifests and lockfiles. Resolve discoverable facts before asking questions.
2. Check project, framework and native capabilities first. If one already meets the requirement with less burden, conclude without external discovery. Date formatting supported by the runtime needs no new library. A robust document parser may warrant one. A short rule unique to the product can remain local.
3. Search relevant ecosystem registries, official integrations and upstream documentation by capability and likely synonyms. Verify remembered names against the canonical project and registry entry. Check plausible alternatives rather than accepting the first result. Broaden the search while a material requirement or viable alternative remains unresolved. Stop when the leading options can be judged and further discovery is unlikely to change the recommendation. An unavailable source or empty query is not evidence that no package exists.

## Evaluate on evidence

Read current primary sources for every criterion that could change the choice. Evaluate the relevant package version and intended use. Keep documented claims distinct from verified facts and inference.

| Criterion                | What to establish                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Functional fit           | Required semantics, edge cases, failure behaviour and API coverage. A feature name alone does not establish fit.                                                                                                       |
| Compatibility            | Runtime, language, platform, framework peers, build system, module format and types. Check documented support against project constraints.                                                                             |
| Maintenance and maturity | Support policy, releases, deprecations and responses to relevant defects. Infrequent releases can indicate finished software. Unresolved consequential defects and unsupported targets matter more than frequency.     |
| Identity and security    | Canonical registry coordinates, upstream ownership, relevant version advisories and installation or build behaviour. Check available provenance where relevant. No advisory match or security score guarantees safety. |
| Licence                  | Applicable terms and notices against project policy and intended distribution. Unclear rights remain a material gap.                                                                                                   |
| Dependency burden        | Incremental direct, transitive, peer and build dependencies, conflicts and relevant size, runtime, service or deployment costs.                                                                                        |
| Integration quality      | Public API, version-specific documentation, types, relevant upstream tests and required configuration or adapters.                                                                                                     |
| Local alternative        | The code, edge cases, tests and expertise the project would own, compared with package integration, upgrade and replacement work.                                                                                      |

Use stars, downloads and release frequency as contextual signals. Apply no universal popularity thresholds or numeric eligibility score. Reject a material incompatibility or unacceptable constraint rather than averaging it into a favourable result. Do not claim installed compatibility, measured performance or tested behaviour from documentation alone.

## Choose and return

Recommend packages only when the evidence supports the requirement and they reduce total justified implementation and maintenance burden. Include multiple packages only when they serve necessary complementary roles. Select a solution rather than returning competing candidates for the caller to evaluate again. Prefer adequate existing capabilities or small local rules when a dependency adds more burden than it removes. Do not prescribe a wrapper without a real integration need.

Follow the succinct output format in the skill's Finish section. Include a supported version or range when it materially affects the choice. For `No packages recommended.`, briefly identify the adequate existing capability, justified local approach or disqualifying constraint. If evidence is insufficient, identify the exact gap instead of implying that no suitable package exists or endorsing an unsupported local implementation.

**Done only when** relevant existing capabilities and leading plausible candidates have been assessed against all decisive criteria, sources have been checked, and the succinct result states the supported recommendation or its exact blocker. Leave installation and behavioural verification with the caller.
