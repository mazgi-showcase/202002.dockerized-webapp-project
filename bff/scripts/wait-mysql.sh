#!/bin/bash -eu

readonly host="$1"

until mysqladmin -h "$host" -u root ping 2> /dev/null; do
  >&2 echo 'MySQL is unavailable - waiting'
  sleep 4
done

>&2 echo 'MySQL is up!'
