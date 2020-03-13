#!/bin/bash

# Use wget to detect broken links in the site.
# There is a good summary of this at:
#   https://www.digitalocean.com/community/tutorials/how-to-find-broken-links-on-your-website-using-wget-on-debian-7

which wget || {
  echo "Please install wget"
  exit 1
}

wget --spider -r -nd -nv http://localhost:8000
