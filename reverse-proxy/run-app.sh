#!/usr/bin/env bash

YASP_ADMIN_SOCK=/var/run/yasp/admin.sock

# Create Yasp dedicated volume if necessary
mkdir -p $(dirname $YASP_ADMIN_SOCK)

# Remove Yasp admin sock if present
rm -f "$YASP_ADMIN_SOCK"

# TEMP: generate dev certificates
chmod +x ./scripts/generate-dev-certificate.sh
/opt/yasp-reverseproxy/scripts/gen-dev-certificate.sh

# Start yasp-reverseproxy
NODE_ENV=production /usr/bin/pm2 start /opt/yasp-reverseproxy/index.js -i 0 || exit 1

while [ ! -e "$YASP_ADMIN_SOCK" ]; do
  echo "Waiting for admin socket creation..."
  sleep 1
done

# Let Yasp talk to us
chown :${YASP_GID} "$YASP_ADMIN_SOCK"
chmod g+rw "$YASP_ADMIN_SOCK"

# Stream logs
/usr/bin/pm2 logs
