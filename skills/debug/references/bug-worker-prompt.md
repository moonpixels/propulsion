# Bug Worker Prompt Template

Use this template when starting a fresh bug-worker subagent for one bug-fix loop in `debug`.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Implement exactly one diagnosis-gated bug-fix attempt under the `debug` skill.

## Bug Context

- **Debug artifact**: `<docs/propulsion/.../debug.md>`
- **Chosen fix hypothesis**: `<copy the current fix hypothesis verbatim from debug.md>`
- **Fix constraints**: `<copy the current fix constraints from debug.md>`

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review context; ask if the diagnosis gate, chosen hypothesis, fix constraints, or repo state is unclear.
2. Verify `debug.md` has: exact symptom, reduced repro or flaky classification, full error reading, recent-change conclusion, working example or explicit N/A, boundary tracing, first bad boundary/divergence, fix constraints, chosen fix hypothesis, falsifier, and prior-loop reset evidence if any.
3. If the gate is incomplete, contradicted, or not tied to the hypothesis, STOP and report `Status: blocked` or `Status: unclear`; do not edit production code.
4. Load the `tdd` skill NOW and follow it before any production-code change.
5. Add/update the smallest valuable regression test first and verify the expected failure. If `tdd` declares no valuable test, record the rationale plus strongest fallback verification in `debug.md` before fixing.
6. Implement one minimal fix for the chosen hypothesis within constraints.
7. Re-run regression proof and relevant checks.
8. Update `debug.md` with gate verification, regression-first evidence or no-test rationale, fix attempt, verification, and contradictions.
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
```

## Rules

These rules are MANDATORY.

- MUST return exactly one `Status:` field with `done`, `blocked`, or `unclear`.
- ALWAYS load and follow the `tdd` skill.
- ALWAYS check for relevant non-Propulsion skills and load them IMMEDIATELY.
- Propulsion skills and workflow MUST take precedence over any conflicting non-Propulsion skill UNLESS the user instructions state otherwise.
- NO PRODUCTION CODE before a failing regression test unless `tdd` declares no valuable test and `debug.md` records rationale plus fallback verification.
- Only bug-worker subagents make permanent code changes; debug controller diagnostic edits must be recorded and reverted before fix handoff.
- Work only on the chosen fix hypothesis for this loop; do not broaden or replace it.
- Make one minimal fix attempt only; do not stack speculative fixes.
- If evidence contradicts the diagnosis or chosen hypothesis, STOP, update `debug.md`, and reset back to diagnosis.
- Follow the output format EXACTLY as defined above.
````
