# Debugging Skill Research

The Superpowers skill is already strong in one important way: it enforces "no fixes before root-cause investigation," requires reproduction, checks recent changes, traces data flow, and only then moves to hypothesis, test creation, and implementation. That is directionally correct and aligned with established troubleshooting guidance from Google SRE and with regression-isolation practices like git bisect.

The main weakness is not philosophy but coverage. As written, it underweights a few techniques that matter disproportionately in real debugging work: aggressive minimization of the failing case, explicit classification of deterministic versus flaky failures, systematic narrowing of the system-under-test, commit-level regression isolation, debugger-first observation tools such as conditional breakpoints and watchpoints/logpoints, and record/replay or reverse debugging for hard-to-reproduce bugs. Those are all established techniques in the literature and vendor docs, and they should be promoted from "optional tricks" to first-class workflow steps.

One correction up front: no debugging skill can guarantee the root cause "every time." Some failures are externally induced, timing-sensitive, hardware-specific, data-corruption-related, or disappear under observation. The right promise is: maximize the probability of finding the true root cause, minimize thrashing, and prevent symptom-only fixes.

## Recommended debugging workflow for an agentic coding skill

### 0. Set the contract before touching code

The skill should begin with a hard rule: do not modify production code until the agent can state the failure, the observed evidence, and the current leading hypothesis. This matches the Superpowers "iron law" and Google's troubleshooting loop of observe -> hypothesize -> test -> repeat.

Add a second hard rule: every action must either increase certainty or reduce search space. If an action does neither, it is thrashing.

### 1. Triage and classify the failure

Before reproduction, classify the issue into one of a small number of modes:

- deterministic functional failure
- flaky / nondeterministic failure
- regression after a known change
- performance regression / latency / resource leak
- environment / config / deployment mismatch
- data-dependent failure
- concurrency / ordering problem

This matters because the techniques differ. Pytest's flaky-test guidance emphasizes that intermittent failures usually point to uncontrolled system state or ordering dependence, and Google's flaky-test analysis shows larger tests are much more likely to be flaky.

### 2. Capture the exact symptom, not an interpretation

Require the agent to record:

- exact error text
- stack trace
- failing assertion or observable wrong behavior
- code revision / branch / artifact version
- environment facts: OS, runtime, dependency versions, flags, config, inputs, time/context
- whether failure is local, CI-only, prod-only, or user-data-only

GitHub's troubleshooting guidance and AWS observability guidance both reinforce that higher diagnostic value comes from richer, structured evidence rather than vague descriptions.

### 3. Reproduce reliably and freeze the environment

A debugging skill should not just say "reproduce consistently." It should explicitly require:

- one command or script that reproduces the failure
- frozen inputs and config
- fixed seed / time / locale / timezone where relevant
- isolation from unrelated moving parts
- repeated runs to determine whether failure is deterministic or flaky

For flaky failures, the skill should switch modes and gather run-to-run evidence instead of pretending the bug is deterministic. Pytest documents that flaky tests often rely on uncontrolled system state, and Google notes that rerunning the same test may pass or fail with identical code.

### 4. Minimize the failing case immediately

This should be elevated to a core step, not a late optimization. The best debugging workflows reduce the failing input, failing test, or failing execution path to the smallest artifact that still fails. Andreas Zeller's delta debugging work is the canonical reference: it systematically minimizes failure-inducing circumstances, including inputs and code changes. MDN also explicitly recommends reduced test cases because they help isolate and diagnose the problem.

This step should instruct the agent to:

- strip unrelated setup
- remove dependencies one by one
- reduce fixtures, input size, flags, and data volume
- shrink from e2e -> integration -> unit-level reproduction when possible

Google's testing guidance is very clear that smaller, more focused tests are easier to debug and less flaky.

### 5. Decide whether this is a regression, then bisect history

If the bug used to work, the workflow should immediately branch to regression isolation:

- find a known-good commit/build
- find a known-bad commit/build
- use git bisect with an automated pass/fail script if possible

This is one of the highest-value additions you can make. git bisect is explicitly designed to use binary search to locate the commit that introduced a bug.

