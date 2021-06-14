#!/bin/bash

echo 'support-preview.getgrist.com' > help/CNAME

# Don't let the preview site get crawled and indexed.
cat > help/robots.txt <<EOF
User-agent: *
Disallow: /
EOF

ENV_BIN=env/bin
if [[ "$PLATFORM" == "win" ]]; then
  ENV_BIN=env/Scripts
fi

$ENV_BIN/mkdocs gh-deploy -r preview
git checkout -- help/CNAME help/robots.txt
echo "Published to https://$(git show preview/gh-pages:CNAME)"
