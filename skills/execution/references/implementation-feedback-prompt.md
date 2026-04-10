# Implementation Feedback Prompt Template

Use this template when returning review findings to the active implementer subagent in the `execution` skill.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Your implementation has been reviewed by an independent reviewer. Below is their report, including any findings and suggestions for improving your implementation.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. <add instructions here>

## Rules

These rules are MANDATORY.

- <add rules here>

## Completion Gate

Do NOT output your response until ALL items are complete.

- [ ] <add completion gate items here>
````

## Rules

These rules are MANDATORY.

- <add rules for using this prompt here>
