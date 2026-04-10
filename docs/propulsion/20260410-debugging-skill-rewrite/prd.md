# Debugging Skill Rewrite

## Problem Statement

Propulsion's current `debugging` skill is directionally correct but too weak as a workflow contract. It does not impose a strong enough evidence bar, does not always produce a durable handoff artifact, and does not give agentic coders enough structure to minimize the failing case, isolate regressions, classify flaky failures, or stop thrashing before they start making symptom-only fixes. The result is avoidable guesswork, repeated failed fixes, and downstream stages starting implementation without a rigorous diagnosis package.

## Goals

- Make `debugging` the strongest diagnosis-first stage in the workflow, optimized for finding the true root cause with high confidence.
- Minimize debugging thrash by forcing each action to either increase certainty or reduce the search space.
- Guarantee a durable `debug.md` handoff that preserves evidence, first-bad-state proof, and fix constraints for later stages.
- Cover the main bug classes agentic coders hit in practice, including deterministic, flaky, regression, performance, environment, data-dependent, concurrency, and multi-component failures.
- Keep the rewritten skill fully consistent with Propulsion's existing structure, tone, and stage boundaries.

## User Stories

1. As an agentic coder, I want a strict debugging workflow that prevents premature fixes, so that I stop masking symptoms and start proving causes.
2. As an agentic coder, I want explicit branches for different failure classes, so that I can use the right investigation techniques for flaky, regression, performance, config, and concurrency bugs.
3. As a downstream planner or implementer, I want a durable diagnosis artifact with reproduction, evidence, first divergence, and fix constraints, so that I can act on the diagnosis without restarting the investigation.
4. As a human partner, I want Propulsion to stop thrashing after repeated failed experiments and question assumptions explicitly, so that debugging stays disciplined under pressure.

## Solution

Rewrite the entire `skills/debugging/` package as a stricter, evidence-first diagnosis stage that remains diagnosis-only and always produces a durable `debug.md` artifact. The rewritten skill should preserve Propulsion's standard shape and handoff model while upgrading the debugging workflow to a stronger four-phase sequence: triage and reproduction, reduction and isolation, evidence-driven diagnosis, and root-cause handoff.

The new flow should require exact symptom capture, reliable reproduction or explicit flaky classification, environment freezing, immediate minimization of the failing case, regression isolation when a good/bad window exists, boundary tracing across components, debugger-led inspection, ranked hypotheses, and one discriminating experiment at a time. The diagnosis should only be considered grounded when the first bad state or first meaningful divergence is proven with evidence, accompanied by a falsifier and any unresolved alternatives.

The package should always write `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` in an exact template shape. That artifact should become the workflow memory for re-entry: if `planning` or `execution` later uncovers contradictory evidence, they should return to `debugging` with the existing `debug.md` as the current context instead of starting from scratch.

The rewritten package should include focused reference files for major bug classes and debugging techniques so the main `SKILL.md` stays strict and low-token while deeper playbooks remain maintainable.

## Implementation Inputs

- Superpowers reference skill and supporting references: `https://github.com/obra/superpowers/tree/917e5f53b16b115b70a3a355ed5f4993b9f8b73d/skills/systematic-debugging`
- Research artifact for this rewrite: `docs/propulsion/20260410-debugging-skill-rewrite/research.md`
- Existing Propulsion skill contracts and authoring guidance in `docs/propulsion/skill-authoring.md`
- Existing Propulsion skills for consistency: `exploration`, `planning`, `execution`, and `tdd`
- Existing local debugging package as the starting point to replace
- Prior research already gathered for this rewrite covering SRE troubleshooting loops, delta-debugging-style minimization, regression isolation, debugger-first inspection, record/replay, and observability-guided boundary tracing

## Implementation Decisions

- Keep `debugging` diagnosis-only. It MUST NOT implement production fixes. `planning`, `execution`, and `tdd` continue to own code changes.
- Always require a durable `debug.md` artifact. Artifact-free handoffs are not allowed.
- Require a grounded diagnosis to prove the first bad state, first divergence, or earliest explainable bad transition, not just a plausible leading guess.
- Allow temporary diagnostic probes, instrumentation, minimized repro tests, breakpoints, logpoints, watchpoints, and similar evidence-gathering actions during investigation, while still forbidding production fix edits.
- Redefine the current three-failure rule into a stronger anti-thrashing escalation rule: after repeated non-discriminating or failed experiments, the skill must document eliminated causes, reassess assumptions, and question the architecture or framing with the user.
- Keep the main `SKILL.md` short and explicit. Put branch-specific procedures and templates into reference files.
- Expand coverage to broad bug classes within one skill package, with dedicated references for each major branch to keep maintenance manageable.
- Add an explicit re-entry rule so later stages can resume the same investigation context from `debug.md` when contradictory evidence appears.

## Testing Decisions

- Verify the rewritten `SKILL.md` follows Propulsion's required shape and uses explicit prerequisites, ordered instructions, rules, completion gate, next-skill routing, and references.
- Verify the package always yields a `debug.md` artifact with one exact section order and a strict root-cause statement format.
- Verify the main workflow and references cover the agreed failure classes and key techniques: reproduction, minimization, regression isolation, boundary tracing, debugger-led inspection, ranked hypotheses, discriminating experiments, and recurrence guardrails.
- Verify the rewritten rules clearly forbid premature fixes, speculative fix stacking, hidden transitions, and diagnosis-free handoffs.
- Verify the handoff contract is strong enough that `planning` can consume `debug.md` without re-litigating diagnosis, and strong enough that later contradictory evidence has a clear path back into `debugging`.

## Out Of Scope

- Redesigning Propulsion so `debugging` also implements fixes
- Changing the top-level workflow entry routing between `exploration` and `debugging`
- Adding runtime-specific debugger integrations, automation, or external tooling dependencies beyond documentation and workflow guidance
- Rewriting `planning`, `execution`, or `tdd` beyond any minimal wording updates required for consistency with the stronger `debug.md` handoff

## Risks / Open Questions

- Broad failure-class coverage can make the package feel heavy if the references are not split cleanly and kept sharply scoped.
- The exact number and granularity of reference files may need one implementation pass to balance usability against maintenance overhead.
