# Writing techniques

Default to literal, complete sentences. Choose a technique when it performs a clear job for the intended reader and genre. Stop using it once direct explanation can carry the point. Follow the punctuation and presentation policy in [the skill](../SKILL.md).

The paired examples use illustrative facts. Bad marks a weaker choice for the stated reader and purpose. In an actual task, use supplied facts and preserve any qualification that makes them accurate.

## Orient the reader

### Direct opening

State the point when the reader needs immediate utility. Give the needed document and next step from supplied facts.

```markdown
// Bad
As part of our ongoing commitment to a thorough application process, we need you to provide proof of address.

// Good
Your application needs proof of address.
```

### Narrative opening

Use a supplied event when it makes a problem tangible. Do not invent a scene or delay an urgent instruction for atmosphere.

```markdown
// Bad
There are important considerations around the timing of our sessions. At Tuesday's session, three visitors arrived after the doors had closed.

// Good
At Tuesday's session, three visitors arrived after the doors had closed.
```

### Reader question

Introduce a real concern the following text answers. Remove stock engagement questions.

```markdown
// Bad
Ready to transform your upload experience? An interrupted upload resumes after the connection returns.

// Good
What happens if the connection drops during an upload? The upload resumes after the connection returns.
```

## Explain and persuade

### Example

Make an abstract claim inspectable through a supported case. State any boundary the reader needs. A single example does not establish every possible case.

```markdown
// Bad
Filters provide powerful task organisation. You can filter for overdue tasks assigned to you.

// Good
A filter can show overdue tasks assigned to you.
```

### Comparison

Name the criterion and consequence. Use the supplied differences to help the reader assess options.

```markdown
// Bad
Flying is clearly the best way to travel. The flight is quicker, but it needs an airport transfer. The train takes longer and arrives in the town centre.

// Good
The train takes longer, but it arrives in the town centre. The flight is quicker, but you also need an airport transfer.
```

### Analogy for an unfamiliar idea

Use an analogy only when the intended reader needs help. Follow it with the real mechanism and any important limit. Here, a less technical reader is unfamiliar with first-in, first-out processing.

```markdown
// Bad
The queue uses first-in, first-out processing.

// Good
The queue works like a waiting line. It processes jobs in the order they arrive.
```

If jobs have priorities, the waiting-line image may mislead. Explain that ordering directly. Avoid extended personification and decorative images that make the reader translate back into literal terms.

### Direct explanation for a familiar audience

Give the actual rule when the reader already understands the concept. For a developer familiar with queues, an introductory analogy adds little.

```markdown
// Bad
Think of the queue as a waiting line where jobs patiently wait for their turn. It processes jobs in the order they arrive.

// Good
The queue processes jobs in the order they arrive.
```

### Quotation

Use a quotation when its exact wording or speaker matters. Attribute and explain it using the available source. Preserve exact words and punctuation. Paraphrase when only the information matters. Here, a supplied interview identifies the missing address instructions as the confusing step.

```markdown
// Bad
Maya described the process as "confusing". This reveals a profound challenge.

// Good
Maya described the process as "confusing" because the form did not explain where to enter her address.
```

### Direct address

Use "you" for something the reader can do and "we" only for established shared ground. Useful advice can apply across several products without losing its value.

```markdown
// Bad
We all know that clarity is important when naming a saved filter.

// Good
Give your filter a name that describes the tasks it shows.
```

## Control pace and emphasis

### Sentence contrast

Give explanation enough room, then land a real consequence. Vary pace with the information. Avoid manufacturing a recurring pattern of long sentences and punchy fragments.

```markdown
// Bad
The first batch failed inspection, resulting in dispatch moving to Thursday, with delivery now being expected on Monday.

// Good
The first batch failed inspection, so dispatch moved to Thursday. Delivery is now expected on Monday.
```

### Parallel phrasing

Use parallel wording for genuinely comparable items. Keep the natural item count and meaningful order. Do not add a third benefit to create a cadence.

```markdown
// Bad
You should check the date, confirmation of the address is needed, and then submitting the form comes next.

// Good
Check the date, confirm the address, and submit the form.
```

### Fragment or repetition for emphasis

Use a fragment, one-sentence paragraph, or repetition only for a clear expressive purpose in the requested genre. Give an emphasis enough context to earn it. A troubleshooting instruction needs complete sentences that preserve actions and conditions. Labels and headings can remain brief because their format supplies their role.

```markdown
// Bad
Mile twenty-five. First light. One mile left before home. One more mile. One more mile.

// Good
At mile twenty-five, the first light appeared. I had one mile left before home.

One more mile.
```

### Humour or an aside

Add humour only when the writer's relationship and subject support it. A familiar personal newsletter may allow a supplied joke that would distract from a complaint response. Keep the message's practical consequence clear.

```markdown
// Bad
Your replacement charger has decided to take a little holiday. Dispatch has moved to Thursday.

// Good
I'm sorry your replacement charger is delayed. It will be dispatched on Thursday.
```

## Expose structure

Choose presentation according to how the reader will use the material.

### Heading

Name a useful section in a longer piece. Keep it descriptive and follow sentence case.

```markdown
// Bad

## Important Information

Bring proof of address and your appointment letter.

// Good

## What to bring to your appointment

Bring proof of address and your appointment letter.
```

### Bullets

Use bullets for independent items readers need to scan.

```markdown
// Bad
Bring your passport and your appointment letter and proof of address.

// Good
Bring these documents:

- Your passport
- Your appointment letter
- Proof of address
```

### Numbers

Use numbers for a sequence, ranking, or fixed count.

```markdown
// Bad
First check the date, then confirm the address, then submit the form.

// Good

1. Check the date.
2. Confirm the address.
3. Submit the form.
```

### Comparison table

Use a table when readers need to compare common criteria. The literal Markdown below demonstrates that output form. A table should expose the comparison instead of making the reader reconstruct it from repeated sentences.

```markdown
// Bad
Standard delivery costs £4 and takes three days. Express delivery costs £8 and takes one day.

// Good

| Delivery | Cost | Arrival    |
| -------- | ---- | ---------- |
| Standard | £4   | Three days |
| Express  | £8   | One day    |
```

### Connected prose

Use sentences and paragraphs when the reader needs to follow reasoning and qualification. Keep a heading, bullet lead-in, or emphasis when it adds retrieval value. Remove a label that merely repeats the sentence it introduces.

```markdown
// Bad

- **Opening:** The library will open on Saturdays.
- **Benefit:** Weekend visitors will have another day to use it.
- **Cost:** Staffing the extra day will cost more.

// Good
Opening the library on Saturdays gives weekend visitors another day to use it, but staffing the extra day will cost more.
```
