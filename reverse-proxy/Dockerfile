FROM debian:jessie

MAINTAINER William Petit <wpetit@cadoles.com>

RUN apt-get update &&\
  apt-get install --no-install-recommends --yes ca-certificates curl

RUN curl --silent --location https://deb.nodesource.com/setup_4.x | /usr/bin/env bash -

RUN apt-get install --yes --no-install-recommends nodejs
