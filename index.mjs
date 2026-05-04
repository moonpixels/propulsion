import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const {
    getPropulsionBootstrapGuidance,
} = require('./lib/bootstrap-guidance.js');
const PROPULSION_SKILLS_DIR = join(
    dirname(fileURLToPath(import.meta.url)),
    'skills',
);

async function PropulsionPlugin() {
    return {
        config: async (config) => {
            config.skills = config.skills || {};
            config.skills.paths = config.skills.paths || [];

            if (!config.skills.paths.includes(PROPULSION_SKILLS_DIR)) {
                config.skills.paths.push(PROPULSION_SKILLS_DIR);
            }
        },
        'experimental.chat.messages.transform': async (_input, output) => {
            const bootstrap = getPropulsionBootstrapGuidance();
            const firstUser = output.messages?.find(
                (message) => message.info.role === 'user',
            );

            if (!firstUser?.parts?.length) {
                return;
            }

            if (
                firstUser.parts.some(
                    (part) =>
                        part.type === 'text' &&
                        part.text.includes('<EXTREMELY_IMPORTANT>'),
                )
            ) {
                return;
            }

            const ref = firstUser.parts[0];
            firstUser.parts.unshift({
                ...ref,
                type: 'text',
                text: bootstrap,
            });
        },
    };
}

export default { server: PropulsionPlugin };
