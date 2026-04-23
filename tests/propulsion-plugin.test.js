import { describe, expect, test } from 'bun:test';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PropulsionPlugin } from '../.opencode/plugins/propulsion.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const skillsDir = path.join(repoRoot, 'skills');
const additionalSkillsDir = path.join(repoRoot, 'additional/skills');

const createTransformOutput = () => ({
    messages: [
        {
            info: {
                id: 'msg_user_1',
                sessionID: 'ses_1',
                role: 'user',
            },
            parts: [
                {
                    id: 'prt_user_1',
                    sessionID: 'ses_1',
                    messageID: 'msg_user_1',
                    type: 'text',
                    text: 'hello',
                },
            ],
        },
    ],
});

describe('PropulsionPlugin config', () => {
    test('adds the bundled skills path once', async () => {
        const hooks = await PropulsionPlugin({});
        const config = {
            skills: {
                paths: [skillsDir],
            },
        };

        await hooks.config?.(config);

        expect(config.skills.paths).toEqual([skillsDir]);
    });

    test('preserves user commands while merging additional defaults', async () => {
        const hooks = await PropulsionPlugin({}, { additional: true });
        const config = {
            command: {
                commit: {
                    template: 'user override',
                    description: 'local command wins',
                },
            },
        };

        await hooks.config?.(config);

        expect(config.skills.paths).toContain(skillsDir);
        expect(config.skills.paths).toContain(additionalSkillsDir);
        expect(config.command.commit).toEqual({
            template: 'user override',
            description: 'local command wins',
        });
        expect(config.command.pr.description).toContain('pull request');
        expect(config.command.init.template).toContain('agentic-config');
    });
});

describe('PropulsionPlugin transform', () => {
    test('injects the propulsion-workflow bootstrap into the first user message', async () => {
        const hooks = await PropulsionPlugin({});
        const output = createTransformOutput();

        await hooks['experimental.chat.messages.transform']?.({}, output);

        expect(output.messages[0]?.parts).toHaveLength(2);
        expect(output.messages[0]?.parts[0]).toMatchObject({
            type: 'text',
            sessionID: 'ses_1',
            messageID: 'msg_user_1',
        });
        expect(output.messages[0]?.parts[0].text).toContain(
            'You are using the Propulsion workflow.',
        );
        expect(output.messages[0]?.parts[0].text).toContain(
            'Do NOT use the skill tool to load "propulsion-workflow" again',
        );
    });

    test('does not inject the bootstrap twice', async () => {
        const hooks = await PropulsionPlugin({});
        const output = createTransformOutput();

        await hooks['experimental.chat.messages.transform']?.({}, output);
        await hooks['experimental.chat.messages.transform']?.({}, output);

        expect(
            output.messages[0]?.parts.filter(
                (part) =>
                    part.type === 'text' &&
                    part.text.includes(
                        'You are using the Propulsion workflow.',
                    ),
            ),
        ).toHaveLength(1);
    });
});

describe('published package contract', () => {
    test('imports from node_modules under plain Node after npm pack', () => {
        const tempRoot = fs.mkdtempSync(
            path.join(os.tmpdir(), 'propulsion-plugin-test-'),
        );
        const packDir = path.join(tempRoot, 'pack');

        try {
            fs.mkdirSync(packDir);

            const tarballName = execFileSync(
                'npm',
                ['pack', '--quiet', '--pack-destination', packDir],
                {
                    cwd: repoRoot,
                    encoding: 'utf8',
                },
            ).trim();
            const tarballPath = path.join(packDir, tarballName);
            const appDir = path.join(tempRoot, 'app');

            fs.mkdirSync(appDir);

            execFileSync('npm', ['init', '-y'], {
                cwd: appDir,
                stdio: 'ignore',
            });
            execFileSync('npm', ['install', tarballPath], {
                cwd: appDir,
                stdio: 'ignore',
            });

            const output = execFileSync(
                'node',
                [
                    '--input-type=module',
                    '-e',
                    "import('propulsion').then(() => console.log('IMPORT_OK'))",
                ],
                {
                    cwd: appDir,
                    encoding: 'utf8',
                },
            );

            expect(output).toContain('IMPORT_OK');
        } finally {
            fs.rmSync(tempRoot, { recursive: true, force: true });
        }
    }, 30000);

    test('opencode smoke test ignores ambient global config', () => {
        const tempRoot = fs.mkdtempSync(
            path.join(os.tmpdir(), 'propulsion-opencode-config-test-'),
        );

        try {
            const configDir = path.join(tempRoot, 'config', 'opencode');
            fs.mkdirSync(configDir, { recursive: true });
            fs.writeFileSync(
                path.join(configDir, 'opencode.json'),
                '{ invalid json\n',
            );

            expect(() =>
                execFileSync('bash', ['tests/opencode/test-skill-loading.sh'], {
                    cwd: repoRoot,
                    env: {
                        ...process.env,
                        XDG_CONFIG_HOME: path.join(tempRoot, 'config'),
                    },
                    stdio: 'pipe',
                }),
            ).not.toThrow();
        } finally {
            fs.rmSync(tempRoot, { recursive: true, force: true });
        }
    }, 30000);
});
