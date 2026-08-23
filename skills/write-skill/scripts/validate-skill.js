#!/usr/bin/env bun

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

function nearestAncestor(startDirectory, matches) {
    let directory = path.resolve(startDirectory);

    while (true) {
        if (matches(directory)) return directory;
        const parent = path.dirname(directory);
        if (parent === directory) return null;
        directory = parent;
    }
}

function propulsionRoot() {
    return nearestAncestor(import.meta.dir, (directory) => {
        const manifestPath = path.join(directory, 'package.json');
        if (!fs.existsSync(manifestPath)) return false;
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        return manifest.name === 'propulsion';
    });
}

function executionProjectRoot() {
    const gitRoot = nearestAncestor(process.cwd(), (directory) =>
        fs.existsSync(path.join(directory, '.git')),
    );
    if (gitRoot) return gitRoot;

    return nearestAncestor(process.cwd(), (directory) =>
        fs.existsSync(path.join(directory, 'package.json')),
    );
}

function installedPackageEntry(packageName, expectedVersion) {
    const searchRoots = [propulsionRoot(), executionProjectRoot()].filter(
        Boolean,
    );
    const visited = new Set();
    const foundVersions = new Set();

    for (const searchRoot of searchRoots) {
        if (visited.has(searchRoot)) continue;
        visited.add(searchRoot);
        const packageRoot = path.join(searchRoot, 'node_modules', packageName);
        const manifestPath = path.join(packageRoot, 'package.json');
        if (!fs.existsSync(manifestPath)) continue;

        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        if (manifest.version !== expectedVersion) {
            foundVersions.add(manifest.version ?? 'an unversioned package');
            continue;
        }

        const canonicalRoot = fs.realpathSync(packageRoot);
        const entry = fs.realpathSync(
            path.join(canonicalRoot, manifest.main ?? 'index.js'),
        );
        const relativeEntry = path.relative(canonicalRoot, entry);

        if (
            relativeEntry === '' ||
            relativeEntry.startsWith('..') ||
            !fs.statSync(entry).isFile()
        ) {
            throw new Error(
                `Refusing an invalid installed ${packageName} entry.`,
            );
        }

        return pathToFileURL(entry).href;
    }

    const found = foundVersions.size
        ? `; found ${[...foundVersions].join(', ')}`
        : '';
    throw new Error(
        `Validation requires ${packageName}@${expectedVersion} installed in Propulsion or the execution project${found}.`,
    );
}

const semverEntry = installedPackageEntry('semver', '7.8.5');
const { satisfies, validRange } = await import(semverEntry);

const target = process.argv[2];

if (!target) {
    console.error('Usage: bun scripts/validate-skill.js <skill-directory>');
    process.exit(2);
}

const root = path.resolve(target);
const rootReal = fs.existsSync(root) ? fs.realpathSync(root) : root;
const errors = [];

function fail(message) {
    errors.push(message);
}

function readRequired(relativePath) {
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
        fail(`Missing required file: ${relativePath}`);
        return null;
    }
    if (!isWithinRoot(absolutePath, true)) {
        fail(
            `Required file resolves outside the skill bundle: ${relativePath}`,
        );
        return null;
    }
    return fs.readFileSync(absolutePath, 'utf8');
}

function parseYaml(source, relativePath) {
    if (source === null) return null;
    try {
        const value = Bun.YAML.parse(source);
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            fail(`${relativePath} must contain a YAML mapping.`);
            return null;
        }
        return value;
    } catch (error) {
        fail(`${relativePath} contains invalid YAML: ${error.message}`);
        return null;
    }
}

function analyseMarkdown(source) {
    const lines = source.split(/\r?\n/);
    let fence = null;
    return lines.map((line) => {
        const opening = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (!fence && opening) {
            fence = { character: opening[1][0], length: opening[1].length };
            return { raw: line, structural: null, content: false };
        }
        const closing = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
        if (
            fence &&
            closing &&
            closing[1][0] === fence.character &&
            closing[1].length >= fence.length
        ) {
            fence = null;
            return { raw: line, structural: null, content: false };
        }
        if (fence)
            return { raw: line, structural: null, content: line.trim() !== '' };
        return {
            raw: line,
            structural: line,
            content: line.trim() !== '' && !/^#{1,6}\s/.test(line),
        };
    });
}

