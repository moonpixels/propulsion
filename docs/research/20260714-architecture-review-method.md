---
title: 'Architecture review method and interactive report design'
createdAt: 2026-07-14
updatedAt: 2026-07-15
status: current
---

# Architecture review method and interactive report design

## Research question and scope

**Question:** Which established methods should govern Propulsion's
`review-architecture` skill, how should it select high-value redesigns from a
codebase, and what interaction and accessibility criteria should govern its
self-contained HTML report?

**Intended use:** Support the confirmed `review-architecture` skill and its
progressively disclosed analysis and report-design references.

**Scope:** Static repository inspection, context-aware modular redesign,
quality-attribute trade-offs, incremental migration, architecture fitness
evidence, information visualisation, and accessible HTML. A formal stakeholder
ATAM workshop, implementation of recommendations, framework-specific design
rules, and proof of business priority from source code alone are excluded.

## Conclusion

**Information hiding** is the strongest governing methodology. It gives the
review a concrete unit of analysis: difficult or change-prone design decisions
should be hidden behind cohesive module contracts. **Deep modules** operationalise
the desired result, while **design it twice** prevents the first plausible
decomposition from becoming the recommendation by default.

Use a lightweight adaptation of **ATAM** to rank candidates against evidenced
quality-attribute scenarios and expose risks and trade-offs. The review should
inspect all in-scope architecture and report every redesign whose benefit,
reach, feasibility, and confidence justify action without imposing a minimum or
maximum count. Every retained recommendation should include an incremental
migration path and an observable fitness check.

Two references are justified:

- `references/architecture-analysis.md` should hold the conditional diagnostic,
  alternative-design, ranking, migration, and fitness guidance;
- `references/report-design.md` should hold the stable HTML information
  architecture, visual language, interaction, accessibility, and visual-QA
  contract.

The common inspection-to-report sequence belongs in `SKILL.md`. A reusable
HTML asset or generator script is not yet justified: the report structure is
stable, but its diagrams and evidence are codebase-specific, and the existing
plan explicitly assigns `report-design.md` to this skill.

## Findings

### Information hiding supplies the governing decomposition criterion

