#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for APP in $(echo $DIR/*/); do
  $DIR/build-app.sh "$(basename $APP)" || exit 1
done
