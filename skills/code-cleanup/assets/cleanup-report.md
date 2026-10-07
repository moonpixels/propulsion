# Cleanup review

## Scope and status

- Repository: {absolute path}
- Candidate: {revision or compact working-tree digest, comparison base when relevant}
- Requested scope: {file, diff, capability or codebase}
- Expanded capability: {related files and why they belong}
- Status: {Complete or Incomplete, with exact missing inspection}
- Behavioural authorities: {requirements and contract paths}

## Candidate index

| ID  | Priority              | Candidate and location                                     | Technique              | Preservation evidence or gap                                  |
| --- | --------------------- | ---------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| C1  | {High, Medium or Low} | {short title, repository-relative file and line or symbol} | {named transformation} | {Supported and key evidence, or Needs evidence and exact gap} |

Replace the table with `No findings.` if a complete review found no justified candidate. For an incomplete review with none found, say `No candidates identified in the inspected portion.`

## Candidate details

### C1. {Concise transformation title}

- Locations: {verified absolute paths and lines or symbols, including related unchanged files}
- Burden: {unnecessary machinery and its concrete maintenance consequence}
- Transformation: {technique and complete proposed edits, caller migration and orphan deletion}
- Preservation: {Supported or Needs evidence, traced behaviour and consumers, contrary evidence and exact remaining gap}
- Verification: {existing checks or focused comparison the caller should run, including how to resolve the gap}

Use a short before/after sketch only when it clarifies a structural change. Give enough detail to implement the transformation without producing a speculative patch. Repeat this block for every indexed candidate, without repeating the index verbatim. Omit this section when there are no candidates.

## Coverage and limitations

- Inspected: {files or compact complete inventory, entry points, consumers and implicit-use checks}
- Families considered: {relevant technique families and material exclusions}
- Evidence used: {supplied checks and source reasoning}
- Probes run: {actual invocation and outcome, or None}
- Final coverage pass: {missed-candidate and orphan checks, candidate freshness}
- Limitations: {uninspected scope, missing authority and concrete out-of-scope issues, or None}

Keep candidate-specific gaps in their preservation fields. State limitations here only when they affect the review as a whole.
