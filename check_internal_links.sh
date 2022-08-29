#!/bin/bash

set -e

echo "Running htmlproofer plugin to check for internal link problems."

if [[ "$1" = "install" ]]; then
  ./env/bin/pip install -e git+https://github.com/gristlabs/mkdocs-htmlproofer-plugin@style-on-headings#egg=mkdocs-htmlproofer-plugin
  echo "Installed."
  exit 0
fi

HTMLPROOFER_ENABLED=true \
  HTMLPROOFER_OVERRIDE_USE_DIRECTORY_URLS=false \
  ./env/bin/mkdocs build \
  | grep -v "\[api.md\]" \
  | grep -v "\[functions.md\]" \
  | grep -v carousel

echo "Remember this check is noisy, take with a grain of salt."
echo "If you have not already, consider running:"
echo "   ./check_internal_links.sh install"
echo "to install a slightly patched verson of plugin."
