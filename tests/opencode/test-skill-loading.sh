#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

skills_output="$(mktemp)"
pure_output="$(mktemp)"
config_home="$(mktemp -d)"
trap 'rm -f "$skills_output" "$pure_output"; rm -rf "$config_home"' EXIT

cd "$REPO_ROOT"
workflow_skill='"name": "propulsion-workflow"'
workflow_path="$REPO_ROOT/skills/propulsion-workflow/SKILL.md"

XDG_CONFIG_HOME="$config_home" opencode debug skill >"$skills_output" 2>&1
XDG_CONFIG_HOME="$config_home" opencode debug skill --pure >"$pure_output" 2>&1

if ! /usr/bin/grep -F -a -q "$workflow_skill" "$skills_output"; then
    echo "Expected propulsion-workflow skill in plugin-backed skill list"
    exit 1
fi

if ! /usr/bin/grep -F -a -q "$workflow_path" "$skills_output"; then
    echo "Expected propulsion-workflow skill path in plugin-backed skill list"
    exit 1
fi

if /usr/bin/grep -F -a -q "$workflow_skill" "$pure_output"; then
    echo "Pure skill listing should not expose propulsion-workflow"
    exit 1
fi
