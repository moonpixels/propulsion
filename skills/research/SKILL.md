---
name: research
description: Researches questions against high-trust primary sources and persists cited reports. Use when a durable evidence-backed answer is needed.
metadata:
    invocation: model
disable-model-invocation: false
---

# Research

**Rapid evidence assessment** turns a scoped question into an auditable report grounded in high-trust primary sources.

## Process

### 1. Define the research contract

Define the research question, intended use, scope, exclusions, currency needs, and source hierarchy. Inspect task-relevant repository context and `docs/research/` for related reports before searching. Resolve ambiguity that could materially change the investigation. The research contract and applicable prior evidence are explicit.

### 2. Assign the investigation

Give a fresh agent the complete research contract, relevant repository context, primary-source standard, and output contract. One fresh agent owns source discovery, appraisal, synthesis, and report writing; the caller verifies the finished report.

### 3. Discover and appraise primary evidence

Discover the strongest applicable primary evidence, including official documentation, source code, standards, original publications, first-party APIs, and first-party data. Use secondary sources only as discovery leads, then apply **backward citation searching** to trace material claims to their originals. Critically appraise authority and access, validity, currency, applicability, completeness, and bias. Primary-source status sets the hierarchy; appraisal determines the trust warranted. The evidence set is relevant, current enough for the question, and traceable.

### 4. Synthesize the findings

Compare independent evidence through **triangulation**, treating sources that repeat the same upstream claim as one evidence route. Test emerging conclusions through **falsification** by seeking contrary evidence and plausible alternatives. Distinguish direct evidence, inference, conflict, and unknowns; narrow or qualify conclusions when the evidence cannot support a stronger answer. Stop discovery when each material claim is supported or explicitly unresolved and further primary-source work is unlikely to change the answer. Every material finding is proportionate to the evidence.

### 5. Write the research report

Persist the result at `docs/research/YYYYMMDD-{research-title}.md` using [the research report template](assets/research-report-template.md). Use a concise lowercase hyphenated title and claim-level links to primary evidence. Replace every placeholder, retain only applicable lifecycle fields, and complete every applicable section. Record the research date, material search locations or approaches, appraisal basis, and synthesis method for **auditability** without retaining the raw search trail. When related research already exists, apply [the research report lifecycle](references/REPORT-LIFECYCLE.md). The report is concise, auditable, and proportionate to its evidence.

### 6. Verify and hand off

Verify that each material claim is supported by its cited primary source, evidence routes are genuinely independent, every link and relative report path resolves, conflicts and uncertainty are visible, and the recorded method makes the investigation auditable. Return the report path, concise concrete findings, and unresolved limitations to the caller. The caller receives a validated durable result without the raw search context.
