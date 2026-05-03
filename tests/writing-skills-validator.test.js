import { describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const repoRoot = join(import.meta.dir, '..');
const validatorPath = join(
    repoRoot,
    'skills/writing-skills/scripts/validate-skill.js',
);

function runValidator(args = []) {
    const result = spawnSync('bun', [validatorPath, ...args], {
        cwd: repoRoot,
        encoding: 'utf8',
    });

    return {
        ...result,
        report: JSON.parse(result.stdout),
    };
}

function validSkillMd(overrides = {}) {
    const name = overrides.name ?? 'good-skill';
    const description =
        overrides.description ??
        'Validate reusable workflow skills. Use when checking authored skill structure.';
    const sections =
        overrides.sections ??
        `## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Validate the skill.

## References

Use these references when you need detail.
`;

    return `---
name: ${name}
description: ${description}
---

# ${overrides.title ?? 'Good Skill'}

${overrides.purpose ?? 'Validate reusable skill structure before handoff.'}

${sections}`;
}

function createSkill(name, skillMd = validSkillMd({ name }), files = {}) {
    const root = mkdtempSync(join(tmpdir(), 'writing-skill-validator-'));
    const skillPath = join(root, name);
    mkdirSync(skillPath);
    writeFileSync(join(skillPath, 'SKILL.md'), skillMd);

    for (const [filePath, content] of Object.entries(files)) {
        const parts = filePath.split('/');
        parts.pop();
        if (parts.length > 0) {
            mkdirSync(join(skillPath, ...parts), { recursive: true });
        }
        writeFileSync(join(skillPath, filePath), content);
    }

    return skillPath;
}

describe('writing-skills validator', () => {
    test('ships a standalone JavaScript validator', () => {
        expect(existsSync(validatorPath)).toBe(true);
    });

    test('requires a skill path and always outputs JSON', () => {
        const result = runValidator();

        expect(result.status).toBe(1);
        expect(result.report).toMatchObject({
            path: null,
            valid: false,
            warnings: [],
            stats: null,
        });
        expect(result.report.errors).toContain(
            'Provide a skill directory path: bun validate-skill.js <skill-path>',
        );
    });

    test('accepts the writing-skills skill as JSON', () => {
        const result = runValidator(['skills/writing-skills']);

        expect(result.status).toBe(0);
        expect(result.report.valid).toBe(true);
        expect(result.report).toEqual({
            path: 'skills/writing-skills',
            valid: true,
            errors: [],
            warnings: [],
            stats: expect.objectContaining({
                bodyLines: expect.any(Number),
                artifacts: expect.any(Number),
            }),
        });
    });

    test('rejects unknown flags instead of supporting legacy options', () => {
        const result = runValidator(['--unknown']);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Unsupported option --unknown. Provide only a skill directory path.',
        );
    });

    test('validates name requirements', () => {
        const longName = `Bad-${'x'.repeat(65)}`;
        const skillPath = createSkill(
            'expected-name',
            validSkillMd({ name: longName }),
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            `Fix frontmatter name "${longName}" to match ^[a-z0-9]+(-[a-z0-9]+)*$.`,
        );
        expect(result.report.errors).toContain(
            `Shorten frontmatter name "${longName}" to 64 characters or fewer.`,
        );
        expect(result.report.errors).toContain(
            'Set frontmatter name to "expected-name" so it matches the skill directory.',
        );
    });

    test('validates description requirements and warnings', () => {
        const longFirstPersonDescription =
            'I help agents with reusable skill review language that is intentionally long enough to cross the warning threshold while still remaining under the hard maximum for metadata checks. '.padEnd(
                220,
                'x',
            );
        const skillPath = createSkill(
            'description-skill',
            validSkillMd({
                name: 'description-skill',
                description: longFirstPersonDescription,
            }),
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Add Use when, Use for, or Use to to the one-line description so agents know when to load the skill.',
        );
        expect(result.report.warnings).toContain(
            'Shorten description to 200 characters or fewer for easier skill selection. Current length: 220.',
        );
        expect(result.report.warnings).toContain(
            'Rewrite description in third person; avoid first-person wording like I, me, my, we, or our.',
        );
        expect(result.report.warnings).toContain(
            'Start description with a strong action verb such as Create, Validate, Review, Manage, or Execute.',
        );
    });

    test('errors when description is missing', () => {
        const skillPath = createSkill(
            'missing-description',
            `---
name: missing-description
---

# Missing Description

Validate missing description metadata before handoff.

## Instructions

1. Validate descriptions.

## References
`,
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Add a one-line frontmatter description with Use when, Use for, or Use to.',
        );
    });

    test('errors when description is multiline or over 300 chars', () => {
        const skillPath = createSkill(
            'description-errors',
            `---
name: description-errors
description: |
  ${'Validate metadata. Use when checking descriptions.'.padEnd(301, 'x')}
---

# Description Errors

Validate description metadata before handoff.

## Instructions

1. Validate descriptions.

## References
`,
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Rewrite frontmatter description as a single YAML line.',
        );
        expect(result.report.errors).toContain(
            'Shorten description to 300 characters or fewer. Current length: 301.',
        );
    });

    test('validates title, purpose, required sections, heading order, and final references', () => {
        const skillPath = createSkill(
            'bad-body',
            `---
name: bad-body
description: Validate skill body structure. Use when checking headings and purpose.
---

Intro before title.

## References

## Rules

## Extra
`,
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Make the first non-empty body line an H1 title, for example: # Skill Name.',
        );
        expect(result.report.errors).toContain(
            'Add one non-empty, non-heading purpose line immediately after the H1 title and before the first H2.',
        );
        expect(result.report.errors).toContain(
            'Add required section ## Instructions.',
        );
        expect(result.report.errors).toContain(
            'Remove unsupported H2 section ## Extra. Allowed H2 sections are ## Prerequisites, ## Instructions, ## Rules, ## Completion Gate, ## Next Steps, ## References.',
        );
        expect(result.report.errors).toContain(
            'Move ## Rules before ## References to match the canonical section order.',
        );
        expect(result.report.errors).toContain(
            'Move ## References to the final H2 section.',
        );
    });

    test('errors when included canonical sections do not start with required intro lines', () => {
        const skillPath = createSkill(
            'bad-intros',
            validSkillMd({
                name: 'bad-intros',
                sections: `## Prerequisites

## Instructions

Start with another instruction explanation.

1. Validate intros.

## Rules

Start with another rules explanation.

- MUST validate intros.

## Completion Gate

Start with another completion explanation.

- [ ] Intros were validated.

## Next Steps

Start with another next step explanation.

- Continue after validation.

## References

Start with another reference explanation.
`,
            }),
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Start ## Prerequisites with: ALL prerequisites MUST be true before following this skill.',
        );
        expect(result.report.errors).toContain(
            'Start ## Instructions with: Follow these steps IN ORDER. Do NOT skip steps.',
        );
        expect(result.report.errors).toContain(
            'Start ## Rules with: These rules are MANDATORY.',
        );
        expect(result.report.errors).toContain(
            'Start ## Completion Gate with: Do NOT leave this skill until ALL items are complete.',
        );
        expect(result.report.errors).toContain(
            'Start ## Next Steps with: Once the completion gate is fully checked:',
        );
        expect(result.report.errors).toContain(
            'Start ## References with: Use these references when you need detail.',
        );
    });

    test('allows extra text after required intro lines and checks only present sections', () => {
        const skillPath = createSkill(
            'extra-intro-text',
            validSkillMd({
                name: 'extra-intro-text',
                sections: `## Instructions

Follow these steps IN ORDER. Do NOT skip steps. Extra same-line guidance is allowed.

1. Validate intros.

## References

Use these references when you need detail. Extra same-line guidance is allowed.
`,
            }),
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(0);
        expect(result.report.valid).toBe(true);
        expect(result.report.errors).toEqual([]);
    });

    test('warns over 50 body lines and exits 0 when only warnings exist', () => {
        const bodyLines = Array.from(
            { length: 44 },
            (_, index) => `Extra body line ${index + 1}`,
        ).join('\n');
        const skillPath = createSkill(
            'warning-skill',
            validSkillMd({
                name: 'warning-skill',
                sections: `## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Validate warnings.

${bodyLines}

## References

Use these references when you need detail.
`,
            }),
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(0);
        expect(result.report.valid).toBe(true);
        expect(result.report.warnings).toContain(
            'Move detail out of SKILL.md; body has 51 non-empty lines and should stay at or below 50.',
        );
    });

    test('errors over 80 body lines', () => {
        const bodyLines = Array.from(
            { length: 74 },
            (_, index) => `Extra body line ${index + 1}`,
        ).join('\n');
        const skillPath = createSkill(
            'long-skill',
            validSkillMd({
                name: 'long-skill',
                sections: `## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Validate length.

${bodyLines}

## References

Use these references when you need detail.
`,
            }),
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Move detail out of SKILL.md; body has 81 non-empty lines and must stay at or below 80.',
        );
    });

    test('validates artifact placement and final references bullets', () => {
        const skillPath = createSkill(
            'artifact-checks',
            validSkillMd({
                name: 'artifact-checks',
                sections: `## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Use [ignored outside references](assets/linked-outside.md).

## References

Use these references when you need detail.

- [assets/template.md](assets/wrong.md) - Template file.
- [references/missing.md](references/missing.md) - Missing file.
- [scripts/helper.js](scripts/helper.js) -
`,
            }),
            {
                'assets/linked-outside.md': 'outside link only',
                'assets/template.md': 'template',
                'references/nested/example.md': 'nested',
                'scripts/helper.js': 'helper',
            },
        );

        const result = runValidator([skillPath]);

        expect(result.status).toBe(1);
        expect(result.report.errors).toContain(
            'Move nested artifact references/nested/example.md directly under references/; nested artifact files are not allowed.',
        );
        expect(result.report.errors).toContain(
            'Reference artifact assets/template.md with matching text and href: - [assets/template.md](assets/template.md) - short description.',
        );
        expect(result.report.errors).toContain(
            'Create linked artifact references/missing.md or remove its References bullet.',
        );
        expect(result.report.errors).toContain(
            'Add a short description after " - " for artifact reference scripts/helper.js.',
        );
        expect(result.report.errors).toContain(
            'Link artifact assets/linked-outside.md from the final ## References section.',
        );
    });
});
