#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

child_pids() {
    ps -ax -o pid=,ppid= | awk -v parent="$1" '$2 == parent { print $1 }'
}

kill_descendants() {
    local child

    for child in $(child_pids "$1"); do
        kill_descendants "$child"
        kill "$child" 2>/dev/null || true
    done
}

skills_output="$(mktemp)"
pure_output="$(mktemp)"
trap 'rm -f "$skills_output" "$pure_output"' EXIT

cd "$REPO_ROOT"
(script -q "$skills_output" opencode debug skill | /bin/cat >/dev/null) &
skills_pid=$!

attempt=0
while [ "$attempt" -lt 20 ]; do
    if /usr/bin/grep -a -q '"name": "propulsion-workflow"' "$skills_output"; then
        break
    fi

    sleep 1
    attempt=$((attempt + 1))
done

kill "$skills_pid" 2>/dev/null || true
kill_descendants "$skills_pid"
wait "$skills_pid" 2>/dev/null || true

(script -q "$pure_output" opencode debug skill --pure | /bin/cat >/dev/null) &
pure_pid=$!
sleep 2
kill "$pure_pid" 2>/dev/null || true
kill_descendants "$pure_pid"
wait "$pure_pid" 2>/dev/null || true

workflow_skill='"name": "propulsion-workflow"'
workflow_path="$REPO_ROOT/skills/propulsion-workflow/SKILL.md"

if ! /usr/bin/grep -a -q "$workflow_skill" "$skills_output"; then
    echo "Expected propulsion-workflow skill in plugin-backed skill list"
    exit 1
fi

if ! /usr/bin/grep -a -q "$workflow_path" "$skills_output"; then
    echo "Expected propulsion-workflow skill path in plugin-backed skill list"
    exit 1
fi

if /usr/bin/grep -a -q "$workflow_skill" "$pure_output"; then
    echo "Pure skill listing should not expose propulsion-workflow"
    exit 1
fi
