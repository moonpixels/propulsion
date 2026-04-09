---
name: workflow
# prettier-ignore
description: Manage work through Propulsion from session start and load the right skill before any action. Use when a conversation starts or when the next Propulsion stage is unclear.
---

# Workflow

Treat Propulsion as the session contract.

## Quick Start

    Non-trivial feature -> load `exploration`. Bug or failure -> load `debugging`. Current plan -> load `execution`.

## Subagent Stop

- If you are a subagent executing a bounded task, skip this skill.
- Main agent owns routing and stage changes.

## Priority

- User instructions and repo rules win.
- Then Propulsion workflow.
- Then platform defaults.

## The Rule

- If a Propulsion skill might apply, load it before any response or action.
- This includes clarifying questions.
- Announce the active skill briefly.
- Follow the active stage skill's gates. Do not advance stages on your own.

## Routing

- Non-trivial feature, new behavior, or vague request -> `exploration`
- Current PRD to break down -> `planning`
- Current plan to implement -> `execution`
- Bug, failure, flaky behavior, or unexpected output -> `debugging`
- Public behavior change inside implementation -> `tdd`
- Review request or completed slice needing objective review -> `review`
- Review findings to address -> `review-response`
- Truly trivial one-step work -> handle directly unless a focused skill applies

## Red Flags

- "This is simple."
- "I need more context first."
- "I can ask a question before loading a skill."
- "I already know this skill."

## Do Not

- Do not let subagents reroute the workflow.
- Do not repeat stage detail from downstream skills here.
- Do not skip a stage skill because the work looks easy.
