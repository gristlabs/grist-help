#!/bin/bash

set -euo pipefail

# If a virtualenv is present, use it.
# We don't use a virtualenv for netlify preview build.
if [ -e env ]; then
  source ./env/bin/activate
fi

python3 ./docs.py build-all
./api/build.sh
