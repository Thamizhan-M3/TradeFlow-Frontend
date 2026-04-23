# #!/bin/sh

# echo "Injecting runtime env variables..."

# envsubst < /usr/share/nginx/html/env.template.js \
#   > /usr/share/nginx/html/env.js

# exec nginx -g "daemon off;"

# echo "Injecting runtime env variables..."

# envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# echo "window.__ENV__ = window.__ENV__ || {};" >> /usr/share/nginx/html/env.js

# exec nginx -g "daemon off;"

set -e

echo "Injecting runtime env variables..."

envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

exec nginx -g "daemon off;"