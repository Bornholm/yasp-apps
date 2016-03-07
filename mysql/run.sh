#!/bin/sh

( ./start-lighttpd.sh ) &
( ./start-mysqld.sh )
