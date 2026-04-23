#!/bin/sh

echo "Injecting runtime env variables...."

envsubst < /usr/share/nginx/html/env.template.js \
  > /usr/share/nginx/html/env.js

exec nginx -g "daemon off;"
