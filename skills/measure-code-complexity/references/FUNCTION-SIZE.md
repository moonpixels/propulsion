# Function Size

NLOC counts non-comment source lines within a function; token count is supporting scale evidence. Review NLOC above `100`. Size measures change surface, not value, productivity, correctness, or understandability, and formatting or language syntax can change it.

Inspect whether the function mixes validation, policy, transformation, persistence, external effects, or several temporal phases. Look for a coherent block with its own inputs, result, invariant, and useful name rather than extracting by line count.

Prefer a smaller deep helper, a table for repetitive data, or an owned module when that improves locality and hides a real decision. Keep related sequencing together when extraction would force callers to coordinate it or create pass-through methods.

Retain long linear functions when they are declarative mappings, protocol mirrors, migrations, generated structures, or one readable algorithm whose split would obscure the flow. Verify the retained shape through focused tests and the applicable repository checks.
