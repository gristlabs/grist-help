#!/bin/bash

echo 'support-preview.getgrist.com' > help/CNAME
./api/build.sh  # make sure API is up to date.
./env/bin/mkdocs gh-deploy -r preview
git checkout -- help/CNAME
echo "Published to https://$(git show preview/gh-pages:CNAME)"
