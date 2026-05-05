import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

import {
    PROPULSION_BOOTSTRAP_GUIDANCE,
    getPropulsionBootstrapGuidance,
} from '../lib/bootstrap-guidance.js';

async function readJson(path) {
    return JSON.parse(await readFile(path, 'utf8'));
}

describe('Codex Propulsion bootstrap guidance', () => {
    test('uses the shared Propulsion bootstrap contract', () => {
        expect(getPropulsionBootstrapGuidance()).toBe(
            PROPULSION_BOOTSTRAP_GUIDANCE,
        );
    });

    test('registers a plugin-root session-start hook matcher', async () => {
        const config = await readJson('hooks/hooks.json');

        expect(config.hooks.SessionStart).toEqual([
            {
                matcher: 'startup|clear|compact|resume',
                hooks: [
                    {
                        type: 'command',
                        command:
                            '"${CODEX_PLUGIN_ROOT}/hooks/run-hook.cmd" session-start',
                        timeout: 10,
                        statusMessage: 'Loading Propulsion workflow',
                    },
                ],
            },
        ]);
    });

    test('runs configured hook command from outside the plugin cwd', async () => {
        const config = await readJson('hooks/hooks.json');
        const command = config.hooks.SessionStart[0].hooks[0].command;

        const result = Bun.spawnSync({
            cmd: ['sh', '-c', command],
            cwd: '/private/tmp',
            env: {
                ...process.env,
                CODEX_PLUGIN_ROOT: process.cwd(),
            },
            stdout: 'pipe',
            stderr: 'pipe',
        });

        expect(result.exitCode).toBe(0);

        const output = new TextDecoder().decode(result.stdout).trim();
        const payload = JSON.parse(output);

        expect(payload.hookSpecificOutput).toEqual({
            hookEventName: 'SessionStart',
            additionalContext: PROPULSION_BOOTSTRAP_GUIDANCE,
        });
    });

    test('prints Codex SessionStart additional context as parseable JSON', async () => {
        const result = Bun.spawnSync({
            cmd: ['./hooks/run-hook.cmd', 'session-start'],
            stdout: 'pipe',
            stderr: 'pipe',
        });

        expect(result.exitCode).toBe(0);

        const output = new TextDecoder().decode(result.stdout).trim();
        const payload = JSON.parse(output);

        expect(payload).toEqual({
            hookSpecificOutput: {
                hookEventName: 'SessionStart',
                additionalContext: PROPULSION_BOOTSTRAP_GUIDANCE,
            },
        });
        expect(payload.hookSpecificOutput.additionalContext).toContain(
            '<EXTREMELY_IMPORTANT>',
        );
        expect(payload.hookSpecificOutput.additionalContext).toContain(
            'Propulsion workflow entry point: load and follow the propulsion skill when the request is software work.',
        );
        expect(payload.hookSpecificOutput.additionalContext).toContain(
            'Route software work through Propulsion before downstream stages.',
        );
    });
});
