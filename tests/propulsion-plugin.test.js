import { describe, expect, test } from 'bun:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PropulsionPlugin } from '../.opencode/plugins/propulsion.ts';

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
    test('adds the workflow skills path once', async () => {
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
    test('injects the workflow bootstrap into the first user message', async () => {
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
