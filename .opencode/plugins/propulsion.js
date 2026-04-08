import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, '../../skills');
const additionalSkillsDir = path.resolve(__dirname, '../../additional/skills');
const additionalCommandsDir = path.resolve(__dirname, '../../additional/commands');
const workflowPath = path.join(skillsDir, 'workflow', 'SKILL.md');
const bootstrappedSessions = new Set();

const getSessionID = (value) => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    return value.sessionID || value.sessionId || value.session_id || null;
};

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

const extractFrontmatter = (content) => {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

    if (!match) {
        return { frontmatter: {}, content };
    }

    const frontmatter = {};

    for (const line of match[1].split(/\r?\n/)) {
        const entryMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

        if (!entryMatch) {
            continue;
        }

        frontmatter[entryMatch[1]] = parseFrontmatterValue(entryMatch[2]);
    }

    return { frontmatter, content: match[2] };
};

const addSkillsPath = (config, skillsPath) => {
    config.skills = config.skills || {};
    config.skills.paths = config.skills.paths || [];

    if (!config.skills.paths.includes(skillsPath)) {
        config.skills.paths.push(skillsPath);
    }
};

const loadAdditionalCommands = () => {
    if (!fs.existsSync(additionalCommandsDir)) {
        return {};
    }

    const commands = {};

    for (const entry of fs.readdirSync(additionalCommandsDir, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.endsWith('.md')) {
            continue;
        }

        const filePath = path.join(additionalCommandsDir, entry.name);
        const raw = fs.readFileSync(filePath, 'utf8');
        const { frontmatter, content } = extractFrontmatter(raw);
        const commandName = path.basename(entry.name, '.md');

        if (!content.trim()) {
            continue;
        }

        const command = {
            template: content,
        };

        if (typeof frontmatter.description === 'string' && frontmatter.description) {
            command.description = frontmatter.description;
        }

        if (typeof frontmatter.agent === 'string' && frontmatter.agent) {
            command.agent = frontmatter.agent;
        }

        if (typeof frontmatter.model === 'string' && frontmatter.model) {
            command.model = frontmatter.model;
        }

        if (typeof frontmatter.subtask === 'boolean') {
            command.subtask = frontmatter.subtask;
        }

        commands[commandName] = command;
    }

    return commands;
};

const getBootstrapContent = () => {
    if (!fs.existsSync(workflowPath)) {
        return null;
    }

    const raw = fs.readFileSync(workflowPath, 'utf8');
    const { content } = extractFrontmatter(raw);

    return `<IMPORTANT>
You are using Propulsion.

The workflow guidance below is the Propulsion \`workflow\` skill only. Treat it as active for this session, and only load the actual \`workflow\` skill again if you need to re-check its wording or the user explicitly asks.

${content}
</IMPORTANT>`;
};

export const PropulsionPlugin = async (_input, options = {}) => {
    const additionalEnabled = options.additional === true;

    return {
        event: async ({ event }) => {
            const sessionID = getSessionID(event);

            if (!sessionID) {
                return;
            }

            if (event.type === 'session.created') {
                bootstrappedSessions.delete(sessionID);
            }

            if (event.type === 'session.deleted') {
                bootstrappedSessions.delete(sessionID);
            }
        },

        config: async (config) => {
            addSkillsPath(config, skillsDir);

            if (additionalEnabled && fs.existsSync(additionalSkillsDir)) {
                addSkillsPath(config, additionalSkillsDir);
            }

            if (additionalEnabled) {
                const additionalCommands = loadAdditionalCommands();

                if (Object.keys(additionalCommands).length > 0) {
                    config.command = config.command || {};

                    for (const [name, definition] of Object.entries(additionalCommands)) {
                        if (!(name in config.command)) {
                            config.command[name] = definition;
                        }
                    }
                }
            }
        },

        'experimental.chat.messages.transform': async (_input, output) => {
            const bootstrap = getBootstrapContent();

            if (!bootstrap || !output.messages.length) {
                return;
            }

            const firstUser = output.messages.find(
                (message) => message.info.role === 'user',
            );

            if (!firstUser || !firstUser.parts.length) {
                return;
            }

            const sessionID = getSessionID(firstUser.info);

            if (sessionID && bootstrappedSessions.has(sessionID)) {
                return;
            }

            if (
                firstUser.parts.some(
                    (part) =>
                        part.type === 'text' &&
                        part.text.includes('You are using Propulsion.'),
                )
            ) {
                if (sessionID) {
                    bootstrappedSessions.add(sessionID);
                }

                return;
            }

            const bootstrapPart = {
                id: `prt_${randomUUID()}`,
                sessionID,
                messageID: firstUser.info.id,
                type: 'text',
                text: bootstrap,
                synthetic: true,
            };

            firstUser.parts.unshift(bootstrapPart);

            if (sessionID) {
                bootstrappedSessions.add(sessionID);
            }
        },
    };
};
