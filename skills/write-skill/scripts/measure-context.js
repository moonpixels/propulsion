#!/usr/bin/env bun

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const target = args.shift();

if (!target) {
    console.error(
        'Usage: bun scripts/measure-context.js <skill-directory> [--include relative/path ...] [--output file ...] [--json]',
    );
    process.exit(2);
}

const includes = [];
const outputs = [];
let json = false;

while (args.length) {
    const option = args.shift();
    if (option === '--include') includes.push(args.shift());
    else if (option === '--output') outputs.push(args.shift());
    else if (option === '--json') json = true;
    else {
        console.error(`Unknown option: ${option}`);
        process.exit(2);
    }
}

if ([...includes, ...outputs].some((value) => !value)) {
    console.error('--include and --output require a path.');
    process.exit(2);
}

const root = path.resolve(target);
const rootReal = fs.existsSync(root) ? fs.realpathSync(root) : root;
const skillPath = path.join(root, 'SKILL.md');
if (!fs.existsSync(skillPath) || !fs.statSync(skillPath).isFile()) {
    console.error(`Missing SKILL.md: ${skillPath}`);
    process.exit(1);
}
if (!isWithinRoot(skillPath, true)) {
    console.error(`SKILL.md resolves outside the skill bundle: ${skillPath}`);
    process.exit(1);
}

function measureText(label, filePath, text) {
    return {
        label,
        path: filePath,
        kind: 'text',
        tokens: encoder.encode(text).length,
        bytes: Buffer.byteLength(text, 'utf8'),
        characters: [...text].length,
        lines:
            text === ''
                ? 0
                : text.split(/\r?\n/).length - (/\r?\n$/.test(text) ? 1 : 0),
    };
}

function isWithinRoot(candidate, resolveSymlinks = false) {
    const comparable = resolveSymlinks ? fs.realpathSync(candidate) : candidate;
    const base = resolveSymlinks ? rootReal : root;
    return comparable === base || comparable.startsWith(`${base}${path.sep}`);
}

function isInside(base, candidate) {
    const relativePath = path.relative(base, candidate);
    return relativePath !== '' && !relativePath.startsWith('..');
}

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

function installedTokenizerEntry() {
    const searchRoots = [propulsionRoot(), executionProjectRoot()].filter(
        Boolean,
    );
    const visited = new Set();
    const foundVersions = new Set();

    for (const searchRoot of searchRoots) {
        if (visited.has(searchRoot)) continue;
        visited.add(searchRoot);
        const packageRoot = path.join(searchRoot, 'node_modules', 'tiktoken');
        const manifestPath = path.join(packageRoot, 'package.json');
        if (!fs.existsSync(manifestPath)) continue;

        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        if (manifest.version !== '1.0.22') {
            foundVersions.add(manifest.version ?? 'an unversioned package');
            continue;
        }

        const canonicalRoot = fs.realpathSync(packageRoot);
        const entry = fs.realpathSync(
            path.join(canonicalRoot, manifest.main ?? 'tiktoken.cjs'),
        );

        if (!isInside(canonicalRoot, entry) || !fs.statSync(entry).isFile()) {
            throw new Error('Refusing an invalid installed tiktoken entry.');
        }

        return pathToFileURL(entry).href;
    }

    const found = foundVersions.size
        ? `; found ${[...foundVersions].join(', ')}`
        : '';
    throw new Error(
        `Exact context measurement requires tiktoken@1.0.22 installed in Propulsion or the execution project${found}.`,
    );
}

function readArtifact(absolutePath) {
    const buffer = fs.readFileSync(absolutePath);
    const binaryExtensions = new Set([
        '.7z',
        '.avi',
        '.avif',
        '.bin',
        '.docx',
        '.gif',
        '.gz',
        '.ico',
        '.jpeg',
        '.jpg',
        '.m4a',
        '.mov',
        '.mp3',
        '.mp4',
        '.otf',
        '.pdf',
        '.png',
        '.pptx',
        '.tar',
        '.tgz',
        '.ttf',
        '.wasm',
        '.webp',
        '.woff',
        '.woff2',
        '.xlsx',
        '.zip',
    ]);
    if (binaryExtensions.has(path.extname(absolutePath).toLowerCase()))
        return { kind: 'binary', buffer };
    if (buffer.includes(0)) return { kind: 'binary', buffer };
    try {
        return {
            kind: 'text',
            text: new TextDecoder('utf-8', { fatal: true }).decode(buffer),
        };
    } catch {
        return { kind: 'binary', buffer };
    }
}

