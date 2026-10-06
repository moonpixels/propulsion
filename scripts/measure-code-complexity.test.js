import { afterEach, expect, test } from 'bun:test';
import {
    chmodSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const helper = resolve('skills/measure-code-complexity/scripts/measure.py');
const scratch = [];
const run = (command, cwd, environment = {}) => {
    const result = Bun.spawnSync(command, {
        cwd,
        env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1', ...environment },
    });
    return {
        code: result.exitCode,
        text: result.stdout.toString(),
        error: result.stderr.toString(),
    };
};
const bundleModule = resolve('skills/measure-code-complexity/scripts');
const bundled = run([
    'python3',
    '-c',
    `import sys; sys.path.insert(0, ${JSON.stringify(bundleModule)}); from bundled_cccc import executable; print(executable())`,
]).text.trim();
function write(directory, name, content) {
    const path = join(directory, name);
    mkdirSync(resolve(path, '..'), { recursive: true });
    writeFileSync(path, content);
    return path;
}
function repository() {
    const directory = mkdtempSync(join(tmpdir(), 'complexity-test-'));
    scratch.push(directory);
    for (const args of [
        ['init', '-q'],
        ['config', 'user.name', 'Fixture'],
        ['config', 'user.email', 'fixture@example.invalid'],
    ]) {
        expect(run(['git', ...args], directory).code).toBe(0);
    }
    write(
        directory,
        'price.py',
        'def price(value):\n    if value < 0:\n        return 0\n    return value\n\ndef unchanged(value):\n    return value * 2\n',
    );
    expect(run(['git', 'add', '.'], directory).code).toBe(0);
    expect(run(['git', 'commit', '-qm', 'fixture'], directory).code).toBe(0);
    return directory;
}
function measure(directory, ...args) {
    const result = run(
        ['python3', helper, '--repo', directory, ...args],
        directory,
    );
    const json = JSON.parse(result.text);
    let report;
    if (json.report) {
        scratch.push(json.report);
        report = JSON.parse(readFileSync(json.report, 'utf8'));
    }
    return { ...result, json, report };
}
function flatten(functions) {
    return functions.flatMap((f) => [f, ...flatten(f.children ?? [])]);
}
function fakeTool(directory, code) {
    const path = write(
        directory,
        'fake-cccc',
        `#!/usr/bin/env python3\nimport sys, json, subprocess\nif '--version' in sys.argv:\n print('cccc fixture')\nelse:\n${code}\n`,
    );
    chmodSync(path, 0o755);
    return path;
}
afterEach(() => {
    for (const path of scratch.splice(0))
        rmSync(path, { recursive: true, force: true });
});

test('measures every function in changed production files and saves deterministic cccc-shaped JSON without project edits', () => {
    const directory = repository();
    write(
        directory,
        'price.py',
        'def price(value):\n    return value\n\ndef unchanged(value):\n    return value * 2\n',
    );
    write(
        directory,
        'new.ts',
        'export const discount = (value: number) => value / 2;\n',
    );
    write(directory, 'new.test.ts', 'function testDiscount() {}\n');
    write(directory, 'tests/check.py', 'def check():\n    assert True\n');
    write(directory, 'generated/ignored.ts', 'function generated() {}\n');
    write(directory, 'settings.json', '{"currency":"GBP"}');
    const before = run(['git', 'status', '--porcelain'], directory).text;
    const result = measure(directory);
    expect(result.code).toBe(0);
    expect(result.json.status).toBe('complete');
    expect(result.json.schema).toBe(4);
    expect(result.json).not.toHaveProperty('files');
    expect(result.json).not.toHaveProperty('functions');
    expect(result.report.scope.files).toEqual(['new.ts', 'price.py']);
    expect(
        result.report.files.flatMap((f) =>
            flatten(f.functions).map((fn) => fn.name),
        ),
    ).toEqual(['discount', 'price', 'unchanged']);
    expect(result.report.scope.excluded_files).toContain('tests/check.py');
    const price = result.report.files.find((f) => f.path === 'price.py')
        .functions[0];
    expect(price.cyclomatic).toBe(1);
    expect(price.lizard.nloc).toBe(2);
    expect(price.lizard).not.toHaveProperty('cyclomatic');
    expect(result.report).not.toHaveProperty('baseFunctions');
    expect(result.report.summary).not.toHaveProperty('loc');
    expect(JSON.stringify(result.report)).not.toContain('tokenCount');
    expect(JSON.stringify(result.report)).not.toContain('baseline');
    expect(result.report.scope.content_id).toMatch(/^[a-f0-9]{64}$/);
    expect(result.report).toEqual(measure(directory).report);
    expect(run(['git', 'status', '--porcelain'], directory).text).toBe(before);
    expect(result.json.report.startsWith(directory)).toBe(false);
    const native = JSON.parse(
        run(
            [
                bundled,
                '--no-config',
                '--no-cache',
                join(directory, 'new.ts'),
                join(directory, 'price.py'),
            ],
            directory,
        ).text,
    );
    expect(result.report.summary.cognitive).toEqual(native.summary.cognitive);
    expect(result.report.summary.cyclomatic).toEqual(native.summary.cyclomatic);
});

test('uses a base only for file selection and explicit files for repeated caller-owned measurements', () => {
    const directory = repository();
    const base = run(['git', 'rev-parse', 'HEAD'], directory).text.trim();
    write(directory, 'new.py', 'def new(value):\n    return value + 1\n');
    expect(run(['git', 'add', '.'], directory).code).toBe(0);
    expect(run(['git', 'commit', '-qm', 'addition'], directory).code).toBe(0);
    expect(measure(directory).report.files).toEqual([]);
    const selected = measure(directory, '--base', base);
    expect(selected.report.scope.files).toEqual(['new.py']);
    expect(selected.report.scope.selection_base).toBe(base);
    expect(selected.report.files[0].functions[0].cyclomatic).toBe(1);
    const before = measure(directory, 'price.py');
    write(directory, 'price.py', 'def price(value):\n    return value\n');
    const after = measure(directory, 'price.py');
    expect(after.report.scope.content_id).not.toBe(
        before.report.scope.content_id,
    );
    expect(after.report.summary.cyclomatic.max).toBe(1);
    expect(after.report.summary).not.toHaveProperty('delta');
});

test('counts nested functions once per tool and verifies the cognitive guard-clause example with real parsers', () => {
    const directory = repository();
    write(
        directory,
        'nested.py',
        'def outer(value):\n    def inner():\n        if value:\n            return value\n        return 0\n    return inner()\n',
    );
    write(
        directory,
        'before.ts',
        'function offer(active: boolean, held: boolean) {\n if (active) {\n  if (held) return "held";\n  return "offer";\n }\n return "inactive";\n}\n',
    );
    write(
        directory,
        'after.ts',
        'function offer(active: boolean, held: boolean) {\n if (!active) return "inactive";\n if (held) return "held";\n return "offer";\n}\n',
    );
    const result = measure(directory, 'nested.py', 'before.ts', 'after.ts');
    expect(result.json.status).toBe('complete');
    const byPath = Object.fromEntries(
        result.report.files.map((f) => [f.path, f]),
    );
    expect(byPath['before.ts'].functions[0].cyclomatic).toBe(3);
    expect(byPath['after.ts'].functions[0].cyclomatic).toBe(3);
    expect(byPath['before.ts'].functions[0].cognitive).toBe(3);
    expect(byPath['after.ts'].functions[0].cognitive).toBe(2);
    const outer = byPath['nested.py'].functions[0];
    expect(outer.lizard.max_nesting).toBe(0);
    expect(outer.children[0].lizard.max_nesting).toBe(1);
    expect(result.report.summary.function_count).toBe(4);
    expect(result.report.summary.lizard.function_count).toBe(4);
    expect(result.report.summary.lizard.attached_function_count).toBe(4);
});

test('reports all attention signals and clone locations with advisory thresholds, while high scores still succeed', () => {
    const directory = repository();
    const branches = Array.from(
        { length: 9 },
        (_, i) => `    if value == ${i}:\n        return ${i}\n`,
    ).join('');
    write(directory, 'flat.py', `def flat(value):\n${branches}    return -1\n`);
    write(
        directory,
        'deep.py',
        'def deep(a, b, c, d, e, f):\n    if a:\n        if b:\n            if c:\n                if d:\n                    if e:\n                        if f:\n                            return 1\n    return 0\n',
    );
    write(
        directory,
        'large.py',
        `def large(value):\n${Array.from({ length: 65 }, (_, i) => `    item${i} = value + ${i}\n`).join('')}    return value\n`,
    );
    const clone = `def calculate(value):\n${Array.from({ length: 80 }, (_, i) => `    value += ${i}\n`).join('')}    return value\n`;
    write(directory, 'clone-a.py', clone);
    write(directory, 'clone-b.py', clone);
    const result = measure(directory);
    expect(result.code).toBe(0);
    expect(result.json.status).toBe('complete');
    for (const [key, minimum] of Object.entries({
        cyclomatic: 10,
        cognitive: 16,
        nloc: 61,
        max_nesting: 4,
        parameters: 6,
    })) {
        expect(result.json.summary.attention[key].minimum).toBe(minimum);
        expect(result.json.summary.attention[key].count).toBeGreaterThan(0);
    }
    expect(
        result.report.files.find((f) => f.path === 'flat.py').functions[0]
            .cyclomatic,
    ).toBe(10);
    expect(
        result.report.files.find((f) => f.path === 'deep.py').functions[0]
            .cognitive,
    ).toBe(21);
    expect(
        result.report.files.find((f) => f.path === 'deep.py').functions[0]
            .lizard.max_nesting,
    ).toBe(6);
    expect(result.json.summary.lizard.duplication.minimum_tokens).toBe(70);
    expect(result.json.summary.attention.duplication.count).toBeGreaterThan(0);
    expect(
        result.report.duplicates.flatMap((g) => g.locations.map((p) => p.path)),
    ).toContain('clone-a.py');
    expect(
        result.report.duplicates.flatMap((g) => g.locations.map((p) => p.path)),
    ).toContain('clone-b.py');
    expect(result.json.summary.lizard.duplication.rate).toBeGreaterThan(0);
    expect(result.json.summary.lizard.duplication.rate).toBeLessThanOrEqual(1);
});

test('surfaces unsupported sources and partial parses rather than declaring zero complexity complete', () => {
    const directory = repository();
    write(directory, 'unknown.xyz', 'unsupported production language');
    write(directory, 'broken.ts', 'export function broken( {\n');
    const result = measure(directory, 'unknown.xyz', 'broken.ts');
    expect(result.code).toBe(0);
    expect(result.json.status).toBe('partial');
    expect(result.json.limitation_count).toBeGreaterThan(0);
    expect(result.report.limitations).toContainEqual({
        path: 'unknown.xyz',
        tool: 'cccc',
        reason: 'source not reported',
    });
    expect(result.report.summary.parse_error_count).toBeGreaterThan(0);
    expect(
        result.report.files.find((f) => f.path === 'broken.ts').parse_errors
            .length,
    ).toBeGreaterThan(0);
    expect(result.report).not.toHaveProperty('crap');
    expect(result.report).not.toHaveProperty('coverage');
});

test('keeps ambiguous matches separate instead of attaching a supporting score to the wrong function', () => {
    const directory = repository();
    const executable = fakeTool(
        directory,
        ` report = {"files": [{"path": sys.argv[-1], "cognitive": 0, "cyclomatic": 2, "functions": [{"name": "price", "line": 1, "kind": "function", "cognitive": 0, "cyclomatic": 1}, {"name": "price", "line": 1, "kind": "function", "cognitive": 0, "cyclomatic": 1}]}], "summary": {"file_count": 1, "function_count": 2, "parse_error_count": 0, "parse_error_file_count": 0, "cognitive": {"sum": 0, "max": 0, "median": 0, "p90": 0, "p95": 0}, "cyclomatic": {"sum": 2, "max": 1, "median": 1, "p90": 1, "p95": 1}}}\n print(json.dumps(report))`,
    );
    const result = measure(directory, '--cccc', executable, 'price.py');
    expect(result.json.status).toBe('partial');
    expect(result.report.files[0].functions[0]).not.toHaveProperty('lizard');
    expect(result.report.files[0].lizard_unmatched[0].name).toBe('price');
    expect(result.report.summary.lizard.attached_function_count).toBe(0);
    expect(result.report.summary.cyclomatic.max).toBe(1);
});

test('rejects missing tools, invalid reports, paths outside scope and obsolete arguments', () => {
    const directory = repository();
    expect(measure(directory, '--base', 'missing-revision').code).toBe(2);
    expect(measure(directory, 'missing.py').code).toBe(2);
    const outside = repository();
    expect(measure(directory, join(outside, 'price.py')).code).toBe(2);
    symlinkSync(join(outside, 'price.py'), join(directory, 'escaped.py'));
    expect(measure(directory, 'escaped.py').code).toBe(2);
    expect(
        measure(directory, '--cccc', '/missing/cccc', 'price.py').json.status,
    ).toBe('failed');
    const invalid = fakeTool(directory, ' print("[]")');
    const failed = measure(directory, '--cccc', invalid, 'price.py');
    expect(failed.code).toBe(2);
    expect(failed.json.error).toContain('unsupported report shape');
    for (const option of [
        '--all',
        '--whole-repository',
        '--fingerprint',
        '--coverage',
        '--duplicate-tokens',
    ]) {
        const result = run(
            ['python3', helper, '--repo', directory, option],
            directory,
        );
        expect(result.code).toBe(2);
        expect(result.error).toContain('unrecognized arguments');
    }
});

test('detects source changes during a run and emits no usable stale report', () => {
    const directory = repository();
    const executable = fakeTool(
        directory,
        ` result = subprocess.run([${JSON.stringify(bundled)}, *sys.argv[1:]], capture_output=True, text=True, check=True)\n with open(sys.argv[-1], 'a') as stream: stream.write('\\n# changed during measurement\\n')\n print(result.stdout)`,
    );
    const result = measure(directory, '--cccc', executable, 'price.py');
    expect(result.code).toBe(2);
    expect(result.json.status).toBe('failed');
    expect(result.json.error).toContain('changed during measurement');
    expect(result.json).not.toHaveProperty('report');
});

test('runs without a separately installed complexity executable and reuses verified bundled extraction', () => {
    const directory = repository();
    const bin = join(directory, 'bin');
    mkdirSync(bin);
    for (const command of ['python3', 'git'])
        symlinkSync(Bun.which(command), join(bin, command));
    const environment = { PATH: bin };
    const absent = run(
        ['python3', '-c', 'import shutil; print(shutil.which("cccc"))'],
        directory,
        environment,
    );
    expect(absent.text.trim()).toBe('None');
    const before = run(['git', 'status', '--porcelain'], directory).text;
    const measured = run(
        ['python3', helper, '--repo', directory, 'price.py'],
        directory,
        environment,
    );
    const result = JSON.parse(measured.text);
    if (result.report) scratch.push(result.report);
    expect(measured.code).toBe(0);
    expect(result.status).toBe('complete');
    expect(result.tools.cccc).toBe('cccc 1.7.0');
    expect(result.summary.function_count).toBe(2);
    expect(run(['git', 'status', '--porcelain'], directory).text).toBe(before);
    expect(
        run([bundled, '--version'], directory, environment).text.trim(),
    ).toBe('cccc 1.7.0');
});

test('selects all five published platform archives and verifies every packaged executable', () => {
    const result = run([
        'python3',
        '-c',
        `import sys, json, hashlib, tarfile, zipfile
sys.path.insert(0, ${JSON.stringify(bundleModule)})
import bundled_cccc as b
hosts=[('Darwin','arm64'),('Darwin','x86_64'),('Linux','aarch64'),('Linux','AMD64'),('Windows','AMD64')]
manifest=json.loads((b.BUNDLE/'manifest.json').read_text())['targets']
for host in hosts:
 spec=manifest[b.target(*host)]; archive=b.BUNDLE/spec['archive']
 assert hashlib.sha256(archive.read_bytes()).hexdigest()==spec['archive_sha256']
 if archive.suffix=='.zip':
  with zipfile.ZipFile(archive) as z: data=z.read(spec['member'])
 else:
  with tarfile.open(archive) as z: data=z.extractfile(spec['member']).read()
 assert hashlib.sha256(data).hexdigest()==spec['binary_sha256']
 assert data[:4] in [b'\\xcf\\xfa\\xed\\xfe', b'\\x7fELF'] or data[:2]==b'MZ'
 print(b.target(*host))
try: b.target('Windows','ARM64')
except ValueError as e: print(e)
else: raise AssertionError('unsupported target accepted')`,
    ]);
    expect(result.code).toBe(0);
    expect(result.text.trim().split('\n')).toHaveLength(6);
    expect(result.text).toContain('No bundled binary for Windows arm64');
});

test('rejects modified archives and cached executables before running them', () => {
    const directory = mkdtempSync(join(tmpdir(), 'complexity-bundle-test-'));
    scratch.push(directory);
    const result = run([
        'python3',
        '-c',
        `import sys, json, hashlib
from pathlib import Path
sys.path.insert(0, ${JSON.stringify(bundleModule)})
import bundled_cccc as b
root=Path(${JSON.stringify(directory)}); b.BUNDLE=root; b.tempfile.tempdir=str(root)
archive=root/'modified.tar.gz'; archive.write_bytes(b'changed')
spec={'archive':archive.name,'archive_sha256':hashlib.sha256(b'original').hexdigest(),'member':'cccc','binary_sha256':hashlib.sha256(b'original binary').hexdigest()}
(root/'manifest.json').write_text(json.dumps({'targets':{b.target():spec}}))
try: b.executable()
except ValueError as e: print(e)
else: raise AssertionError('modified archive accepted')
spec['archive_sha256']=hashlib.sha256(archive.read_bytes()).hexdigest()
(root/'manifest.json').write_text(json.dumps({'targets':{b.target():spec}}))
cache=root/('propulsion-cccc-'+str(b.os.getuid())); cache.mkdir()
(cache/spec['binary_sha256']).write_bytes(b'modified executable')
try: b.executable()
except ValueError as e: print(e)
else: raise AssertionError('modified executable accepted')`,
    ]);
    expect(result.code).toBe(0);
    expect(result.text).toContain('Bundled archive checksum mismatch');
    expect(result.text).toContain('Cached executable checksum mismatch');
});
