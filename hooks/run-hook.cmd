#!/bin/sh
set -eu

script_name="${1:?missing hook script name}"
script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

exec "$script_dir/$script_name"
