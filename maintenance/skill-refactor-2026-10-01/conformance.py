"""Account for the final catalogue against frozen originals and parsed metadata."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess


def parsed_metadata(root):
    """Parse the captured current bytes, rather than trusting a prior export."""
    captured = {
        'skill': (root / 'SKILL.md').read_text(),
        'adapter': (root / 'agents/openai.yaml').read_text(),
    }
    script = '''
const input = JSON.parse(await Bun.stdin.text());
const match = input.skill.match(/^---\\r?\\n([\\s\\S]*?)\\r?\\n---(?:\\r?\\n|$)/);
if (!match) throw new Error("Missing SKILL.md frontmatter");
console.log(JSON.stringify({frontmatter: Bun.YAML.parse(match[1]),
                           adapter: Bun.YAML.parse(input.adapter)}));
'''
    result = subprocess.run(['bun', '-e', script], input=json.dumps(captured),
                            text=True, capture_output=True, check=True, timeout=60)
    return json.loads(result.stdout)


def packaging_validation(validator, root):
    command = ['bun', str(validator), str(root.resolve())]
    result = subprocess.run(command, text=True, capture_output=True, timeout=60)
    report = json.loads(result.stdout)
    if result.returncode != 0 or report.get('valid') is not True or report.get('errors'):
        raise ValueError(f'Packaging validation failed for {root}: {result.stdout} {result.stderr}')
    if not isinstance(report.get('warnings'), list):
        raise ValueError(f'Packaging validator omitted warning telemetry for {root}')
    return {'command': command, 'exit': result.returncode, 'report': report,
            'stdout': result.stdout, 'stderr': result.stderr}


def files(root):
    return {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(root.rglob('*'))
            if p.is_file() and '__pycache__' not in p.parts and p.name != '.DS_Store'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('original', type=Path)
    parser.add_argument('metadata', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--validator', type=Path,
                        default=Path(__file__).resolve().parents[2] /
                        'skills/write-skill/scripts/validate-skill.js')
    args = parser.parse_args()
    root = Path('skills')
    data = json.loads(args.metadata.read_text())
    original = {p.name for p in args.original.iterdir() if p.is_dir()}
    final = {p.name for p in root.iterdir() if p.is_dir()}
    assert original == final
    core = {'name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'}
    authorities = [*root.rglob('*.md'), Path('README.md'), Path('AGENTS.md')]
    rows = []
    validation = []
    validator_sha256 = hashlib.sha256(args.validator.read_bytes()).hexdigest()
    for name in sorted(original):
        old, new = files(args.original / name), files(root / name)
        text = (root / name / 'SKILL.md').read_text()
        current = parsed_metadata(root / name)
        if current['frontmatter'] != data[name]['frontmatter'] or current['adapter'] != data[name]['adapter']:
            raise ValueError(f'Stale metadata for {name}; re-export metadata from current sources')
        if files(root / name) != new:
            raise ValueError(f'Sources changed while parsing metadata for {name}')
        frontmatter = current['frontmatter']
        adapter = current['adapter']
        assert frontmatter['name'] == name and set(frontmatter) <= core
        assert len(frontmatter['description']) <= 1024
        assert isinstance(adapter['policy']['allow_implicit_invocation'], bool)
        policy_before = (args.original / name / 'agents/openai.yaml').read_text()
        policy_after = (root / name / 'agents/openai.yaml').read_text()
        pattern = r'allow_implicit_invocation: (\w+)'
        assert re.search(pattern, policy_before)[1] == re.search(pattern, policy_after)[1]
        validation.append(packaging_validation(args.validator, root / name))
        callers = []
        for path in authorities:
            for line, content in enumerate(path.read_text().splitlines(), 1):
                if re.search(r'\$' + re.escape(name) + r'(?![a-z-])', content):
                    callers.append({'path': str(path), 'line': line})
        rows.append({
            'skill': name, 'root_sha256': new['SKILL.md'],
            'metadata_source_sha256': {'SKILL.md': new['SKILL.md'],
                                       'agents/openai.yaml': new['agents/openai.yaml']},
            'core_fields': list(frontmatter), 'shape': re.findall(r'^## (.+)$', text, re.M),
            'invocation': adapter['policy'], 'all_files': new,
            'original_file_dispositions': {
                path: ('retained unchanged' if new.get(path) == digest else
                       'revised' if path in new else 'retired')
                for path, digest in old.items()},
            'added_files': sorted(set(new) - set(old)), 'current_callers': callers})
    assert all('\u2014' not in path.read_text() for path in root.rglob('*.md'))
    assert all(name in final for path in authorities
               for name in re.findall(r'\$([a-z][a-z-]+)', path.read_text()))
    assert all('$' + name in Path('README.md').read_text() for name in final)
    for row in rows:
        if files(root / row['skill']) != row['all_files']:
            raise ValueError(f"Sources changed during validation for {row['skill']}")
    if hashlib.sha256(args.validator.read_bytes()).hexdigest() != validator_sha256:
        raise ValueError('Packaging validator changed during validation')
    result = {
        'supersedes_draft_hashes_and_native_field_retention_statements_in_batch_records': True,
        'original_count': len(original), 'final_count': len(final), 'names_preserved': True,
        'checks': {'portable_core_only': True, 'codex_implicit_policies_unchanged': True,
                   'all_dollar_callers_resolve': True, 'README_discovers_all_names': True,
                   'runtime_authored_em_dashes': 0,
                   'packaging_validator': {
                       'validator_sha256': validator_sha256,
                       'passed': len(validation),
                       'warnings': sum(len(item['report']['warnings']) for item in validation),
                       'results': validation}},
        'integration_change': {
            'legacy_field': 'Removed disable-model-invocation from 23 portable roots. Codex adapters preserve previous intent. write-skill had no such field.',
            'current_sources': ['https://learn.chatgpt.com/docs/build-skills',
                                'https://code.claude.com/docs/en/skills',
                                'https://agentskills.io/specification'],
            'limit': 'No Claude Code loading or enforcement trial; full cross-client compatibility not established.'},
        'skills': rows}
    args.output.write_text(json.dumps(result, indent=2) + '\n')
    print(f'{len(rows)} bundles: names, core fields, callers, policies and file dispositions accounted for.')


if __name__ == '__main__':
    main()
