---
name: code-review
description: Reviews scoped code changes against a specification and applicable standards. Use when assessing a diff, branch, pull request, or completed implementation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Code Review

**Tailored software formal inspection** prepares fixed evidence packets for independent Standards and Spec inspectors, then presents their diagnostic findings without changing the reviewed work.

## Process

### 1. Fix the inspection scope

Use the caller-supplied scope, whether uncommitted work, a revision range, a branch comparison, a pull request, or another exact change set. Resolve every revision, capture the patch and changed-path list once through read-only inspection, and include the complete contents of in-scope untracked files. Confirm that the captured change set is non-empty. Ask the user when the scope is missing or ambiguous; report the exact blocker and stop when it is invalid or empty. The inspection has one fixed work product.

### 2. Resolve the inspection sources

Find the specification from caller context, supplied paths or tickets, issue references and change history, then relevant repository documentation. When none is found, ask the user; omit the Spec inspection only after the user confirms that no specification exists. Independently identify applicable repository instructions, architecture decisions, coding standards, language policies, configured checks, and local conventions. Read the changed files in full, relevant tests, and enough surrounding code to judge the patch. The specification and Standards authorities are explicit.

### 3. Prepare the work aids

Create one self-contained packet per applicable axis with the fixed patch, changed paths, relevant source context, authority sources, priority definitions, output schema, and read-only verification boundary. Exclude conversation history and the other inspector's materials.

The Spec packet applies **bidirectional requirements traceability**: trace every applicable requirement into the changed implementation and relevant tests, and every introduced behaviour back to specification authority. It investigates missing, partial, incorrect, conflicting, and unrequested behaviour and relevant unhandled cases.

The Standards packet applies repository standards first, then residual **Google code-review criteria** across whole-change understanding, correctness and concurrency risks, test presence and validity, comments, and affected documentation. Include the complete [Fowler code-smell work aid](references/CODE-SMELLS.md). Add **Test Desiderata** when tests change; the relevant **ISO/IEC 25010:2023** characteristic when the repository adopts it or the change exposes a concrete residual product-quality concern; an applicable **SEI CERT** rule when supported-language code exposes its construct; and the relevant frozen **OWASP ASVS 5.0.0** requirement when Web code crosses that security boundary. Load only the implicated part of a conditional benchmark.

When the fixed change presents a material structural-maintainability decision, invoke `$modular-design` and include the applicable standard in the Standards packet.

Within Standards, repository rules and demonstrably configured tooling govern the concerns they cover. General work aids fill uncovered diagnostic roles and yield to an explicit repository choice. A smell or benchmark cue begins an investigation; it becomes a finding only when the scoped code supplies exact evidence and a concrete consequence.

### 4. Assign the inspections

Give each packet to a separate fresh agent and run the Standards and Spec inspections in parallel when both apply. Each inspector owns candidate discovery, **falsification**, authority and code-evidence validation, consequence analysis, and priority validation for its axis. It may run a targeted check only when the command and execution boundary demonstrate that it cannot mutate the checkout, repository state, external systems, or durable project data; otherwise it records the limitation. Each inspector returns only findings that survive its validation.

Use **risk-based prioritisation** within each axis: `critical` for immediate data loss, security compromise, or production failure; `high` for incorrect requirements or major behaviour, security, reliability, or maintenance risk; `medium` for a concrete defect or significant code, design, or test weakness; and `low` for a local but worthwhile issue.

### 5. Present the inspection report

Check that each assigned packet produced the required output fields, returning an incomplete report to its originating inspector for completion from the same packet. Present the Standards and Spec outputs separately without substantive re-review, merging, deduplication, or cross-axis reranking. Preserve each inspector's findings and ordering. The caller receives the two independent inspection results.

## Rules

- Keep the inspection read-only and return evidence for the caller's implementation process.
- Report only issues introduced by or materially relevant to the fixed change.
- Prefer specification, repository, and code evidence over general guidance or personal preference.
- Hold structural, test, security, and product-quality findings to the same evidence, consequence, and priority standard as behavioural defects.

## Handoff

State the exact scope, specification source or user-confirmed absence, Standards sources, and any check that could not run. Return `## Standards` and `## Spec`; use `No findings.` for a clean axis and state when the Spec inspection was omitted. Format each finding as:

```markdown
### [priority] Concise finding

- Evidence: exact code `path:line`, applicable authority, and observed fact
- Consequence: concrete behaviour or code-health impact
```

End with `## Summary` and the finding count for each axis. When neither axis contains a material finding, say the fixed change is clean plainly.
