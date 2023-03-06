#!/usr/bin/env sh

set -e
cd "$(dirname "$0")"

for SOURCE in \
  cities500 \
  cities1000 \
  cities5000 \
  cities15000 \
; do
  OUT_ZIP="../sources/$SOURCE.zip"
  OUT_DIR="../sources/$SOURCE"

  if [ ! -e "$OUT_ZIP" ]; then
    curl -o "$OUT_ZIP" "http://download.geonames.org/export/dump/$SOURCE.zip"
  fi
  if [ -e "$OUT_DIR" ]; then
    rm -r "$OUT_DIR"
  fi
  unzip "$OUT_ZIP" -d "$OUT_DIR"
  rm "$OUT_ZIP"
done
