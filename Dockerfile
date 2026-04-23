# ---------- Stage 1: Build ----------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Stage 2: Serve ----------
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy template
COPY env.template.js /usr/share/nginx/html/env.template.js

EXPOSE 80

# Runtime env injection + start nginx
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]