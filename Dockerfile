FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY env.template.js /usr/share/nginx/html/env.template.js

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# RUN apk add --no-cache dos2unix \
#     && dos2unix /entrypoint.sh \
#     && chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]


# FROM node:20

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]