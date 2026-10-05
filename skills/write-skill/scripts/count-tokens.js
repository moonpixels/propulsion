#!/usr/bin/env bun

import { getEncoding } from 'js-tiktoken';
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

import manifest from '../package.json';

export const tokenMetadata = {
    encoding: 'o200k_base',
    tokenizer: 'js-tiktoken',
    tokenizer_version: manifest.dependencies['js-tiktoken'],
};
const encoders = new Map();

export function countTokens(text, encoding = tokenMetadata.encoding) {
    if (!encoders.has(encoding)) encoders.set(encoding, getEncoding(encoding));
    return encoders.get(encoding).encode(text, [], []).length;
}

export function readTextFile(filename) {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(
        readFileSync(filename === '-' ? 0 : filename),
    );
}

export function countFiles(files, encoding) {
    const inputs = files.map((input) => ({
        input,
        tokens: countTokens(readTextFile(input), encoding),
    }));
    return {
        ...tokenMetadata,
        encoding,
        inputs,
        total_tokens: inputs.reduce((total, input) => total + input.tokens, 0),
    };
}

if (import.meta.main) {
    let options;
    try {
        options = parseArgs({
            options: {
                encoding: { type: 'string' },
                help: { type: 'boolean' },
            },
            allowPositionals: true,
        });
        if (options.values.help) {
            console.log(
                'Usage: bun count-tokens.js --encoding <name> [files...]\nUTF-8 files; - or no files reads stdin. Outputs JSON. Exits: 0 success, 1 counting failure, 2 usage error.',
            );
            process.exit(0);
        }
        if (!options.values.encoding)
            throw new Error('--encoding is required.');
        if (options.positionals.filter((value) => value === '-').length > 1)
            throw new Error('stdin may be supplied only once.');
    } catch (error) {
        console.error(JSON.stringify({ error: error.message }));
        process.exit(2);
    }
    try {
        console.log(
            JSON.stringify(
                countFiles(
                    options.positionals.length ? options.positionals : ['-'],
                    options.values.encoding,
                ),
            ),
        );
    } catch (error) {
        console.error(JSON.stringify({ error: error.message }));
        process.exitCode = 1;
    }
}
