---
name: research
description: Investigates questions against primary sources and persists cited findings. Use when research, documentation, API facts, or reading legwork needs a durable report.
metadata:
    invocation: model
disable-model-invocation: false
---

# Research

**Evidence synthesis** turns a scoped question into a reproducible repository report whose material claims trace to primary sources.

## Process

### 1. Define the research contract

Define the research question, intended use, scope, exclusions, currency needs, and source hierarchy. Inspect task-relevant repository context and `docs/research/` for related reports before searching. Resolve any ambiguity that could materially change the investigation; the research contract and applicable prior evidence are explicit.

### 2. Assign the investigation

When the host supports background agents, delegate source discovery, appraisal, synthesis, and report writing with the complete research contract, relevant repository context, primary-source standard, and output contract. Continue only independent caller work while it runs, then validate its result. Perform the workflow inline when delegation is unavailable or fails, and repair an invalid delegated result before handoff. One researcher owns the investigation and report at a time.

### 3. Discover primary evidence

Discover the strongest applicable primary evidence, including official documentation, source code, standards, original publications, first-party APIs, or first-party data. Use secondary sources only to locate originals. Apply **source criticism** to authority, proximity, currency, applicability, and stability; use **citation chaining** to reach the evidence behind material claims. The evidence set is relevant, current enough for the question, and traceable.

### 4. Synthesize the findings

Compare independent evidence through **triangulation** and test emerging conclusions through **falsification**. Distinguish direct evidence, inference, conflict, and unknowns; narrow or qualify conclusions when the evidence cannot support a stronger answer. Stop discovery when each material claim is supported or explicitly unresolved and further primary-source work is unlikely to change the answer. Every material finding is proportionate to the evidence.

### 5. Write the research report

Persist the result at `docs/research/YYYYMMDD-{research-title}.md` using [the research report template](assets/research-report-template.md). Use a concise lowercase hyphenated title and claim-level links to the primary evidence. Replace every placeholder and retain only applicable lifecycle fields. Complete every applicable template section and record enough method and source detail for **reproducibility**, but omit the raw search trail. When a distinct report already occupies the same dated path, append `-2` to the filename slug and increment it until available without changing the frontmatter title or H1.

### 6. Preserve provenance

Preserve **provenance** when related research already exists. Apply a minor correction in place only when it repairs wording, formatting, or the link to the same evidence without changing a material claim; retain `createdAt` and change `updatedAt`. New evidence, changed scope, or a materially changed finding creates a new dated snapshot with `supersedes`; mark the previous snapshot `superseded` and add its relative `supersededBy` link without rewriting its historical findings. The report history distinguishes correction from substantive refresh.

### 7. Verify and hand off

Verify that each material claim is supported by its cited primary source, every link and relative report path resolves, conflicts and uncertainty are visible, and the recorded method can reproduce the investigation. Return the report path, concise concrete findings, and unresolved limitations to the caller. The caller receives a validated durable result without the raw search context.
