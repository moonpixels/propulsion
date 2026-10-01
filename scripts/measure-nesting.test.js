import { expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const scriptDirectory = path.resolve('skills/measure-code-complexity/scripts');
const analysis = `
import json, pathlib, sys, tempfile
sys.path.insert(0, sys.argv[1])
import measure
sources = json.load(sys.stdin)
with tempfile.TemporaryDirectory() as directory:
    root = pathlib.Path(directory)
    for filename, source in sources.items():
        (root / filename).write_text(source)
    lizard, nesting, duplicates, version = measure.load_analyzer()
    try:
        records, _, _ = measure.analyze(root, list(sources), lizard, nesting, duplicates, 70)
        print(json.dumps({record['file'] + ':' + record['symbol']: record['metrics']['nestedStructures'] for record in records}))
    except measure.MeasurementError as error:
        print(json.dumps({'error': str(error)}))
`;

function depths(sources) {
    const result = spawnSync(
        'python3',
        ['-B', '-c', analysis, scriptDirectory],
        {
            input: JSON.stringify(sources),
            encoding: 'utf8',
        },
    );
    expect(result.status).toBe(0);
    return JSON.parse(result.stdout);
}

test('production scope excludes conventional JavaScript and TypeScript test filenames only', () => {
    const filenames = [
        'price.test.js',
        'price.spec.jsx',
        'price.spec.mjs',
        'price.test.cjs',
        'price.test.ts',
        'price.spec.tsx',
        'price.test.mts',
        'price.spec.cts',
        'contest.js',
        'price.js',
    ];
    const result = spawnSync(
        'python3',
        [
            '-B',
            '-c',
            'import json,sys; sys.path.insert(0,sys.argv[1]); import measure; print(json.dumps([bool(measure.excluded(name)) for name in json.load(sys.stdin)]))',
            scriptDirectory,
        ],
        { input: JSON.stringify(filenames), encoding: 'utf8' },
    );
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual([
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
    ]);
});

test('Python nesting measures paths rather than accumulating sibling conditions or functions', () => {
    const source = `def deep(xs):
    for x in xs:
        if x:
            try:
                with x:
                    return 1
            except ValueError:
                pass

def flat(x):
    if x: return 1
    if not x: return 0

def expression(x):
    return 1 if x else 0

def comprehensions(xs):
    return [y for x in xs for y in x]

def filtered(xs):
    return [y for x in xs if x for y in x if y]
`;
    expect(depths({ 'sample.py': source })).toEqual({
        'sample.py:deep': 4,
        'sample.py:flat': 1,
        'sample.py:expression': 1,
        'sample.py:comprehensions': 2,
        'sample.py:filtered': 4,
    });
});

test('elif alternatives stay flat while an if inside else remains nested', () => {
    expect(
        depths({
            'choice.py': `def choice(x):
    if x == 1: return 1
    elif x == 2: return 2
    else:
        if x: return 3
    return 0
`,
        }),
    ).toEqual({ 'choice.py:choice': 2 });
});

test('nested functions have separate depth and files do not contaminate other language metrics', () => {
    const records = depths({
        'scope.py': `def outer(x):
    def inner():
        if x:
            while x:
                return x
    return inner
`,
        'flat.js': 'function flat(x) { if (x) return 1; if (!x) return 0; }\n',
        'next.js': 'function next(x) { return x; }\n',
    });
    expect(records).toEqual({
        'scope.py:outer': 0,
        'scope.py:outer.inner': 2,
        'flat.js:flat': 1,
        'next.js:next': 0,
    });
});

test('decorated and async functions match their actual declarations', () => {
    expect(
        depths({
            'service.py': `class Service:
    @staticmethod
    async def read(x):
        async with x:
            if x:
                return x
`,
        }),
    ).toEqual({ 'service.py:read': 2 });
});

test('invalid Python reports unavailable measurement rather than a numeric result', () => {
    expect(
        depths({ 'broken.py': 'def broken(:\n    if x:\n        pass\n' })
            .error,
    ).toContain('Python nesting unavailable for broken.py');
});

test('lambda bodies and comprehension iterables retain their syntactic nesting', () => {
    expect(
        depths({
            'expressions.py': `def callback(x):
    return lambda: (1 if x else (2 if x else (3 if x else (4 if x else 5))))

def comprehension(a, b, c, d, e, f, g):
    return [x for x in (a if b else (c if d else (e if f else g)))]

def loop(a, b, c, d, e, f, g):
    for x in (a if b else (c if d else (e if f else g))):
        return x
`,
        }),
    ).toEqual({
        'expressions.py:callback': 4,
        'expressions.py:comprehension': 4,
        'expressions.py:loop': 4,
    });
});

test('nested declaration annotations belong to the enclosing syntactic scope', () => {
    expect(
        depths({
            'annotations.py': `def outer(x):
    def inner() -> (1 if x else (2 if x else (3 if x else (4 if x else 5)))):
        return x
    return inner
`,
        }),
    ).toEqual({ 'annotations.py:outer': 4, 'annotations.py:outer.inner': 0 });
});

test('a valid declaration omitted by the analyzer makes measurement unavailable', () => {
    expect(
        depths({
            'omitted.py':
                'def f(x): return 1 if x else (2 if x else (3 if x else (4 if x else 5)))',
        }).error,
    ).toContain('analyzer omitted functions at lines 1');
});
