# Refactor Candidates

Use this guide after the tests are green. Make the current behaviour easier to understand, safer to change, and cheaper to extend for needs already proven by the tests.

## Start Here

Refactor only when all relevant tests are passing.

Ask these gate questions before changing the structure:

- Does the code or test suite show a present problem, not a hypothetical future one?
- Can I describe the refactor without changing behaviour?
- Is this the smallest change that removes the problem?
- Will the tests still verify the same behaviour through the same public interface?
- If I stop after this step, is the code already better?

If any answer is no, do less or stop.

## Good Refactor Signals

### Duplication

Refactor when the same decision, transformation, or workflow appears in more than one place and the copies are starting to drift.

Useful moves:

- Extract a function for repeated logic.
- Move shared behaviour to the object or module that owns it.
- Introduce a small abstraction only after at least two real call sites need it.

Do not refactor duplicated syntax alone. Refactor duplicated meaning.

### Long Methods

Refactor when one method is hard to scan, mixes multiple decisions, or forces the reader to hold too much state in their head.

Useful moves:

- Extract helpers around distinct steps.
- Name intermediate concepts so the flow reads at the domain level.
- Separate orchestration from detailed work.

Prefer small extractions that clarify intent. Do not split a method into many tiny helpers with no clearer names or boundaries.

### Poor Naming

Refactor when a name hides purpose, uses generic placeholders, or no longer matches the behaviour proven by the tests.

Useful moves:

- Rename variables, functions, types, and tests to describe the business meaning.
- Replace temporary or misleading names with names that explain the decision being made.

Prefer better names before new abstractions.

### Feature Envy

Refactor when logic reaches repeatedly into another object or data structure to do work that clearly belongs there.

Useful moves:

- Move behaviour closer to the data it uses.
- Replace chains of field access with a message to the owning object.

This often improves cohesion and reduces knowledge spread.

### Primitive Obsession

Refactor when the same primitive values travel together, need repeated validation, or encode domain rules informally.

Useful moves:

- Introduce a small value object.
- Replace magic strings, flags, or loosely related parameters with a named concept.
- Move validation and formatting onto that concept.

Do this only when the domain concept already exists in the current behaviour. YAGNI still applies.

### Brittle Conditionals

Refactor when conditionals are nested, repeated, order-sensitive, or hard to extend without fear.

Useful moves:

- Extract predicate functions with clear names.
- Flatten control flow with guard clauses.
- Separate distinct cases into focused helpers.
- Replace branching with polymorphism only when multiple concrete cases already exist and the branch is a real maintenance problem.

Prefer the smallest change that makes the branch understandable today.

### Misplaced Responsibilities

Refactor when a module has become a grab bag for unrelated work or when one change requires touching many places because ownership is unclear.

Useful moves:

- Move behaviour to the module with the strongest reason to change.
- Keep one unit focused on one kind of responsibility.
- Let high-level code coordinate and low-level code perform detailed work.

Use SOLID as a decision tool here. If one unit has multiple unrelated reasons to change, the design is likely fighting the current behaviour.

## When Not To Refactor

Do not refactor just because the code looks inelegant.

Hold off when:

- The tests are not green yet.
- You do not understand the problem well enough to name the improvement.
- The change is driven by a guessed future requirement.
- The abstraction would serve only one caller or one code path today.
- The code is awkward but stable, isolated, and not blocking current work.
- The tests are not giving enough confidence to separate structural change from behaviour change.

YAGNI matters most after green. If the current tests and code do not show the need, keep the simpler structure.

## DRY, SOLID, YAGNI As Filters

- DRY: remove repeated knowledge, not every repeated line.
- SOLID: prefer clearer ownership and narrower responsibilities when the current design already shows those pressures.
- YAGNI: reject abstractions for possibilities the code does not yet need.

Use these principles to choose less code and better boundaries, not to justify a larger rewrite.

## Safe Refactor Rules

- Keep refactors behaviour-preserving.
- Change one structural idea at a time.
- Run the relevant tests after each meaningful step.
- Keep tests aimed at public behaviour so they survive the refactor.
- Stop once the current pain is removed.

The best refactor is usually the smallest one that makes the next change easier.
