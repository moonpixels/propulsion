# Tools and execution boundaries

Use an existing well-defined tool when it already owns the required operation or authentication. Bundle a script when deterministic execution or repeated reuse materially improves reliability. Reading a skill does not establish that downloaded executable code is trusted.

## Script contracts

Document inputs, outputs, runtime and dependency versions, side effects, and failure recovery where the command is used. Pin important dependencies and respect environments that prohibit downloads or runtime installation. Run changed scripts on representative and failure inputs.

- Accept explicit arguments, environment variables, or stdin. Agent-run helpers should complete without password prompts or interactive menus.
- Provide concise `--help`, clear errors describing the failed expectation, meaningful exit codes, and bounded output.
- Prefer structured results such as JSON, CSV, or TSV. Send diagnostics separately from result data.
- Validate inputs and intermediate plans before stateful execution. Offer a dry run when it makes consequential changes reviewable.
- Make repeatable operations **idempotent** where possible. Distinguish a safe retry from a duplicate mutation, especially after an unknown outcome.
- Give retries a recoverable condition and stopping limit. Report the exact blocker instead of retrying blindly.

A human-facing setup wizard has a different contract. Make that distinction explicit; inspect or statically validate it rather than assuming an agent should complete its interactive flow.

## Authority and delegation

State the permitted scope, necessary user decisions, and observable stopping point. Separate absent facts from absent authorisation. Reuse existing authorisation; a skill cannot grant permission to message another person, publish, or mutate an external system.

Keep decisions and follow-up steps within the user-agent workflow. Delegate to fresh agents when independent seams, separate evidence routes, cold-context execution, or genuinely parallel alternatives justify it. Supply the task, raw inputs, relevant constraints, output contract, permissions, and stop condition. Keep integration and final verification owned by the calling agent. Separate agents sharing the same assumptions do not become independent evidence merely by having different roles.

Use a real context boundary when isolation matters; an inline invocation does not clear the caller's context. Keep conversational understanding, user decisions, and stateful continuity where they are needed. A handoff to another model or fresh context must contain the chosen task's complete requirements.

## Checks and stopping

Require the smallest meaningful check of the actual artefact or state. Broaden checking when changed scope, failures, or unresolved risks justify it. If a check cannot run, report its exact blocker and which checks did run. Inspection is not a passed runtime test.

Diagnose harness problems at the harness layer. Extra progress instructions cannot repair a client that discards the relevant output channel. Match unattended execution to its bounded inputs and blocker report; use conversational checkpoints when shared understanding is part of the actual contract.
