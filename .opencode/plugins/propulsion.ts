import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Plugin } from '@opencode-ai/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, '../../skills');
const additionalSkillsDir = path.resolve(__dirname, '../../additional/skills');
const additionalCommandsDir = path.resolve(
    __dirname,
    '../../additional/commands',
);
const propulsionWorkflowPath = path.join(
    skillsDir,
    'propulsion-workflow',
    'SKILL.md',
);

type PropulsionHooks = Awaited<ReturnType<Plugin>>;
type PropulsionConfig = Parameters<
    NonNullable<PropulsionHooks['config']>
>[0] & {
    skills?: {
        paths?: string[];
    };
    command?: Record<string, CommandDefinition>;
};
type CommandFrontmatter = {
    description?: string;
    agent?: string;
    model?: string;
    subtask?: boolean;
};

type CommandDefinition = {
    template: string;
    description?: string;
    agent?: string;
    model?: string;
    subtask?: boolean;
};

type PropulsionOptions = {
    additional?: boolean;
};

const parseFrontmatterValue = (value: string): string | boolean => {
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

const extractFrontmatter = (
    raw: string,
): {
    frontmatter: CommandFrontmatter;
    content: string;
} => {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

    if (!match) {
        return { frontmatter: {}, content: raw };
    }

    const frontmatter: CommandFrontmatter = {};
    const frontmatterBlock = match[1] ?? '';
    const content = match[2] ?? '';

    // This intentionally supports the tiny flat frontmatter surface used by bundled
    // commands. It is not a general YAML parser.
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

const addSkillsPath = (config: PropulsionConfig, skillsPath: string) => {
    config.skills = config.skills ?? {};
    config.skills.paths = config.skills.paths ?? [];

    if (!config.skills.paths.includes(skillsPath)) {
        config.skills.paths.push(skillsPath);
    }
};

const loadAdditionalCommands = (): Record<string, CommandDefinition> => {
    if (!fs.existsSync(additionalCommandsDir)) {
        return {};
    }

    const commands: Record<string, CommandDefinition> = {};

    for (const entry of fs.readdirSync(additionalCommandsDir, {
        withFileTypes: true,
    })) {
        if (!entry.isFile() || !entry.name.endsWith('.md')) {
            continue;
        }

        const filePath = path.join(additionalCommandsDir, entry.name);
        const raw = fs.readFileSync(filePath, 'utf8');
        const { frontmatter, content } = extractFrontmatter(raw);

        if (!content.trim()) {
            continue;
        }

        commands[path.basename(entry.name, '.md')] = {
            template: content,
            ...(frontmatter.description
                ? { description: frontmatter.description }
                : {}),
            ...(frontmatter.agent ? { agent: frontmatter.agent } : {}),
            ...(frontmatter.model ? { model: frontmatter.model } : {}),
            ...(typeof frontmatter.subtask === 'boolean'
                ? { subtask: frontmatter.subtask }
                : {}),
        };
    }

    return commands;
};

const mergeAdditionalCommands = (
    config: PropulsionConfig,
    additionalCommands: Record<string, CommandDefinition>,
) => {
    if (Object.keys(additionalCommands).length === 0) {
        return;
    }

    config.command = config.command ?? {};

    // Bundled commands are defaults only. A user command with the same name wins.
    for (const [name, definition] of Object.entries(additionalCommands)) {
        if (!(name in config.command)) {
            config.command[name] = definition;
        }
    }
};

const getBootstrapContent = (): string | null => {
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

export const PropulsionPlugin: Plugin = async (_pluginInput, options = {}) => {
    const { additional = false } = options as PropulsionOptions;
    const additionalCommands = additional ? loadAdditionalCommands() : {};

    return {
        config: async (config) => {
            addSkillsPath(config, skillsDir);

            if (additional && fs.existsSync(additionalSkillsDir)) {
                addSkillsPath(config, additionalSkillsDir);
                mergeAdditionalCommands(config, additionalCommands);
            }
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
