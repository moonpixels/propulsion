---
name: debugging
# prettier-ignore
description: Analyze bugs and failures systematically before proposing fixes. Use when a test fails, behavior is unexpected, or the real issue is not yet understood.
---

# Debugging

Prove the first bad state before anyone plans or fixes.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If this is not bug, failure, flaky, or unexpected-behavior work, STOP. Load `exploration`. 
- If the work is not diagnosis-only, STOP. Load `exploration`. 
- If grounded `debug.md` already exists and later evidence does not contradict it, STOP. Load `planning`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Start from the current diagnosis context. If contradictory evidence was found later, read the existing `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md`, keep it as the active artefact, and record which prior claims are now contradicted.
2. Triage and reproduce the issue with [references/investigation-loop.md](references/investigation-loop.md). Capture the exact symptom, failure class, environment facts, and one reproducing command or an explicit flaky classification. If the issue is flaky, regression-shaped, performance-related, environment/config-driven, data-dependent, concurrency/ordering-sensitive, or multi-component, branch to the matching focused reference immediately.
3. Write or update `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` immediately with [references/debug.md](references/debug.md). Record the reproduction, current evidence, and open alternatives before running more experiments.
4. Reduce and isolate the failure. Minimize the failing case, narrow the system under test, isolate the first failing boundary, and isolate the good/bad window when a regression boundary exists. Use the focused branch references to tighten the search space for the active failure class. Repeat until the search space is materially smaller.
5. Diagnose from evidence. Compare working and broken variants, trace backward to the first bad state or first meaningful divergence, maintain a ranked hypothesis list, and run one discriminating experiment at a time. Use [references/debugger-led-inspection.md](references/debugger-led-inspection.md) when observation-first tooling is the shortest path to the first divergence. Repeat until the diagnosis is grounded.
6. Write or update `debug.md` with the grounded diagnosis, the first bad state or divergence evidence, falsifier, eliminated alternatives, contradictory evidence if any, and fix constraints for later stages.
7. Tell the user debugging is complete, summarize the grounded diagnosis, point to `debug.md`, and ask whether to move to `planning`.

## Rules

These rules are MANDATORY.

- MUST complete the phases in order.
- EVERY action MUST either increase certainty or reduce search space.
- MUST prove the first bad state, first divergence, or earliest explainable bad transition. A plausible guess is NOT enough.
- NEVER edit production code, stack speculative fixes, or make symptom-first changes during diagnosis.
- ONLY temporary diagnostic probes, instrumentation, minimized repro tests, breakpoints, logpoints, watchpoints, and similar evidence-gathering changes are allowed here.
- ONLY run one discriminating experiment at a time, and record the expected result before running it.
- MUST stop after 3 failed or non-discriminating experiments, record eliminated causes in `debug.md`, reassess assumptions, and question the architecture or framing with the user before continuing.
- DO NOT hand off without a written `debug.md` artifact.
- Fresh subagents may gather evidence or code facts only.
- DO NOT implement fixes here.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Exact symptom, failure class, environment facts, and reproduction or flaky classification are recorded in `debug.md`.
- [ ] The failing case is reduced or isolated to the smallest practical surface.
- [ ] The first bad state, first divergence, or earliest explainable bad transition is grounded by evidence.
- [ ] Ranked hypotheses, discriminating experiments, eliminated alternatives, and fix constraints are recorded in `debug.md`.
- [ ] `debug.md` is written to `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md`.
- [ ] User is given the diagnosis summary and asked whether to move to `planning`.

## Next Skill

Once the completion gate is fully checked:

- If the user says to proceed and the diagnosis remains grounded, load `planning`.
- If `planning` or `execution` finds contradictory evidence, load `debugging` and resume from the existing `debug.md`.

## References

Use these references when you need detail.

- [references/investigation-loop.md](references/investigation-loop.md) - Reproduce, gather evidence, compare variants, narrow the surface, and test one hypothesis at a time.
- [references/debug.md](references/debug.md) - Durable `debug.md` guidance and template.
- [references/flaky-failures.md](references/flaky-failures.md) - Branch for intermittent or nondeterministic failures.
- [references/regression-isolation.md](references/regression-isolation.md) - Branch for known-good vs known-bad history windows.
- [references/performance-failures.md](references/performance-failures.md) - Branch for latency, throughput, and resource regressions.
- [references/environment-and-config.md](references/environment-and-config.md) - Branch for runtime, deployment, and config mismatches.
- [references/data-dependent-failures.md](references/data-dependent-failures.md) - Branch for failures tied to specific inputs or stored state.
- [references/concurrency-and-ordering.md](references/concurrency-and-ordering.md) - Branch for races, scheduling bugs, and stale reads.
- [references/multi-component-boundaries.md](references/multi-component-boundaries.md) - Branch for tracing the first bad boundary across components.
- [references/debugger-led-inspection.md](references/debugger-led-inspection.md) - Advanced observation-first debugging techniques.
