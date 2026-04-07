---
name: workflow
description: Route session work to exploration, planning, execution, tdd, debugging, review, or review-response. Use when starting a session.
---

# Workflow

## Quick Start

```text
New or unclear work -> exploration
Approved approach, need a written plan -> planning
Approved plan -> execution
Behavior change or bugfix implementation -> tdd
Bug, failing test, or unexpected behavior -> debugging
Meaningful changes or review request -> review
Review feedback -> review-response
```

## Rules

- Check whether a skill applies before acting. If yes, load it first.
- Keep this skill tiny; downstream skills own the process details.
