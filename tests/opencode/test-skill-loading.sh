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
review_skill='"name": "review"'
review_path="$REPO_ROOT/skills/review/SKILL.md"

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

if ! /usr/bin/grep -F -a -q "$review_skill" "$skills_output"; then
    echo "Expected review skill in plugin-backed skill list"
    exit 1
fi

if ! /usr/bin/grep -F -a -q "$review_path" "$skills_output"; then
    echo "Expected review skill path in plugin-backed skill list"
    exit 1
fi

if /usr/bin/grep -F -a -q "$workflow_skill" "$pure_output"; then
    echo "Pure skill listing should not expose propulsion-workflow"
    exit 1
fi

if /usr/bin/grep -F -a -q "$review_skill" "$pure_output"; then
    echo "Pure skill listing should not expose review"
    exit 1
fi
