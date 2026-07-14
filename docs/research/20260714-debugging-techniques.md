---
title: 'Concrete debugging techniques for coding agents'
createdAt: 2026-07-14
updatedAt: 2026-07-14
status: current
---

# Concrete debugging techniques for coding agents

## Research question and scope

**Question:** Which proven, concrete debugging techniques should Propulsion's
user-invoked `debug` skill expose to help coding agents establish a repeatable
failing signal, isolate a root cause, and verify a repair; and should their
detail live in a progressively disclosed reference rather than `SKILL.md`?

**Intended use:** Inform a review recommendation only. This report does not
authorise a change to the skill.

**Scope:** Issue-agnostic techniques for tests, HTTP, CLI, browser, captured
event replay, flaky and concurrent failures, performance, bisection,
instrumentation, causal tracing, and regression verification. Language-specific
debugger commands and generic troubleshooting catalogues are excluded. Stable
classic techniques use original publications; tool examples use official
documentation current on 2026-07-14. Matt Pocock's local `diagnosing-bugs` skill
and obra's `systematic-debugging` skill are design comparators, not evidence of
effectiveness.

## Conclusion

The current [`debug` skill](../../skills/debug/SKILL.md) has the right governing
loop and already covers failing tests, benchmarks, traces, probes, minimal
reproductions, binary search, delta debugging, causal repair, and layered
verification. It needs more concrete guidance only where an agent must choose
_how_ to create the signal or discriminating experiment. The material gaps are:

- an executable signal quality gate that asserts the exact symptom rather than
  merely exercising the path;
- capture-and-replay, differential, property/fuzz, flaky/concurrent,
  performance, and boundary-tracing selection branches;
- the artefact each branch must retain so another run can reproduce the result.

One compact `references/TECHNIQUES.md` is justified. The repository's own
[resource rule](../../skills/write-skill/references/SECTIONS.md) assigns
conditional knowledge to `references/` and requires its pointer beside the
branch that uses it; the [suite plan](../../SKILLS_PLAN.md) keeps common-path
behaviour in `SKILL.md`. Keep the scientific loop and no-signal stop condition
in `SKILL.md`, add one conditional pointer when the failing signal or next
experiment is not obvious, and make the reference a decision guide rather than
an encyclopaedia. Source attribution should remain here, not in the eventual
skill.

## Findings

### A failing signal needs an oracle, not just an invocation

