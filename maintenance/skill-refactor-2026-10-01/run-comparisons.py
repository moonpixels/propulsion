"""Author-maintenance runner. Executes only explicitly selected isolated cases."""

import argparse
import concurrent.futures
import hashlib
import json
import os
from pathlib import Path
import random
import shutil
import signal
import subprocess
import time
import uuid


def digest_tree(root):
    return {
        str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
        for p in sorted(root.rglob('*'))
        if p.is_file() and '.git' not in p.parts
    }


def symlinks(root):
    return {str(path.relative_to(root)): str(path.readlink())
            for path in sorted(root.rglob('*')) if path.is_symlink()}


def communicate_trial(process, prompt, timeout, termination_grace=10):
    """Reap a timed-out trial and terminate remaining process-group members."""
    try:
        process.communicate(prompt, timeout=timeout)
        return False, False
    except subprocess.TimeoutExpired:
        try:
            os.killpg(process.pid, signal.SIGTERM)
        except ProcessLookupError:
            pass
        try:
            process.wait(timeout=termination_grace)
        except subprocess.TimeoutExpired:
            pass
        # A parent can exit while its children ignore SIGTERM. Kill the group
        # even when wait() has already reaped that parent.
        escalated = False
        try:
            os.killpg(process.pid, signal.SIGKILL)
            escalated = True
        except ProcessLookupError:
            pass
        process.wait()
        return True, escalated


