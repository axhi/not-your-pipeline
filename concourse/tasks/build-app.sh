#!/bin/bash

cd src/app && npm install && npm run-script build
mv manifest.yml ../../build-output
mv Staticfile ../../build-output
mv build ../../build-output