The current skill names useful signal forms but does not say what makes one
diagnostically sharp. An HTTP command, CLI invocation, or browser script can run
successfully while missing the reported bug. For example, curl does not treat
HTTP error statuses as command failure by default; `--fail-with-body` changes the
exit status for most 4xx/5xx responses while preserving the body, and the curl
manual records authentication exceptions. A robust HTTP probe therefore needs
explicit assertions for the relevant status, headers, or body, not only a curl
exit code ([curl manual](https://curl.se/docs/manpage.html#--fail-with-body)).
Playwright likewise separates driving the page from asserting the expected
condition, and its web assertions wait for the condition
([Playwright assertions](https://playwright.dev/docs/test-assertions)).

**Inference:** the common quality gate should require one already-run,
agent-runnable command or probe that (1) reaches the relevant path, (2) asserts
the user's exact symptom, (3) runs quickly enough for the debugging loop, and
(4) is deterministic or reports a measured reproduction rate. Record the
command, fixture or captured input, expected verdict, observed verdict, and any
seed, environment, or schedule needed for replay. This changes agent behaviour;
the labels “HTTP”, “CLI”, and “browser” alone do not.

### Signal techniques should be selected by symptom and seam

The reference should offer this compact selection guidance:

| Condition                                            | Technique and minimum observable signal                                                                                                      | Material addition                                                         |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| A stable test seam reaches the fault                 | Focused failing test or minimal harness; assert the exact behaviour and preserve the fixture                                                 | Mostly present; clarify the oracle quality gate                           |
| The fault is at an HTTP boundary                     | Script one request and assert status plus the relevant body/header; preserve request payload and response                                    | Concrete instantiation of “targeted probe”                                |
| The fault is a CLI contract                          | Run a fixture input and assert exit status, stdout, and/or stderr against the expected result; record relevant flags and environment         | Concrete instantiation of “targeted probe”                                |
| The fault requires real browser behaviour            | Headless browser script asserting the relevant DOM, console, request, or response outcome                                                    | Concrete instantiation; browser assertions are distinct from navigation   |
| Only a production request or event exposes the fault | Capture the smallest safe request/event artefact and replay it at the nearest stable seam                                                    | New branch; useful when local construction loses the trigger              |
| The bad input is unknown or combinatorial            | Property/fuzz loop with an explicit invariant; preserve the seed/failing artefact and minimise it before diagnosis                           | New branch; complements rather than replaces an observed-bug reproduction |
| The failure is intermittent                          | Repeat the exact trigger, report attempts and failure rate, then control time, randomness, order, load, or scheduling one variable at a time | New branch; turns “not deterministic” into a measurable signal            |
| The fault is concurrent                              | Prefer a deterministic/systematic scheduler or recorded schedule when available; use stress only to amplify and capture a failure            | New branch; stress alone is not reliable isolation                        |
| The fault is performance                             | Establish a controlled baseline and failing threshold, repeat measurements, then profile the failing workload before changing code           | Makes the current “benchmark” signal operational                          |

These are supported as technique families, not mandates for particular tools.
Playwright documents strict request/payload matching for recorded HAR replay,
which demonstrates how a captured network interaction can become a repeatable
fixture ([Playwright HAR replay](https://playwright.dev/docs/mock#mocking-with-har-files)).
LLVM's current libFuzzer documentation requires a fast, narrow, deterministic
target, writes the failure-inducing input to disk, supports crash minimisation,
and can replay saved inputs as regression tests
([libFuzzer target and corpus guidance](https://llvm.org/docs/LibFuzzer.html)).
The original QuickCheck publication supports generated inputs checked against
executable properties, but also records pitfalls; property/fuzz loops therefore
belong only where a meaningful invariant or failure oracle exists
([Claessen and Hughes, 2000](https://research.chalmers.se/en/publication/237427)).

For concurrency, repeated stress can raise the chance of observing a bug but
does not make the schedule reproducible. The CHESS publication reports that
ordinary stress has unpredictable coverage, while systematic schedule control
can reproduce the erroneous interleaving
([Musuvathi, Qadeer, and Ball, 2008](https://www.usenix.org/legacy/event/osdi08/tech/full_papers/musuvathi/musuvathi_html/index.html)).
An empirical study of 201 flaky-test fixes found asynchronous waiting,
concurrency, and test-order dependency to be its dominant categories; this
supports deliberately varying timing and order, recording environmental state,
and replacing guessed delays with explicit conditions after the cause is known
([Luo et al., 2014](https://huang.isis.vanderbilt.edu/cs8395/paper/flakytest.pdf)).
Its Apache-heavy sample is evidence for those branches, not universal incidence
rates.
For performance, the exact benchmark tool is contextual, but controlled warmup,
repetition, and reported variance are concrete safeguards against treating one
noisy timing as a cause
([Google Benchmark user guide](https://github.com/google/benchmark/blob/main/docs/user_guide.md#runtime-and-reporting-considerations)).

### Isolation needs a small set of distinct experiment patterns

The current skill already names minimal reproducible examples, binary search,
and delta debugging. Delta debugging is strongly applicable: the original
publication automatically reduced a 95-action browser failure to three actions
and 896 lines of HTML to one failure-inducing line, while explicitly requiring
an automated test outcome
([Zeller and Hildebrandt, 2002](https://www.st.cs.uni-saarland.de/papers/tse2002/)).

Three additional patterns materially improve technique selection:

1. **Automated bisection:** when known-good and known-bad states exist, drive a
   stable predicate across commits, versions, inputs, datasets, or configurations.
   Git's official `bisect run` contract demonstrates the critical requirement:
   the script must classify good, bad, and untestable states by exit status
   ([Git bisect](https://git-scm.com/docs/git-bisect)).
2. **Differential testing:** run the same input through two comparable
   implementations, versions, or configurations and inspect the smallest output
   difference. McKeeman's original account reports this as useful when an oracle
   is expensive, but warns that legitimate unspecified differences create false
   positives
   ([McKeeman, 1998](https://www.cs.tufts.edu/comp/150FP/archive/bill-mckeeman/DifferentailTesting.pdf)).
3. **Boundary and backward causal tracing:** instrument only the boundaries that
   discriminate current hypotheses, correlate a request across components, and
   trace the first bad value or invariant violation backwards to the earliest
   divergence. OpenTelemetry explains that propagated context correlates signals
   across process boundaries
   ([context propagation](https://opentelemetry.io/docs/concepts/context-propagation/));
   the original Dapper report supports distributed traces for understanding
   behaviour and performance in complex services
   ([Sigelman et al., 2010](https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/)).

The reference should say when to choose each pattern and what result confirms or
rejects a hypothesis. It should not repeat the skill's existing instruction to
change one variable at a time.

### Verification is already adequate; add only artefact cleanup and replay detail

The current skill already requires the original reproduction, focused
regression coverage, nearby checks, wider repository checks, and separation of
pre-existing failures. That is stronger than either comparator's verification
summary and needs no second technique catalogue.

The reference can add two conditional details: convert a minimised failing
artefact into regression protection at the strongest stable seam, and remove or
clearly retain temporary instrumentation and throwaway harnesses. A saved fuzz
input being replayable as a regression test is one concrete example
([libFuzzer](https://llvm.org/docs/LibFuzzer.html)); it does not imply every
debugging artefact belongs permanently in the test suite. The existing `$tdd`
composition remains authoritative for red-green-refactor behaviour.

### The comparators support discoverability, not effectiveness claims

Matt Pocock's local
`/Users/adam/Developer/matt-pocock-skills/skills/engineering/diagnosing-bugs/SKILL.md`
provides a useful ordered list of concrete signal constructors and operational
qualities such as exact symptom, speed, determinism, and agent-runnability.
Obra's
[systematic-debugging bundle](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging)
uses a short main workflow plus conditional supporting references, including
backward root-cause tracing. These are good design precedents for a compact
selection reference.

Neither comparator supplies controlled evidence for its claimed productivity
or success rates. Those claims were excluded from this report. The recommended
techniques instead trace to the publications and official documentation above.

## Conflicts

- Matt's comparator recommends repeated stress and injected sleeps for
  nondeterministic bugs. CHESS shows that stress coverage is unpredictable for
  concurrency defects. Repetition and perturbation should be described as
  amplification and evidence capture, with controlled schedule replay preferred
  when available—not as proof of cause.
- Differential results are candidates, not automatically bugs: comparable
  systems may legitimately differ where behaviour is unspecified.
- curl's failure options do not fully classify application correctness and have
  documented HTTP authentication exceptions. An HTTP debugging script needs an
  explicit symptom oracle.
- Retries can reveal a flaky failure rate, but a passing retry is not repair
  verification. Playwright explicitly categorises fail-then-pass as “flaky”
  ([Playwright retries](https://playwright.dev/docs/test-retries)).

## Limitations

- Technique effectiveness depends on a valid oracle. No general method turns an
  ambiguous expected behaviour into a reliable failing signal.
- Systematic schedulers, profilers, tracing, browser automation, and fuzzers are
  ecosystem-dependent. The skill should name the technique and let repository
  context select the tool.
- Performance measurements remain environment-sensitive even with warmup and
  repetition; a local regression threshold may not represent production.
- Production captures can contain secrets or personal data. Any eventual
  reference should require minimisation and safe handling under repository and
  user permissions.
- The recommendation has not yet been acceptance-tested against a drafted
  `TECHNIQUES.md`; that belongs to the authoring decision if the user approves
  the change.

## Method

On 2026-07-14, the investigation inspected the current `debug` bundle, its plan,
the host's skill-section rules, and the two user-supplied comparators. Source
discovery then followed claims to original publications and current official
tool/project documentation. Evidence was triangulated across signal
construction, input reduction, bisection, differential testing, concurrency,
measurement, tracing, and replay. Comparator claims lacking primary support
were excluded. Conflicts were tested by looking for conditions under which a
technique fails—especially missing oracles, legitimate differential outputs,
noisy benchmarks, and nondeterministic schedules.

## Primary sources

- [Simplifying and Isolating Failure-Inducing Input](https://www.st.cs.uni-saarland.de/papers/tse2002/) — Zeller and Hildebrandt, IEEE TSE 28(2), 2002; delta debugging and automated minimisation.
- [Differential Testing for Software](https://www.cs.tufts.edu/comp/150FP/archive/bill-mckeeman/DifferentailTesting.pdf) — McKeeman, Digital Technical Journal 10(1), 1998; comparable-system oracles and limitations.
- [CHESS: A Systematic Testing Tool for Concurrent Software](https://www.usenix.org/legacy/event/osdi08/tech/full_papers/musuvathi/musuvathi_html/index.html) — Musuvathi, Qadeer, and Ball, OSDI 2008; deterministic schedule exploration and replay.
- [An Empirical Analysis of Flaky Tests](https://huang.isis.vanderbilt.edu/cs8395/paper/flakytest.pdf) — Luo et al., FSE 2014; manifestation and repair patterns for nondeterministic tests in an Apache-project sample.
- [QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs](https://research.chalmers.se/en/publication/237427) — Claessen and Hughes, ICFP 2000; property-based generated testing and pitfalls.
- [Dapper, a Large-Scale Distributed Systems Tracing Infrastructure](https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/) — Sigelman et al., Google, 2010; cross-component behavioural and performance tracing.
- [Git bisect documentation](https://git-scm.com/docs/git-bisect) — Git project, current documentation accessed 2026-07-14; automated good/bad predicates.
- [curl manual](https://curl.se/docs/manpage.html) — curl project, current manual accessed 2026-07-14; HTTP scripting, exit behaviour, and limitations.
- [Playwright assertions, HAR replay, and retries](https://playwright.dev/docs/test-assertions) — Microsoft Playwright project, current documentation accessed 2026-07-14; browser oracles, captured-network replay, and flaky classification.
- [libFuzzer documentation](https://llvm.org/docs/LibFuzzer.html) — LLVM project, current documentation accessed 2026-07-14; narrow deterministic fuzz targets, saved reproducers, minimisation, and regression replay.
- [Google Benchmark user guide](https://github.com/google/benchmark/blob/main/docs/user_guide.md) — Google Benchmark project, current documentation accessed 2026-07-14; warmup, repetition, and variance reporting.
- [OpenTelemetry context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) — OpenTelemetry project, current documentation accessed 2026-07-14; cross-boundary signal correlation.
- [Skill Sections](../../skills/write-skill/references/SECTIONS.md) and [Propulsion Skills Plan](../../SKILLS_PLAN.md) — repository authorities accessed 2026-07-14; progressive disclosure and resource placement.
