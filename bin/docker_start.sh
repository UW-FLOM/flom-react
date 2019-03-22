#!/bin/sh
echo Starting flom on port $1
TAG=$2

if [[ -z "$1" ]]; then
    echo "-----"
    echo "Failed to start. Please provide a port to run on."
    echo "-----"
    exit 1
fi

if [[ -z "$TAG" ]]; then
    echo "No tag specified. Using 'latest'"
    TAG="latest"
fi

docker run -p $1:3001 flom:$TAG