function measureFile(label, absolutePath, displayPath = absolutePath) {
    const artifact = readArtifact(absolutePath);
    if (artifact.kind === 'binary') {
        return {
            label,
            path: displayPath,
            kind: 'binary',
            tokens: null,
            bytes: artifact.buffer.length,
        };
    }
    return measureText(label, displayPath, artifact.text);
}

function readPath(value, base = root, requireInsideRoot = false) {
    const absolutePath = path.resolve(base, value);
    if (requireInsideRoot && !isWithinRoot(absolutePath)) {
        throw new Error(
            `Selected-path file is outside the skill bundle: ${absolutePath}`,
        );
    }
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
        throw new Error(`File not found: ${absolutePath}`);
    }
    if (requireInsideRoot && !isWithinRoot(absolutePath, true)) {
        throw new Error(
            `Selected-path file resolves outside the skill bundle: ${absolutePath}`,
        );
    }
    return { absolutePath, artifact: readArtifact(absolutePath) };
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

let encoder;

try {
    const tokenizerEntry = installedTokenizerEntry();
    const { get_encoding: getEncoding } = await import(tokenizerEntry);
    encoder = getEncoding('o200k_base');
    const skillText = fs.readFileSync(skillPath, 'utf8');
    const frontmatterMatch = skillText.match(
        /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
    );
    if (!frontmatterMatch)
        throw new Error('SKILL.md has no valid frontmatter block.');
    const frontmatter = Bun.YAML.parse(frontmatterMatch[1]);
    const discoveryText = `${frontmatter.name}\n${frontmatter.description}`;
    const skillBody = skillText.slice(frontmatterMatch[0].length);

    const selectedFiles = [
        measureText('SKILL.md body', 'SKILL.md', skillBody),
        ...includes.map((relativePath) => {
            const { absolutePath, artifact } = readPath(
                relativePath,
                root,
                true,
            );
            if (artifact.kind === 'binary') {
                throw new Error(
                    `Selected-path file is binary and cannot be tokenized: ${relativePath}`,
                );
            }
            return measureText(
                relativePath,
                path.relative(root, absolutePath),
                artifact.text,
            );
        }),
    ];

    const outputFiles = outputs.map((filePath) => {
        const { absolutePath } = readPath(filePath, process.cwd());
        return measureFile(path.basename(absolutePath), absolutePath);
    });

    const bundleFiles = walkFiles(root).map((absolutePath) =>
        measureFile(
            path.relative(root, absolutePath),
            absolutePath,
            path.relative(root, absolutePath),
        ),
    );

    const result = {
        encoding: 'o200k_base',
        scope: 'Exact o200k_base counts for text artefacts; binary artefacts, host wrappers, and hidden instructions are excluded.',
        discovery: measureText(
            'name + description',
            'SKILL.md frontmatter',
            discoveryText,
        ),
        selected_path: {
            files: selectedFiles,
            tokens: selectedFiles.reduce((sum, item) => sum + item.tokens, 0),
        },
        generated_output: {
            files: outputFiles,
            tokens: outputFiles.reduce(
                (sum, item) => sum + (item.tokens ?? 0),
                0,
            ),
        },
        bundle_inventory: {
            files: bundleFiles,
            tokens: bundleFiles.reduce(
                (sum, item) => sum + (item.tokens ?? 0),
                0,
            ),
            binary_files: bundleFiles.filter((item) => item.kind === 'binary')
                .length,
        },
    };

    if (json) {
        console.log(JSON.stringify(result, null, 2));
    } else {
        console.log(`Encoding: ${result.encoding}`);
        console.log(`Scope: ${result.scope}`);
        console.log(`Discovery metadata: ${result.discovery.tokens} tokens`);
        console.log(`Selected path: ${result.selected_path.tokens} tokens`);
        for (const file of result.selected_path.files)
            console.log(`  ${file.path}: ${file.tokens}`);
        if (outputFiles.length) {
            console.log(
                `Generated output: ${result.generated_output.tokens} tokens`,
            );
            for (const file of outputFiles) {
                console.log(
                    `  ${file.path}: ${file.tokens ?? `binary, ${file.bytes} bytes`}`,
                );
            }
        }
        console.log(
            `Bundle inventory: ${result.bundle_inventory.tokens} tokens`,
        );
        if (result.bundle_inventory.binary_files) {
            console.log(
                `Binary artefacts excluded: ${result.bundle_inventory.binary_files}`,
            );
        }
    }
} catch (error) {
    console.error(`Measurement failed: ${error.message}`);
    process.exitCode = 1;
} finally {
    encoder?.free();
}
