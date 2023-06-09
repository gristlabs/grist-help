#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/telemetry-limited.md and help/telemetry-full.md"
  exit 2
fi

DIR=$PWD
cd $1
for level in limited full; do
  echo "Updating $level"
  GRIST_TELEMETRY_LEVEL=$level yarn -s run cli settings telemetry > $DIR/help/telemetry-$level.md
done
