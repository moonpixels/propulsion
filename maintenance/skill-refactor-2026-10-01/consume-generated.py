"""Exercise the skill bundles produced by matched authoring trials."""

import argparse
import concurrent.futures
import hashlib
import importlib.util
import json
from pathlib import Path
import random


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('author_records', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('work', type=Path)
    args = parser.parse_args()
    spec = importlib.util.spec_from_file_location('runner', Path(__file__).with_name('run-comparisons.py'))
    runner = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(runner)
    jobs, mapping = [], {}
    for record in sorted(args.author_records.glob('write-skill-*/run.json')):
        producer = json.loads(record.read_text())
        source = record.parent / 'state/tools'
        if not (source / 'reconcile-import-schema/SKILL.md').is_file():
            continue
        label = hashlib.sha256(str(record).encode()).hexdigest()[:10]
        mapping[label] = str(record)
        for variant, csv in [('rows', 'order,weight_grams,legacy_note\na1,600,old\na2,invalid,old\n'),
                             ('malformed', 'order,weight_grams\na1,"600\n')]:
            case = {
                'skill': 'reconcile-import-schema', 'id': f'{label}-{variant}',
                'task': 'Propose an import mapping and row/field diagnostics for orders.csv and schema.json. The legacy_note column is intentionally ignored if present. Preserve input files and apply no import. Use the schema exactly; do not infer target fields or silently repair malformed input.',
                'files': {'orders.csv': csv,
                          'schema.json': '{"version":"1","fields":{"order":{"type":"string","required":true},"weight_grams":{"type":"integer","required":true}}}\n'},
                'rubric': ['Every source column is mapped, intentionally ignored or unresolved; targets and types come from schema.',
                           'For well-formed rows, a2 weight invalid is reported and a1 is valid; no invented target or conversion.',
                           'For malformed CSV, return exact blocker or supported recovery without guessing values.',
                           'Inputs unchanged; no applied import, installation or external mutation.'],
                'mode': 'workspace-write'}
            config = argparse.Namespace(work=args.work, output=args.output,
                                        previous=source, candidate=source,
                                        timeout=600, fresh_agents=True,
                                        isolate_catalogue=True)
            jobs.append((case, config))
    args.output.mkdir(parents=True, exist_ok=True)
    args.work.mkdir(parents=True, exist_ok=True)
    (args.output / 'producer-mapping.json').write_text(json.dumps(mapping, indent=2) + '\n')
    random.Random(20261001).shuffle(jobs)
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        futures = [pool.submit(runner.run_case, case, 'candidate', config, 1)
                   for case, config in jobs]
        for future in concurrent.futures.as_completed(futures):
            future.result()


if __name__ == '__main__':
    main()
