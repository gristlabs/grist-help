#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/plugin-api"
  echo "Before running, make sure packages are up to date, and Grist has been built."
  exit 2
fi

DIR=$PWD
cd $1
rm -rf $DIR/tmp-code
$DIR/node_modules/.bin/typedoc \
  --out $DIR/tmp-code \
  --plugin "typedoc-plugin-markdown" \
  --hideBreadcrumbs \
  --logLevel Verbose
rm -rf $DIR/help/code/interfaces $DIR/help/code/modules $DIR/help/code/enums
mv $DIR/tmp-code/interfaces $DIR/help/code/interfaces
mv $DIR/tmp-code/modules $DIR/help/code/modules
mv $DIR/tmp-code/enums $DIR/help/code/enums
rm -rf $DIR/tmp-code
echo "Documentation moved to $DIR/help/code"
