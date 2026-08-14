---
name: research
description: Researches material questions using critically appraised sources and persists verified cited reports. Use when a trustworthy answer must survive the session.
metadata:
    invocation: model
disable-model-invocation: false
---

# Research

Turns a scoped material question into a trustworthy report while a fresh agent contains the investigation context.

## Process

### 1. Define the research contract

Define the research question, intended use, scope, exclusions, currency needs, and domain evidence constraints. Inspect task-relevant repository context and `docs/research/` for related reports before searching. Resolve ambiguity that could materially change the investigation. When the contract requires a formal research, appraisal, or reporting method, consult its current authoritative guidance, apply the controls the investigation can satisfy, and disclose every unmet prerequisite instead of claiming conformance. The research contract and applicable prior evidence are explicit.

### 2. Assign the investigation

Give one fresh agent the complete research contract, relevant repository context, evidence rules, and report contract. It owns discovery, appraisal, synthesis, and report writing; the caller later verifies and reads the finished report. The investigation context remains outside the caller.

### 3. Discover and appraise the evidence

Identify the material claims the answer must establish and select the source type capable of establishing each one. Trace every material claim to the source that owns it, such as a standard, official documentation or source code, an original study or dataset, or an originator's work. Rigorous syntheses may support discovery and interpretation; unverified commentary may locate, interpret, or challenge original evidence but carries no independent evidential weight.

Apply **critical appraisal** to determine what each source can establish and the trust it warrants. Assess authority and access to the fact, methodological or technical validity, currency, applicability, completeness, incentives or bias, and consistency with the underlying evidence. Treat an originator as authoritative for the method they define, not as proof that the method produces a claimed effect. When a material source participates in a citation graph, apply **citation searching** backward to cited originals and forward to later validation, correction, extension, or criticism; keep it supplementary to direct discovery. The evidence set is relevant, current enough for the question, and traceable.

### 4. Synthesize the findings

Corroborate material conclusions through genuinely independent evidence routes, treating sources that repeat one upstream claim as one route. Seek contrary evidence, plausible alternatives, and conditions that would change the conclusion; distinguish missing evidence from evidence against. Separate evidence, inference, conflict, and unknowns, and qualify conclusions when the evidence cannot support a stronger answer. Stop discovery when each material claim is supported or explicitly unresolved and further trustworthy source work is unlikely to change the answer. Every material finding is proportionate to the evidence.

### 5. Write the research report

Persist the result at `docs/research/YYYYMMDD-{research-title}.md` using [the research report template](assets/research-report-template.md). Use a concise lowercase hyphenated title, retain only applicable lineage fields, complete every stable section, and structure `Findings` for the subject. Give material claims direct links to the evidence that supports them. Record the research date, material search locations or approaches, evidence selection, appraisal and synthesis basis, important deviations, and verification constraints without retaining the raw search trail. When related research already exists, apply [the research report lifecycle](references/REPORT-LIFECYCLE.md). The report is concise, inspectable, and proportionate to its evidence.

### 6. Verify and hand off

The caller verifies that every material claim is supported by the cited source, evidence routes are genuinely independent, contrary evidence and uncertainty are visible, every link and relative report path resolves, and the recorded method makes the investigation inspectable. Return the report path, concise concrete findings, and unresolved limitations. The report owns the evidence; the caller owns every resulting decision or downstream mutation.
