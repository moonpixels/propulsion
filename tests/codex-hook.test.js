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

    test('registers a compact plugin-local session-start hook matcher', async () => {
        const config = await readJson('hooks/hooks.json');

        expect(config.hooks.SessionStart).toEqual([
            {
                matcher: 'startup|clear|compact|resume',
                hooks: [
                    {
                        type: 'command',
                        command: './hooks/run-hook.cmd session-start',
                    },
                ],
            },
        ]);
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
