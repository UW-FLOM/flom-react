#!/bin/sh
FILE_NAME=$1

TAG=${FILE_NAME%.json}

echo "Building docker container for survey" $TAG

if [[ -z "$TAG" ]]; then
    echo "No survey specified. Building generic survey."
    TAG="latest"
fi

echo "Tagging image with flom:$TAG"

docker build --build-arg survey_name=$1 --tag=flom:$TAG .