import { describe, expect, test } from 'bun:test';
import { access, readFile } from 'node:fs/promises';

async function readJson(path) {
    return JSON.parse(await readFile(path, 'utf8'));
}

describe('Codex plugin manifest', () => {
    test('publishes Propulsion as a Codex plugin with shared skills and hooks', async () => {
        const manifest = await readJson('.codex-plugin/plugin.json');

        expect(manifest.name).toBe('propulsion');
        expect(manifest.version).toBe('0.10.0');
        expect(manifest.description).toContain('Propulsion');
        expect(manifest.homepage).toBe(
            'https://github.com/moonpixels/propulsion',
        );
        expect(manifest.repository).toBe(
            'https://github.com/moonpixels/propulsion',
        );
        expect(manifest.license).toBe('MIT');
        expect(manifest.keywords).toEqual(
            expect.arrayContaining([
                'propulsion',
                'codex-plugin',
                'opencode-plugin',
                'skills',
                'workflow',
                'planning',
                'tdd',
                'debugging',
                'review',
                'guardrails',
                'developer-tools',
            ]),
        );
        expect(manifest.skills).toBe('./skills/');
        expect(manifest.hooks).toBe('./hooks/hooks.json');
        expect(manifest.interface).toEqual(
            expect.objectContaining({
                displayName: 'Propulsion',
                developerName: 'Moon Pixels',
                category: 'Coding',
                capabilities: ['Interactive', 'Read', 'Write'],
                websiteURL: 'https://github.com/moonpixels/propulsion',
                defaultPrompt: [
                    'Turn my idea into an implementation-ready plan with Propulsion',
                    'Debug and fix this bug with Propulsion guardrails',
                    'Review these changes with the Propulsion review workflow',
                ],
                brandColor: '#FF4F00',
                composerIcon: './assets/propulsion_icon_square.png',
                logo: './assets/banner.png',
                screenshots: [],
            }),
        );
        expect(manifest.author).toEqual({ name: 'Moon Pixels' });

        await expect(access('skills/propulsion/SKILL.md')).resolves.toBeNull();
        await expect(access('hooks/hooks.json')).resolves.toBeNull();
        await expect(
            access('assets/propulsion_icon_square.png'),
        ).resolves.toBeNull();
        await expect(access('assets/banner.png')).resolves.toBeNull();
    });

    test('exposes the root plugin through the repo marketplace', async () => {
        const marketplace = await readJson('.agents/plugins/marketplace.json');

        expect(marketplace.name).toBe('propulsion');
        expect(marketplace.interface).toEqual({
            displayName: 'Propulsion',
            developerName: 'Moon Pixels',
        });
        expect(marketplace.plugins).toContainEqual({
            name: 'propulsion',
            source: {
                source: 'local',
                path: './',
            },
            policy: {
                installation: 'AVAILABLE',
                authentication: 'ON_INSTALL',
            },
            category: 'Coding',
        });
    });
});
