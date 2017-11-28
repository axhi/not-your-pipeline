#!/bin/bash

# Start the API server
./start-api-server.sh -D
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start API Server: $status"
  exit $status
fi

# Start second server
./start-web-server.sh -D
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start Web Server: $status"
  exit $status
fi

while /bin/true; do
  ps aux | grep start-api-server | grep -q -v grep
  PROCESS_1_STATUS=$?
  ps aux | grep start-web-server | grep -q -v grep
  PROCESS_2_STATUS=$?

  if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit -1
  fi
  sleep 60
done