function isWithinRoot(candidate, resolveSymlinks = false) {
    const comparable = resolveSymlinks ? fs.realpathSync(candidate) : candidate;
    const base = resolveSymlinks ? rootReal : root;
    return comparable === base || comparable.startsWith(`${base}${path.sep}`);
}

function stripNonRenderedText(source) {
    const withoutComments = source.replace(/<!--[\s\S]*?(?:-->|$)/g, '');
    return withoutComments
        .split(/\r?\n/)
        .map((line) => {
            let result = line;
            const runs = [...result.matchAll(/`+/g)];
            for (let index = 0; index + 1 < runs.length; index += 2) {
                const opening = runs[index];
                const closing = runs
                    .slice(index + 1)
                    .find(
                        (candidate) =>
                            candidate[0].length === opening[0].length,
                    );
                if (!closing) break;
                const start = opening.index;
                const end = closing.index + closing[0].length;
                result = `${result.slice(0, start)}${' '.repeat(end - start)}${result.slice(end)}`;
            }
            return result;
        })
        .join('\n');
}

function markdownLinkTargets(line) {
    const targets = [];
    for (let index = 0; index < line.length; index += 1) {
        if (line[index] !== '[') continue;
        let backslashes = 0;
        for (
            let cursor = index - 1;
            cursor >= 0 && line[cursor] === '\\';
            cursor -= 1
        )
            backslashes += 1;
        if (backslashes % 2 === 1) continue;
        const labelEnd = line.indexOf('](', index + 1);
        if (labelEnd < 0) continue;
        let depth = 1;
        let cursor = labelEnd + 2;
        let escaped = false;
        for (; cursor < line.length; cursor += 1) {
            const character = line[cursor];
            if (escaped) {
                escaped = false;
                continue;
            }
            if (character === '\\') {
                escaped = true;
                continue;
            }
            if (character === '(') depth += 1;
            if (character === ')') depth -= 1;
            if (depth === 0) break;
        }
        if (depth !== 0) continue;
        const inside = line.slice(labelEnd + 2, cursor).trim();
        const destination = inside.startsWith('<')
            ? inside.slice(1, inside.indexOf('>'))
            : inside.match(/^(?:\\.|[^\s])+/)?.[0];
        if (destination) targets.push(destination.replace(/\\([ ()])/g, '$1'));
        index = cursor;
    }
    return targets;
}

function equalStringMaps(left, right) {
    const leftKeys = Object.keys(left).toSorted();
    const rightKeys = Object.keys(right).toSorted();
    return (
        leftKeys.length === rightKeys.length &&
        leftKeys.every(
            (key, index) =>
                key === rightKeys[index] && left[key] === right[key],
        )
    );
}

function walkFiles(directory) {
    const files = [];
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (['.git', 'node_modules'].includes(entry.name)) continue;
        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...walkFiles(absolutePath));
        if (entry.isFile()) files.push(absolutePath);
    }
    return files;
}

const skillSource = readRequired('SKILL.md');
const openaiSource = readRequired('agents/openai.yaml');

let frontmatter = null;
let body = '';

if (skillSource !== null) {
    const match = skillSource.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) {
        fail('SKILL.md must start with YAML frontmatter delimited by ---.');
    } else {
        frontmatter = parseYaml(match[1], 'SKILL.md frontmatter');
        body = skillSource.slice(match[0].length);

        const descriptionLine = match[1]
            .split(/\r?\n/)
            .find((line) => /^description\s*:/.test(line));
        if (
            !descriptionLine ||
            /^description\s*:\s*[>|]/.test(descriptionLine)
        ) {
            fail('description must be a single-line YAML scalar.');
        }
    }
}

if (frontmatter) {
    const { name, description } = frontmatter;
    if (typeof name !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
        fail(
            'name must use lowercase letters or digits with single hyphen separators.',
        );
    } else {
        if (name.length > 64) fail('name must be 1-64 characters.');
        if (name !== path.basename(root))
            fail('name must match the parent directory name.');
    }

    if (typeof description !== 'string' || description.trim() === '') {
        fail('description must be a non-empty string.');
    } else {
        if (!/^[A-Z][A-Za-z-]*s\b/.test(description)) {
            fail('description must start with a third-person action verb.');
        }
        if (!/\bUse (when|for|to)\b/.test(description)) {
            fail(
                "description must include 'Use when', 'Use for', or 'Use to'.",
            );
        }
    }

    if (typeof frontmatter['disable-model-invocation'] !== 'boolean') {
        fail('disable-model-invocation must be a boolean.');
    }

    const metadata = frontmatter.metadata;
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
        fail('metadata must be a YAML mapping.');
    } else {
        const allowedTypes = new Set([
            'performer',
            'router',
            'teaching',
            'utility',
        ]);
        if (!allowedTypes.has(metadata.type)) {
            fail(
                'metadata.type must be performer, router, teaching, or utility.',
            );
        }
    }
}

const openai = parseYaml(openaiSource, 'agents/openai.yaml');
if (openai) {
    if (
        typeof openai.interface?.display_name !== 'string' ||
        openai.interface.display_name.trim() === ''
    ) {
        fail('agents/openai.yaml requires interface.display_name.');
    }
    const shortDescription = openai.interface?.short_description;
    if (
        typeof shortDescription !== 'string' ||
        shortDescription.length < 25 ||
        shortDescription.length > 64
    ) {
        fail('interface.short_description must be 25-64 characters.');
    }
    if (typeof openai.policy?.allow_implicit_invocation !== 'boolean') {
        fail(
            'agents/openai.yaml requires boolean policy.allow_implicit_invocation.',
        );
    }
    if (
        frontmatter &&
        typeof frontmatter['disable-model-invocation'] === 'boolean' &&
        typeof openai.policy?.allow_implicit_invocation === 'boolean' &&
        frontmatter['disable-model-invocation'] ===
            openai.policy.allow_implicit_invocation
    ) {
        fail(
            'Claude and OpenAI invocation settings must describe the same invocation mode.',
        );
    }
}

if (fs.existsSync(path.join(root, 'agents/openai.yml'))) {
    fail('Use agents/openai.yaml, not agents/openai.yml.');
}

if (skillSource !== null) {
    if (body.trim() === '')
        fail('SKILL.md must contain a non-empty body after frontmatter.');

    const lines = analyseMarkdown(body);
    const headings = [];
    lines.forEach(({ structural }, index) => {
        const match = structural?.match(/^(#{1,6})\s+(\S.*)$/);
        if (match)
            headings.push({
                level: match[1].length,
                text: match[2].trim(),
                line: index,
            });
    });

    const h1s = headings.filter(({ level }) => level === 1);
    if (h1s.length !== 1)
        fail(
            'SKILL.md must contain exactly one H1 outside fenced code blocks.',
        );

    const processHeadings = headings.filter(
        ({ level, text }) => level === 2 && text === 'Process',
    );
    if (processHeadings.length !== 1)
        fail('SKILL.md must contain exactly one ## Process heading.');

    if (h1s.length === 1) {
        const firstContentLine = lines.findIndex(({ raw }) => raw.trim());
        if (firstContentLine !== h1s[0].line)
            fail('The H1 must be the first body content.');

        const firstH2 = headings.find(({ level }) => level === 2);
        const introduction = lines
            .slice(h1s[0].line + 1, firstH2?.line ?? lines.length)
            .filter(({ raw }) => raw.trim());
        if (
            introduction.length !== 1 ||
            introduction[0].structural === null ||
            introduction[0].raw.startsWith('#')
        ) {
            fail(
                'The H1 must be followed by one non-empty introduction line before the first H2.',
            );
        }
    }

    const h2s = headings.filter(({ level }) => level === 2);
    for (const reserved of ['Prerequisites', 'Process', 'Rules', 'Handoff']) {
        if (h2s.filter(({ text }) => text === reserved).length > 1) {
            fail(`## ${reserved} may appear at most once.`);
        }
    }

    const sectionIndex = Object.fromEntries(
        h2s.map(({ text }, index) => [text, index]),
    );
    if (
        sectionIndex.Prerequisites !== undefined &&
        sectionIndex.Prerequisites > sectionIndex.Process
    ) {
        fail('## Prerequisites must appear before ## Process.');
    }
    if (
        sectionIndex.Rules !== undefined &&
        sectionIndex.Rules < sectionIndex.Process
    ) {
        fail('## Rules must appear after ## Process.');
    }
    if (sectionIndex.Handoff !== undefined) {
        const lowerBound = sectionIndex.Rules ?? sectionIndex.Process;
        if (sectionIndex.Handoff < lowerBound)
            fail(
                '## Handoff must appear after ## Process and ## Rules when present.',
            );
    }

    for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index];
        const next = headings
            .slice(index + 1)
            .find(({ level }) => level <= heading.level);
        const content = lines
            .slice(heading.line + 1, next?.line ?? lines.length)
            .some(({ content: hasContent }) => hasContent);
        if (!content) fail(`Heading '${heading.text}' has no content.`);
    }
}

