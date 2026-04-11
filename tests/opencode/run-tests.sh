#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

tests=(
    "test-skill-loading.sh"
)

for test_file in "${tests[@]}"; do
    echo "Running $test_file"
    (
        cd "$SCRIPT_DIR"
        bash "./$test_file"
    )
done

echo "OpenCode smoke tests passed"
