#!/bin/bash

set -e

if [[ "$1" = "" ]]; then
  echo "Usage: $0 grist-checkout-dir"
  echo "  Rebuilds help/plugin-api"
  exit 2
fi

DIR=$PWD
cd $1
npx typedoc --out $DIR/tmp-code --plugin "typedoc-plugin-markdown" \
    --hideBreadcrumbs \
    --logLevel Verbose
rm -rf $DIR/help/code/interfaces $DIR/help/code/modules
mv $DIR/tmp-code/interfaces $DIR/help/code/interfaces
mv $DIR/tmp-code/modules $DIR/help/code/modules
rm -rf $DIR/tmp-code
