#!/bin/sh

./start-lighttpd.sh &
./start-mysqld.sh &

ADMIN_SOCKET=/var/run/yasp/admin.sock
while [ ! -e "$ADMIN_SOCKET" ]; do
  sleep 1
done

chown -R $YASP_UID:lighttpd "$ADMIN_SOCKET"
chmod a+rw "$ADMIN_SOCKET"

wait
