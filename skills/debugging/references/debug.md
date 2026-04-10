# Debug.md Guidance

Use this reference when `debugging` needs a durable `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` handoff.

Write `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` in this shape:

```md
# Debug Note: <issue>

## Reproduction

- exact steps

## Evidence

- errors, traces, logs, commands

## Hypotheses Tried

- hypothesis
    - result

## Root Cause

- grounded diagnosis

## Fix Direction

- next change to make in `execution`
```

## Rules

- Use this reference only for non-trivial investigations that need a durable handoff.
- Replace placeholders with the actual issue, evidence, grounded diagnosis, and next-step direction.
- Keep `debug.md` diagnosis-first. Do not turn it into an implementation log.
