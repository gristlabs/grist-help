#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/en/docs/install/audit-log-events.md"
  exit 2
fi

DIR=$PWD
cd $1
echo "Updating help/en/docs/install/audit-log-events.md"
yarn -s run cli audit-logs events --type installation > $DIR/help/en/docs/install/audit-log-events.md
