# Parameter Count

The measurement reports a function parameter count. Verify it against the signature before dispositioning it because partial language parsers can miscount parameters. Review counts of `5` or more. The count can expose a wide interface or recurring data group, but it does not measure parameter meaning, type safety, defaults, or the depth of the function's abstraction.

Inspect whether parameters travel together, represent one concept, encode flags or modes, or change for unrelated reasons. Check call sites before changing the interface.

Prefer an existing domain value, an explicit request or options type with a coherent invariant, or separate operations when callers currently select unrelated behaviour. Do not hide unrelated values in a generic bag or move required context into globals, ambient state, or service locators.

Retain a wider signature for mathematical functions, stable interoperation boundaries, framework callbacks, or flat data construction when grouping would add ceremony without ownership. Record the caller evidence and keep meaningful parameter names and types.
