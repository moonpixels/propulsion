---
name: implement
description: Implement one confirmed ticket or small software change as a minimal local candidate with checks and independent review.
---

# Implement

Deliver one confirmed software change locally with current quality evidence and independent review. Preserve unrelated work and the agreed scope.

## Inputs

Read the work authority, repository instructions, linked product and technical sources, current source and tests, affected contracts, available tools, and Git state. Fix the observable outcome, exclusions, material risks, and completion evidence. Resolve discoverable facts directly. Use `$elicit-with-context` when a material user-held behaviour, contract, architecture, scope, or acceptance decision remains.

For a changed integration, identify the installed package, framework, platform, or API version and inspect its official documentation, source, or examples. Follow its convention unless an explicit project authority or deliberate local convention governs it. Resolve missing or conflicting guidance before the dependent change.

## Method

1. Apply `$modular-design` to the confirmed work. Use `$tdd` when its behavioural and existing-suite prerequisites hold. Otherwise use meaningful project-native feedback without adding unrequested test infrastructure.
2. Build the smallest coherent change that delivers the complete outcome. Inspect the full diff and in-scope untracked files; account for production and test additions, dependencies, generated artefacts, and measurement-path changes.
3. Invoke `$code-cleanup` on the completed change and behavioural authorities. Validate its findings against current code and contracts. Apply supported in-scope simplifications; record rejected and unresolved findings. Run applicable repository-required and risk-relevant checks on the resulting candidate.
4. Invoke `$measure-code-complexity` with the fixed candidate and base. Resolve supported concerns through a coherent authorised improvement, evidence-backed justification, or a necessary user decision. Rerun affected checks and measurement after relevant changes. Freeze the complete candidate with current checks and measurement, including explicit unresolved evidence.
5. Invoke `$code-review` on that candidate and its authorities. Adjudicate each finding with evidence as a required correction, proportionate improvement, rejected finding, or user decision. Apply required corrections and accepted improvements. Use `$elicit-with-context` only for decisions that change agreed behaviour, contracts, architecture, or scope, or need evidence unavailable within safe authority.
6. After a material candidate change, rerun affected checks, freeze the new candidate, and repeat independent review. Finish when every finding has a supported disposition and no required correction or accepted improvement remains.

## Finish

Report delivered behaviour, changed artefacts, consequential design decisions, checks and results, measurement and review scope, finding dispositions, unavailable evidence, and residual risks.

Done when the agreed local behaviour is delivered, every production addition serves a current purpose, applicable evidence passed or is explicitly unavailable, and current independent review has no unresolved required correction or accepted improvement. An unavailable check is not a pass.

Stop at the local handoff. Committing, pushing, pull-request or tracker changes, release, and deployment are separate actions. Do not add unrelated research, specifications, tickets, or quality infrastructure to this outcome.
