import { afterEach, expect, test } from 'bun:test';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { validateSkill } from '../skills/write-skill/scripts/validate-skill.js';
import { validateSkills } from './validate-skills.js';

const workspaces = [];

afterEach(() => {
    for (const workspace of workspaces.splice(0))
        rmSync(workspace, { recursive: true, force: true });
});

function fixture(
    frontmatter = 'name: sample-skill\ndescription: Handle a specific recurring task.',
    body = 'Perform the requested task.',
) {
    const workspace = mkdtempSync(path.join(tmpdir(), 'skill-validation-'));
    workspaces.push(workspace);
    const root = path.join(workspace, 'sample-skill');
    mkdirSync(root);
    writeFileSync(
        path.join(root, 'SKILL.md'),
        `---\n${frontmatter}\n---\n\n${body}\n`,
    );
    mkdirSync(path.join(root, 'agents'));
    writeFileSync(
        path.join(root, 'agents/openai.yaml'),
        'interface:\n  display_name: "Sample Skill"\n  short_description: "Handle a specific recurring task"\n',
    );
    return root;
}

test('accepts flexible descriptions and layouts with the required OpenAI adapter', () => {
    const root = fixture(
        'name: sample-skill\ndescription: >-\n  Handle the task\n  when its condition applies.',
        'Read the input.\n\nReturn the checked result.',
    );
    expect(validateSkill(root).valid).toBe(true);
});

test('requires the OpenAI adapter and reports its malformed YAML', () => {
    const root = fixture();
    const adapter = path.join(root, 'agents/openai.yaml');
    rmSync(adapter);
    expect(validateSkill(root).errors[0]).toContain('agents/openai.yaml');
    writeFileSync(adapter, 'interface: [');
    expect(validateSkill(root).valid).toBe(false);
    writeFileSync(adapter, '- not-a-mapping');
    expect(validateSkill(root).errors).toEqual([
        'agents/openai.yaml: must be a YAML mapping.',
    ]);
});

test('requires OpenAI UI metadata', () => {
    const root = fixture();
    const adapter = path.join(root, 'agents/openai.yaml');
    writeFileSync(adapter, 'interface: {}');
    expect(validateSkill(root).errors).toHaveLength(2);
    writeFileSync(
        adapter,
        'interface:\n  display_name: 7\n  short_description: " "',
    );
    expect(validateSkill(root).errors).toHaveLength(2);
    writeFileSync(adapter, 'interface: []');
    expect(validateSkill(root).errors).toHaveLength(1);
});

test('enforces naming and description limits', () => {
    const root = fixture(`name: Wrong--Name\ndescription: ${'x'.repeat(1025)}`);
    expect(validateSkill(root).errors).toHaveLength(2);
});

test('reports a directory-name mismatch', () => {
    const root = fixture('name: other-skill\ndescription: Do the task.');
    expect(validateSkill(root).errors).toEqual([
        'name must match the skill directory name.',
    ]);
});

test('reports malformed YAML and missing skill files', () => {
    const root = fixture('name: [');
    const invalid = validateSkill(root);
    expect(invalid.valid).toBe(false);
    expect(invalid.tokens.root_tokens).toBeGreaterThan(0);
    rmSync(path.join(root, 'SKILL.md'));
    expect(validateSkill(root).valid).toBe(false);
});

test('checks inline and reference links while ignoring literal examples', () => {
    const root = fixture(
        undefined,
        '[Present](references/present.md#section)\n[Missing][missing]\n\n[missing]: references/absent.md\n\n```markdown\n[Illustration](not-a-real-file.md)\n```\n\n`[Literal](also-not-real.md)`',
    );
    mkdirSync(path.join(root, 'references'));
    writeFileSync(
        path.join(root, 'references/present.md'),
        '# Section\n\nContent.',
    );
    const result = validateSkill(root);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('references/absent.md');
});

test('checks links relative to reference files, including spaces and parentheses', () => {
    const root = fixture(undefined, '[Details](references/details.md)');
    mkdirSync(path.join(root, 'references'));
    writeFileSync(
        path.join(root, 'references/details.md'),
        '[File](<../a file.md>)\n[Other](../result(v1).md)\n[Remote](https://example.com)',
    );
    writeFileSync(path.join(root, 'a file.md'), 'Content.');
    writeFileSync(path.join(root, 'result(v1).md'), 'Content.');
    expect(validateSkill(root).valid).toBe(true);
});

test('does not interpret YAML or escaped link syntax as Markdown links', () => {
    const root = fixture(
        'name: sample-skill\ndescription: Explain [example](not-a-resource.md) when useful.',
        '\\[Literal](absent.md)\n<!-- [Comment](absent.md) -->',
    );
    expect(validateSkill(root).valid).toBe(true);
});

test('recognises nested parentheses and parenthesised link titles', () => {
    const root = fixture(
        undefined,
        '[Nested](absent(v1(extra)).md)\n[Title](missing.md (A title))',
    );
    const result = validateSkill(root);
    expect(result.errors).toHaveLength(2);
    expect(result.errors[0]).toContain('absent(v1(extra)).md');
    expect(result.errors[1]).toContain('missing.md');
});

test('default headings and a completion gate pass without warnings', () => {
    const root = fixture(
        undefined,
        '# Sample\n\nProduce a result.\n\n## Inputs ##\n\nUse supplied data.\n\n## Method\n\n```sh\nrun-task\n```\n\n## Finish\n\nReturn the result.\n\n**Done only when** all rows are checked.',
    );
    expect(validateSkill(root).warnings).toEqual([]);
    writeFileSync(
        path.join(root, 'SKILL.md'),
        '---\nname: sample-skill\ndescription: Do a task.\n---\n\nInputs\n------\nUse data.\n\nMethod\n------\nCheck data.\n\nFinish\n------\nFinish when all rows are checked.',
    );
    expect(validateSkill(root).warnings).toEqual([]);
});

