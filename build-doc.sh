#!/bin/bash

set -euo pipefail

# If a virtualenv is present, use it.
# We don't use a virtualenv for netlify preview build.
if [ -e env ]; then
  source ./env/bin/activate
fi

mkdocs build
