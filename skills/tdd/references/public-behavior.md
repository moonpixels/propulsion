# Public Behavior

Use this reference to choose the public seam that proves the target behavior.

Test through a public interface:

- CLI command, API endpoint, exported function, UI interaction, or other stable seam

Avoid tests that depend on:

- private helpers
- internal call counts
- internal data layout unless it is part of the contract

Good question:

- "What behavior would a caller observe?"

Bad question:

- "How does this function happen to work today?"

## Rules

- Use this reference before writing or revising a test in `tdd`.
- Do not treat private helpers or internal call counts as public behavior unless the contract says they are.
