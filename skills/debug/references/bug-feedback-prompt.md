# Bug Feedback Prompt Template

Use this template when returning reviewer findings to the active bug-worker during a bug-fix loop in `debug`.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Your bug-fix attempt was reviewed independently under the `debug` skill. Treat the review as technical claims to verify, not instructions to obey blindly.

## Review Report

<paste the full review report here>

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Read the full review report, current `debug.md`, and active diff.
2. Triage every reviewer finding as `valid`, `invalid`, or `unclear` before changing code.
3. If any finding is `unclear`, STOP and report `Status: unclear` with the missing evidence; do not change code.
4. Confirm every `valid` finding fits the active chosen fix hypothesis and does not require a new hypothesis.
5. If any valid finding or new evidence contradicts the diagnosis, chosen hypothesis, or fix constraints, STOP, update `debug.md`, and reset back to diagnosis.
6. For each valid in-scope finding, make the minimal correction within the active fix hypothesis only.
7. Keep the regression-test-first requirement intact for any additional code change; if no new test is valuable, record the `tdd` rationale and fallback proof.
8. Re-run the relevant checks and update `debug.md` with finding triage, code changes, verification outcome, and diagnosis status.
9. Return an implementation report in the exact format defined below.

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
    - Evidence: <brief proof from code, diff, checks, behaviour, or missing context>
```

## Rules

These rules are MANDATORY.

- Preserve the diagnosis reset and one-hypothesis discipline.
- Triage every finding before changing code.
- Do not continue coding once the diagnosis is contradicted.
- Preserve the one-hypothesis, one-fix-loop discipline.
- Do not start a second fix hypothesis inside feedback handling; if a finding requires one, update `debug.md` and reset back to diagnosis.
- Do not broaden the active fix beyond reviewer findings that fit the chosen fix hypothesis.
- Update `debug.md` before handing control back to `debug`.
- MUST return exactly one `Status:` field with `done`, `blocked`, or `unclear`.
- Follow the output format EXACTLY as defined above.
````
