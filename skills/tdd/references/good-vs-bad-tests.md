# Good vs Bad Tests

Use this reference to keep TDD tests narrow, durable, and high-signal.

Good tests:

- name one behavior clearly
- use real code paths where possible
- fail for the expected reason
- survive internal refactors

Bad tests:

- batch multiple behaviors together
- mock internals by default
- pass immediately because they test existing behavior
- break when internals change but behavior does not

## Rules

- Use this reference to judge test quality during `tdd` only.
- Do not use this reference to skip the failing-test-first rule.
