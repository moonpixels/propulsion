import { afterAll, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const script = path.resolve('skills/write-skill/scripts/count-tokens.js');
const workspace = mkdtempSync(path.join(tmpdir(), 'skill-tokens-'));
function run(args, input = '') {
    return spawnSync(process.execPath, [script, ...args], {
        input,
        encoding: 'utf8',
        timeout: 60000,
    });
}

afterAll(() => rmSync(workspace, { recursive: true, force: true }));

test('counts separate UTF-8 inputs and sums their tokens without changing files', () => {
    const first = path.join(workspace, 'first.md');
    const second = path.join(workspace, 'second.md');
    writeFileSync(first, 'hello world');
    writeFileSync(second, 'こんにちは世界');
    const args = ['--encoding', 'o200k_base', first, second];
    const result = run(args);
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({
        encoding: 'o200k_base',
        tokenizer: 'js-tiktoken',
        tokenizer_version: '1.0.21',
        inputs: [
            { input: first, tokens: 2 },
            { input: second, tokens: 2 },
        ],
        total_tokens: 4,
    });
    expect(run(args).stdout).toBe(result.stdout);
    expect(readFileSync(second, 'utf8')).toBe('こんにちは世界');
});

test('counts stdin, empty text, and literal special-token spellings', () => {
    const empty = run(['--encoding', 'o200k_base']);
    expect(JSON.parse(empty.stdout).total_tokens).toBe(0);
    const literal = run(['--encoding', 'o200k_base', '-'], '<|endoftext|>');
    expect(literal.status).toBe(0);
    expect(JSON.parse(literal.stdout).total_tokens).toBe(7);
});

test('uses the supplied encoding for the same text', () => {
    const result = run(['--encoding', 'cl100k_base'], 'こんにちは世界');
    expect(result.status).toBe(0);
    const report = JSON.parse(result.stdout);
    expect(report.encoding).toBe('cl100k_base');
    expect(report.total_tokens).toBe(4);
});

test('reports encoding and input failures without partial output', () => {
    const invalid = path.join(workspace, 'invalid.md');
    const valid = path.join(workspace, 'valid.md');
    writeFileSync(invalid, Buffer.from([0xff]));
    writeFileSync(valid, 'hello world');
    for (const args of [
        ['--encoding', 'unknown'],
        ['--encoding', 'o200k_base', path.join(workspace, 'missing.md')],
        ['--encoding', 'o200k_base', invalid],
        ['--encoding', 'o200k_base', valid, invalid],
    ]) {
        const result = run(args);
        expect(result.status).toBe(1);
        expect(result.stdout).toBe('');
        expect(JSON.parse(result.stderr).error.length).toBeGreaterThan(0);
    }
});

test('requires an encoding and rejects repeated stdin inputs', () => {
    for (const args of [[], ['--encoding', 'o200k_base', '-', '-']]) {
        const result = run(args);
        expect(result.status).toBe(2);
        expect(result.stdout).toBe('');
        expect(JSON.parse(result.stderr).error.length).toBeGreaterThan(0);
    }
});
