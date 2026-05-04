import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
    getPropulsionBootstrapGuidance,
} = require('./lib/bootstrap-guidance.js');

async function PropulsionPlugin() {
    return {
        'experimental.chat.messages.transform': async (_input, output) => {
            output.messages = [
                {
                    role: 'system',
                    content: getPropulsionBootstrapGuidance(),
                },
                ...(output.messages ?? []),
            ];
        },
    };
}

export default { server: PropulsionPlugin };
