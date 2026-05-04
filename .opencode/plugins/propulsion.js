import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(dirname, '../../skills');
const propulsionWorkflowPath = path.join(
    skillsDir,
    'propulsion-workflow',
    'SKILL.md',
);

const parseFrontmatterValue = (value) => {
    const trimmed = value.trim();

    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }

    if (trimmed === 'true') {
        return true;
    }

    if (trimmed === 'false') {
        return false;
    }

    return trimmed;
};

const extractFrontmatter = (raw) => {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

    if (!match) {
        return { frontmatter: {}, content: raw };
    }

    const frontmatter = {};
    const frontmatterBlock = match[1] ?? '';
    const content = match[2] ?? '';

    // This intentionally supports the tiny flat frontmatter surface used by bundled
    // skills. It is not a general YAML parser.
    for (const line of frontmatterBlock.split(/\r?\n/)) {
        const entryMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

        if (!entryMatch) {
            continue;
        }

        const key = entryMatch[1];
        const value = entryMatch[2];

        if (!key || value === undefined) {
            continue;
        }

        const parsedValue = parseFrontmatterValue(value);

        switch (key) {
            case 'description':
                if (typeof parsedValue === 'string' && parsedValue) {
                    frontmatter.description = parsedValue;
                }
                break;
            case 'agent':
                if (typeof parsedValue === 'string' && parsedValue) {
                    frontmatter.agent = parsedValue;
                }
                break;
            case 'model':
                if (typeof parsedValue === 'string' && parsedValue) {
                    frontmatter.model = parsedValue;
                }
                break;
            case 'subtask':
                if (typeof parsedValue === 'boolean') {
                    frontmatter.subtask = parsedValue;
                }
                break;
            default:
                break;
        }
    }

    return { frontmatter, content };
};

const addSkillsPath = (config, skillsPath) => {
    config.skills = config.skills ?? {};
    config.skills.paths = config.skills.paths ?? [];

    if (!config.skills.paths.includes(skillsPath)) {
        config.skills.paths.push(skillsPath);
    }
};

const getBootstrapContent = () => {
    if (!fs.existsSync(propulsionWorkflowPath)) {
        return null;
    }

    const raw = fs.readFileSync(propulsionWorkflowPath, 'utf8');
    const { content } = extractFrontmatter(raw);

    return `<EXTREMELY_IMPORTANT>
**If you were dispatched as a subagent to execute a specific task, IGNORE THIS MESSAGE.**

You are using the Propulsion workflow.

**IMPORTANT: The workflow skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT use the skill tool to load "propulsion-workflow" again - that would be redundant.**

${content}
</EXTREMELY_IMPORTANT>`;
};

export const PropulsionPlugin = async () => {
    return {
        config: async (config) => {
            addSkillsPath(config, skillsDir);
        },

        'experimental.chat.messages.transform': async (
            _transformInput,
            output,
        ) => {
            const bootstrap = getBootstrapContent();

            if (!bootstrap || output.messages.length === 0) {
                return;
            }

            const firstUser = output.messages.find(
                (message) => message.info.role === 'user',
            );

            if (!firstUser || firstUser.parts.length === 0) {
                return;
            }

            if (
                firstUser.parts.some(
                    (part) =>
                        part.type === 'text' &&
                        part.text.includes('EXTREMELY_IMPORTANT'),
                )
            ) {
                return;
            }

            const ref = firstUser.parts[0];

            if (!ref || ref.type !== 'text') {
                return;
            }

            firstUser.parts.unshift({ ...ref, text: bootstrap });
        },
    };
};
