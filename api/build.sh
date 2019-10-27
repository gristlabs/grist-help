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
  $cli bundle api/grist.yml -t api/template.hbs --output=help/api-docs.html --options.theme.spacing.sectionVertical=2 \
    --options.hideDownloadButton --disableGoogleFont --options.pathInMiddlePanel \
    --options.theme.breakpoints.medium=50rem --options.theme.breakpoints.large=50rem \
    --options.theme.menu.width=0px
else
  $cli "$@"
fi
