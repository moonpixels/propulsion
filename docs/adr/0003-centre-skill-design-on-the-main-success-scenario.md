---
status: accepted
---

# Centre skill design on the main success scenario

## Decision

Design, review, and forward-test each skill around one main success scenario.
Apply YAGNI to speculative branches and retain an exception only when
representative evidence, the primary behaviour, or a necessary safety or
permission boundary requires it. Use progressive disclosure when a rare
retained exception needs depth that would obscure the common path.

## Context

Exhaustively exploring possible branches during elicitation produced bloated
skills and diluted the behaviour they were meant to teach. Arbitrary question or
scenario limits could stop useful discovery without distinguishing consequential
behaviour from imagination. The [research
snapshot](../research/20260715-agent-skill-authoring-methods-2.md) supports a
main-scenario backbone with an evidence-and-risk threshold for exceptions.

## Ramifications

Authoring interviews stop when the dominant behaviour and its material
exceptions are confirmed rather than when every imaginable path has been
discussed. Reviews prioritise impact on that dominant behaviour, and forward
tests cover the main scenario plus retained exceptions. Agents handle
unmodelled variation contextually, so reconsider this decision if recurring
failures show that the admission threshold omits necessary behaviour.
