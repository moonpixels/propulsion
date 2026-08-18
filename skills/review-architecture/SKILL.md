---
name: review-architecture
description: Assesses an explicitly bounded codebase area for a few high-value architecture improvements and reports the evidence without changing implementation. Use for architecture or maintainability reviews.
metadata:
    invocation: user
disable-model-invocation: true
---

# Review Architecture

Produces one canonical Markdown assessment and a user-friendly disposable HTML explanation of the highest-value structural improvements in an explicitly bounded codebase area. It preserves the reviewed implementation and stops before detailed redesign, tickets, or delivery work.

## Process

### 1. Bound and freeze the review

Inspect the request, repository guidance, available tools, and current repository state. Establish the explicit codebase scope, exclusions, review purpose, applicable architecture or maintainability qualities, and any user-held priority that could change qualification or rank. Do not silently expand an ambiguous scope to the whole repository. Ask only for missing scope or priority that cannot be discovered and would materially change the result.

Capture the reviewed revision and starting worktree state. Read root `ARCHITECTURE.md`, `CONTEXT.md`, applicable ADRs and product constraints when present, then inspect only the scoped implementation, tests, contracts, schemas, configuration, history, and operational evidence needed to assess the area. Treat missing or conflicting authorities as limitations unless they prevent a responsible comparison, in which case expose the exact gap. Separate intended constraints, observed implementation, inferences, and unknowns. The review boundary, authorities, evidence baseline, and limitations are explicit before findings are formed.

### 2. Map structural evidence

Map capabilities, owned knowledge, contracts, consumers, dependencies, runtime boundaries, and verification seams instead of equating directories, classes, packages, services, or deployment units with modules. Invoke `$modular-design` with the fixed scope, authorities, and current evidence. Use its findings as passive structural authority for ownership, information hiding, cohesion, coupling, contracts, dependency direction, seams, and change locality; retain responsibility for investigation, candidate comparison, prioritisation, both reports, and stopping.

Trace material pressure to precise current repository locations. Look for rules represented in multiple owners, unstable or leaking contracts, dependencies pointing against established responsibility, changes that repeatedly propagate across boundaries, and regression or operational evidence tied to structure. Use coherent repository history or metrics only to locate and challenge candidates, discounting bulk, generated, renamed, bot-authored, or obsolete changes; neither a metric nor a smell label proves a recommendation. Express a material quality or change pressure as a compact project-evidenced scenario when that makes its stimulus, affected capability, expected response, or observable consequence clearer. The evidence map distinguishes observations, supported inferences, and uncertainty.

Invoke `$research` only when a material external subject needs durable evidence. Read its report before using its findings, and keep that report explicitly within the review scope. Do not import a general architecture method, standard, or universal quality model when project evidence does not make it authoritative.

### 3. Compare and qualify candidates

For every serious candidate, apply **Design It Twice**: compare the current design with at least one materially different responsibility, boundary, contract, or dependency arrangement. Consider the status quo and another credible alternative when either could reasonably win. Do not count naming, file placement, interface syntax, or a straw design as an alternative, and do not elaborate any option beyond what the review decision requires.

Retain a recommendation only when it has all of:

- a material benefit to an explicit constraint or quality;
- exact current repository evidence and a credible causal explanation;
- a clear current and target responsibility, contract, or dependency difference;
- a bounded transition seam, smallest useful step, and containment or recovery route;
- observable verification or fitness evidence for the claimed benefit; and
- costs, trade-offs, risks, alternatives, and material uncertainty visible enough to support a decision.

Reject local cosmetic cleanup, a smell without consequence, speculative abstraction, and a redesign whose expected benefit or transition cannot be evidenced. Zero recommendations is a valid successful result.

Select only the small decision-useful shortlist with the greatest consequence or quality priority, evidence reach, confidence, expected benefit, and migration feasibility. Rank it qualitatively with an explained ordering; do not calculate composite scores or confidence percentages. Record reviewed areas and lower-value candidates that were not retained only to the degree needed to make coverage honest. The shortlist contains the highest-value supported recommendations, not an inventory of conceivable redesigns.

