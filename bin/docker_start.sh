#!/bin/sh
echo Starting flom on port $1

if [[ -z "$1" ]]; then
    echo "-----"
    echo "Failed to start. Please provide a port to run on."
    echo "-----"
    exit 1
fi

docker run -p $1:3001 flom:latest