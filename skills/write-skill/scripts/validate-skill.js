#!/usr/bin/env bun
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const errors = [];
const warnings = [];
const allowedSections = [
    'Prerequisites',
    'Instructions',
    'Rules',
    'Completion Gate',
    'Next Steps',
    'References',
];
const sectionIntroLines = {
    Prerequisites:
        'ALL prerequisites MUST be true before following this skill.',
    Instructions: 'Follow these steps IN ORDER. Do NOT skip steps.',
    Rules: 'These rules are MANDATORY.',
    'Completion Gate': 'Do NOT leave this skill until ALL items are complete.',
    'Next Steps': 'Once the completion gate is fully checked:',
    References: 'Use these references when you need detail.',
};

function addError(message) {
    errors.push(message);
}

function addWarning(message) {
    warnings.push(message);
}

function report(path, stats = null) {
    return {
        path,
        valid: errors.length === 0,
        errors,
        warnings,
        stats,
    };
}

function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!match) {
        addError(
            'Add YAML frontmatter with name and description at the top of SKILL.md.',
        );
        return { name: null, description: null, body: content, raw: '' };
    }

    const raw = match[1];
    const name = raw.match(/^name:\s*(.+)$/m)?.[1]?.trim() || null;
    const description = readDescription(raw);

    return { name, description, body: content.slice(match[0].length), raw };
}

function readDescription(raw) {
    const lines = raw.split(/\r?\n/);
    const index = lines.findIndex((line) => line.startsWith('description:'));
    if (index === -1) return null;

    const firstValue = lines[index].replace(/^description:\s*/, '').trim();
    if (firstValue === '|' || firstValue === '>') {
        return lines
            .slice(index + 1)
            .filter((line) => /^\s+\S/.test(line))
            .map((line) => line.trim())
            .join(' ');
    }

    return firstValue || null;
}

function hasMultilineDescription(raw) {
    const lines = raw.split(/\r?\n/);
    const index = lines.findIndex((line) => line.startsWith('description:'));
    if (index === -1) return false;
    const firstValue = lines[index].replace(/^description:\s*/, '').trim();
    if (firstValue === '|' || firstValue === '>') return true;

    return lines.slice(index + 1).some((line) => /^\s+\S/.test(line));
}

function validateName(name, dirName) {
    if (!name) {
        addError(
            'Add frontmatter name and set it to the skill directory name.',
        );
        return;
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
        addError(
            `Fix frontmatter name "${name}" to match ^[a-z0-9]+(-[a-z0-9]+)*$.`,
        );
    }
    if (name.length > 64) {
        addError(
            `Shorten frontmatter name "${name}" to 64 characters or fewer.`,
        );
    }
    if (name !== dirName) {
        addError(
            `Set frontmatter name to "${dirName}" so it matches the skill directory.`,
        );
    }
}

function validateDescription(description, raw) {
    if (!description) {
        addError(
            'Add a one-line frontmatter description with Use when, Use for, or Use to.',
        );
        return;
    }
    if (hasMultilineDescription(raw)) {
        addError('Rewrite frontmatter description as a single YAML line.');
    }
    if (description.length > 300) {
        addError(
            `Shorten description to 300 characters or fewer. Current length: ${description.length}.`,
        );
    } else if (description.length > 200) {
        addWarning(
            `Shorten description to 200 characters or fewer for easier skill selection. Current length: ${description.length}.`,
        );
    }
    if (!/\bUse (when|for|to)\b/.test(description)) {
        addError(
            'Add Use when, Use for, or Use to to the one-line description so agents know when to load the skill.',
        );
    }
    if (/\b(I|me|my|mine|we|us|our|ours)\b/i.test(description)) {
        addWarning(
            'Rewrite description in third person; avoid first-person wording like I, me, my, we, or our.',
        );
    }
    if (
        !/^(Create|Build|Design|Analyze|Test|Validate|Generate|Process|Manage|Execute|Handle|Provide|Review|Write|Author|Migrate|Improve|Add|Update|Check)\b/.test(
            description,
        )
    ) {
        addWarning(
            'Start description with a strong action verb such as Create, Validate, Review, Manage, or Execute.',
        );
    }
}

