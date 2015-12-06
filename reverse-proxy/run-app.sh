#!/usr/bin/env bash

# Export PM2 env
export PM2_HOME=.
# Avoid Keymetrics banner
echo 1 > "touch"

mkdir -p /var/run/yasp
rm -f /var/run/yasp/admin.sock

# Start yasp-reverseproxy
NODE_ENV=production /usr/bin/pm2 start /opt/yasp-reverseproxy/index.js -i 0 || exit 1

# Stream logs
/usr/bin/pm2 logs
