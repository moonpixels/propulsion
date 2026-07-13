#!/usr/bin/env bun

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join, relative, resolve, sep } from 'node:path';

const errors = [];
const warnings = [];

function addError(message) {
    errors.push(message);
}

function unquote(value) {
    const trimmed = value.trim();
    const first = trimmed.at(0);
    const last = trimmed.at(-1);

    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
        return trimmed.slice(1, -1);
    }

    return trimmed;
}

function readTopLevel(raw, key) {
    const line = raw
        .split(/\r?\n/)
        .find((candidate) => candidate.startsWith(`${key}:`));

    return line ? unquote(line.slice(key.length + 1)) : null;
}

function readNested(raw, parent, key) {
    const lines = raw.split(/\r?\n/);
    const parentIndex = lines.findIndex((line) => line === `${parent}:`);

    if (parentIndex === -1) return null;

    for (const line of lines.slice(parentIndex + 1)) {
        if (/^\S/.test(line)) break;

        const match = line.match(new RegExp(`^\\s+${key}:\\s*(.+)$`));
        if (match) return unquote(match[1]);
    }

    return null;
}

function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

    if (!match) {
        addError('Add YAML frontmatter at the start of SKILL.md.');
        return { body: content, raw: '' };
    }

    return {
        body: content.slice(match[0].length),
        raw: match[1],
    };
}

function validateName(raw, skillPath) {
    const name = readTopLevel(raw, 'name');

    if (!name) {
        addError('Add the skill name to frontmatter.');
        return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
        addError(
            `Use lowercase letters, digits, and single hyphens for name: ${name}`,
        );
    }

    if (name.length > 64) {
        addError(`Keep name at most 64 characters; found ${name.length}.`);
    }

    if (name !== basename(skillPath)) {
        addError(`Match name "${name}" to directory "${basename(skillPath)}".`);
    }
}

function validateDescription(raw) {
    const description = readTopLevel(raw, 'description');
    const descriptionLine = raw
        .split(/\r?\n/)
        .find((line) => line.startsWith('description:'));

    if (!description) {
        addError('Add a one-line description to frontmatter.');
        return;
    }

    if (descriptionLine?.match(/^description:\s*[|>]/)) {
        addError('Write description on one YAML line.');
    }

    if (description.length > 200) {
        addError(
            `Keep description at most 200 characters; found ${description.length}.`,
        );
    }

    if (!/\bUse (?:when|for|to)\b/.test(description)) {
        addError(
            'State invocation conditions with Use when, Use for, or Use to.',
        );
    }

    if (/\b(?:I|me|my|mine|we|us|our|ours)\b/i.test(description)) {
        addError(
            'Write description in third-person, action-oriented language.',
        );
    }
}

function validateInvocation(raw, openaiRaw) {
    const invocation = readNested(raw, 'metadata', 'invocation');
    const disableModel = readTopLevel(raw, 'disable-model-invocation');
    const allowImplicit = readNested(
        openaiRaw,
        'policy',
        'allow_implicit_invocation',
    );

    if (!['user', 'model'].includes(invocation)) {
        addError('Set metadata.invocation to user or model.');
        return;
    }

    const expectedDisable = invocation === 'user' ? 'true' : 'false';
    const expectedImplicit = invocation === 'user' ? 'false' : 'true';

    if (disableModel !== expectedDisable) {
        addError(
            `Set disable-model-invocation to ${expectedDisable} for ${invocation} invocation.`,
        );
    }

    if (allowImplicit !== expectedImplicit) {
        addError(
            `Set policy.allow_implicit_invocation to ${expectedImplicit} for ${invocation} invocation.`,
        );
    }
}

function validateOpenaiYaml(skillPath, raw) {
    const openaiPath = join(skillPath, 'agents', 'openai.yaml');

    if (!existsSync(openaiPath)) {
        addError('Add agents/openai.yaml.');
        return '';
    }

    const openaiRaw = readFileSync(openaiPath, 'utf8');
    const displayName = readNested(openaiRaw, 'interface', 'display_name');
    const shortDescription = readNested(
        openaiRaw,
        'interface',
        'short_description',
    );

    if (!displayName)
        addError('Set interface.display_name in agents/openai.yaml.');

    if (!shortDescription) {
        addError('Set interface.short_description in agents/openai.yaml.');
    } else if (shortDescription.length < 25 || shortDescription.length > 64) {
        addError(
            `Keep interface.short_description between 25 and 64 characters; found ${shortDescription.length}.`,
        );
    }

    validateInvocation(raw, openaiRaw);
    return openaiRaw;
}

