---
name: elicit-with-context
description: Elicits shared understanding while maintaining project language and decisions. Use for deliberate interviews that should update CONTEXT.md and ADRs.
metadata:
    invocation: user
disable-model-invocation: true
---

# Elicit with Context

**Requirements elicitation** resolves a request one decision at a time while
explicit skill composition keeps the project's ubiquitous language current and
records only confirmed architectural decisions.

## Steps

1. Invoke `$elicit`, using `$maintain-context` throughout. Persist validated
   glossary terms as they resolve, and treat `$elicit`'s final confirmation as
   the acceptance boundary for ADRs. The handoff returns the elicitation state,
   context files changed, and unresolved language or qualifying decisions.
