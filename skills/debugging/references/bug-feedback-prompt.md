# Bug Feedback Prompt Template

Use this template when returning reviewer findings to the active implementer during a bug-fix loop in `debugging`.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Your bug-fix attempt was reviewed independently. Treat the review as technical claims to verify, not instructions to obey blindly.

## Review Report

<paste the full review report here>

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Read the full review report and triage every finding as `valid`, `invalid`, or `unclear`.
2. If any finding is `unclear`, STOP and report exactly what evidence is missing.
3. For each `valid` finding, make the minimal correct fix only if the diagnosis still holds.
4. If any valid finding or new evidence contradicts the diagnosis, STOP, update `debug.md`, and reset back to diagnosis.
5. Keep the regression-test-first requirement intact for any additional code change.
6. Re-run the relevant checks and update `debug.md` with the outcome.
7. Return an implementation report in the exact format defined below.

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

**Diagnosis Status**:

- <still holds | contradicted | unclear>
    - Evidence: <brief proof from `debug.md`, diff, test output, or missing input>

**Review Feedback Triage**:

- <finding title>
    - Classification: <valid | invalid | unclear>
    - Resolution: <fixed | rejected with evidence | escalated>
    - Evidence: <brief proof from code, diff, checks, behavior, or missing context>
```

## Rules

These rules are MANDATORY.

- Triage every finding before changing code.
- Do not continue coding once the diagnosis is contradicted.
- Preserve the one-hypothesis, one-fix-loop discipline.
- Update `debug.md` before handing control back to `debugging`.
- Follow the output format EXACTLY as defined above.
````
