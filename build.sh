#!/bin/bash

TARGETS="linux-x64 linux-x64-baseline linux-x64-modern linux-arm64 windows-x64 windows-x64-baseline windows-x64-modern darwin-arm64 darwin-x64"

for TARGET in $TARGETS; do
  bun build --compile --target=bun-$TARGET --minify --bytecode ./src/index.ts --outfile ./dist/$TARGET/kctl
done
