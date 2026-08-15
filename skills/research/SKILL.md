---
name: research
description: Researches one material question through critically appraised evidence and persists a verified cited report. Use when the answer must survive the current conversation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Research

Answers one material question with critically appraised evidence and persists the result as a verified cited report.

## Process

### 1. Define the research contract

Define the research question, intended downstream use, scope, currency needs, and evidence constraints. Inspect task-local and project evidence, including related reports in `docs/research/`, before discovery. Resolve available facts and expose any material missing scope or evidence constraint rather than silently widening the investigation. The fixed research contract and applicable prior evidence are explicit.

### 2. Assign the investigation

Give one fresh research agent the fixed contract, relevant runtime evidence, evidence rules, and report contract without a desired conclusion. It owns discovery, critical appraisal, synthesis, and report writing as one evidence chain. The caller later reads and verifies the finished report.

### 3. Discover and appraise the evidence

Identify the material claims the answer must establish and select source types capable of establishing each one. Prefer primary and high-authority sources; use secondary sources for discovery or when they are the appropriate evidence for the claim. Trace every material claim to citations the caller can verify.

Apply **critical appraisal** to determine what each source can establish and the trust it warrants. Assess authority and access to the fact, methodological or technical validity, currency, applicability, completeness, incentives or bias, and consistency with the underlying evidence. Treat an originator as authoritative for the method they define, not as proof that the method produces a claimed effect. When a material source participates in a citation graph, apply **citation searching** backward to cited originals and forward to later validation, correction, extension, or criticism; keep it supplementary to direct discovery. The evidence set is relevant, current enough for the question, and traceable.

### 4. Synthesize the findings

Corroborate material conclusions through genuinely independent evidence routes, treating sources that repeat one upstream claim as one route. Seek contrary evidence, plausible alternatives, and conditions that would change the conclusion; distinguish missing evidence from evidence against. Separate supported evidence, inference, conflicts, contrary evidence, and unknowns. When credible evidence is insufficient, give an honest limited or unresolved conclusion. Stop discovery when each material claim is supported or explicitly unresolved and further trustworthy source work is unlikely to change the answer. Every material finding is proportionate to the evidence.

### 5. Write the research report

Persist the result at `docs/research/YYYYMMDD-{research-title}.md` using [the research report template](assets/research-report-template.md). Use a concise lowercase hyphenated title, retain only applicable lineage fields, complete every stable section, and structure `Findings` for the subject. Give material claims direct links to the evidence that supports them. Record the research date, material search locations or approaches, evidence selection, appraisal and synthesis basis, important deviations, and verification constraints without retaining the raw search trail. When related research already exists, apply [the research report lifecycle](references/REPORT-LIFECYCLE.md). The report is concise, inspectable, and proportionate to its evidence.

### 6. Verify and hand off

The caller reads the report and verifies that every material claim is supported by the cited source, evidence routes are genuinely independent, conflicts, contrary evidence, and uncertainty are visible, every link and relative report path resolves, and the recorded method makes the investigation inspectable. Return the report path, concise conclusion, conflicts and limitations, and verification performed. Stop there: the report owns the evidence, while the caller owns every resulting product, methodology, architecture, implementation, or other downstream decision and mutation.