function validateBody(body) {
    const lines = body.split(/\r?\n/);
    const nonEmpty = lines
        .map((line, index) => ({ line: line.trim(), index }))
        .filter(({ line }) => line);
    const bodyLines = nonEmpty.length;

    if (bodyLines > 80) {
        addError(
            `Move detail out of SKILL.md; body has ${bodyLines} non-empty lines and must stay at or below 80.`,
        );
    } else if (bodyLines > 50) {
        addWarning(
            `Move detail out of SKILL.md; body has ${bodyLines} non-empty lines and should stay at or below 50.`,
        );
    }

    const first = nonEmpty[0];
    if (!first || !/^#\s+\S/.test(first.line)) {
        addError(
            'Make the first non-empty body line an H1 title, for example: # Skill Name.',
        );
    }

    const firstH2Index = lines.findIndex((line) =>
        /^##\s+\S/.test(line.trim()),
    );
    const titleIndex = first?.index ?? -1;
    const purpose = lines
        .slice(
            titleIndex + 1,
            firstH2Index === -1 ? lines.length : firstH2Index,
        )
        .map((line) => line.trim())
        .find((line) => line);
    if (!purpose || purpose.startsWith('#')) {
        addError(
            'Add one non-empty, non-heading purpose line immediately after the H1 title and before the first H2.',
        );
    }

    const h2Sections = nonEmpty
        .filter(({ line }) => /^##\s+\S/.test(line))
        .map(({ line, index }) => ({
            title: line.replace(/^##\s+/, '').trim(),
            index,
        }));
    validateSections(h2Sections, lines);

    return { bodyLines, h2Sections: h2Sections.length };
}

function validateSections(h2Sections, lines) {
    const titles = h2Sections.map(({ title }) => title);
    for (const required of ['Instructions', 'References']) {
        if (!titles.includes(required))
            addError(`Add required section ## ${required}.`);
    }

    let lastAllowedIndex = -1;
    for (const title of titles) {
        const allowedIndex = allowedSections.indexOf(title);
        if (allowedIndex === -1) {
            addError(
                `Remove unsupported H2 section ## ${title}. Allowed H2 sections are ${allowedSections.map((section) => `## ${section}`).join(', ')}.`,
            );
            continue;
        }
        if (allowedIndex < lastAllowedIndex) {
            addError(
                `Move ## ${title} before ## ${allowedSections[lastAllowedIndex]} to match the canonical section order.`,
            );
        } else {
            lastAllowedIndex = allowedIndex;
        }
    }

    const final = titles[titles.length - 1];
    if (titles.includes('References') && final !== 'References') {
        addError('Move ## References to the final H2 section.');
    }

    for (let index = 0; index < h2Sections.length; index++) {
        const { title, index: lineIndex } = h2Sections[index];
        const requiredIntro = sectionIntroLines[title];
        if (!requiredIntro) continue;

        const nextSectionIndex = h2Sections[index + 1]?.index ?? lines.length;
        const firstContentLine = lines
            .slice(lineIndex + 1, nextSectionIndex)
            .map((line) => line.trim())
            .find((line) => line);

        if (!firstContentLine?.startsWith(requiredIntro)) {
            addError(`Start ## ${title} with: ${requiredIntro}`);
        }
    }
}

function collectArtifacts(skillPath) {
    const artifacts = [];
    for (const dir of ['assets', 'references', 'scripts']) {
        const dirPath = join(skillPath, dir);
        if (!existsSync(dirPath)) continue;

        for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
            const artifactPath = `${dir}/${entry.name}`;
            if (entry.isFile()) {
                artifacts.push(artifactPath);
                continue;
            }
            if (entry.isDirectory()) {
                for (const nested of collectNestedFiles(
                    join(dirPath, entry.name),
                    artifactPath,
                )) {
                    addError(
                        `Move nested artifact ${nested} directly under ${dir}/; nested artifact files are not allowed.`,
                    );
                }
            }
        }
    }
    return artifacts;
}

function collectNestedFiles(dirPath, prefix) {
    const files = [];
    for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
        const nestedPath = `${prefix}/${entry.name}`;
        if (entry.isFile()) files.push(nestedPath);
        if (entry.isDirectory())
            files.push(
                ...collectNestedFiles(join(dirPath, entry.name), nestedPath),
            );
    }
    return files;
}

