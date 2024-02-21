#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/en/docs/functions.md from doc-comments of Grist functions"
  exit 2
fi

root=$1
"$root"/sandbox_venv3/bin/python ./mkpydocs.py "$root" 'grist,functions' help/en/docs/functions.md
