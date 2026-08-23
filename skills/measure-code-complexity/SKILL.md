---
name: measure-code-complexity
description: Measures changed-code complexity with pinned cross-language metrics and advisory review triggers. Use when implementing, reviewing, or directly assessing code complexity.
metadata:
    type: utility
disable-model-invocation: false
---

# Measure Code Complexity

Measures reproducible complexity signals and routes triggered changed code through contextual engineering judgement.

## Prerequisites

Fix the Git repository, candidate, comparison base, caller authority, and any explicit repository thresholds. Require Python 3.8 or newer. Report the exact unavailable or incomplete evidence when any prerequisite is absent; never treat a failed or unsupported measurement as clear.

## Process

### 1. Measure the fixed change

Run the bundled [measurement script](scripts/measure.py) without installing dependencies or accessing the network:

```sh
python3 /path/to/measure-code-complexity/scripts/measure.py \
  --repo /path/to/repository \
  --base <revision>
```

Pass the corresponding threshold option when an explicit repository policy overrides a bundled default. Use `--whole-repository` only for an explicit repository-wide request and `--all` only when compact evidence cannot resolve a concrete question.

### 2. Investigate triggered signals

Read the compact JSON. Its summary accounts for every measured changed function; detailed records default to triggered entities and the raw artifact retains the complete normalized result.

For each triggered metric, load only its named reference: [Cyclomatic Complexity](references/CYCLOMATIC-COMPLEXITY.md), [Function Size](references/FUNCTION-SIZE.md), [Nesting](references/NESTING.md), [Parameters](references/PARAMETERS.md), or [Duplication](references/DUPLICATION.md). Inspect the cited source, nearby contracts, tests, and clone counterparts. Do not load a metric reference that did not trigger.

Disposition every trigger as one of:

- **Supported concern:** state the concrete maintainability consequence, evidence, and narrow improvement direction.
- **Justified shape:** state the concrete code- and test-based reason the shape is appropriate.
- **Unresolved:** state the missing authority or evidence and leave the trigger open.

Measure and interpret only. Leave every source edit, test run, and decision to apply an improvement to the caller.

### 3. Return the evidence

Return the fixed scope, compact summary, triggered locations and values, baseline deltas when present, each disposition, incomplete evidence, and raw-artifact path. A high value triggers inspection; it does not establish a defect, require refactoring, or supply a code-quality verdict.

## Rules

- Keep the bundled metric definitions and bands intact unless explicit repository policy overrides a threshold.
- Preserve all metric components; do not combine them into Maintainability Index, CRAP, or another scalar grade.
- Reject score-only changes that merely move branching, add indirection, hide parameters, or replace one clone with a shallow abstraction.
- Stop after every trigger has a supported disposition or is explicitly unresolved. Do not modify source or tests, run implementation checks, create repository policy or durable reports, commit, publish, or change external state.
