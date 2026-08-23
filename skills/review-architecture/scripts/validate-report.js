#!/usr/bin/env bun

import fs from 'node:fs';
import path from 'node:path';

const reportPath = process.argv[2];
const errors = [];

if (!reportPath) {
    console.error('Usage: bun scripts/validate-report.js <report.html>');
    process.exit(2);
}

const absolutePath = path.resolve(reportPath);
if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    errors.push(`Report not found: ${absolutePath}`);
}

let html = '';
if (!errors.length) html = fs.readFileSync(absolutePath, 'utf8');

const normalized = absolutePath.split(path.sep).join('/');
if (
    !normalized.includes('/docs/architecture/') ||
    path.extname(absolutePath) !== '.html'
) {
    errors.push('Report must be an HTML file under docs/architecture/.');
}
if (
    !/^\d{8}-full-codebase-architecture-review(?:-\d+)?\.html$/.test(
        path.basename(absolutePath),
    )
) {
    errors.push(
        'Report filename must follow the dated full-codebase convention.',
    );
}

const required = [
    ['HTML document', /<!doctype html>/i],
    ['language', /<html\b[^>]*\blang=/i],
    ['UTF-8 metadata', /<meta\b[^>]*charset=["']?utf-8/i],
    ['responsive viewport', /<meta\b[^>]*name=["']viewport["']/i],
    [
        'Tailwind browser CDN',
        /cdn\.jsdelivr\.net\/npm\/@tailwindcss\/browser@4/,
    ],
    [
        'deferred Alpine CDN',
        /<script\b[^>]*\bdefer\b[^>]*alpinejs@3\.x\.x\/dist\/cdn\.min\.js/i,
    ],
    ['review root', /\bdata-architecture-review\b/],
    ['reviewed revision', /\bdata-reviewed-revision\b/],
    ['coverage', /\bdata-coverage\b/],
];

for (const [label, pattern] of required) {
    if (!pattern.test(html)) errors.push(`Missing ${label}.`);
}

if (/%%[A-Z0-9_-]+%%/.test(html))
    errors.push('Unresolved template marker remains.');

const candidates = [
    ...html.matchAll(/<article\b[^>]*\bdata-recommendation=["'](\d+)["']/gi),
];
const numbers = candidates.map((match) => Number(match[1]));
if (numbers.some((number, index) => number !== index + 1)) {
    errors.push(
        'Recommendation numbers must be contiguous and in fixed document order.',
    );
}

if (candidates.length) {
    if (!/\bdata-top-recommendation\b/.test(html))
        errors.push('Missing top recommendation.');
    for (const marker of [
        'data-recommendation-summary',
        'data-field="recommendation"',
        'data-field="why"',
        'data-field="improves"',
        'data-evidence',
        'data-tradeoffs',
    ]) {
        if (!html.includes(marker))
            errors.push(`Missing candidate field: ${marker}.`);
    }
} else if (!/\bdata-zero-result\b/.test(html)) {
    errors.push('A zero-candidate report must contain data-zero-result.');
}

if (errors.length) {
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log(
    `Report valid: ${absolutePath} (${candidates.length} recommendations)`,
);
