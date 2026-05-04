const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const PROPULSION_SKILL_PATH = join(
    __dirname,
    '..',
    'skills',
    'propulsion',
    'SKILL.md',
);

function buildPropulsionBootstrapGuidance() {
    const propulsionSkill = readFileSync(PROPULSION_SKILL_PATH, 'utf8').trim();

    return `<EXTREMELY_IMPORTANT>
Propulsion workflow entry point: load and follow the propulsion skill when the request is software work.
Route software work through Propulsion before downstream stages.

${propulsionSkill}
</EXTREMELY_IMPORTANT>`;
}

const PROPULSION_BOOTSTRAP_GUIDANCE = buildPropulsionBootstrapGuidance();

function getPropulsionBootstrapGuidance() {
    return PROPULSION_BOOTSTRAP_GUIDANCE;
}

module.exports = {
    PROPULSION_BOOTSTRAP_GUIDANCE,
    getPropulsionBootstrapGuidance,
};
