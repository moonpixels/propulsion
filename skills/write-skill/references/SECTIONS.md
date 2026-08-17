# Skill Sections

Use a section only when it changes execution, constrains the finished result, or transfers responsibility.

| Order | Section | Use when | Contains |
| --- | --- | --- | --- |
| 1 | `# Skill Name` | Always | Human-readable skill name. |
| 2 | Introduction | Always | One sentence stating what the skill enables. |
| 3 | `## Prerequisites` | Execution must check conditions before starting | Required state and the action taken when it is absent. |
| 4 | `## Process` | Always | The behaviour that produces the result. |
| 5 | `## Rules` | One invariant governs several steps or the finished result | Cross-cutting constraints stated once. |
| 6 | `## Handoff` | An artefact, decision, or responsibility meaningfully transfers | Recipient, transferred result, evidence, and remaining responsibility. |

Add another H2 only for a distinct behavioural concern that does not fit this spine. Never create an empty or decorative section.

Within `## Process`:

- Use an ordered list or numbered H3s when order changes the result.
- Use H3s when actions can be tested, reordered, or completed independently.
- Keep supporting detail with its action when separation would hide meaning or create a hollow heading.
- Use bullets for independent items, tables for fixed mappings or comparisons, blockquotes for exact authority, and code fences for literal content.