def run_case(case, arm, args, repetition):
    if arm not in ('none', 'previous', 'candidate'):
        raise ValueError(f'Unknown comparison arm: {arm}')
    label = uuid.uuid4().hex[:12]
    workspace = args.work / label
    workspace.mkdir(parents=True)
    record_dir = args.output / f"{case['skill']}-{case['id']}-{arm}-{repetition}"
    record_dir.mkdir(parents=True, exist_ok=False)
    for name, content in case.get('files', {}).items():
        target = workspace / name
        if target.resolve().is_relative_to(workspace.resolve()) is False:
            raise ValueError('Fixture path escapes workspace')
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content)
    env = os.environ.copy()
    env['PATH'] = os.pathsep.join([str(workspace / 'stub-bin'), str(workspace / 'bin'), env['PATH']])
    env['GIT_CONFIG_NOSYSTEM'] = '1'
    env['GIT_CONFIG_GLOBAL'] = os.devnull
    env['GIT_AUTHOR_NAME'] = env['GIT_COMMITTER_NAME'] = 'Fixture User'
    env['GIT_AUTHOR_EMAIL'] = env['GIT_COMMITTER_EMAIL'] = 'fixture@example.invalid'
    env['GH_CONFIG_DIR'] = str(workspace / '.host')
    for token in ('GH_TOKEN', 'GITHUB_TOKEN'):
        env.pop(token, None)
    setup = []
    for command in case.get('setup_commands', []):
        result = subprocess.run(command, cwd=workspace, env=env, shell=True,
                                text=True, capture_output=True, timeout=60)
        setup.append({'command': command, 'exit': result.returncode,
                      'stdout': result.stdout, 'stderr': result.stderr})
        if result.returncode:
            raise RuntimeError(f'Fixture setup failed: {setup[-1]}')
    if case.get('ignore_evaluation_catalogue'):
        excluded = workspace / '.git/info/exclude'
        with excluded.open('a') as stream:
            stream.write('\n.agents/\n')
    if arm != 'none':
        source = args.previous if arm == 'previous' else args.candidate
        shutil.copytree(source, workspace / '.agents' / 'skills')
        loading = (f"Use ${case['skill']} from .agents/skills/{case['skill']}/SKILL.md. "
                   "Resolve composed skills from .agents/skills in this workspace.\n\n")
        if case.get('require_full_root_read'):
            loading = loading.rstrip() + ' Read the entire named SKILL.md before acting.\n\n'
        if case.get('activation') == 'natural':
            loading = ''
    else:
        loading = 'Complete this request without loading reusable skills.\n\n'
    prompt = loading + case['task']
    before = digest_tree(workspace)
    links_before = symlinks(workspace)
    command = ['codex', 'exec', '--ephemeral', '--ignore-user-config',
               '--skip-git-repo-check', '--enable', 'skip_host_skill_discovery',
               '--enable', 'multi_agent', '--json',
               '-c', 'model="gpt-6-sol"', '-c', 'model_reasoning_effort="high"',
               '-C', str(workspace), '-o', str(record_dir / 'response.md'), '-']
    if args.fresh_agents:
        command[2:2] = ['--enable', 'multi_agent_v2', '-c', 'agents.enabled=true']
    if args.isolate_catalogue:
        names = {p.name for p in args.previous.iterdir() if p.is_dir()}
        names.update(p.name for p in Path('/Users/adam/Developer/propulsion/skills').iterdir()
                     if p.is_dir())
        paths = [Path(prefix) / name
                 for prefix in ('/Users/adam/.agents/skills', '/Users/adam/.codex/skills',
                                '/Users/adam/Developer/propulsion/skills')
                 for name in sorted(names)]
        overrides = ','.join(
            '{path=' + json.dumps(str(target)) + ',enabled=false}'
            for folder in paths for target in (folder, folder / 'SKILL.md'))
        command[2:2] = ['-c', 'skills.config=[' + overrides + ']']
        command[1:1] = ['--no-daemon']
    command[2:2] = (['--sandbox', 'read-only'] if case.get('mode') == 'read-only'
                    else ['--approve-for-me'])
    started = time.time()
    with (record_dir / 'events.jsonl').open('w') as stdout, (record_dir / 'stderr.log').open('w') as stderr:
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=stdout,
                                   stderr=stderr, cwd=workspace, env=env, text=True,
                                   start_new_session=True)
        timed_out, termination_escalated = communicate_trial(process, prompt, args.timeout)
    elapsed = time.time() - started
    after = digest_tree(workspace)
    shutil.copytree(workspace, record_dir / 'state', ignore=shutil.ignore_patterns('.agents', 'node_modules'))
    events = []
    for line in (record_dir / 'events.jsonl').read_text().splitlines():
        try:
            events.append(json.loads(line))
        except json.JSONDecodeError:
            pass
    usage = [e.get('usage') for e in events if e.get('type') == 'turn.completed']
    commands = [e['item'] for e in events if e.get('item', {}).get('type') == 'command_execution']
    collaboration = [e['item'] for e in events
                     if e.get('item', {}).get('type') == 'collab_tool_call']
    metadata = {'skill': case['skill'], 'case': case['id'], 'arm': arm,
                'repetition': repetition, 'workspace_label': label,
                'elapsed_seconds': elapsed, 'exit': process.returncode,
                'timed_out': timed_out, 'termination_escalated': termination_escalated,
                'model_requested': 'gpt-6-sol', 'effort_requested': 'high',
                'resolved_model_telemetry': 'not returned by CLI JSON stream',
                'usage': usage, 'setup': setup, 'commands': commands,
                'collaboration': collaboration,
                'execution_command': command,
                'fresh_agents_enabled': args.fresh_agents,
                'global_repository_catalogue_disabled': args.isolate_catalogue,
                'catalogue_ignored_by_fixture_git': bool(case.get('ignore_evaluation_catalogue')),
                'before': before, 'after': after, 'prompt': prompt, 'task': case['task'],
                'symlinks_before': links_before, 'symlinks_after': symlinks(workspace),
                'rubric': case['rubric'], 'cli': 'codex-cli 0.157.0'}
    (record_dir / 'run.json').write_text(json.dumps(metadata, indent=2) + '\n')
    print(json.dumps({'skill': case['skill'], 'case': case['id'], 'arm': arm,
                      'exit': process.returncode, 'seconds': round(elapsed),
                      'record': str(record_dir)}), flush=True)
    return metadata


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('cases', type=Path, nargs='+')
    parser.add_argument('--previous', type=Path, required=True)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--work', type=Path, required=True)
    parser.add_argument('--skills', nargs='*')
    parser.add_argument('--arms', nargs='+', choices=['none', 'previous', 'candidate'],
                        default=['none', 'previous', 'candidate'])
    parser.add_argument('--repetitions', type=int, default=1)
    parser.add_argument('--workers', type=int, default=3)
    parser.add_argument('--timeout', type=int, default=600)
    parser.add_argument('--fresh-agents', action='store_true',
                        help='Enable verified V2 fresh-agent execution for every arm')
    parser.add_argument('--isolate-catalogue', action='store_true',
                        help='Disable linked global repository skills and use a local session controller')
    args = parser.parse_args()
    cases = []
    for file in args.cases:
        content = json.loads(file.read_text())
        cases.extend(content if isinstance(content, list) else content['cases'])
    jobs = [(case, arm, repeat) for case in cases
            if not args.skills or case['skill'] in args.skills
            for repeat in range(1, args.repetitions + 1) for arm in args.arms]
    random.Random(20261001).shuffle(jobs)
    args.output.mkdir(parents=True, exist_ok=True)
    args.work.mkdir(parents=True, exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = [pool.submit(run_case, case, arm, args, repeat) for case, arm, repeat in jobs]
        for future in concurrent.futures.as_completed(futures):
            future.result()


if __name__ == '__main__':
    main()