### 4. Resolve the report outcome

Present the material scope, limitations, concise outcome, and proposed ordered shortlist before persistence when a user-authoritative trade-off could still change them. Compare the live choices and let the user decide; do not convert an unavailable preference into an architectural conclusion. Once shared understanding is reached, the invocation authorises both report artifacts without a second application prompt.

### 5. Write the canonical review

Follow the project's existing architecture-review convention. Otherwise write `docs/architecture/YYYYMMDD-{scope-slug}-architecture-review.md`, preserving an unrelated existing file with a numeric suffix unless replacement was explicit. Use **plain language** for the outcome, finding titles, and short `Issue`, `Change`, and `Benefit` summaries while retaining precise project and architecture terms.

Make the report independently useful with:

1. scope, exclusions, reviewed revision, authorities, qualities, and concise outcome;
2. an ordered finding index, or an explicit zero-finding result;
3. for each numbered finding, precise evidence; current and target responsibilities and contracts; benefit; trade-offs, cost, risk, and uncertainty; the rejected alternative or status quo; transition seam, smallest useful step, coexistence or containment; and observable verification or fitness evidence;
4. reviewed coverage, candidates not retained when material, limitations, stale-evidence risk, and any invoked research.

Use a small repository-native diagram only when it materially clarifies a complex ownership, dependency, runtime, or transition relationship. Keep the report at architecture-decision depth: it can support a later decision or body of work, but it is not a file-by-file implementation plan.

### 6. Present the explanatory view

Create a self-contained disposable HTML file in the operating system's temporary directory and open it for the user with an available browser tool. Treat Markdown as canonical and HTML as a linear explanatory view, not a second independently maintained report.

Show the outcome and linked finding index first. Give each numbered finding one section whose always-visible content includes the same title and core `Issue`, `Change`, and `Benefit` claims as Markdown. Add a paired current-and-target visual only when it clarifies the material relationship; stack it without losing correspondence at narrow widths. Put ancillary evidence, alternatives, transition detail, and limitations in native `details` disclosures only when hiding them improves scanning; keep information required to understand or decide the recommendation visible. Use no filters, tabs, nested disclosure, dashboard cards, or JavaScript-dependent controls for the small shortlist.

Keep the page readable as one column, semantic and keyboard-operable, usable without colour, and printable with all content available. Make printing open every native disclosure through a self-contained `beforeprint` behaviour or an equivalent that works while the on-screen disclosures start closed; do not assume print CSS can expose a closed `details` subtree. Escape repository-derived content for HTML, avoid unverified external dependencies, and include the canonical Markdown path, reviewed revision, scope, and limitations. A zero-finding view states the result directly and shows coverage and limitations without empty recommendation furniture.

### 7. Verify and stop

Re-read both artifacts against the frozen evidence. Verify every repository path and material claim, the Markdown structure and links, the minimal matching finding numbers, order, titles, and core claims across artifacts, and the separation between observation, inference, and uncertainty. Recheck the source revision and implementation paths; when material source drift occurred, reassess affected findings or mark the evidence stale rather than presenting it as current.

Inspect the actual HTML in an available browser at ordinary and narrow widths. Exercise native disclosures by pointer and keyboard, check focus, reflow, overflow, diagrams, colour independence, and a print render with every disclosure open, and correct material defects. When browser inspection or printing is unavailable, perform structural and source checks and report the exact visual limitation.

Confirm the reviewed implementation and its existing tests, configuration, architecture, context, product, and feature documents remain unchanged apart from concurrent pre-existing work. Return both report paths, scope and exclusions, finding count and order, invoked research, verification performed, limitations, and any stale evidence. Stop without refactoring, implementing, editing project authorities, creating tickets or specifications, scheduling work, committing, publishing, releasing, or deploying.
