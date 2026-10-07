---
name: implement
description: Deliver a minimal, independently reviewed code change when the user requests a software implementation or modification.
---

# Implement

Deliver the complete confirmed outcome with the **least justified code and complexity**. Preserve unrelated work.

## Inputs

Use the requested change or ticket and any supplied acceptance criteria. Invoke [$elicit-with-context](../elicit-with-context/SKILL.md) when a material user-held decision remains unresolved.

## Method

1. **Prepare.** Read repository documentation and official documentation for the installed packages and frameworks involved in the change. Follow their recommended APIs and patterns unless an explicit project decision requires a different approach. Load and apply [$modular-design](../modular-design/SKILL.md).
2. **Implement.** Load [$test-design](../test-design/SKILL.md) and follow its applicability decision and method. Implement the confirmed change and simplify locally as it takes shape. When testing is not applicable, use existing checks and direct verification.
3. **Improve.** Once the change works, invoke [$measure-code-complexity](../measure-code-complexity/SKILL.md) on the changed production files, using the branch base for file selection. Pass its saved report and interpretation to [$code-cleanup](../code-cleanup/SKILL.md) with the fixed candidate and affected capability. Read the returned report file and adjudicate every candidate, including changes in related unchanged files. Resolve preservation gaps before applying accepted transformations.
4. **Verify and review.** Run required repository checks and the complete relevant existing suite. Invoke [$code-review](../code-review/SKILL.md) on the resulting candidate and resolve its findings.

For both cleanup and review, **adjudicate each finding** against the request, actual code and documented constraints. Apply required corrections and proportionate improvements. Reject inapplicable findings with concrete evidence and record each disposition and its reason. For example, a request to add internal validation may be redundant when every supported entry already enforces that invariant at runtime. A preferred style or lower metric alone does not justify a change. Resolve material user-held decisions through `$elicit-with-context`.

After edits, refresh affected checks and remeasure the same selected files. Keep prior reports for caller-owned comparisons. After a material edit, repeat independent review of the revised candidate.

## Finish

Return delivered behaviour, significant structural changes, checks, measurement and review results, finding dispositions and material limitations.

**Done only when** the agreed outcome works, applicable checks are current, every finding has an evidence-backed disposition, and all required corrections and accepted improvements are complete. Report actual blockers precisely. Stop at the local handoff. Commit, publication, tracker updates and deployment require separate instructions.
