import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, '../../skills');
const workflowPath = path.join(skillsDir, 'workflow', 'SKILL.md');
const bootstrappedSessions = new Set();

const getSessionID = (value) => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    return value.sessionID || value.sessionId || value.session_id || null;
};

const extractAndStripFrontmatter = (content) => {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

    if (!match) {
        return { content };
    }

    return { content: match[2] };
};

const getBootstrapContent = () => {
    if (!fs.existsSync(workflowPath)) {
        return null;
    }

    const raw = fs.readFileSync(workflowPath, 'utf8');
    const { content } = extractAndStripFrontmatter(raw);

    return `<IMPORTANT>
You are using Propulsion.

The workflow guidance below is the Propulsion \`workflow\` skill only. Treat it as active for this session, and only load the actual \`workflow\` skill again if you need to re-check its wording or the user explicitly asks.

${content}
</IMPORTANT>`;
};

export const PropulsionPlugin = async () => {
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
            config.skills = config.skills || {};
            config.skills.paths = config.skills.paths || [];

            if (!config.skills.paths.includes(skillsDir)) {
                config.skills.paths.push(skillsDir);
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
