#!/bin/bash

set -euo pipefail
source ./env/bin/activate

mkdocs build
