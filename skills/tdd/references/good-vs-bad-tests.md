# Good vs Bad Tests

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
