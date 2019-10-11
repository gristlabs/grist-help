#!/bin/bash

api/build.sh

node_modules/.bin/redoc-cli serve api/grist.yml -p 9090 -w --options.hideDownloadButton
