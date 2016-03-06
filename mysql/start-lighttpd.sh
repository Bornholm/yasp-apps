#!/bin/sh

mkdir -p /var/run/yasp
mkdir -p /run/lighttpd
chown -R lighttpd: /run/lighttpd
lighttpd -D -f /etc/lighttpd/lighttpd.conf