In practice, a great skill should treat this as mandatory whenever a credible good/bad boundary exists.

### 6. Narrow the failing boundary across components

The Superpowers skill already gestures at multi-component evidence gathering. Keep that, but make it more formal:

- identify each boundary the request/data crosses
- add correlation IDs or trace IDs
- log ingress and egress at each boundary
- confirm config/version propagation at each layer
- identify the first layer where reality diverges from expectation

For distributed systems, end-to-end tracing is one of the clearest root-cause accelerators because it shows where requests actually went and where latency or failure emerged. AWS Well-Architected guidance explicitly says end-to-end tracing reduces time to discover impacted components and drill into root causes. Structured logs with consistent schemas and trace IDs serve the same purpose.

### 7. Compare broken behavior against a known-good counterpart

This is the strongest part of the existing skill's "pattern analysis," and it should stay. But tighten it:

- compare broken vs working code path
- compare broken vs working environment
- compare broken input vs passing input
- compare bad commit vs last good commit
- compare failed trace vs successful trace

This is effectively differential debugging. It is often faster than "reading more code," because the key signal is not everything the system does, but the first meaningful divergence.

### 8. Instrument before editing logic

The skill should explicitly rank observation tools before fix attempts:

1. existing logs and traces
2. temporary structured logs / logpoints
3. conditional breakpoints
4. watchpoints / data breakpoints
5. stack/frame inspection
6. post-mortem debugging
7. record/replay or reverse debugging for nondeterministic or late-symptom bugs

Chrome DevTools recommends choosing breakpoint type deliberately because line breakpoints alone are inefficient; conditional breakpoints and logpoints often reduce search time dramatically. Python pdb supports conditional breakpoints, single stepping, frame inspection, and post-mortem debugging. GDB supports process record/replay and reverse execution, and Microsoft's Time Travel Debugging lets you replay execution forward and backward instead of trying to reproduce repeatedly.

This is a major upgrade over "add some logging."

### 9. Trace backward from the symptom to the first bad state

This should be the centerpiece of the skill. The agent should ask, in order:

- what is wrong right now?
- when did it first become wrong?
- where was the last known-good state?
- what transition changed it from good to bad?
- what precondition allowed that transition?

This turns "root cause" into a search for the first bad state transition, which is more actionable than a vague causal story.

For data bugs, this means following the value backward.
For regressions, it means following history backward.
For distributed bugs, it means following the request backward across services.
For crashes, it means following execution backward using post-mortem or replay tools.

### 10. Generate a hypothesis tree, not a single guess

The current Superpowers skill says "form single hypothesis." I would adjust that slightly.

The agent should keep a small ranked list:

- primary hypothesis
- strongest alternative
- disconfirming evidence still unexplained

Google SRE describes hypothesis testing as comparing observed system state against theories or making controlled changes and observing the result. That is stronger than gut-feel guessing, but in real debugging you usually need 2-3 plausible candidates ranked by evidence.

The skill should forbid more than one active experimental change at a time, but it should not forbid maintaining alternatives in the reasoning state.

### 11. Run the smallest discriminating experiment

This is the heart of scientific debugging:

- change one variable
- prefer observation over mutation when possible
- design the experiment to distinguish between hypotheses
- record expected result before running it
- update belief after the result

The important refinement is "smallest discriminating experiment," not just "smallest possible change." A tiny change that cannot separate two hypotheses is not helpful.

### 12. Use special branches for specific bug classes

A best-in-class skill should contain explicit subroutines:

For flaky bugs:

- rerun under identical conditions
- serialize tests if parallelism is suspect
- remove shared state
- randomize test order where useful
- capture seed, timing, and ordering
- consider record/replay if available

Pytest and Google both point to shared/uncontrolled state and nondeterminism as common causes.

For performance bugs:

- start with profiling/tracing before code edits
- identify slowest path, hottest callsite, blocking dependency, or largest allocation
- reduce to one workload and one metric
- avoid guessing at "optimizations" without a profile

Tracing/profiling guidance from MDN and AWS supports this.

For concurrency bugs:

- reduce concurrency
- capture ordering
- add invariant checks around shared state
- prefer record/replay / reverse execution when tooling exists

GDB record/replay and WinDbg TTD are especially valuable here.

For environment/config bugs:

- diff env vars, flags, config files, secrets, dependency versions, and feature flags
- verify propagation across process/container/service boundaries
- never assume CI and local are comparable without evidence

This aligns with the current Superpowers multi-layer evidence pattern and GitHub's guidance on increasing diagnostic verbosity.

### 13. State the root cause in a strict format before fixing

Require the agent to write a root-cause statement like this:

Root cause:
A specific condition or code path caused X because Y, first introduced or enabled by Z, observed via evidence A/B/C.

Why this is not merely a symptom:
This explains the earliest bad state / first divergence.

What would falsify this explanation:
One explicit falsifier.

This forces the agent to distinguish "null dereference happened" from "object could be null because config propagation skipped initialization in async startup path."

### 14. Only now create the regression test

The Superpowers skill puts failing-test creation in implementation. Keep it there, but add one nuance: use the minimal failing reproduction from steps 3-4 as the basis for the test. That is exactly what the testing-pyramid guidance implies: smaller tests are more debuggable and more stable.

### 15. Apply the smallest root-cause fix

This should remain "one fix, one purpose." No bundled cleanup, no opportunistic refactors.

### 16. Verify on three axes

A high-quality skill should verify:

- the minimized reproduction now passes
- broader relevant tests still pass
- the original real-world symptom is gone in the original environment

Many agents stop after axis 1. That is not enough.

### 17. Add guardrails to prevent recurrence

The fix is not complete until at least one of these is added where appropriate:

- regression test
- assertion/invariant closer to source
- better error message
- structured logging/tracing at the formerly opaque boundary
- metric/alert for the same failure mode
- architecture note if the issue exposed a design weakness

Google SRE ties root-cause identification to corrective action and postmortem learning, and Google's testing guidance emphasizes rapid feedback and focused tests to reduce future debugging cost.

## Best techniques to include, in priority order

1. exact symptom capture
2. reliable reproduction and environment freezing
3. failure classification: deterministic, flaky, regression, performance, config, concurrency
4. immediate minimization of the failing input/test/path via delta-debugging style reduction
5. regression isolation with git bisect whenever a good/bad window exists
6. boundary tracing with structured logs and correlation IDs across components
7. differential debugging against a known-good example, input, environment, or commit
8. debugger-led inspection using conditional breakpoints, logpoints, watchpoints, frame inspection, and post-mortem debugging
9. record/replay or reverse debugging for intermittent, late-symptom, and concurrency bugs
10. small discriminating experiments against ranked hypotheses
11. minimal regression test based on the reduced failing case
12. single root-cause fix
13. three-axis verification
14. recurrence prevention through tests, assertions, observability, and postmortem notes

## What I would change in the Superpowers skill specifically

I would keep its four-phase skeleton, but replace it with this stronger sequence:

Phase 1: Triage and Reproduction
Classify failure, freeze environment, capture exact symptom, determine deterministic vs flaky.

Phase 2: Reduction and Isolation
Minimize failing case, reduce SUT size, bisect history if regression, narrow failing boundary across components.

Phase 3: Evidence-Driven Diagnosis
Compare working vs broken, trace backward to first bad state, inspect with debugger/tracing/replay tools, maintain ranked hypotheses, run discriminating experiments.

Phase 4: Root-Cause Fix and Proof
Write root-cause statement, add minimal failing test, apply smallest fix, verify locally and broadly, add recurrence guardrails.

## A concise promptable doctrine for your agent

You could distill the skill to this operational doctrine:

Reproduce.
Reduce.
Isolate.
Compare.
Trace backward.
Hypothesize.
Discriminate with one experiment.
State root cause.
Prove it with a minimal test.
Fix once.
Verify broadly.
Prevent recurrence.

That is the highest-signal workflow I found across the Superpowers skill, Google SRE troubleshooting, Google testing guidance, delta debugging research, git bisect, debugger documentation, and observability guidance.
