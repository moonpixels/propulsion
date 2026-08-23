# Decision and Effect Techniques

Load only when substantial deterministic decisions are entangled with I/O, time, mutable state, or framework lifecycle effects.

## Form a functional core and imperative shell

Apply **functional core, imperative shell** when explicit input values can drive substantial deterministic policy while a narrow edge performs I/O, time access, mutation, or framework integration. The core returns decisions or intended effects; the shell obtains inputs, executes effects, and maps failures.

- **Good:** a renewal function receives subscription state and `now`, then returns `renew`, `expire`, or `no-op`; a job handler loads state, calls it, and performs the selected effect.
- **Bad:** policy reads the system clock, database, queue, and configuration throughout nested branches, so every case requires effectful setup and policy changes alter orchestration.

Preserve stateful ownership when identity, lifecycle, effect ordering, transactions, or invariant enforcement is intrinsic. Do not turn an application into a bag of pure functions with an unencapsulated shell.

Cost: explicit values and decision types cross the core boundary, and the shell must translate effect failures honestly. Use the technique only when the deterministic policy is substantial enough to repay that contract.
