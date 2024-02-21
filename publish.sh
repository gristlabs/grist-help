#!/bin/bash

if [[ "$#" -lt 1 ]]; then
  echo "Usage: $0 <preview|live>"
  exit 1
fi

echo "This script is no longer used because publishing is"
echo "automatic upon commits or merges into master."
# To use the script for manual overrides, remove the next line.
# Or better yet, simply run 'mkdocs gh-deploy'
exit 1

WHERE=$1

PLATFORM="unknown"
case "$OSTYPE" in
  linux*)         PLATFORM="linux" ;;
  darwin*)        PLATFORM="mac" ;;
  win* | msys*)   PLATFORM="win" ;;
esac

ENV_BIN=env/bin
if [[ "$PLATFORM" == "win" ]]; then
  ENV_BIN=env/Scripts
fi

if [[ `$ENV_BIN/python -c 'import mkdocs; print(mkdocs.__version__)'` != '1.2.3' ]]; then
  echo "Please upgrade mkdocs by running"
  echo "  $ENV_BIN/pip install -r requirements.txt"
  exit 1
fi

check_remote() {
  local remote=$1
  if [[ -n "$(git fetch --dry-run $remote 2>&1 )" ]]; then
    echo "Another preview is active. To publish, run: git fetch $remote"
    exit 1
  fi
}


if [[ "$WHERE" = "preview" ]]; then
  echo 'support-preview.getgrist.com' > help/en/docs/CNAME

  # Don't let the preview site get crawled and indexed.
  cat > help/en/docs/robots.txt <<EOF
User-agent: *
Disallow: /
EOF

  check_remote preview
  $ENV_BIN/mkdocs gh-deploy -r preview
  git checkout -- help/en/docs/CNAME help/en/docs/robots.txt
  echo "Published to https://$(git show preview/gh-pages:CNAME)"

elif [[ "$WHERE" = "live" ]]; then
  check_remote origin
  $ENV_BIN/mkdocs gh-deploy
  echo "Published to https://$(git show origin/gh-pages:CNAME)"

else
  echo "Usage: $0 <preview|live>"
  exit 1
fi
