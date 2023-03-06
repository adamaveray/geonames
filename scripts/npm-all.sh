#!/usr/bin/env sh

set -e
cd "$(dirname "$0")"

for PACKAGE in "$(pwd)/../packages"/*; do
  echo "$(basename "$PACKAGE"):" npm "$@"
  cd "$PACKAGE"
  npm "$@"
done
