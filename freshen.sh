#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Regenerates all docs derived from a Grist checkout (functions, plugin-api,"
  echo "  telemetry, audit-log events, keyboard shortcuts), then builds the site"
  echo "  (including the API reference) for an accurate preview."
  exit 2
fi

for cmd in \
  "./build-functions.sh $1" \
  "./build-plugin-api.sh $1" \
  "./build-telemetry.sh $1" \
  "./build-audit-logs.sh $1" \
  "node build-shortcuts.js -i $1" \
  "./build-doc.sh" \
  ; do
  echo "=== $cmd"
  $cmd
done
