#!/bin/sh
# clear up old build files
rm -rf ./build/*
# export .ts files to .js
esbuild assets/handler/*/*.ts --bundle --platform=node --target=node14 --external:aws-sdk --outdir=./build --entry-names=[dir]/index