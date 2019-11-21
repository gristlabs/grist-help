#!/bin/bash

echo 'support-preview.getgrist.com' > help/CNAME

# Don't let the preview site get crawled and indexed.
cat > help/robots.txt <<EOF
User-agent: *
Disallow: /
EOF

./env/bin/mkdocs gh-deploy -r preview
git checkout -- help/CNAME
echo "Published to https://$(git show preview/gh-pages:CNAME)"
