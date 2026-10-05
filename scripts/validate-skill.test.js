import { afterEach, expect, test } from 'bun:test';
import {
    mkdtempSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { validateSkill } from '../skills/write-skill/scripts/validate-skill.js';

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

test('validates optional OpenAI resources, colour, prompts, and MCP dependencies', () => {
    const root = fixture();
    mkdirSync(path.join(root, 'assets'));
    writeFileSync(path.join(root, 'assets/icon.svg'), '<svg/>');
    writeFileSync(
        path.join(root, 'agents/openai.yaml'),
        'interface:\n  display_name: "Sample Skill"\n  short_description: "Handle a specific recurring task"\n  icon_small: "./assets/icon.svg"\n  brand_color: "#Ab12cd"\n  default_prompt: "Use $sample-skill."\ndependencies:\n  tools:\n    - type: mcp\n      value: example\n      transport: streamable_http\n      url: "https://example.com/mcp"',
    );
    expect(validateSkill(root).valid).toBe(true);
});

test('rejects invalid OpenAI optional field types and unbundled icons', () => {
    const root = fixture();
    writeFileSync(
        path.join(root, 'agents/openai.yaml'),
        'interface:\n  display_name: "Sample Skill"\n  short_description: "Handle a specific recurring task"\n  icon_small: "../sample-skill/../outside.svg"\n  icon_large: []\n  brand_color: "red"\n  default_prompt: ""\n  products: [OTHER]\n  unsupported: true\ndependencies:\n  tools:\n    - type: shell\n      value: example\n    - type: mcp\n      value: example\n      url: 7',
    );
    expect(validateSkill(root).errors).toHaveLength(6);
});

test('rejects malformed OpenAI dependency declarations', () => {
    const root = fixture();
    const adapter = path.join(root, 'agents/openai.yaml');
    const base = readFileSync(adapter, 'utf8');
    writeFileSync(adapter, `${base}\ndependencies: []`);
    expect(validateSkill(root).errors).toHaveLength(1);
    writeFileSync(
        adapter,
        `${base}\ndependencies:\n  unsupported: true\n  tools: {}`,
    );
    expect(validateSkill(root).errors).toHaveLength(2);
});

test('enforces naming, description limits, and optional metadata types', () => {
    const root = fixture(
        `name: Wrong--Name\ndescription: ${'x'.repeat(1025)}\nmetadata:\n  version: 1`,
    );
    expect(validateSkill(root).errors).toHaveLength(3);
});

test('reports a directory-name mismatch and empty body', () => {
    const root = fixture('name: other-skill\ndescription: Do the task.', '');
    expect(validateSkill(root).errors).toHaveLength(2);
});

test('reports malformed YAML and missing skill files', () => {
    const root = fixture('name: [');
    expect(validateSkill(root).valid).toBe(false);
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

test('flags extensions for destination review and accepts local metadata', () => {
    const root = fixture(
        'name: sample-skill\ndescription: Do the task.\ncustom-extension: true\nmetadata:\n  source: local-reference',
    );
    const result = validateSkill(root);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(1);
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

test('validates optional field types and compatibility boundaries', () => {
    const root = fixture(
        'name: sample-skill\ndescription: Do the task.\nlicense: 7\ncompatibility: ""\nallowed-tools: [read]',
    );
    expect(validateSkill(root).errors).toHaveLength(3);
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
