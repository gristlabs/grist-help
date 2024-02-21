#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/en/docs/telemetry-limited.md and help/en/docs/telemetry-full.md"
  exit 2
fi

DIR=$PWD
cd $1
for level in limited full; do
  echo "Updating $level"
  GRIST_TELEMETRY_LEVEL=$level yarn -s run cli settings telemetry > $DIR/help/en/docs/telemetry-$level.md
done
