#!/bin/sh

if [ ! -d "/run/mysqld" ]; then
  mkdir -p /run/mysqld
fi

if [ ! -z "$(ls /var/lib/mysql/)" ]; then
  echo "[i] MySQL directory already present, skipping creation"
else
  echo "[i] MySQL data directory not found, creating initial DBs"

  mysql_install_db --user=root > /dev/null

  if [ "$MYSQL_ROOT_PASSWORD" = "" ]; then
    MYSQL_ROOT_PASSWORD=111111
    echo "[i] MySQL root Password: $MYSQL_ROOT_PASSWORD"
  fi

  tfile=`mktemp`
  if [ ! -f "$tfile" ]; then
    return 1
  fi

  cat << EOF > $tfile
USE mysql;
FLUSH PRIVILEGES;
UPDATE user SET Password=PASSWORD('${MYSQL_ROOT_PASSWORD}') WHERE User='root';
DELETE FROM user WHERE User='';
DROP DATABASE IF EXISTS test;
DELETE FROM db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
EOF

  /usr/bin/mysqld --user=root --bootstrap --verbose=0 < $tfile
  rm -f $tfile
fi

exec /usr/bin/mysqld --user=root --console
