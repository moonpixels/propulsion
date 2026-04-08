# High-Signal Examples

These examples show what to report and what to reject.

## Report

- Duplicated domain logic:
  - The diff adds the same status-transition or pricing rule in both a controller and a model.
  - Keep as `important` when the duplication creates two places that must stay in sync.

- Wrong abstraction placement:
  - The diff moves validation or business policy into a UI/controller/helper even though the model or domain service is the canonical owner.
  - Keep as `important` when future callers could bypass the rule or when maintenance now depends on remembering multiple call sites.

- Second source of truth:
  - The diff re-derives or stores a value separately from the existing canonical source.
  - Keep as `important` when divergence would create correctness or maintenance risk.

- Weak changed-behavior coverage:
  - The production code changes a conditional branch, fallback path, or validation rule, but tests only cover the happy path.
  - Keep as `important` when the missing case is realistic and directly tied to the diff.

- Deterministic runtime breakage:
  - The diff removes a null guard, breaks an import, or introduces a guaranteed wrong branch.
  - Keep as `blocker`.

- Dominant local pattern drift:
  - The diff introduces a new state-handling or error-handling shape in a code area with a clear established pattern.
  - Keep as `advisory` when the impact is real but non-blocking.

## Reject

- “This could be cleaner” without concrete code-health impact.
- Generic requests to extract helpers when the diff is small and the current placement is reasonable.
- Style, naming, formatting, or comment nits unless required by scoped repo rules.
- Test complaints that do not connect to changed behavior.
- Architecture complaints that rely on imagined future requirements.
- Suggestions a linter, typechecker, compiler, or formatter would already catch.
- Consistency complaints when two or more local patterns are already accepted nearby.
