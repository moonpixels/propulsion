#!/usr/bin/env bun

import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const skillRoot = fileURLToPath(new URL('../skills/', import.meta.url));
const validator = fileURLToPath(
    new URL('../skills/write-skill/scripts/validate-skill.js', import.meta.url),
);
const skillDirectories = readdirSync(skillRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) =>
        fileURLToPath(
            new URL(`${entry.name}/`, new URL('../skills/', import.meta.url)),
        ),
    )
    .toSorted();

let valid = true;

for (const skillDirectory of skillDirectories) {
    const result = spawnSync(process.execPath, [validator, skillDirectory], {
        stdio: 'inherit',
    });

    if (result.status !== 0) valid = false;
}

process.exitCode = valid ? 0 : 1;
