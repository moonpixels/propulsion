#!/usr/bin/env bun

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join, relative, resolve, sep } from 'node:path';

const errors = [];
const warnings = [];

function addError(message) {
    errors.push(message);
}

function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function parseYaml(raw, label) {
    try {
        const value = Bun.YAML.parse(raw);

        if (!isRecord(value)) {
            addError(`Make ${label} a YAML mapping.`);
            return {};
        }

        return value;
    } catch (error) {
        addError(`Parse ${label} as valid YAML: ${error.message}`);
        return {};
    }
}

function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

    if (!match) {
        addError('Add YAML frontmatter at the start of SKILL.md.');
        return { body: content, data: {}, raw: '' };
    }

    return {
        body: content.slice(match[0].length),
        data: parseYaml(match[1], 'SKILL.md frontmatter'),
        raw: match[1],
    };
}

function validateName(frontmatter, skillPath) {
    const { name } = frontmatter;

    if (typeof name !== 'string' || !name) {
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

function validateDescription(frontmatter, raw) {
    const { description } = frontmatter;
    const descriptionLine = raw
        .split(/\r?\n/)
        .find((line) => line.startsWith('description:'));

    if (typeof description !== 'string' || !description) {
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

function validateInvocation(frontmatter, openai) {
    const invocation = isRecord(frontmatter.metadata)
        ? frontmatter.metadata.invocation
        : null;
    const disableModel = frontmatter['disable-model-invocation'];
    const allowImplicit = isRecord(openai.policy)
        ? openai.policy.allow_implicit_invocation
        : null;

    if (!['user', 'model'].includes(invocation)) {
        addError('Set metadata.invocation to user or model.');
        return;
    }

    const expectedDisable = invocation === 'user';
    const expectedImplicit = invocation === 'model';

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

function validateOpenaiYaml(skillPath, frontmatter) {
    const openaiPath = join(skillPath, 'agents', 'openai.yaml');

    if (!existsSync(openaiPath)) {
        addError('Add agents/openai.yaml.');
        return '';
    }

    const openaiRaw = readFileSync(openaiPath, 'utf8');
    const openai = parseYaml(openaiRaw, 'agents/openai.yaml');
    const skillInterface = isRecord(openai.interface) ? openai.interface : {};
    const displayName = skillInterface.display_name;
    const shortDescription = skillInterface.short_description;

    if (typeof displayName !== 'string' || !displayName)
        addError('Set interface.display_name in agents/openai.yaml.');

    if (typeof shortDescription !== 'string' || !shortDescription) {
        addError('Set interface.short_description in agents/openai.yaml.');
    } else if (shortDescription.length < 25 || shortDescription.length > 64) {
        addError(
            `Keep interface.short_description between 25 and 64 characters; found ${shortDescription.length}.`,
        );
    }

    validateInvocation(frontmatter, openai);
    return openai;
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
    const { body, data, raw } = parseFrontmatter(content);

    validateName(data, skillPath);
    validateDescription(data, raw);
    validateOpenaiYaml(skillPath, data);
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
