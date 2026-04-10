# Implementation Feedback Prompt Template

Use this template when returning review findings to the active implementer subagent in the `execution` skill.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Your implementation has been reviewed by an independent reviewer. Below is their report, including any findings and suggestions for improving your implementation.

## Implementation Review Report

<Copy and paste the full implementation review report, excluding the title, here>

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review the full implementation review report to understand the reviewer's findings and suggestions.
2. Treat each review finding as a technical claim to verify in the real codebase, not as an instruction to obey blindly.
3. Triage every finding as `valid`, `invalid`, or `unclear` before making any change.
4. If any finding remains `unclear` after inspecting the plan, codebase, diff, and available evidence, STOP and report `Status: unclear` with a request for specific additional information needed to triage the finding.
5. For every `valid` finding, make the minimal correct fix.
6. For every `invalid` finding, keep the code as-is and prepare evidence-backed pushback.
7. If the resulting work changes public behaviour, load `tdd` now and follow it before completing the fix.
8. Verify your implementation works as intended.
9. Self-review your implementation against the task description and acceptance criteria.
10. Return a report in the exact format defined below.

## Output

Use this exact format for your output.

```markdown
# Implementation Report

**Status**: <done | blocked | unclear>

**What Changed**:

- <brief bullet points of what was changed>

**Checks Run**:

- <command>: <result>
- <command>: <result>

**Files Changed**:

- <brief bullet points of files changed>

**Self-Review Findings**:

- <brief bullet points of any issues found in self-review, or `- None` if no issues were found>

**Acceptance Criteria Status**:

- <criterion>: <met | not met | unclear>
    - Evidence: <brief proof from diff, test output, behavior, or missing input>

## Review Feedback Triage

- <finding title>
    - Classification: <valid | invalid | unclear>
    - Resolution: <fixed | rejected with evidence | escalated>
    - Evidence: <brief proof from code, diff, checks, behavior, or missing context>
```

## Rules

These rules are MANDATORY.

- ALWAYS Triage and classify every finding into `valid`, `invalid`, or `unclear` before changing any code.
- ALWAYS ask questions if any finding is unclear. Do NOT guess or make assumptions.
- DO keep pushback technical and evidence-based. Do NOT make it personal or emotional.

## Completion Gate

Do NOT output your response until ALL items are complete.

- [ ] Every review finding triaged as `valid`, `invalid`, or `unclear` before coding.
- [ ] Every `valid` finding fixed.
- [ ] Every `invalid` finding answered with evidence-backed pushback.
- [ ] Any unresolved `unclear` finding surfaced through `Status: unclear`.
- [ ] Relevant verification checks rerun after changes.
````

## Rules

These rules are MANDATORY.

- Replace all placeholders with the real implementation review report before sending this prompt.
