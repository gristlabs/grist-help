#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/en/docs/telemetry-limited.md and help/en/docs/telemetry-full.md"
  exit 2
fi

source "$(dirname "$0")/frontmatter.sh"

DIR=$PWD
cd $1
for level in limited full; do
  echo "Updating $level"
  out=$DIR/help/en/docs/telemetry-$level.md
  GRIST_TELEMETRY_LEVEL=$level yarn -s run cli settings telemetry > $out.tmp
  prepend_frontmatter $out $out.tmp
  mv $out.tmp $out
done
