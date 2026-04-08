---
name: workflow
description: Handle session-start routing to the right process skill. Use when a new request arrives before any response.
---

# Workflow

## Quick Start

```text
Before any response -> check whether a skill applies; if yes, load it first
Start with these canonical routes:
New or unclear work -> exploration
Approved approach, need a written plan -> planning
Unknown cause, failing test, or unexpected behavior -> debugging
Behavior change or bugfix implementation with no approved plan -> tdd
Approved plan -> execution
Completed changes or explicit review request -> review
Review feedback -> review-response
```

## Rules

- Before any response, including clarifying questions, check whether a skill applies. If yes, load it first.
- Route to process skills first: debugging for bugs, exploration for unclear work, planning for approved multi-step work.
- Where routes overlap: debugging before tdd when the cause is unknown; execution before tdd when there is an approved plan.
- Keep this skill tiny; downstream skills own the process details.
