# Architecture Review Report Design

Use this reference when generating and visually verifying the architecture
review HTML. The report is a decision tool, not a static audit or a wall of
technical prose.

## Information Architecture

Use one HTML document with this reading order:

1. **Header** — title, review date, scope, exclusions, evidence confidence, and
   a one-sentence outcome.
2. **Current architecture** — a concise capability and boundary overview with a
   diagram only when it improves understanding.
3. **Recommendations** — the complete ranked set as comparable summary cards,
   followed by filters and progressive detail. A zero-result state plainly says
   that no redesign crossed the evidence threshold.
4. **Review coverage** — areas examined without a qualifying redesign and any
   evidence limitations.
5. **Method and sources** — repository evidence conventions, invoked research
   reports, generation time, and visual-verification status.

The initial viewport should explain the result and expose the ranked
recommendations without requiring detailed reading. Preserve the ranking as the
default view. When several recommendations exist, allow filtering by affected
capability, impact, effort, risk, and confidence; show the visible count and
provide a clear reset.

## Recommendation Design

Make every collapsed card comparable through:

- rank and action-led title;
- one-sentence evidenced problem;
- target module or boundary;
- expected quality improvement;
- impact, effort, risk, and confidence labels;
- affected capabilities or contracts;
- smallest useful first slice.

Its expanded detail contains:

- observed evidence with repository-relative paths and precise locations;
- current and target boundary diagrams where useful;
- the hidden knowledge and proposed public contract;
- framework and runtime fit;
- the alternative considered and why it lost;
- benefits, costs, risks, and unresolved uncertainty;
- dependencies, migration stages, coexistence, and containment or rollback;
- fitness checks with expected results;
- links to any durable research report.

Use plain language in summaries and retain exact technical names in evidence.
Do not hide a recommendation's main cost, risk, or uncertainty inside the
expanded content.

## Visual and Interaction Language

Use strong hierarchy, generous spacing, readable line lengths, restrained
colour, and consistent cards and labels. Paths, symbols, and contracts may use a
monospace face. Use colour to reinforce meaning, never to carry it alone. Avoid
decoration that competes with comparison or implies unsupported precision.

Scripts, styles, fonts, and diagram libraries may load from CDNs when they help
the current report. Tailwind and Mermaid are suitable defaults:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose',
    });
</script>
```

The artifact must be one generated HTML file, but it need not work offline or
preserve CDN compatibility indefinitely. Verify every selected dependency in
the rendered report at generation time. Escape repository-derived text before
placing it in HTML, attributes, scripts, or diagram definitions.

Prefer semantic HTML controls and disclosure elements. Filters update results
immediately, preserve an obvious current state, and remain operable without a
pointer. Avoid interactions whose only purpose is visual novelty.

## Diagrams

Use a diagram when boundaries, dependency direction, runtime flow, or migration
stages are materially clearer visually. Choose the smallest fitting form:

- a dependency or boundary graph for current and target modules;
- a flow or sequence for a quality scenario;
- a before-and-after comparison for changed ownership;
- a staged flow for incremental migration.

Give each diagram one question to answer. Keep nodes few, labels short, arrows
directional, and current and target semantics consistent. Place a concise text
explanation beside it, label the relationship in prose, and do not rely on
colour alone. Avoid ornamental system maps and unreadable whole-repository
graphs.

## Accessibility and Layout

- Use semantic landmarks, ordered headings, labelled controls, buttons for
  actions, and native disclosure where practical.
- Make every interaction keyboard-operable with a visible focus indicator and
  logical focus order.
- Maintain readable text and non-text contrast and pair colour with words,
  shapes, or symbols.
- Give tables headers, diagrams accessible names and adjacent explanations, and
  icon-only controls accessible labels.
- Reflow cards, filters, diagrams, and evidence at narrow widths without hiding
  content or requiring page-level horizontal scrolling.
- Provide print styles that expand recommendation detail, remove interactive
  chrome, preserve diagrams and evidence, and avoid splitting short cards
  unnecessarily.

## Visual QA

Inspect the actual file rather than inferring appearance from source:

1. Open it with network access and confirm every external script, style, font,
   and diagram dependency loads without a material error.
2. Check the overview, the report's actual zero-or-many recommendation state,
   filters, reset, and every collapsed and expanded state.
3. Exercise controls with pointer and keyboard; verify focus visibility, order,
   labels, and no keyboard trap.
4. Inspect desktop and narrow viewports for hierarchy, wrapping, overflow,
   diagram readability, and content order.
5. Check that labels and diagrams remain understandable without colour and that
   evidence paths are legible.
6. Inspect print preview for expanded detail, clipping, missing diagrams, and
   wasteful page breaks.

Correct material defects and rerun affected checks. If browser inspection is
unavailable, validate document structure and scripts as far as the environment
allows, then mark visual acceptance incomplete in both the report and handoff.
