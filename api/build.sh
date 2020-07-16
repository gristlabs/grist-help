#!/bin/bash

set -e

cli="node_modules/.bin/redoc-cli"

if ! yarn check --verify-tree; then
  npm ci
fi

options="--options.theme.spacing.sectionVertical=2 \
       --options.hideDownloadButton --disableGoogleFont --options.pathInMiddlePanel \
       --options.theme.breakpoints.medium=50rem --options.theme.breakpoints.large=50rem \
       --options.theme.menu.width=0px"

if [[ "$1" = "" ]]; then
  set -x
  $cli bundle api/grist.yml -t api/body.hbs --output=help/api.md $options
  $cli bundle api/grist.yml -t api/head.hbs --output=overrides/api-head-tmp.html $options
  # There is some javascript for loading yaml files that has a special character in it
  # that Jinja's "raw" mode actually modifies for some reason.  I don't think we need this
  # code?  So this line just brutally removes this character.
  tr -d -c '[:print:][:blank:]\r\n' < overrides/api-head-tmp.html > overrides/api-head.html
  rm -f overrides/api-head-tmp.html
else
  $cli "$@"
fi
