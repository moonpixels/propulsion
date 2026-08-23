---
name: research
description: Investigates a material subject against high-trust sources and writes a trusted cited report. Use when a material question needs durable external evidence.
metadata:
    type: utility
disable-model-invocation: true
---

# Research

Investigates a material subject in a fresh agent and hands back a trusted report for the consumer to synthesize.

## Process

### 1. Fix the subject and scope

Use the request and caller context to state what the research is for and what it covers. Resolve discoverable scope without questioning. Ask the user only when an ambiguity could materially change the investigation. Treat every invocation as standalone; do not inspect or maintain previous research reports.

Use `docs/research/` as the default output directory unless the caller specifies another destination. Keep the investigation within authorised read and report-write boundaries.

### 2. Start the fresh investigation

Start exactly one fresh agent with the fixed subject and scope, relevant task-local evidence, available source tools, output destination, source rules, report template, and stopping rule. Do not supply a desired answer. The fresh agent owns discovery, source appraisal, thematic organisation, report writing, and report verification as one evidence chain; it does not delegate the investigation again.

Require the fresh agent to:

- identify the material claims and areas needed to cover the scope, then select source types capable of establishing each one;
- prefer primary, original, official, or owning sources; use an authoritative secondary source when it is itself appropriate to the claim, and trace its material claims to original evidence where possible;
- treat authority as claim-relative: an originator can establish what a practice says, but that alone does not prove its effectiveness;
- corroborate material claims through genuinely independent evidence routes where available, and seek credible disagreement, contrary evidence, and important gaps;
- appraise what each source can establish, including its authority, validity, currency, applicability, completeness, incentives, and consistency with underlying evidence;
- distinguish sourced fact from material inference and distinguish missing evidence from evidence against; and
- stop when the scope has adequate high-trust coverage, conflicts and limitations are recorded, and further searching is unlikely to add materially different findings.

### 3. Write the report

Create a new standalone Markdown report using [the research report template](assets/research-report-template.md). Organise `Findings` by human-readable themes rather than by source. Cite every material claim with numbered references such as `[1]`, reuse a source's number, and provide the matching numbered links under `Sources`.

Write for human readers. Use natural language, varied sentence length, short coherent paragraphs, descriptive subheadings, and restrained bold, italics, lists, or tables where they improve comprehension. Identify material inference explicitly.

Keep the five template sections. `Scope` only explains what the research was for and what subject or information need it covered. Give each conflict and limitation its own paragraph; state `None identified.` when applicable.

### 4. Verify the trusted report

Require the fresh agent to re-read the finished report and verify that every material claim is supported by its cited source; citations and source numbers resolve; links open to the identified evidence; independent routes are not duplicate retellings of one upstream claim; conflicts, limitations, and material inferences are visible; all five sections are present; and the writing is coherent and easy to navigate. It corrects report defects before returning.

## Handoff

Return only the finished report path to the user or caller. Retain none of the investigation transcript in the calling thread and require no duplicate caller verification. Stop after handoff; the consumer owns every overall synthesis, conclusion, recommendation, decision, and downstream mutation.