if (fs.existsSync(root)) {
    const files = walkFiles(root);
    const markdownFiles = files.filter((file) => file.endsWith('.md'));
    const linkedFromSkill = new Set();

    for (const file of markdownFiles) {
        const source = fs.readFileSync(file, 'utf8');
        const linkSource = file === path.join(root, 'SKILL.md') ? body : source;
        for (const { structural } of analyseMarkdown(
            stripNonRenderedText(linkSource),
        )) {
            if (structural === null) continue;
            for (const linkTarget of markdownLinkTargets(structural)) {
                const rawTarget = linkTarget.trim().split('#')[0];
                if (!rawTarget || /^(?:[a-z]+:|#)/i.test(rawTarget)) continue;
                const resolved = path.resolve(
                    path.dirname(file),
                    decodeURIComponent(rawTarget),
                );
                if (!isWithinRoot(resolved)) {
                    fail(
                        `${path.relative(root, file)} links outside the skill bundle: ${rawTarget}`,
                    );
                    continue;
                }
                if (!fs.existsSync(resolved)) {
                    fail(
                        `${path.relative(root, file)} links to missing path: ${rawTarget}`,
                    );
                    continue;
                }
                if (!isWithinRoot(resolved, true)) {
                    fail(
                        `${path.relative(root, file)} links through a symlink outside the skill bundle: ${rawTarget}`,
                    );
                    continue;
                }
                if (file === path.join(root, 'SKILL.md'))
                    linkedFromSkill.add(resolved);
            }
        }
    }

    for (const file of files.filter((candidate) =>
        candidate.startsWith(path.join(root, 'references') + path.sep),
    )) {
        if (!linkedFromSkill.has(file)) {
            fail(
                `Reference must be linked directly from SKILL.md: ${path.relative(root, file)}`,
            );
        }
    }

    const packagePath = path.join(root, 'package.json');
    if (fs.existsSync(packagePath)) {
        let packageJson = null;
        try {
            packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        } catch (error) {
            fail(`package.json contains invalid JSON: ${error.message}`);
        }
        const lockPath = path.join(root, 'package-lock.json');
        if (!fs.existsSync(lockPath)) {
            fail('package-lock.json is required when package.json exists.');
        } else {
            try {
                const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
                const lockRoot = lock.packages?.[''];
                if (![2, 3].includes(lock.lockfileVersion) || !lockRoot) {
                    fail(
                        'package-lock.json must use lockfileVersion 2 or 3 and contain a root package entry.',
                    );
                } else if (packageJson) {
                    if (
                        lockRoot.name !== packageJson.name ||
                        lockRoot.version !== packageJson.version
                    ) {
                        fail(
                            'package-lock.json root name and version must match package.json.',
                        );
                    }
                    const declared = packageJson.dependencies ?? {};
                    const locked = lockRoot.dependencies ?? {};
                    if (!equalStringMaps(declared, locked)) {
                        fail(
                            'package-lock.json root dependencies must match package.json.',
                        );
                    }
                    for (const dependency of Object.keys(declared)) {
                        const entry =
                            lock.packages?.[`node_modules/${dependency}`];
                        if (!entry?.version) {
                            fail(
                                `package-lock.json lacks a complete entry for dependency: ${dependency}`,
                            );
                            continue;
                        }
                        const range = validRange(declared[dependency]);
                        if (
                            range &&
                            !satisfies(entry.version, range, {
                                includePrerelease: true,
                            })
                        ) {
                            fail(
                                `package-lock.json version for ${dependency} does not satisfy package.json.`,
                            );
                        }
                        if (
                            entry.resolved?.startsWith('http') &&
                            !/^sha(?:256|384|512)-[A-Za-z0-9+/]+={0,2}$/.test(
                                entry.integrity ?? '',
                            )
                        ) {
                            fail(
                                `package-lock.json has invalid integrity for dependency: ${dependency}`,
                            );
                        }
                    }
                }
            } catch (error) {
                fail(
                    `package-lock.json contains invalid JSON: ${error.message}`,
                );
            }
        }
    }
}

if (errors.length) {
    console.error('Status: invalid');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log(`Status: valid\nSkill: ${root}`);
