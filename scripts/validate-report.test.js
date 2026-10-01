import { describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const validator = path.resolve(
    'skills/review-architecture/scripts/validate-report.js',
);
const frame = (body) => `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Architecture</title></head><body><main data-architecture-review>
<p data-reviewed-revision>abc123</p>${body}<section data-coverage>Source and tests reviewed.</section>
</main></body></html>`;
const candidate = (
    number,
    top = false,
) => `<article data-recommendation="${number}" ${top ? 'data-top-recommendation' : ''}>
<h2>Own the pricing rule</h2><dl data-recommendation-summary>
<div data-field="recommendation">Concentrate pricing policy</div>
<div data-field="why">The same threshold changes in two callers</div>
<div data-field="improves">Local changes</div></dl>
<details><summary>Evidence and trade-offs</summary><p data-evidence>src/price.js:4 &lt;script&gt;alert(1)&lt;/script&gt;</p>
<p data-tradeoffs>One module gets larger</p></details></article>`;

function check(html) {
    const directory = mkdtempSync(path.join(tmpdir(), 'report-contract-'));
    const report = path.join(directory, 'requested-output.html');
    try {
        writeFileSync(report, html);
        const result = spawnSync(process.execPath, [validator, report], {
            encoding: 'utf8',
        });
        return {
            status: result.status,
            value: JSON.parse(result.stdout),
            source: readFileSync(report, 'utf8'),
        };
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
}

describe('architecture report contract', () => {
    test('accepts a requested destination and self-contained report with escaped evidence', () => {
        const html = frame(candidate(1, true));
        const result = check(html);
        expect(result.status).toBe(0);
        expect(result.value).toMatchObject({
            valid: true,
            recommendations: 1,
            errors: [],
        });
        expect(result.source).toBe(html);
    });
    test('accepts an evidence-backed zero result', () => {
        expect(
            check(frame('<p data-zero-result>No material candidates.</p>'))
                .status,
        ).toBe(0);
    });
    test('accepts equivalent single-quoted HTML attributes', () => {
        const html = frame(candidate(1, true)).replaceAll('"', "'");
        expect(check(html).status).toBe(0);
    });
    test('accepts visible fields after closed evidence, including nested details', () => {
        const original = candidate(1, true);
        const evidence = original.match(/<details>[\s\S]*?<\/details>/)[0];
        const reordered = original
            .replace(evidence, '')
            .replace(
                '<h2>',
                `${evidence.replace('<p data-tradeoffs>', '<details><summary>Costs</summary><p data-tradeoffs>').replace('</details>', '</details></details>')}<h2>`,
            );
        expect(check(frame(reordered)).status).toBe(0);
    });
    test('distinguishes real attributes from escaped evidence, comments and attribute values', () => {
        const escaped = candidate(1, true).replace(
            'src/price.js:4',
            'src/price.js:4 &lt;article data-top-recommendation data-zero-result&gt;',
        );
        expect(check(frame(escaped)).status).toBe(0);
        const imitation =
            frame(candidate(1, true)).replace(
                'data-reviewed-revision',
                'title="data-reviewed-revision"',
            ) + '<!-- data-reviewed-revision -->';
        expect(check(imitation).status).toBe(1);
        expect(
            check(
                frame(candidate(1, true)).replace(
                    'data-coverage',
                    'data-coverage-other',
                ),
            ).status,
        ).toBe(1);
    });
    test('parses unquoted attributes and checks each parsed recommendation', () => {
        expect(
            check(
                frame(candidate(1, true)).replace(
                    'data-recommendation="1"',
                    'data-recommendation=1',
                ),
            ).status,
        ).toBe(0);
        expect(
            check(
                frame(
                    '<article data-recommendation=1 data-top-recommendation>Incomplete</article>',
                ),
            ).status,
        ).toBe(1);
    });
    test('checks a second recommendation rather than accepting fields from the first', () => {
        const broken = candidate(2).replace(
            'data-field="why"',
            'data-field="other"',
        );
        const result = check(frame(candidate(1, true) + broken));
        expect(result.status).toBe(1);
        expect(
            result.value.errors.some((error) =>
                error.includes('Recommendation 2'),
            ),
        ).toBe(true);
    });
    test('rejects hidden summary fields and missing expandable evidence', () => {
        const hidden = candidate(1, true).replace(
            '<dl data-recommendation-summary>',
            '<details><dl data-recommendation-summary>',
        );
        expect(check(frame(hidden)).status).toBe(1);
        const flat = candidate(1, true).replace(
            /<details>[\s\S]*?<\/details>/,
            '<p data-evidence>Evidence</p><p data-tradeoffs>Trade-offs</p>',
        );
        expect(check(frame(flat)).status).toBe(1);
        const misplaced = candidate(1, true).replace(
            /<details>[\s\S]*?<\/details>/,
            '<details><summary>Empty</summary></details><p data-evidence>Evidence</p><p data-tradeoffs>Trade-offs</p>',
        );
        expect(check(frame(misplaced)).status).toBe(1);
    });
    test('rejects leftover markers and contradictory result states', () => {
        expect(
            check(
                frame(candidate(1, true)).replace(
                    '<!doctype html>',
                    '<!doctype>',
                ),
            ).status,
        ).toBe(1);
        expect(check(frame(candidate(1, true) + '%%REVISION%%')).status).toBe(
            1,
        );
        expect(
            check(frame(candidate(1, true) + '<p data-zero-result>None</p>'))
                .status,
        ).toBe(1);
        expect(check(frame(candidate(2, true))).status).toBe(1);
    });
    test('rejects intrinsically hidden fields and evidence without leaking hidden ancestry', () => {
        const original = candidate(1, true);
        for (const hidden of [
            original.replace(
                '<dl data-recommendation-summary>',
                '<dl hidden data-recommendation-summary>',
            ),
            original.replace('data-field="why"', 'hidden data-field="why"'),
            `<section hidden>${original}</section>`,
            `<template>${original}</template>`,
            original.replace('<details>', '<details hidden>'),
            original.replace('<summary>', '<summary hidden>'),
            original.replace('data-evidence', 'hidden data-evidence'),
        ])
            expect(check(frame(hidden)).status).toBe(1);
        expect(
            check(frame(`<div hidden>Hidden</div><br hidden>${original}`))
                .status,
        ).toBe(0);
        expect(
            check(frame(`<article hidden>Hidden</article>${original}`)).status,
        ).toBe(0);
    });
    test('reports missing files and invalid usage without changing files', () => {
        const missing = spawnSync(
            process.execPath,
            [validator, '/private/tmp/absent-report-fixture.html'],
            { encoding: 'utf8' },
        );
        expect(missing.status).toBe(1);
        expect(JSON.parse(missing.stdout).valid).toBe(false);
        const usage = spawnSync(process.execPath, [validator], {
            encoding: 'utf8',
        });
        expect(usage.status).toBe(2);
        expect(JSON.parse(usage.stdout).valid).toBe(false);
        expect(
            spawnSync(process.execPath, [validator, '--help'], {
                encoding: 'utf8',
            }).status,
        ).toBe(0);
        const extra = spawnSync(
            process.execPath,
            [validator, '--help', 'extra'],
            { encoding: 'utf8' },
        );
        expect(extra.status).toBe(2);
        expect(JSON.parse(extra.stdout).valid).toBe(false);
    });
});
