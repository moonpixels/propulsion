# Writing instructions

## Language and presentation

Write for a capable agent. Keep only content that changes a decision, contributes missing knowledge, preserves an invariant, or makes completion observable.

- Use **direct verbs** for actions: Read, Choose, Run, Fix, Report, Return, Stop. Prefer active voice and short, concrete words. Remove filler, vague quality claims, repeated exhortations, and basic knowledge the agent already has.
- Use sentences, lists, or tables that expose the task's logic. Keep conditions, exceptions, and qualifications beside the rule they affect. Expand compression that obscures technical meaning, scope, or failure handling.
- Avoid em dashes in authored prose. Use a full stop, comma, colon, or parentheses as appropriate. Preserve exact quoted data, code, paths, API names, error text, and other technical literals.
- Use short descriptive Markdown headings. Number actions when order matters. Use bullets for independent items, tables for comparisons, and fenced blocks for literal templates or examples. Remove empty or decorative sections.
- **Bold key terms** where they help identify a decision, priority, or invariant. Use emphasis sparingly; repeating the same instruction in bold, capitals, and a checklist adds cost without new meaning.
- Use explicit delimiters for embedded examples or source data when that prevents confusion with instructions. XML-like labels can clarify boundaries; they do not enforce conditions or remove text from context by themselves.
- Use a recognised method or concept only when its meaning sharpens execution or replaces a longer explanation. Define the intended practice when the name permits materially different interpretations. Avoid decorative terminology.

## Rules, freedom, and completion

Match specificity to **variability and fragility**. State outcomes and decision criteria where several approaches work. Keep exact commands, formats, ordering, and parameters where deviation would cause a concrete failure. Give a default and its actual exceptions rather than a menu of equally weighted alternatives.

Prefer the intended action. Retain a negative constraint when it protects a consequential correctness, permission, scope, or safety boundary; pair it with the safe alternative and the condition that applies. A blanket approval requirement can stop work already authorised by the user.

Allow an evidence-backed no-change outcome when the task's contract permits it. A review or exploration should not invent changes to demonstrate activity. For subjective alternatives, fix the shared comparison conditions and evaluation criteria while leaving the proposed solutions open.

Keep a brief explanation when it helps the agent apply a rule under variation. Justify it using context available during execution, such as a schema contract or irreversible side effect. Keep authoring discussions, historical evaluations, and composition rationale outside the runtime bundle.

Give each ordered stage a checkable completion condition where premature completion would change the result. Define final coverage and evidence precisely. Replace “be thorough” with what must be accounted for and how unresolved items are reported. Add review loops only when they address a real uncertainty or failure.

## Descriptions and context pointers

Front-load the recognisable task and decisive activation condition. Name distinct branches once; collapse synonyms that describe the same branch. Add a neighbouring non-trigger only when it prevents likely misrouting. Keep procedures, output formats, and most operating rules in the body.

Prefer factual scope over assertive activation language or a required grammatical voice. Diagnose missed or excessive activation from actual loading evidence before adding keywords.

A **context pointer** names material outside the active instructions and states the condition for reaching it. Keep a gotcha inline when the agent could not recognise the loading condition without already knowing it. If a required target is missed, sharpen its pointer or move the essential guidance to the decision point.

## Examples and templates

Use realistic examples that teach a reusable approach, not just one task's answer. Include a counterexample when it makes an important boundary concrete. Preserve exact output contracts with a template; keep short common formats inline and longer or branch-specific formats in assets.

Adapt the base template rather than forcing all its sections into every skill. A tiny workflow may need only a few sentences. A knowledge skill may suit a flat set of decision rules. A router should expose the shared invariant and meaningful branch map without duplicating its leaves.
