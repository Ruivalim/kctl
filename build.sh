#!/bin/bash

TARGETS="linux-x64 linux-arm64 windows-x64 darwin-arm64 darwin-x64"

for TARGET in $TARGETS; do
  bun build --compile --target=bun-$TARGET --minify --bytecode ./src/index.ts --outfile ./dist/kctl-$TARGET
done