test('tiny layouts stay valid and expose advisory warnings in CLI and summary output', () => {
    const root = fixture(
        undefined,
        '# Sample\n\nUse guard clauses. Stop when behaviour is unchanged.',
    );
    const result = validateSkill(root);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain(
        'missing default headings: Inputs, Method, Finish',
    );
    const validator = new URL(
        '../skills/write-skill/scripts/validate-skill.js',
        import.meta.url,
    ).pathname;
    const cli = Bun.spawnSync([process.execPath, validator, root]);
    expect(cli.exitCode).toBe(0);
    expect(JSON.parse(cli.stdout.toString()).warnings).toEqual(result.warnings);
    const summary = validateSkills(path.dirname(root));
    expect(summary.valid).toBe(true);
    expect(summary.failures).toEqual([]);
    expect(summary.warnings).toEqual([
        { skill: 'sample-skill', warnings: result.warnings },
    ]);
});

test('warns about misordered and empty sections without blocking packaging', () => {
    const root = fixture(
        undefined,
        '## Method\n\n<!-- Not section content. -->\n\n## Inputs\n\n## Finish\n\nReturn the report. Done only when every row is checked.',
    );
    const result = validateSkill(root);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(3);
    expect(result.warnings[0]).toContain('out of order');
    expect(result.warnings[1]).toContain('Inputs section is empty');
    expect(result.warnings[2]).toContain('Method section is empty');
});

test('root layout warnings ignore frontmatter, literal examples, comments, and references', () => {
    const root = fixture(
        'name: sample-skill\ndescription: Finish when a task is complete.',
        '```markdown\n## Inputs\n## Method\n## Finish\nDone only when every row is checked.\n```\n\n`Finish when ready.`\n<!-- ## Inputs\nFinish when ready. -->\n[Details](references/details.md)',
    );
    mkdirSync(path.join(root, 'references'));
    writeFileSync(
        path.join(root, 'references/details.md'),
        '## Inputs\nData\n## Method\nCheck\n## Finish\nDone only when every row is checked.',
    );
    const result = validateSkill(root);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(2);
    expect(result.warnings[0]).toContain('missing default headings');
    expect(result.warnings[1]).toContain('no recognisable completion gate');
});

test('rejects absolute local links while preserving relative and remote links', () => {
    const root = fixture();
    const existing = path.join(root, 'details.md');
    writeFileSync(existing, 'Details.');
    writeFileSync(
        path.join(root, 'SKILL.md'),
        `---\nname: sample-skill\ndescription: Do a task.\n---\n\n[Absolute](${existing})\n[Encoded](${encodeURIComponent(existing)})\n[Windows](C:/skills/details.md)\n[File URL](file://${existing})\n[Relative](details.md)\n[Remote](https://example.com)\n[Protocol-relative](//example.com/details.md)\n`,
    );
    const result = validateSkill(root);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);
    expect(
        result.errors.every((error) => error.includes('absolute local path')),
    ).toBe(true);
});

test('reports root and stored Markdown counts separately', () => {
    const root = fixture();
    mkdirSync(path.join(root, 'references'));
    mkdirSync(path.join(root, 'assets'));
    writeFileSync(path.join(root, 'references/details.md'), 'hello world');
    writeFileSync(path.join(root, 'assets/example.md'), 'こんにちは世界');
    const result = validateSkill(root);
    expect(result.valid).toBe(true);
    expect(result.tokens).toMatchObject({
        encoding: 'o200k_base',
        tokenizer: 'js-tiktoken',
        tokenizer_version: '1.0.21',
    });
    expect(result.tokens.files.slice(1)).toEqual([
        { file: 'assets/example.md', tokens: 2 },
        { file: 'references/details.md', tokens: 2 },
    ]);
    expect(result.tokens.root_tokens).toBe(21);
    expect(result.tokens.markdown_tokens).toBe(25);
});

test('all-skills summary retains counts and reports failures while checking every bundle', () => {
    const root = fixture();
    const parent = path.dirname(root);
    mkdirSync(path.join(parent, 'broken-skill'));
    const result = validateSkills(parent);
    expect(result.checked).toBe(2);
    expect(result.valid).toBe(false);
    expect(result.tokens.skills.map((skill) => skill.skill)).toEqual([
        'broken-skill',
        'sample-skill',
    ]);
    expect(result.tokens.skills[1].root_tokens).toBeGreaterThan(0);
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0].skill).toBe('broken-skill');
    expect(
        result.failures[0].errors.every((error) => error.includes('ENOENT')),
    ).toBe(true);
    rmSync(path.join(parent, 'broken-skill'), { recursive: true });
    expect(validateSkills(parent)).toMatchObject({
        checked: 1,
        valid: true,
        failures: [],
    });
});

test('CLI emits valid JSON and distinct validity and usage exits', () => {
    const root = fixture();
    const validator = new URL(
        '../skills/write-skill/scripts/validate-skill.js',
        import.meta.url,
    ).pathname;
    const valid = Bun.spawnSync([process.execPath, validator, root]);
    expect(valid.exitCode).toBe(0);
    expect(JSON.parse(valid.stdout.toString()).valid).toBe(true);
    rmSync(path.join(root, 'SKILL.md'));
    const invalid = Bun.spawnSync([process.execPath, validator, root]);
    expect(invalid.exitCode).toBe(1);
    expect(JSON.parse(invalid.stdout.toString()).valid).toBe(false);
    const usage = Bun.spawnSync([process.execPath, validator]);
    expect(usage.exitCode).toBe(2);
});
