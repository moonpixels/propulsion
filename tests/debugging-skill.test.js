import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const debuggingDir = path.join(repoRoot, 'skills/debugging');
const debuggingSkillPath = path.join(debuggingDir, 'SKILL.md');
const debuggingReferencesDir = path.join(debuggingDir, 'references');

describe('debugging skill reference suite', () => {
    test('includes focused branch references and links them from SKILL.md', () => {
        const skill = fs.readFileSync(debuggingSkillPath, 'utf8');
        const expectedReferences = [
            'flaky-failures.md',
            'regression-isolation.md',
            'performance-failures.md',
            'environment-and-config.md',
            'data-dependent-failures.md',
            'concurrency-and-ordering.md',
            'multi-component-boundaries.md',
        ];

        for (const fileName of expectedReferences) {
            expect(
                fs.existsSync(path.join(debuggingReferencesDir, fileName)),
            ).toBe(true);
            expect(skill).toContain(`[references/${fileName}]`);
        }

        expect(skill).toContain('[references/debugger-led-inspection.md]');
    });
});
