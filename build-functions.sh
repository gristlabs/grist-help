#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/functions.md from doc-comments of Grist functions"
  exit 2
fi

root=$1
./mkpydocs.py "$root" 'grist,functions' help/functions.md
