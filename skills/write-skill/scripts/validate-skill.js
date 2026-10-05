#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const coreFields = new Set([
    'name',
    'description',
    'license',
    'compatibility',
    'metadata',
    'allowed-tools',
]);

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
        if (target && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target))
            targets.push(target);
    }
    return targets;
}

function characterCount(value) {
    return Array.from(value).length;
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
            for (const key of ['icon_small', 'icon_large', 'default_prompt']) {
                if (!(key in fields)) continue;
                const value = fields[key];
                if (typeof value !== 'string' || !value.trim()) {
                    fail(`interface.${key} must be a non-empty string.`);
                    continue;
                }
                if (key === 'default_prompt') continue;
                const resolved = path.resolve(root, value);
                const relative = path.relative(root, resolved);
                if (
                    path.isAbsolute(value) ||
                    /^[a-z][a-z\d+.-]*:/i.test(value) ||
                    relative === '..' ||
                    relative.startsWith(`..${path.sep}`) ||
                    !existsSync(resolved) ||
                    !statSync(resolved).isFile()
                )
                    fail(`interface.${key} must name a bundled relative file.`);
            }
            if (
                'brand_color' in fields &&
                (typeof fields.brand_color !== 'string' ||
                    !/^#[\da-f]{6}$/i.test(fields.brand_color))
            )
                fail('interface.brand_color must be a six-digit hex colour.');
        }
        if ('dependencies' in adapter) {
            if (!isMapping(adapter.dependencies)) {
                fail('dependencies must be a mapping.');
            } else {
                for (const key of Object.keys(adapter.dependencies)) {
                    if (key !== 'tools')
                        fail(`unsupported dependencies field: ${key}.`);
                }
                if ('tools' in adapter.dependencies) {
                    if (!Array.isArray(adapter.dependencies.tools)) {
                        fail('dependencies.tools must be a list.');
                    } else {
                        for (const [
                            index,
                            tool,
                        ] of adapter.dependencies.tools.entries()) {
                            const label = `dependencies.tools[${index}]`;
                            if (
                                !isMapping(tool) ||
                                tool.type !== 'mcp' ||
                                typeof tool.value !== 'string' ||
                                !tool.value.trim()
                            ) {
                                fail(
                                    `${label} must declare type mcp and a non-empty value.`,
                                );
                                continue;
                            }
                            for (const key of [
                                'description',
                                'transport',
                                'url',
                            ]) {
                                if (
                                    key in tool &&
                                    (typeof tool[key] !== 'string' ||
                                        !tool[key].trim())
                                )
                                    fail(
                                        `${label}.${key} must be a non-empty string.`,
                                    );
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        fail(error.message);
    }
}

function validateFrontmatter(frontmatter, root, errors, warnings) {
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

    for (const field of ['license', 'compatibility', 'allowed-tools']) {
        if (field in frontmatter && typeof frontmatter[field] !== 'string')
            errors.push(`${field} must be a string when present.`);
    }
    if (
        typeof frontmatter.compatibility === 'string' &&
        (!frontmatter.compatibility.trim() ||
            characterCount(frontmatter.compatibility) > 500)
    )
        errors.push(
            'compatibility must be non-empty and at most 500 characters.',
        );

    if ('metadata' in frontmatter) {
        if (
            !isMapping(frontmatter.metadata) ||
            Object.values(frontmatter.metadata).some(
                (value) => typeof value !== 'string',
            )
        )
            errors.push('metadata must map string keys to string values.');
    }
    const extensions = Object.keys(frontmatter).filter(
        (field) => !coreFields.has(field),
    );
    if (extensions.length)
        warnings.push(
            `Validate client extensions on the destination: ${extensions.join(', ')}.`,
        );
}

export function validateSkill(directory) {
    const root = path.resolve(directory);
    const errors = [];
    const warnings = [];
    validateOpenAIAdapter(root, errors);
    try {
        const source = readFileSync(path.join(root, 'SKILL.md'), 'utf8');
        const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
        if (!match) {
            errors.push(
                'SKILL.md must start with YAML frontmatter delimited by ---.',
            );
        } else {
            const frontmatter = Bun.YAML.parse(match[1]);
            if (isMapping(frontmatter))
                validateFrontmatter(frontmatter, root, errors, warnings);
            else errors.push('Frontmatter must be a YAML mapping.');
            if (!source.slice(match[0].length).trim())
                errors.push(
                    'SKILL.md must contain runtime instructions after frontmatter.',
                );
        }
        for (const file of markdownFiles(root)) {
            const content = readFileSync(file, 'utf8');
            const prose =
                file === path.join(root, 'SKILL.md') && match
                    ? content.slice(match[0].length)
                    : content;
            for (const target of localLinkTargets(prose)) {
                const resolved = path.resolve(
                    path.dirname(file),
                    decodeURIComponent(target),
                );
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
    return { skill: root, valid: errors.length === 0, errors, warnings };
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--help') {
        console.log(
            'Usage: bun validate-skill.js <skill-directory>\nRead-only core frontmatter, required OpenAI adapter, and local Markdown-link validation. Outputs JSON. Other client extensions, code examples, inline-code paths, client loading, and runtime behaviour need separate checks.',
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
