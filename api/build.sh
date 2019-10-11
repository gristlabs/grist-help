#!/bin/bash

set -e

if [ ! -e package.json ]; then
  npm init -y
fi

cli="node_modules/.bin/redoc-cli"

if [ ! -e $cli ]; then
  npm install redoc-cli --save
fi

if [[ "$1" = "" ]]; then
  set -x
  $cli bundle api/grist.yml --output=help/api-docs.html --options.hideDownloadButton
else
  $cli "$@"
fi
