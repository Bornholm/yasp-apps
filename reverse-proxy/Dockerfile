FROM debian:jessie

MAINTAINER William Petit <wpetit@cadoles.com>

RUN DEBIAN_FRONTEND=noninteractive apt-get update &&\
  apt-get install --no-install-recommends --yes ca-certificates curl

RUN curl --silent --location https://deb.nodesource.com/setup_5.x | /usr/bin/env bash -

RUN DEBIAN_FRONTEND=noninteractive apt-get install --yes --no-install-recommends nodejs openssl nginx-full git-core

ADD app /opt/yasp-reverseproxy
ADD reverseproxy-conf.json /etc/yasp-reverseproxy/config

WORKDIR /opt/yasp-reverseproxy

# Remove default nginx entry
RUN rm /etc/nginx/sites-enabled/default

VOLUME /etc/nginx/sites-enabled

# Install app dependencies
RUN npm install

# Install process manager
RUN npm install -g pm2

# Add startup script
ADD run-app.sh /usr/local/bin/run-app
RUN chmod +x /usr/local/bin/run-app

EXPOSE 80

CMD run-app

LABEL io.yasp.app.enabled="1" \
  io.yasp.app.uid="io.yasp.apps.reverse-proxy" \
  io.yasp.app.name="Reverse Proxy" \
  io.yasp.app.description="A reverse proxy service for Yasp apps" \
  io.yasp.app.service.enabled="1" \