Parnas rejects decomposition by processing order and instead starts from
difficult or likely-to-change design decisions, assigning modules that hide
those decisions from one another
([Parnas, 1972](https://www.cs.umd.edu/class/spring2003/cmsc838p/Design/criteria.pdf)).
This directly matches the intended review targets: leaked implementation,
shallow interfaces, weak boundaries, and harmful change propagation.

Ousterhout's Stanford notes make the same criterion operational: a module has
an interface and implementation; information leakage occurs when other modules
depend on implementation knowledge; and bringing leaked knowledge together can
produce a simpler, deeper interface
([modular design notes](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php%3Ftopic%3DmodularDesign)).
His course review explicitly includes deep and shallow classes, information
hiding, dependencies, and design it twice as linked design ideas
([course review](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter20/lecture.php?topic=bookReview)).

**Inference:** the review should map capabilities and contracts rather than
equating modules with directories, files, classes, or services. For each
candidate boundary it should identify the knowledge or design decision being
hidden, the consumers that should depend on the contract, and the details that
should move behind it. A candidate is weaker when it merely adds a layer,
renames folders, or redistributes code without reducing exposed knowledge or
change propagation.

### Quality scenarios turn general preferences into prioritised redesigns

ATAM translates business context into quality-attribute scenarios described by
a stimulus and desired response, prioritises them by mission importance and
perceived risk, traces the highest-priority scenarios through architectural
approaches, and identifies risks, sensitivity points, and trade-off points
([SEI report](https://www.sei.cmu.edu/documents/629/2000_005_001_13706.pdf)).
For modifiability, it measures response through affected components,
connectors, interfaces, and change effort.

The skill cannot run a formal stakeholder workshop from repository evidence
alone. It can still apply the useful core:

1. recover explicit quality drivers from product context, decisions,
   operational configuration, tests, incidents, and repeated change patterns;
2. express relevant drivers as concrete change or runtime scenarios;
3. trace each scenario through modules, contracts, data, and runtime boundaries;
4. label inferred drivers and uncertain priorities rather than presenting them
   as stakeholder-confirmed facts;
5. compare at least two materially different boundaries for every serious
   candidate before selecting a target design;
6. rank candidates by evidenced quality impact, architectural reach or
   recurrence, migration feasibility and risk, and confidence in the evidence.

This preserves ATAM's trade-off discipline without pretending a static review
has stakeholder authority it does not possess. Recommendation count should be
determined only by the qualifying evidence, including zero findings; ties should
favour higher confidence and an independently deliverable first slice.

### Supporting principles are diagnostics and conditional patterns

The supporting concepts should not become an architecture-pattern checklist.
Their useful roles are distinct:

- **Cohesion and coupling** test whether knowledge that changes together is
  gathered behind one contract and whether consumers know more than that
  contract requires. **Single responsibility principle** sharpens the same
  question around actors or reasons for change
  ([Martin's formulation](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)).
- **Dependency inversion** is relevant when policy depends directly on a
  volatile mechanism. **Ports and adapters** is a candidate only when a
  purposeful application conversation needs multiple technologies, isolated
  tests, or an inside/outside boundary; Cockburn explicitly defines ports by
  purposeful conversations and adapters by technology translation
  ([original article](https://alistair.cockburn.us/hexagonal-architecture)).
- **Seams** identify places where behaviour can be verified or a dependency
  replaced during migration. They are evidence of incremental feasibility, not
  a reason to introduce an interface everywhere.
- **Strangler fig** is appropriate when a high-risk existing boundary must be
  replaced gradually rather than through a big-bang rewrite
  ([Fowler's updated description](https://martinfowler.com/bliki/StranglerFigApplication.html)).
- **Architecture fitness functions** turn a claimed improvement into objective,
  repeatable feedback. They may be structural dependency checks, contract or
  scenario tests, performance thresholds, security checks, or operational
  signals; the measure must correspond to the quality claim
  ([Thoughtworks](https://www.thoughtworks.com/en-gb/insights/articles/fitness-function-driven-development)).

**Inference:** every recommendation should say why its selected pattern fits
this codebase and name a credible alternative it rejected. A recommendation
that invokes a fashionable pattern without evidence of the problem it solves
should be discarded.

### The report should support comparison before deep reading

Shneiderman's visual information-seeking method begins with an overview, then
zooming and filtering, then details on demand
([1996 paper](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf)).
This fits the report's decision task: a reader first needs the ranked overview,
then comparison by impact, effort, risk, confidence, or affected capability,
then evidence and migration detail for one recommendation.

The initial view should therefore contain the review scope, evidence confidence,
current-system overview, and compact recommendation cards. Each card should
make the problem, target boundary, expected improvement, cost, risk, and first
slice comparable without expansion. Details should disclose the evidence,
affected contracts, rejected alternative, migration stages, dependencies,
fitness checks, and source locations. Diagrams should communicate boundary and
dependency changes; prose should remain the fallback when a diagram is not the
clearest representation.

The confirmed project constraint is one generated HTML file, not offline or
dependency-free operation. It may load current CDN scripts and styles such as
Tailwind and Mermaid when they improve the report, without a graceful-degradation
or long-term compatibility requirement. Visual QA must verify those dependencies
at generation time. WCAG 2.2 requires keyboard operation for all functionality,
and W3C guidance also calls for visible focus, adequate contrast, consistent
interactive styles, and information that does not rely on colour alone
([WCAG 2.2](https://www.w3.org/TR/WCAG22/),
[WAI design guidance](https://w3c.github.io/wai-website/tips/designing/)).

Visual QA should verify the generated artifact at desktop and narrow viewport
sizes, exercise every control by keyboard, inspect default and expanded states,
check overflow and print output, and confirm that diagrams and evidence remain
understandable without colour. Source links and paths should resolve where the
runtime permits; missing tools should be reported as an explicit verification
limitation rather than silently skipped.

## Conflicts

- Single responsibility, dependency inversion, ports and adapters, and the
  strangler fig pattern can all improve a design, but applying them as universal
  rules can add shallow interfaces and indirection. Information hiding remains
  authoritative; the patterns are conditional candidate designs.
- A codebase may evidence technical quality drivers but not their true business
  priority. The report must distinguish explicit context from reviewer
  inference and lower confidence accordingly.
- Quantitative architecture metrics can create false precision. Ranking should
  be an explained comparison supported by source evidence, not an opaque score
  whose arithmetic substitutes for judgment.

## Limitations

- The primary source for deep modules and design it twice is split between a
  commercial book and the author's Stanford course notes. The notes confirm the
  concepts and their relationship but do not reproduce the book's full
  treatment.
- Forward testing generated and structurally validated an interactive
  architecture report, including its filters and unavailable-browser branch.
  Actual browser rendering and the optional CDN dependency path remain
  unverified because the available browser blocked the local report URL.
- Framework-specific constraints change over time. The eventual skill should
  invoke `research` only when a recommendation materially depends on external
  framework, language, platform, or architecture evidence that deserves a
  durable cited record.

## Method

On 2026-07-14, the investigation inspected `SKILLS_PLAN.md`, `CONTEXT.md`, the
target bundle, the authoring contract, the skill-section rules, and the current
research template. It then followed concepts in the plan to original papers,
authors' publications, official institutional reports, and W3C standards.
Evidence was compared across module decomposition, alternative design,
quality-attribute evaluation, migration, continuous verification, information
visualisation, and accessibility. The proposed workflow was falsified against
three risks: pattern-driven overdesign, false stakeholder certainty, and an
interactive report that hides rather than clarifies evidence.

## Primary sources

- [On the Criteria To Be Used in Decomposing Systems into Modules](https://www.cs.umd.edu/class/spring2003/cmsc838p/Design/criteria.pdf) — David L. Parnas, Communications of the ACM 15(12), 1972; information-hiding decomposition.
- [Modular Design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php%3Ftopic%3DmodularDesign) — John Ousterhout, Stanford CS 190 lecture notes, 2018; deep interfaces and information leakage.
- [Discussion of A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter20/lecture.php?topic=bookReview) — John Ousterhout, Stanford CS 190 lecture notes, 2020; deep modules and design it twice.
- [ATAM: Method for Architecture Evaluation](https://www.sei.cmu.edu/documents/629/2000_005_001_13706.pdf) — Kazman, Klein, and Clements, CMU/SEI-2000-TR-004, 2000; quality scenarios, risk, and trade-offs.
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture) — Alistair Cockburn, original 2005 article; purpose-led ports and technology adapters.
- [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) — Robert C. Martin, 2014; actors, reasons for change, cohesion, and coupling.
- [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html) — Martin Fowler, updated 2024; gradual legacy replacement.
- [Fitness function-driven development](https://www.thoughtworks.com/en-gb/insights/articles/fitness-function-driven-development) — Paula Paul and Rosemary Wang, Thoughtworks, 2019; objective architectural feedback.
- [The Eyes Have It](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf) — Ben Shneiderman, IEEE Symposium on Visual Languages, 1996; overview, filtering, and details on demand.
- [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) — W3C Recommendation, 2023; interaction and presentation accessibility requirements.
- [Designing for Web Accessibility](https://w3c.github.io/wai-website/tips/designing/) — W3C Web Accessibility Initiative, accessed 2026-07-14; practical focus, contrast, colour, and interaction guidance.
