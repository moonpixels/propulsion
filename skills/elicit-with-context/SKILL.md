---
name: elicit-with-context
description: Elicits shared understanding while maintaining project context. Use when an interview should update language and qualifying architecture decisions.
metadata:
    invocation: user
disable-model-invocation: true
---

# Elicit with Context

Invoke `$elicit`, applying `$maintain-context` throughout. Treat `$elicit`'s
final confirmation as the acceptance boundary for qualifying ADRs, then return
the elicitation state, context changes, and unresolved language or decisions.
