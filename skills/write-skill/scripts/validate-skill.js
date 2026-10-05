#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { countTokens, readTextFile, tokenMetadata } from './count-tokens.js';

function isMapping(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function markdownProse(source) {
    let fence = null;
    return source
        .replace(/<!--[\s\S]*?(?:-->|$)/g, '')
        .split(/\r?\n/)
        .map((line) => {
            const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
            if (marker && !fence) {
                fence = marker[1];
                return '';
            }
            if (
                marker &&
                fence &&
                marker[1][0] === fence[0] &&
                marker[1].length >= fence.length &&
                marker[2].trim() === ''
            ) {
                fence = null;
                return '';
            }
            return fence ? '' : line.replace(/(`+)[\s\S]*?\1/g, '');
        })
        .join('\n');
}

function isEscaped(source, index) {
    let backslashes = 0;
    while (index > 0 && source[--index] === '\\') backslashes += 1;
    return backslashes % 2 === 1;
}

function linkDestination(source, start) {
    let cursor = start;
    while (/\s/.test(source[cursor] ?? '') && cursor < source.length)
        cursor += 1;
    if (source[cursor] === '<') {
        const end = source.indexOf('>', cursor + 1);
        return end < 0 ? null : source.slice(cursor + 1, end);
    }
    const beginning = cursor;
    let depth = 0;
    while (cursor < source.length) {
        const character = source[cursor];
        if (character === '\\') {
            cursor += 2;
            continue;
        }
        if (character === '(') depth += 1;
        if (character === ')') {
            if (depth === 0) break;
            depth -= 1;
        }
        if (/\s/.test(character) && depth === 0) break;
        cursor += 1;
    }
    return depth === 0 ? source.slice(beginning, cursor) : null;
}

function localLinkTargets(source) {
    const prose = markdownProse(source);
    const targets = [];
    const pattern = /!?\[[^\]\n]*\]\(\s*|^ {0,3}\[[^\]\n]+\]:[ \t]*/gm;
    for (const match of prose.matchAll(pattern)) {
        if (isEscaped(prose, match.index)) continue;
        const destination = linkDestination(
            prose,
            match.index + match[0].length,
        );
        const target = destination?.replace(/\\([ ()])/g, '$1').split('#')[0];
        if (
            target &&
            (/^file:/i.test(target) ||
                /^[a-z]:[\\/]/i.test(target) ||
                !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target))
        )
            targets.push(target);
    }
    return targets;
}

function characterCount(value) {
    return Array.from(value).length;
}

function layoutWarnings(source) {
    const warnings = [];
    const prose = markdownProse(source);
    const lines = prose.split('\n');
    const content = source.replace(/<!--[\s\S]*?(?:-->|$)/g, '').split(/\r?\n/);
    const headings = [];
    for (let index = 0; index < lines.length; index += 1) {
        const atx = lines[index].match(/^ {0,3}(#{1,6})\s+(.+?)\s*$/);
        if (atx) {
            headings.push({
                level: atx[1].length,
                title: atx[2].replace(/\s+#+$/, '').trim(),
                start: index,
                end: index + 1,
            });
        } else if (
            index > 0 &&
            lines[index - 1].trim() &&
            /^ {0,3}(?:=+|-+)\s*$/.test(lines[index]) &&
            headings.at(-1)?.start !== index - 1
        ) {
            headings.push({
                level: lines[index].trim().startsWith('=') ? 1 : 2,
                title: lines[index - 1].trim(),
                start: index - 1,
                end: index + 1,
            });
        }
    }
    const names = ['Inputs', 'Method', 'Finish'];
    const sections = names.map((name) =>
        headings.find(
            (heading) =>
                heading.level === 2 &&
                heading.title.toLowerCase() === name.toLowerCase(),
        ),
    );
    const missing = names.filter((_, index) => !sections[index]);
    if (missing.length)
        warnings.push(
            `SKILL.md: missing default headings: ${missing.join(', ')}. Review whether a tiny or router layout is justified.`,
        );
    const present = sections.filter(Boolean);
    if (
        present.some(
            (section, index) =>
                index > 0 && section.start < present[index - 1].start,
        )
    )
        warnings.push(
            'SKILL.md: default headings are out of order; use Inputs, Method, Finish unless another layout is justified.',
        );
    for (const [index, section] of sections.entries()) {
        if (!section) continue;
        const next = headings.find(
            (heading) =>
                heading.start > section.start && heading.level <= section.level,
        );
        if (
            !content
                .slice(section.end, next?.start ?? content.length)
                .join('\n')
                .trim()
        )
            warnings.push(
                `SKILL.md: ${names[index]} section is empty; supply content or review whether it has a useful job.`,
            );
    }
    if (
        !/\b(?:(?:done|finish(?:ed)?|complete(?:d)?)(?:\s+only)?\s+(?:when|once|after)|stop(?:\s+only)?\s+(?:when|once))\b/i.test(
            prose,
        )
    )
        warnings.push(
            'SKILL.md: no recognisable completion gate; review whether the stopping condition is explicit.',
        );
    return warnings;
}

function markdownFiles(directory) {
    const files = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (['.git', 'node_modules'].includes(entry.name)) continue;
        const target = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...markdownFiles(target));
        else if (entry.isFile() && entry.name.endsWith('.md'))
            files.push(target);
    }
    return files;
}

function validateOpenAIAdapter(root, errors) {
    const filename = path.join(root, 'agents/openai.yaml');
    const fail = (message) => errors.push(`agents/openai.yaml: ${message}`);
    try {
        const adapter = Bun.YAML.parse(readFileSync(filename, 'utf8'));
        if (!isMapping(adapter)) {
            fail('must be a YAML mapping.');
            return;
        }
        if (!isMapping(adapter.interface)) {
            fail('interface must be a mapping.');
        } else {
            const fields = adapter.interface;
            for (const key of ['display_name', 'short_description']) {
                if (typeof fields[key] !== 'string' || !fields[key].trim())
                    fail(`interface.${key} must be a non-empty string.`);
            }
        }
    } catch (error) {
        fail(error.message);
    }
}

function validateFrontmatter(frontmatter, root, errors) {
    const { name, description } = frontmatter;
    if (
        typeof name !== 'string' ||
        name.length > 64 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)
    ) {
        errors.push(
            'name must be 1-64 lowercase letters, digits, or single hyphens, without edge hyphens.',
        );
    } else if (name !== path.basename(root)) {
        errors.push('name must match the skill directory name.');
    }
    if (
        typeof description !== 'string' ||
        !description.trim() ||
        characterCount(description) > 1024
    )
        errors.push(
            'description must be a non-empty string of at most 1,024 characters.',
        );
}

export function validateSkill(directory) {
    const root = path.resolve(directory);
    const errors = [];
    const warnings = [];
    const tokenFiles = [];
    let frontmatterLength = 0;
    validateOpenAIAdapter(root, errors);
    try {
        const source = readFileSync(path.join(root, 'SKILL.md'), 'utf8');
        const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
        frontmatterLength = match?.[0].length ?? 0;
        if (!match) {
            errors.push(
                'SKILL.md must start with YAML frontmatter delimited by ---.',
            );
        } else {
            const frontmatter = Bun.YAML.parse(match[1]);
            if (isMapping(frontmatter))
                validateFrontmatter(frontmatter, root, errors);
            else errors.push('Frontmatter must be a YAML mapping.');
        }
    } catch (error) {
        errors.push(error.message);
    }
    try {
        for (const file of markdownFiles(root).toSorted()) {
            const content = readTextFile(file);
            tokenFiles.push({
                file: path.relative(root, file),
                tokens: countTokens(content),
            });
            const prose =
                file === path.join(root, 'SKILL.md')
                    ? content.slice(frontmatterLength)
                    : content;
            if (file === path.join(root, 'SKILL.md'))
                warnings.push(...layoutWarnings(prose));
            for (const target of localLinkTargets(prose)) {
                const decoded = decodeURIComponent(target);
                if (
                    /^file:/i.test(decoded) ||
                    path.isAbsolute(decoded) ||
                    path.win32.isAbsolute(decoded)
                ) {
                    errors.push(
                        `${path.relative(root, file)} links to an absolute local path: ${target}. Use a relative resource link.`,
                    );
                    continue;
                }
                const resolved = path.resolve(path.dirname(file), decoded);
                if (!existsSync(resolved))
                    errors.push(
                        `${path.relative(root, file)} links to missing path: ${target}`,
                    );
                else if (
                    !statSync(resolved).isFile() &&
                    !statSync(resolved).isDirectory()
                )
                    errors.push(
                        `${path.relative(root, file)} links to an unreadable resource: ${target}`,
                    );
            }
        }
    } catch (error) {
        errors.push(error.message);
    }
    return {
        skill: root,
        valid: errors.length === 0,
        errors,
        warnings,
        tokens: {
            ...tokenMetadata,
            files: tokenFiles,
            root_tokens:
                tokenFiles.find((file) => file.file === 'SKILL.md')?.tokens ??
                null,
            markdown_tokens: tokenFiles.reduce(
                (total, file) => total + file.tokens,
                0,
            ),
        },
    };
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--help') {
        console.log(
            'Usage: bun validate-skill.js <skill-directory>\nChecks required metadata and relative local Markdown links. Reports advisory root layout and completion-gate warnings plus o200k_base Markdown token counts. Warnings do not affect validity. Exits: 0 valid, 1 invalid, 2 usage error.',
        );
    } else if (args.length !== 1 || args[0].startsWith('--')) {
        console.error('Usage: bun validate-skill.js <skill-directory>');
        process.exitCode = 2;
    } else {
        const result = validateSkill(args[0]);
        console.log(JSON.stringify(result, null, 2));
        process.exitCode = result.valid ? 0 : 1;
    }
}
