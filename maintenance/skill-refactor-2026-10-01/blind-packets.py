"""Build version-blinded grading packets from completed fixture runs."""

import argparse
import hashlib
import json
from pathlib import Path
import shutil
import tempfile
import uuid


def task_from_run(run):
    if 'task' in run:
        return run['task']
    prompt = run['prompt']
    # Historical records stored only the prompt. Strip only a known harness
    # prefix; natural activation has no prefix and must retain every paragraph.
    explicit = (f"Use ${run['skill']} from .agents/skills/{run['skill']}/SKILL.md. "
                "Resolve composed skills from .agents/skills in this workspace.")
    if prompt.startswith(explicit) or prompt.startswith(
            'Complete this request without loading reusable skills.\n\n'):
        return prompt.split('\n\n', 1)[1]
    return prompt


def source_fingerprint(record):
    digest = hashlib.sha256()
    paths = [record / 'run.json', record / 'response.md',
             *sorted((record / 'state').rglob('*'))]
    for path in paths:
        if path.is_file():
            name = str(path.relative_to(record)).encode()
            digest.update(len(name).to_bytes(8, 'big'))
            digest.update(name)
            digest.update(hashlib.sha256(path.read_bytes()).digest())
    return digest.hexdigest()


def complete_packet(packet, response_required):
    if not (packet / 'state').is_dir():
        return False
    if response_required and not (packet / 'response.md').is_file():
        return False
    try:
        evidence = json.loads((packet / 'evidence.json').read_text())
    except (OSError, ValueError):
        return False
    return isinstance(evidence, dict) and {'skill', 'case', 'task', 'rubric'} <= evidence.keys()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('records', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    mapping = {}
    preserved_legacy = 0
    for run_path in sorted(args.records.glob('*/run.json')):
        run = json.loads(run_path.read_text())
        identifier = hashlib.sha256(str(run_path).encode()).hexdigest()[:12]
        mapping[identifier] = str(run_path)
        packet = args.output / identifier
        response = run_path.parent / 'response.md'
        fingerprint = source_fingerprint(run_path.parent)
        if complete_packet(packet, response.is_file()):
            provenance = packet / 'packet-provenance.json'
            if provenance.exists():
                if json.loads(provenance.read_text())['source_sha256'] != fingerprint:
                    raise ValueError(f'Source changed for complete packet {identifier}; use a new output directory')
            else:
                # Previously graded packets are immutable. Their original source
                # fingerprint was not recorded, so freshness cannot be verified.
                preserved_legacy += 1
            continue
        task = task_from_run(run)
        commands = []
        for item in run['commands']:
            # Guidance content reveals the treatment. Keep artefact executions.
            if '.agents' in item.get('command', ''):
                continue
            commands.append(item)
        evidence = {
            'skill': run['skill'], 'case': run['case'], 'task': task,
            'rubric': run['rubric'], 'commands': commands,
            'collaboration': run.get('collaboration', []),
            'exit': run['exit'],
            'timed_out': run.get('timed_out'),
            'termination_escalated': run.get('termination_escalated'),
            'before': {k: v for k, v in run['before'].items() if not k.startswith('.agents/')},
            'after': {k: v for k, v in run['after'].items() if not k.startswith('.agents/')},
            'symlinks_before': run.get('symlinks_before'),
            'symlinks_after': run.get('symlinks_after'),
            'blinding_limit': 'Responses or execution choices may reveal guidance indirectly; source bodies and version labels are withheld.'
        }
        with tempfile.TemporaryDirectory(prefix=f'.{identifier}-', dir=args.output) as staging:
            staged = Path(staging) / 'packet'
            staged.mkdir()
            shutil.copytree(run_path.parent / 'state', staged / 'state')
            if response.is_file():
                shutil.copyfile(response, staged / 'response.md')
            (staged / 'evidence.json').write_text(json.dumps(evidence, indent=2) + '\n')
            (staged / 'packet-provenance.json').write_text(json.dumps({
                'source_sha256': fingerprint,
            }, indent=2) + '\n')
            if source_fingerprint(run_path.parent) != fingerprint:
                raise ValueError(f'Source changed while creating packet {identifier}')
            if packet.exists():
                # Preserve interrupted historical output for inspection.
                packet.rename(args.output / f'.{identifier}-incomplete-{uuid.uuid4().hex}')
            staged.rename(packet)
    (args.output.parent / (args.output.name + '-mapping.json')).write_text(json.dumps(mapping, indent=2) + '\n')
    print(json.dumps({'packets': len(mapping), 'output': str(args.output),
                      'preserved_legacy_packets_without_freshness_provenance': preserved_legacy}))


if __name__ == '__main__':
    main()