function finalReferencesSection(body) {
    const lines = body.split(/\r?\n/);
    const start = lines.findIndex((line) => line.trim() === '## References');
    if (start === -1) return '';

    const rest = lines.slice(start + 1);
    const nextH2 = rest.findIndex((line) => /^##\s+\S/.test(line.trim()));
    return (nextH2 === -1 ? rest : rest.slice(0, nextH2)).join('\n');
}

function validateArtifacts(skillPath, body) {
    const artifacts = collectArtifacts(skillPath);
    const linked = new Set();
    const references = finalReferencesSection(body);
    const artifactLink =
        /\[(assets|references|scripts)\/[^\]]+\]\((assets|references|scripts)\/[^)]+\)/;

    for (const rawLine of references.split(/\r?\n/)) {
        const line = rawLine.trimStart();
        if (!artifactLink.test(line)) continue;

        const match = line.match(
            /^- \[((?:assets|references|scripts)\/[^\]]+)\]\(((?:assets|references|scripts)\/[^)]+)\) - (.*)$/,
        );
        const emptyDescriptionMatch = line.match(
            /^- \[((?:assets|references|scripts)\/[^\]]+)\]\(((?:assets|references|scripts)\/[^)]+)\) -\s*$/,
        );
        const text = match?.[1];
        const href = match?.[2];
        const description = match?.[3]?.trim();
        const path = href ?? text;

        if (
            !match &&
            emptyDescriptionMatch?.[1] === emptyDescriptionMatch?.[2]
        ) {
            linked.add(emptyDescriptionMatch[2]);
            addError(
                `Add a short description after " - " for artifact reference ${emptyDescriptionMatch[2]}.`,
            );
            if (!existsSync(join(skillPath, emptyDescriptionMatch[2]))) {
                addError(
                    `Create linked artifact ${emptyDescriptionMatch[2]} or remove its References bullet.`,
                );
            }
            continue;
        }

        if (!match || text !== href) {
            const expected = text ?? path ?? 'artifact/path';
            addError(
                `Reference artifact ${expected} with matching text and href: - [${expected}](${expected}) - short description.`,
            );
            continue;
        }

        linked.add(href);
        if (!description) {
            addError(
                `Add a short description after " - " for artifact reference ${href}.`,
            );
        }
        if (!existsSync(join(skillPath, href))) {
            addError(
                `Create linked artifact ${href} or remove its References bullet.`,
            );
        }
    }

    for (const artifact of artifacts) {
        if (!linked.has(artifact)) {
            addError(
                `Link artifact ${artifact} from the final ## References section.`,
            );
        }
    }

    return artifacts.length;
}

function validateSkill(skillPath) {
    if (!existsSync(skillPath)) {
        addError(
            `Create the skill directory or fix the path; not found: ${skillPath}`,
        );
        return null;
    }
    if (!statSync(skillPath).isDirectory()) {
        addError(`Provide a skill directory, not a file: ${skillPath}`);
        return null;
    }

    const skillMdPath = join(skillPath, 'SKILL.md');
    if (!existsSync(skillMdPath)) {
        addError('Add SKILL.md to the skill directory.');
        return null;
    }

    const content = readFileSync(skillMdPath, 'utf8');
    const { name, description, body, raw } = parseFrontmatter(content);
    validateName(name, basename(skillPath));
    validateDescription(description, raw);
    const bodyStats = validateBody(body);
    const artifacts = validateArtifacts(skillPath, body);

    return { ...bodyStats, artifacts };
}

let targetArg = null;
for (const arg of args) {
    if (arg.startsWith('--')) {
        addError(
            `Unsupported option ${arg}. Provide only a skill directory path.`,
        );
    } else if (targetArg) {
        addError('Provide only one skill directory path.');
    } else {
        targetArg = arg;
    }
}

if (!targetArg && errors.length === 0) {
    addError(
        'Provide a skill directory path: bun validate-skill.js <skill-path>',
    );
}

const targetPath = targetArg ? resolve(targetArg) : null;
const stats =
    targetPath && errors.length === 0 ? validateSkill(targetPath) : null;
const displayPath = targetPath
    ? relative(process.cwd(), targetPath) || targetPath
    : null;
const output = report(displayPath, stats);

console.log(JSON.stringify(output, null, 2));
process.exit(output.valid ? 0 : 1);
