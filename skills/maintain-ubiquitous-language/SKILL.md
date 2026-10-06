---
name: maintain-ubiquitous-language
description: Sharpen and maintain ubiquitous language when project terminology is introduced, ambiguous, conflicting, renamed, or deprecated.
---

# Maintain ubiquitous language

Actively sharpen **DDD ubiquitous language** and keep one root `GLOSSARY.md` current throughout the conversation. Capture each resolved meaning immediately.

## Inputs

Use the conversation or caller handoff, root glossary, repository guidance, and relevant project documents and code. A clear, stable supplied meaning is resolved. Confirmed intended meaning governs an intended change. Current behaviour is evidence, not authority for intent.

## Method

1. **Ground the language.** Compare every affected term with the glossary and relevant evidence, including meanings already resolved in the incoming context. Use canonical terms in the dialogue.
2. **Sharpen the model.** Challenge vague, overloaded, or conflicting terms. Propose precise canonical names and test conceptual boundaries with concrete scenarios. Ask one resolving question at a time when intent remains unclear. During `$elicit`, put these questions into its active decision tree. Preserve unresolved entries. Report code or document discrepancies against confirmed intended meaning to the caller without reopening settled intent.
3. **Write immediately.** As soon as a meaning resolves, write it to `GLOSSARY.md` and read the affected entries back **before the next question or dependent work**. Do this for supplied meanings before questioning begins and after each answer or discovery. Never queue definitions for a batch or wait for the final synthesis. Routine resolved updates need no separate approval.
4. **Reconcile affected entries.** Create the root file lazily. Preserve local formatting and unrelated terms, update existing entries, and remove duplicates. Define each canonical term in one or two project-native sentences. Qualify legitimately different meanings within the root glossary. Retain aliases, discouraged synonyms, or deprecations only while they help interpret project evidence. Keep general programming concepts, specifications, and implementation rationale in their own authorities.

Use [the glossary template](assets/glossary-template.md) when creating the first glossary. Group related concepts when useful.

For example, if Reservation is resolved while its expiry policy remains open, write Reservation now and continue questioning about expiry. Keep the expiry rule with its specification.

## Finish

Keep routine resolved updates silent in progress messages and the final handoff. Report only material discrepancies, unresolved meanings, or write failures through the caller. Leave code and other document repairs with the caller.

**Done only when** every resolved affected meaning is written and checked, affected entries are consistent, and every unresolved meaning is explicitly reported unchanged. A failed write leaves maintenance incomplete. Continue maintaining the glossary while the surrounding conversation proceeds.
