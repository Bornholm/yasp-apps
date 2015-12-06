FROM debian:jessie

MAINTAINER William Petit <wpetit@cadoles.com>

RUN DEBIAN_FRONTEND=noninteractive apt-get update &&\
  apt-get install --no-install-recommends --yes ca-certificates curl

RUN curl --silent --location https://deb.nodesource.com/setup_5.x | /usr/bin/env bash -

RUN DEBIAN_FRONTEND=noninteractive apt-get install --yes --no-install-recommends nodejs

ADD app /opt/yasp-reverseproxy
ADD reverseproxy-conf.json /opt/yasp-reverseproxy/.yasp-reverseproxyrc

WORKDIR /opt/yasp-reverseproxy

# Install app dependencies
RUN npm install

# Install process manager
RUN npm install -g pm2

# Add startup script
ADD run-app.sh /usr/local/bin/run-app
RUN chmod +x /usr/local/bin/run-app

EXPOSE 80
EXPOSE 443

CMD run-app
