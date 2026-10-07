# Refactoring for less code

Use **refactoring** to change structure while preserving supported behaviour. **Subtract before adding**. Demand a present purpose for each piece of machinery. Aim for fewer decisions, layers and mutable relationships, with direct code that remains easy to read.

Use the **deletion test**. Imagine removing a module. Does unnecessary complexity disappear, or does essential complexity spill into callers? Delete the former. Keep or deepen the latter. A smell is a diagnostic question, not a compulsory extraction or a finding by itself.

## Technique families

Consider every family relevant to the scope. Read its reference when matching shapes appear, before proposing the transformation. The references contain original illustrative examples, preservation conditions and cases where keeping the code is simpler.

| Observed shape or smell                                                                                                  | Techniques to consider                                                                                              | Read                                                          |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Dead Code, Speculative Generality, unused modes or parallel legacy paths                                                 | Remove Dead Code, Remove Parameter, migrate callers and delete the complete obsolete path                           | [Deletion and layers](deletion-and-layers.md)                 |
| Lazy Class, Middle Man, pass-through helpers, constant-only subclasses                                                   | Inline Function or Method, Inline Class, Remove Middle Man, Collapse Hierarchy, Replace Subclass with Fields        | [Deletion and layers](deletion-and-layers.md)                 |
| Long Method, nested conditionals, duplicated outcomes, control flags                                                     | Guard Clauses, Consolidate Conditional Expression, Consolidate Duplicate Conditional Fragments, Remove Control Flag | [Control flow and algorithms](control-flow-and-algorithms.md) |
| Repeated Switches, branch-heavy mappings, bespoke collection algorithms                                                  | Centralise real variant knowledge, Substitute Algorithm, reuse an existing operation                                | [Control flow and algorithms](control-flow-and-algorithms.md) |
| Duplicate Code, Feature Envy, Message Chains, Inappropriate Intimacy                                                     | Move Function or Method, Hide Delegate, consolidate one rule with its owner                                         | [Ownership and state](ownership-and-state.md)                 |
| Shotgun Surgery, temporal decomposition, Alternative Classes with Different Interfaces, Parallel Inheritance Hierarchies | Gather one capability, unify equivalent internal APIs, remove duplicated variation                                  | [Ownership and state](ownership-and-state.md)                 |
| Divergent Change, Large Class, Refused Bequest                                                                           | Separate a complete independent concern, narrow inheritance or use delegation when it reduces burden                | [Ownership and state](ownership-and-state.md)                 |
| Temporary Field, duplicated derived values, synchronised booleans                                                        | Replace Derived Variable with Query, shrink mutable scope, use one authoritative representation                     | [Ownership and state](ownership-and-state.md)                 |
| Long Parameter List, Data Clumps, Primitive Obsession, Data Class                                                        | Remove or derive arguments, Introduce Parameter Object only for a real concept, move repeated domain knowledge      | [Ownership and state](ownership-and-state.md)                 |
| Repeated validation, silent fallback, catch-and-rethrow, custom adaptation                                               | Establish runtime guarantees, delete redundant handling, retain necessary boundary adaptation                       | [Boundaries and protection](boundaries-and-protection.md)     |
| Comments, brittle or duplicate tests, repeated fixtures                                                                  | Improve names, delete narration and obsolete scaffolding, preserve unique behavioural protection                    | [Boundaries and protection](boundaries-and-protection.md)     |

## Apply the judgement

Name the burden removed and the supported contract retained. Similar text can express independent policies. A single caller can still need a deep boundary. A long cohesive function can be simpler than many fragments. A plain record can be the right transport type. Keep those forms when the proposed alternative merely relocates complexity.

Use an earned extraction for hidden knowledge, real variation or independent responsibility. Introduce a richer model only when it deletes repeated rules, impossible internal combinations or lifecycle machinery. Count the new type, helper, file and caller knowledge as part of its cost. Keep useful validation and current-state checks when uncertainty or mutation remains.
