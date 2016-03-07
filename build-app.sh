#!/usr/bin/env bash

APP=$1
TAG=$2
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "$APP" ] || [ ! -d "$DIR/$APP" ]; then
  echo "Usage: $0 <app_name> [tag]"
  exit 1
fi

if [ -z "$TAG" ]; then
  TAG=$(date +%Y.%m.%d.%H%M)
fi
IMAGE=yasp/$APP

echo "Building '$APP' app as Docker image '$IMAGE'..."

docker build \
  --rm \
  --build-arg HTTP_PROXY=$HTTP_PROXY \
  --build-arg HTTPS_PROXY=$HTTPS_PROXY \
  --build-arg http_proxy=$http_proxy \
  --build-arg https_proxy=$https_proxy \
  -t "$IMAGE:$TAG" \
  -t "$IMAGE:latest" \
  --rm=true \
  "$DIR/$APP" || exit 1

echo [DONE]
