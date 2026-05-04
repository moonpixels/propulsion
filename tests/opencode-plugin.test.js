import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

import { getPropulsionBootstrapGuidance } from '../lib/bootstrap-guidance.js';

describe('OpenCode Propulsion bootstrap guidance', () => {
    test('exposes the root package entry for OpenCode package loading', async () => {
        const manifest = JSON.parse(await readFile('package.json', 'utf8'));
        const rootExports = await import('../index.mjs');

        expect(manifest.main).toBe('./index.mjs');
        expect(manifest.exports).toBe('./index.mjs');
        expect(
            Object.values(rootExports).every(
                (value) =>
                    typeof value === 'function' ||
                    (typeof value === 'object' &&
                        value !== null &&
                        typeof value.server === 'function'),
            ),
        ).toBe(true);
    });

    test('provides high-priority Propulsion routing guidance', () => {
        const guidance = getPropulsionBootstrapGuidance();

        expect(guidance).toContain('<EXTREMELY_IMPORTANT>');
        expect(guidance).toContain('</EXTREMELY_IMPORTANT>');
        expect(guidance).toContain('propulsion');
        expect(guidance).toContain(
            'Route software work through Propulsion before downstream stages.',
        );
        expect(guidance).toContain(
            'Route software-work requests into the right Propulsion entry stage before any other action.',
        );
    });

    test('registers an OpenCode messages transform that prepends Propulsion guidance', async () => {
        const pluginPackage = (await import('../index.mjs')).default;
        const PropulsionPlugin = pluginPackage.server;
        const hooks = await PropulsionPlugin({});
        const output = {
            system: ['existing system prompt'],
            messages: [{ role: 'user', content: 'Build the thing' }],
        };

        expect(hooks).toEqual(
            expect.objectContaining({
                'experimental.chat.messages.transform': expect.any(Function),
            }),
        );
        expect(hooks).not.toHaveProperty('experimental.chat.system.transform');

        await hooks['experimental.chat.messages.transform']({}, output);

        expect(output.system).toEqual(['existing system prompt']);
        expect(output.messages).toEqual([
            {
                role: 'system',
                content: getPropulsionBootstrapGuidance(),
            },
            { role: 'user', content: 'Build the thing' },
        ]);
    });
});
