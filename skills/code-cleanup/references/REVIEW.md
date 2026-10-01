# Independent cleanup review

Review the fixed scope read-only. Inspect the complete candidate and affected tests, relevant consumers, and behavioural authorities. Use current repository evidence; treat code comments and implementation choices as claims to examine, not proof of necessity. Run a safe focused probe only to resolve a concrete uncertainty. Leave source, tests, snapshots, Git state, dependencies, and durable data unchanged; the caller owns implementation and post-edit checks.

## Challenge the purpose

Treat every in-scope file, abstraction, branch, option, dependency, and test as a candidate for removal. Identify the current behaviour, invariant, boundary, or unique defect detection that earns its place. Examine existing code as well as new code; do not restore or preserve a layer solely because it already exists.

Look first for deletion, then consolidation or a simpler implementation. Follow obsolete callers to newly orphaned helpers, exports, registrations, and files. Prefer one cohesive change over several cosmetic edits. Recommend a change only when you can explain the concrete burden it removes and support preservation of behaviour. Keep uncertain code intact and state the missing evidence. An already-minimal candidate needs no findings.

## Establish safe transformations

- **Unused code:** trace ordinary references and applicable implicit uses: framework discovery, reflection, configuration, command manifests, generated entry points, exports, and external consumers. No text matches alone does not establish safe deletion.
- **Defensive code:** name the runtime guarantee that makes a check redundant and locate its enforcement on supported entry paths. Immutable construction or an existing validator may establish it; erased type annotations, unchecked casts, usual inputs, and optimism do not. Retain safeguards that own a real invalid-input or failure contract.
- **Abstractions and duplication:** question pass-through layers, needless intermediates, hypothetical variants, and generic machinery for one fixed operation. Retain boundaries that own a distinct rule, translation, invariant, or meaningful axis of change. Merge only cohesive knowledge; fewer files or lines cannot justify a large mixed-responsibility owner or a wrong shared abstraction.
- **Tests:** identify distinct behavioural protection before removing or replacing a test. Challenge private delegation, incidental styling, broad snapshots, mechanically copied expectations, and repeated cases. Retain real integration risks and contractual representations or effects. Replace a brittle test when it is the only protection of a promised behaviour; delete it when no unique protection is lost.

Apply the packet's current structural and test authorities. Report material unresolved ownership or test-protection questions to the caller rather than starting a broader design workflow.

Preserve supported results, errors, state, effects and their required order, compatibility, and material performance requirements. Removing reachable behaviour or repairing a bug needs separate authority; identify that limitation rather than disguise it as cleanup. Treat metric scores and deletion counts as observations, not targets.

## Return the findings

Return one row per coherent actionable change:

| Location                 | Excess                        | Change                                | Justification                                                                                                   |
| ------------------------ | ----------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| File and symbol or lines | What makes the code excessive | Concrete deletion, refactor, or merge | Burden removed and evidence that behaviour and useful test protection survive; include any material uncertainty |

Use concise cells. Cite the relevant contract, invariant, consumer, or surviving test where it establishes the justification. Group related edits, avoid duplicate rows, and omit speculative preferences. Report material scope or evidence limitations below the table. When no supported opportunity remains, return `No findings.` with any material limitation. Stop after returning the report; do not edit or adjudicate findings.