function validateBody(body) {
    const lines = body.split(/\r?\n/);
    const firstContentIndex = lines.findIndex((line) => line.trim());
    const firstContent = lines[firstContentIndex]?.trim();

    if (!firstContent?.match(/^#\s+\S/)) {
        addError('Start the skill body with a human-readable H1.');
        return;
    }

    const firstH2Index = lines.findIndex((line) =>
        /^##\s+\S/.test(line.trim()),
    );
    const introEnd = firstH2Index === -1 ? lines.length : firstH2Index;
    const introduction = lines
        .slice(firstContentIndex + 1, introEnd)
        .map((line) => line.trim())
        .find((line) => line && !line.startsWith('#'));

    if (!introduction) {
        addError('Follow the H1 with a concise introductory paragraph.');
    }

    const h2s = lines
        .map((line, index) => ({
            index,
            title: line.match(/^##\s+(.+)$/)?.[1],
        }))
        .filter(({ title }) => title);
    const sectionIndex = new Map(h2s.map(({ index, title }) => [title, index]));

    if (sectionIndex.has('References')) {
        addError(
            'Move each resource pointer beside the step or branch that uses it.',
        );
    }

    if (sectionIndex.has('Completion Gate')) {
        addError('Express completion through observable step postconditions.');
    }

    const prerequisites = sectionIndex.get('Prerequisites');
    const steps = sectionIndex.get('Steps');
    const handoff = sectionIndex.get('Handoff');

    if (
        prerequisites !== undefined &&
        steps !== undefined &&
        prerequisites > steps
    ) {
        addError('Place Prerequisites before Steps.');
    }

    if (handoff !== undefined && steps !== undefined && handoff < steps) {
        addError('Place Handoff after the completed Steps.');
    }
}

function collectFiles(directory, prefix) {
    if (!existsSync(directory)) return [];

    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const absolute = join(directory, entry.name);
        const relativePath = `${prefix}/${entry.name}`;

        return entry.isDirectory()
            ? collectFiles(absolute, relativePath)
            : [relativePath];
    });
}

function validateResources(skillPath, body) {
    const resources = ['references', 'assets', 'scripts'].flatMap((directory) =>
        collectFiles(join(skillPath, directory), directory),
    );
    const linked = new Set();
    const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;

    for (const match of body.matchAll(linkPattern)) {
        const rawTarget = match[1].split('#')[0];
        const target = rawTarget.startsWith('./')
            ? rawTarget.slice(2)
            : rawTarget;
        const normalized = target.split('/').join(sep);

        if (!/^(?:references|assets|scripts)\//.test(target)) continue;

        linked.add(target);
        if (!existsSync(join(skillPath, normalized))) {
            addError(`Create linked resource ${target} or update its pointer.`);
        }
    }

    for (const resource of resources) {
        if (!linked.has(resource)) {
            addError(
                `Link ${resource} beside the step or branch that uses it.`,
            );
        }
    }

    return resources.length;
}

function validateSkill(skillPath) {
    if (!existsSync(skillPath)) {
        addError(`Provide an existing skill directory: ${skillPath}`);
        return null;
    }

    if (!statSync(skillPath).isDirectory()) {
        addError(`Provide a skill directory: ${skillPath}`);
        return null;
    }

    const skillFile = join(skillPath, 'SKILL.md');
    if (!existsSync(skillFile)) {
        addError('Add SKILL.md to the skill directory.');
        return null;
    }

    const content = readFileSync(skillFile, 'utf8');
    const { body, raw } = parseFrontmatter(content);

    validateName(raw, skillPath);
    validateDescription(raw);
    validateOpenaiYaml(skillPath, raw);
    validateBody(body);
    const resourceCount = validateResources(skillPath, body);

    return {
        resources: resourceCount,
    };
}

const cliArguments = process.argv.slice(2);
let target = null;

if (cliArguments.length !== 1 || cliArguments[0].startsWith('--')) {
    addError('Run bun validate-skill.js <skill-directory>.');
} else {
    target = resolve(cliArguments[0]);
}

const stats = target ? validateSkill(target) : null;
const result = {
    path: target ? relative(process.cwd(), target) || '.' : null,
    valid: errors.length === 0,
    errors,
    warnings,
    stats,
};

console.log(JSON.stringify(result, null, 2));
process.exitCode = result.valid ? 0 : 1;
