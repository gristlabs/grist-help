#!/bin/bash

echo 'support-preview.getgrist.com' > help/CNAME
./env/bin/mkdocs gh-deploy -r preview
git checkout -- help/CNAME

