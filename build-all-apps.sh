#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for APP in $(ls $DIR); do
  $DIR/build-app.sh "$APP"
done

echo [DONE]
