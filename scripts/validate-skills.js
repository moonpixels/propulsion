#!/usr/bin/env bun

import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { tokenMetadata } from '../skills/write-skill/scripts/count-tokens.js';
import { validateSkill } from '../skills/write-skill/scripts/validate-skill.js';

const skillRoot = fileURLToPath(new URL('../skills/', import.meta.url));

export function validateSkills(directory = skillRoot) {
    const results = readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(directory, entry.name))
        .toSorted()
        .map(validateSkill);
    return {
        checked: results.length,
        valid: results.every((result) => result.valid),
        tokens: {
            ...tokenMetadata,
            skills: results.map((result) => ({
                skill: path.basename(result.skill),
                root_tokens: result.tokens.root_tokens,
                markdown_tokens: result.tokens.markdown_tokens,
            })),
        },
        failures: results
            .filter((result) => !result.valid)
            .map((result) => ({
                skill: path.basename(result.skill),
                errors: result.errors,
            })),
        warnings: results
            .filter((result) => result.warnings.length)
            .map((result) => ({
                skill: path.basename(result.skill),
                warnings: result.warnings,
            })),
    };
}

if (import.meta.main) {
    const result = validateSkills();
    console.log(JSON.stringify(result));
    process.exitCode = result.valid ? 0 : 1;
}
