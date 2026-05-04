import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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

    test('registers bundled skills with OpenCode config', async () => {
        const pluginPackage = (await import('../index.mjs')).default;
        const PropulsionPlugin = pluginPackage.server;
        const hooks = await PropulsionPlugin({});
        const config = {};
        const skillsDir = join(
            dirname(fileURLToPath(import.meta.url)),
            '..',
            'skills',
        );

        expect(hooks).toEqual(
            expect.objectContaining({
                config: expect.any(Function),
            }),
        );

        await hooks.config(config);
        await hooks.config(config);

        expect(config.skills.paths).toEqual([skillsDir]);
        await expect(
            readFile(join(skillsDir, 'debug', 'SKILL.md'), 'utf8'),
        ).resolves.toContain('# Debug');
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

    test('registers an OpenCode messages transform that injects Propulsion guidance into the first user message', async () => {
        const pluginPackage = (await import('../index.mjs')).default;
        const PropulsionPlugin = pluginPackage.server;
        const hooks = await PropulsionPlugin({});
        const userPart = {
            id: 'part-user',
            type: 'text',
            text: 'Build the thing',
        };
        const output = {
            system: ['existing system prompt'],
            messages: [
                {
                    info: { role: 'assistant' },
                    parts: [
                        {
                            id: 'part-assistant',
                            type: 'text',
                            text: 'Ready',
                        },
                    ],
                },
                {
                    info: { role: 'user' },
                    parts: [userPart],
                },
            ],
        };

        expect(hooks).toEqual(
            expect.objectContaining({
                'experimental.chat.messages.transform': expect.any(Function),
            }),
        );
        expect(hooks).not.toHaveProperty('experimental.chat.system.transform');

        await hooks['experimental.chat.messages.transform']({}, output);
        await hooks['experimental.chat.messages.transform']({}, output);

        expect(output.system).toEqual(['existing system prompt']);
        expect(output.messages).toHaveLength(2);
        expect(output.messages[0].info.role).toBe('assistant');
        expect(output.messages[1].parts).toEqual([
            {
                ...userPart,
                type: 'text',
                text: getPropulsionBootstrapGuidance(),
            },
            userPart,
        ]);
    });
});
