#!/bin/bash

cd src/app && npm install && npm run-script $($RUN)
mv manifest* ../../build-output
mv Staticfile ../../build-output
mv build ../../build-output