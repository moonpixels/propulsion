#!/usr/bin/env bun

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const help = args.length === 1 && args[0] === '--help';
if (args.length !== 1 || args[0] === '--help') {
    const usage = 'Usage: bun validate-report.js <report.html>';
    console.log(
        help ? usage : JSON.stringify({ valid: false, errors: [usage] }),
    );
    process.exit(help ? 0 : 2);
}

const absolutePath = path.resolve(args[0]);
const errors = [];
let html = '';
try {
    if (path.extname(absolutePath).toLowerCase() !== '.html')
        errors.push('Report must be an HTML file.');
    if (!fs.statSync(absolutePath).isFile())
        errors.push('Report path must name a file.');
    if (!errors.length) html = fs.readFileSync(absolutePath, 'utf8');
} catch (error) {
    errors.push(`Cannot read report: ${error.message}`);
}

const report = inspectReport(html);
for (const [label, present] of [
    ['HTML document', report.doctype],
    ['language', report.language],
    ['UTF-8 metadata', report.encoding],
    ['responsive viewport', report.viewport],
    ['review root', report.markers.has('data-architecture-review')],
    ['reviewed revision', report.markers.has('data-reviewed-revision')],
    ['coverage', report.markers.has('data-coverage')],
]) {
    if (!present) errors.push(`Missing ${label}.`);
}
if (/%%[A-Z0-9_-]+%%/.test(html))
    errors.push('Unresolved template marker remains.');

for (const [index, article] of report.articles.entries()) {
    const label = `Recommendation ${index + 1}`;
    if (!/^\d+$/.test(article.number) || Number(article.number) !== index + 1)
        errors.push(
            'Recommendation numbers must follow fixed contiguous order.',
        );
    for (const field of [
        'data-recommendation-summary',
        'recommendation',
        'why',
        'improves',
    ]) {
        if (!article.fields.has(field))
            errors.push(`${label}: missing visible field ${field}.`);
    }
    if (!article.expandable)
        errors.push(`${label}: missing expandable evidence.`);
    if (!article.evidence) errors.push(`${label}: missing data-evidence.`);
    if (!article.tradeoffs) errors.push(`${label}: missing data-tradeoffs.`);
}
const topMarkers = report.markers.get('data-top-recommendation') ?? 0;
if (report.articles.length) {
    if (topMarkers !== 1 || !report.articles[0].top)
        errors.push('Only the first recommendation must be marked as top.');
    if (report.markers.has('data-zero-result'))
        errors.push(
            'A report with recommendations cannot also be a zero result.',
        );
} else {
    if (!report.markers.has('data-zero-result'))
        errors.push('A zero-candidate report must contain data-zero-result.');
    if (topMarkers)
        errors.push(
            'A zero-candidate report cannot mark a top recommendation.',
        );
}

console.log(
    JSON.stringify({
        valid: errors.length === 0,
        path: absolutePath,
        recommendations: report.articles.length,
        errors,
    }),
);
process.exit(errors.length ? 1 : 0);

function inspectReport(source) {
    const markers = new Map();
    const articles = [];
    const active = [];
    let doctype = false;
    let language = false;
    let encoding = false;
    let viewport = false;
    let hiddenDepth = 0;
    const rewriter = new HTMLRewriter()
        .onDocument({
            doctype(value) {
                doctype ||= value.name?.toLowerCase() === 'html';
            },
        })
        .on('*', {
            element(element) {
                const tag = element.tagName;
                const endActions = [];
                const hidden =
                    element.hasAttribute('hidden') || tag === 'template';
                if (hidden && element.canHaveContent) {
                    hiddenDepth++;
                    endActions.push(() => hiddenDepth--);
                }
                const visible = !hidden && hiddenDepth === 0;
                for (const [name] of element.attributes) {
                    markers.set(name, (markers.get(name) ?? 0) + 1);
                }
                if (tag === 'html') language ||= element.hasAttribute('lang');
                if (tag === 'meta') {
                    encoding ||=
                        element.getAttribute('charset')?.toLowerCase() ===
                        'utf-8';
                    viewport ||=
                        element.getAttribute('name')?.toLowerCase() ===
                        'viewport';
                }
                if (
                    tag === 'article' &&
                    element.hasAttribute('data-recommendation')
                ) {
                    const article = {
                        number: element.getAttribute('data-recommendation'),
                        top: element.hasAttribute('data-top-recommendation'),
                        fields: new Set(),
                        details: [],
                        expandable: false,
                        evidence: false,
                        tradeoffs: false,
                    };
                    articles.push(article);
                    active.push(article);
                    endActions.push(() => {
                        active.pop();
                    });
                }
                const article = active.at(-1);
                if (article && tag === 'details') {
                    const details = {
                        summary: false,
                        evidence: false,
                        tradeoffs: false,
                    };
                    article.details.push(details);
                    endActions.push(() => {
                        if (details.summary) {
                            article.expandable = true;
                            article.evidence ||= details.evidence;
                            article.tradeoffs ||= details.tradeoffs;
                        }
                        article.details.pop();
                    });
                }
                if (visible && tag === 'summary' && article?.details.length)
                    article.details.at(-1).summary = true;
                if (visible && article && !article.details.length) {
                    if (element.hasAttribute('data-recommendation-summary'))
                        article.fields.add('data-recommendation-summary');
                    const field = element.getAttribute('data-field');
                    if (field) article.fields.add(field);
                }
                for (const details of visible ? (article?.details ?? []) : []) {
                    details.evidence ||= element.hasAttribute('data-evidence');
                    details.tradeoffs ||=
                        element.hasAttribute('data-tradeoffs');
                }
                if (endActions.length)
                    element.onEndTag(() => {
                        for (const action of endActions) action();
                    });
            },
        });
    rewriter.transform(source);
    return { markers, articles, doctype, language, encoding, viewport };
}
