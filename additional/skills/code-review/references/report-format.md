# Report Format

Use this reference when producing the final review report.

Use this exact report shape for both PR review and local fallback review.

If the resolved review scope is empty, still return this exact format.

```markdown
# Review Report

**Scope**: <PR #123 | branch <base>...HEAD | uncommitted changes>

**Intent Summary**: <1-3 sentences describing the change goal from PR context or explicit user intent>

**Final Decision**: <approve | approve-with-comments | request-changes | needs-clarification>

**Critical Findings**

- None

<or>

- <short title>
    - Location: <path:line | scope area>
    - Why it matters: <concrete impact on correctness, security, UX, performance, or maintenance>
    - Evidence: <quoted diff, rule text, precedent, or intent evidence>
    - Recommended action: <smallest safe improvement>

**High Findings**

- None

<or>

- <short title>
    - Location: <path:line | scope area>
    - Why it matters: <concrete impact>
    - Evidence: <quoted diff, rule text, precedent, or intent evidence>
    - Recommended action: <smallest safe improvement>

**Medium Findings**

- None

<or>

- <short title>
    - Location: <path:line | scope area>
    - Why it matters: <concrete impact>
    - Evidence: <quoted diff, rule text, precedent, or intent evidence>
    - Recommended action: <smallest safe improvement>

**Low Findings**

- None

<or>

- <short title>
    - Location: <path:line | scope area>
    - Why it matters: <concrete impact>
    - Evidence: <quoted diff, rule text, precedent, or intent evidence>
    - Recommended action: <smallest safe improvement>

**Nitpicks**

- None

<or>

- <short title>
    - Location: <path:line | scope area>
    - Why it matters: <why this polish is still worth mentioning>
    - Evidence: <quoted diff or precedent>
    - Recommended action: <smallest safe improvement>

**Questions**

- None

<or>

- <short title>
    - Missing context: <exact artefact, assumption, or behaviour still needed>
    - Why it matters: <how this blocks a reliable decision or severity>
    - Evidence checked: <what was already inspected>

**Residual Risk**

- None

<or>

- <short risk>
    - Why it remains: <what could not be fully verified after allowed review steps>
```

## Decision rules

- `approve`: no validated findings and no unanswered blocking questions.
- `approve-with-comments`: only non-blocking validated findings remain.
- `request-changes`: at least one validated blocking finding remains.
- `needs-clarification`: missing context prevents a reliable recommendation.

## Section rules

- Use the exact section names shown above.
- Keep findings grouped by severity in descending order.
- Each finding must include short title, `Location`, `Why it matters`, `Evidence`, and `Recommended action`.
- If the resolved review scope is empty, set `**Final Decision**` to `approve`, explain the empty scope in `**Intent Summary**`, and keep all finding sections as `- None`.
- Put unresolved missing-context items only in `**Questions**`, not in severity groups.
- `**Residual Risk**` covers what could not be fully verified after the allowed review steps, even if no question remains.
- Do not add a positive-notes or praise section.

## Rules

- ALWAYS use this exact section order.
- DO NOT add extra top-level sections.
