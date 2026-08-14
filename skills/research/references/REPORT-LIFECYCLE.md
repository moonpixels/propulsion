# Research Report Lifecycle

Use this reference only when `docs/research/` already contains research related to the current question.

## Correct the current report

Update a report in place only to repair wording, formatting, or a link to the same evidence without changing a material claim. Retain `createdAt` and change `updatedAt`. The corrected report remains the current snapshot.

## Create a substantive refresh

New evidence, changed scope, or a materially changed finding creates a new dated snapshot with a relative `supersedes` link. Mark the previous snapshot `superseded`, add its reciprocal relative `supersededBy` link, and preserve its historical findings. Verify both links. The report history distinguishes correction from substantive refresh.

## Keep related reports current

When related reports answer independently useful questions, leave both `current` and add no lineage fields. Describe a useful relationship in the report body or sources instead of creating a false supersession history.

## Resolve a dated-path collision

When a distinct report already occupies the dated path, append `-2` to the filename slug and increment it until an unused path is available. Keep the frontmatter title and H1 unchanged.
