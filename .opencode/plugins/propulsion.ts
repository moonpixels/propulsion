import { randomUUID } from 'node:crypto';
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
const workflowPath = path.join(skillsDir, 'workflow', 'SKILL.md');
const bootstrapMarker = 'You are using Propulsion.';
const bootstrappedSessions = new Set<string>();

type PropulsionHooks = Awaited<ReturnType<Plugin>>;
type PropulsionConfig = Parameters<
    NonNullable<PropulsionHooks['config']>
>[0] & {
    skills?: {
        paths?: string[];
    };
    command?: Record<string, CommandDefinition>;
};
type TransformOutput = Parameters<
    NonNullable<PropulsionHooks['experimental.chat.messages.transform']>
>[1];
type TransformMessage = TransformOutput['messages'][number];
type TransformTextPart = Extract<
    TransformMessage['parts'][number],
    { type: 'text' }
>;

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

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

const getObjectString = (value: unknown, keys: string[]): string | null => {
    if (!isRecord(value)) {
        return null;
    }

    for (const key of keys) {
        const candidate = value[key];

        if (typeof candidate === 'string' && candidate) {
            return candidate;
        }
    }

    return null;
};

const getSessionID = (value: unknown) => {
    return getObjectString(value, ['sessionID', 'sessionId', 'session_id']);
};

const getSessionInfoID = (event: unknown) => {
    if (!isRecord(event)) {
        return null;
    }

    const properties = event.properties;

    if (!isRecord(properties)) {
        return null;
    }

    const info = properties.info;

    return getObjectString(info, ['id']);
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
    if (!fs.existsSync(workflowPath)) {
        return null;
    }

    const raw = fs.readFileSync(workflowPath, 'utf8');
    const { content } = extractFrontmatter(raw);

    return `<EXTREMELY_IMPORTANT>
${bootstrapMarker}

Propulsion's \`workflow\` skill is already active for this session.

If you are a subagent executing a bounded task, the injected workflow below is inactive for you. Stay inside your assigned stage or task. Do not reroute the workflow.

Treat the injected skill content below as the session contract you must follow.

Do not reload \`workflow\` unless you need to re-check its wording or the user explicitly asks.

${content}
</EXTREMELY_IMPORTANT>`;
};

const isUserMessage = (
    message: TransformMessage,
): message is TransformMessage & { info: { role: 'user'; id: string } } => {
    return message.info.role === 'user';
};

const hasBootstrapPart = (parts: TransformMessage['parts']) => {
    return parts.some(
        (part): part is TransformTextPart =>
            part.type === 'text' &&
            part.synthetic === true &&
            part.text.includes(bootstrapMarker),
    );
};

export const PropulsionPlugin: Plugin = async (_pluginInput, options = {}) => {
    const { additional = false } = options as PropulsionOptions;
    const bootstrap = getBootstrapContent();
    const additionalCommands = additional ? loadAdditionalCommands() : {};

    return {
        event: async ({ event }) => {
            if (
                event.type !== 'session.created' &&
                event.type !== 'session.deleted'
            ) {
                return;
            }

            const sessionID = getSessionInfoID(event) ?? getSessionID(event);

            if (sessionID) {
                bootstrappedSessions.delete(sessionID);
            }
        },

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
            if (!bootstrap || output.messages.length === 0) {
                return;
            }

            const firstUser = output.messages.find(isUserMessage);

            if (!firstUser || firstUser.parts.length === 0) {
                return;
            }

            const sessionID = getSessionID(firstUser.info);

            if (sessionID && bootstrappedSessions.has(sessionID)) {
                return;
            }

            if (hasBootstrapPart(firstUser.parts)) {
                if (sessionID) {
                    bootstrappedSessions.add(sessionID);
                }

                return;
            }

            // Inject the workflow bootstrap as a synthetic first user part so it rides
            // with the user's first message without changing the persisted source text.
            const bootstrapPart: TransformTextPart = {
                id: `prt_${randomUUID()}`,
                sessionID: firstUser.info.sessionID,
                messageID: firstUser.info.id,
                type: 'text',
                text: bootstrap,
                synthetic: true,
            };

            firstUser.parts.unshift(bootstrapPart);

            // Track sessions we have already patched so the bootstrap stays one-time.
            if (sessionID) {
                bootstrappedSessions.add(sessionID);
            }
        },
    };
};
