---
name: implement
description: Implements one ticket or small confirmed software change as a minimal, locally checked, independently reviewed candidate. Use when the user asks to build agreed work locally.
disable-model-invocation: true
---

# Implement

Turns one confirmed body of software work into the smallest coherent local change with applicable quality evidence and independent review.

## Process

### 1. Fix the implementation basis

Inspect the work authority, repository instructions, linked product and technical authorities, current code, tests, relevant contracts, available tools, and complete repository state. State the observable outcome, exclusions, material risks, and completion evidence. Resolve discoverable facts directly. Invoke `$elicit-with-context` only when a material user-held behaviour, contract, architecture, scope, or acceptance decision remains.

Keep the outcome to one implementation-ready ticket, diagnosed repair, or small confirmed change. Preserve unrelated work. Stop when the work is not sufficiently defined to implement and elicitation cannot resolve it within the requested outcome.

### 2. Load the teaching knowledge

Invoke `$modular-design` against the fixed work. Invoke `$tdd` when the change affects observable behaviour and an existing usable suite can exercise it through a credible seam. Retain their applicable guidance throughout implementation; they teach within this workflow while this skill retains ownership of edits, commands, evidence, and completion.

### 3. Build and check the candidate

Implement the smallest coherent change that completely satisfies the confirmed outcome. Follow the selected modular constraints and TDD cycles without adding speculative flexibility, unrelated cleanup, or project-wide quality infrastructure outside the agreed work.

Inspect the complete diff and every in-scope untracked file. Account for each production and test addition, dependency, generated artefact, and measurement-path change. Run applicable repository-required checks. Preserve exact results, unavailable evidence, and residual risks.

After applicable checks are current, invoke `$measure-code-complexity` with the fixed candidate, comparison base, and implementation authority. Resolve its returned dispositions by applying authorised coherent improvements through the applicable teaching skills, retaining supported justifications, or invoking `$elicit-with-context` when resolution would change agreed behaviour, contracts, architecture, or scope. Rerun every affected harness and the measurement after a change. Freeze one complete candidate only when its checks and complexity measurement are current and every trigger is resolved or explicitly retained for handoff.

### 4. Review and adjudicate

Invoke `$code-review` on the frozen candidate and its authorities. Validate every Spec and Standards suggestion against the strongest available authority and evidence, then disposition it as:

- **Required correction:** a confirmed violation, regression, safety defect, or evidence weakness that leaves the change untrustworthy.
- **Proportionate improvement:** a valid in-scope benefit worth its added change and complexity.
- **Rejected finding:** falsified, unsupported, superseded, or outside the confirmed scope.
- **User decision:** resolution would change agreed behaviour, contracts, architecture, or scope, or needs evidence that cannot be obtained safely.

Apply required corrections and accepted improvements through the applicable teaching skills. Invoke `$elicit-with-context` for a user decision. Rerun every affected harness after a candidate or measurement-path change. Freeze and review the complete new candidate after any material change. Continue until every finding has a supported disposition and no applicable correction or accepted improvement remains.

### 5. Hand off the local result

Report the delivered behaviour, changed artefacts, applicable TDD and modular-design decisions, exact checks and results, unavailable evidence, residual risks, review scope and results, and every finding disposition. Successful completion requires the agreed behaviour locally, every production addition serving a current purpose, applicable evidence passed or explicitly unavailable, and current Spec and Standards review with no unresolved applicable change.

Stop without committing, pushing, opening or updating a pull request, changing tracker state, releasing, or deploying. Do not conduct exploratory research, create specifications or tickets, or add unrelated quality infrastructure inside this outcome.
