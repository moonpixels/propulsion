# Worker Feedback Prompt Template

Use this template when returning review findings to the active worker subagent in the `execute` skill.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Your work has been reviewed. Verify each finding against the plan, codebase, diff, checks, and workflow rules. Fix valid findings, reject invalid ones with evidence, and escalate unclear ones.

## Review Report

<Copy and paste the full implementation review report, excluding the title, here>

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review the current phase details directly from `plan.md`.
2. Review the full implementation review report.
3. Inspect plan sections, changed files, diff, checks, and codebase context needed to evaluate findings.
4. Triage every review finding as `valid`, `invalid`, or `unclear` before making any code change.
5. If any finding remains `unclear`, STOP and return `Status: unclear` with the information needed.
6. For every `invalid` finding, leave implementation unchanged and prepare evidence-backed pushback.
7. For every `valid` finding, load `tdd`, follow it, and make the minimal correct fix.
8. Load additional recommended skills not already active/present only when needed to validate or fix the work.
9. Verify the implementation works and conforms to the current phase in `plan.md`.
10. Re-evaluate every current-phase acceptance criterion by ID.
11. Return your implementation report in the exact format below.

## Output

Use this exact format for your output.

```markdown
# Implementation Report

**Status**: <done | blocked | unclear>

**Review Feedback Triage**:

- <finding title>
    - Classification: <valid | invalid | unclear>
    - Resolution: <fixed | rejected with evidence | escalated | blocked>
    - Evidence: <brief proof from code, diff, checks, behaviour, plan, workflow rules, or missing context>

**What Changed**:

- <brief bullet points of what was changed, or `- None` if no code changes were needed>

**Checks Run**:

- <command>: <result>
- <command>: <result>

**Files Changed**:

- <brief bullet points of files changed, or `- None` if no files were changed>

**Acceptance Criteria Status**:

- <criterion_id>: <met | not met | unclear>
    - Evidence: <brief proof from diff, test output, behaviour, or missing input>
```

## Rules

These rules are MANDATORY.

- NEVER treat reviewer findings as automatically correct; verify each finding against the real implementation.
- ALWAYS triage every review finding as `valid`, `invalid`, or `unclear` before changing code.
- Status MUST be `unclear` if any finding cannot be triaged after inspecting the plan, codebase, diff, checks, and available evidence.
- Status MUST be `blocked` if a valid finding cannot be fixed because of missing access, failing tooling, contradictory requirements, or another blocker.
- Status CAN ONLY be `done` when every finding is resolved, valid findings are fixed, invalid findings have evidence-backed pushback, and every acceptance criterion is re-evaluated.
- DO NOT change code for invalid findings.
- DO NOT make speculative changes beyond the current phase or review findings.
- ALWAYS use the `tdd` skill to fix valid findings, loading it only when it is not already active or present in context.
- MUST verify implementation against the plan before claiming `Status: done`.
- ENSURE pushback is technical, evidence-based, and specific enough for the reviewer to verify or challenge.
- ALWAYS follow the output structure and section order exactly as specified.

## Completion Gate

Do NOT output your response until ALL items are complete.

- [ ] Current phase details reviewed directly from `plan.md`.
- [ ] Full implementation review report reviewed.
- [ ] Relevant plan sections, changed files, current diff, checks, and codebase context inspected.
- [ ] Every review finding triaged as `valid`, `invalid`, or `unclear` before coding.
- [ ] Every `valid` finding fixed using the `tdd` skill.
- [ ] Every `invalid` finding answered with evidence-backed pushback.
- [ ] Any unresolved `unclear` finding surfaced through `Status: unclear`.
- [ ] Any unresolved implementation blocker surfaced through `Status: blocked`.
- [ ] Relevant verification checks rerun after changes where feasible.
- [ ] Every current-phase acceptance criterion re-evaluated by ID with evidence.
- [ ] Output implementation report in the exact format specified.
````

## Rules

These rules are MANDATORY.

- ALWAYS paste the full review report into `Review Report` before dispatching the worker.
