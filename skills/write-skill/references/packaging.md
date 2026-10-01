# Packaging and loading

## Portable core

Create a directory containing `SKILL.md` with valid YAML frontmatter delimited by `---`, followed by runtime instructions.

| Field           | Contract                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | Required; 1 to 64 lowercase letters, digits, or hyphens; no leading, trailing, or consecutive hyphens; matches the directory name. |
| `description`   | Required; non-empty string, at most 1,024 characters; states the capability and its activation condition.                          |
| `license`       | Optional string identifying the applicable licence or its file.                                                                    |
| `compatibility` | Optional string, at most 500 characters, for real environment requirements. It describes requirements without enforcing them.      |
| `metadata`      | Optional map of string keys to string values for relevant local metadata.                                                          |
| `allowed-tools` | Optional experimental string; verify support and permission semantics on the actual destination.                                   |

Treat native invocation, tool, fork, argument, display, and mode fields as **client extensions**. Keep the core portable and adaptations small. Read the destination's current authoritative documentation, apply its supported fields, and verify loading there. Local tolerance of an unknown field does not establish upload or cross-client compatibility.

Determine implicit, explicit, or composed invocation from the intended workflow. Implement the choice using supported native controls; a description alone does not enforce explicit-only invocation. Preserve existing invocation intent unless the user changes it. Keep native discovery and UI metadata consistent with the core. Validate required tool declarations without treating them as permission grants.

## Resource placement

| Location             | Use                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `SKILL.md`           | Purpose, common essentials, recognition of non-obvious gotchas, meaningful routes, and completion.   |
| `references/`        | Conditional domain knowledge, schemas, branch procedures, error catalogues, or substantial examples. |
| `assets/`            | Output templates, images, fonts, or material copied or adapted into the result.                      |
| `scripts/`           | Repeatable deterministic operations with a documented interface.                                     |
| `evals/`             | Author-maintained cases, fixtures, and checks, outside routine execution context.                    |
| Native adapter files | Destination-specific metadata and configuration.                                                     |

Create only resources with a concrete use. Link them at the branch that needs them, preferably directly from the root. Use paths relative to the containing file for Markdown links. Give long references a contents list or search terms when useful. Remove orphaned files, duplicate authorities, circular invocation, and indexes that only lead to another index.

When every branch is routinely loaded, combine the shared work or revise the routing. A short root that loads a large chain is still a large active path.

## Environment and validation

Separate **discovery**, **execution**, and **enforcement**. Prose steers the model; tools, hooks, sandbox rules, and permissions enforce actions. A skill provides guidance while a tool service provides live data, authentication, and operations. Check the actual runtime instead of assuming these facilities exist everywhere.

Check filesystem access, network availability, installed tools, package installation restrictions, authentication, and relevant versions. Verify the user's requested workflow fits those conditions. Resolve an unavailable prerequisite through the authorised environment or report the precise blocker.

Verify uncertain or changing API, library, format, and client claims against current authoritative sources. Keep required domain schemas and version details available on the path that uses them. An illustrative recipe or historical model recommendation is not a current environment contract.

Parse frontmatter, check field types and limits, confirm names and local references, inspect helper interfaces, and validate native adapters. Run changed helpers on meaningful fixtures. Verify discovery and loading on the destination separately from packaging. Existing project requirements remain applicable, but are local requirements rather than universal authoring rules.

Do not impose a universal line or token cap. Prefer the shortest coherent active path that preserves necessary knowledge, contracts, and reliability. Measure execution rather than treating directory size as context cost.
