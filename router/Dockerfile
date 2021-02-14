FROM node:12-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package.json yarn.lock ./

RUN yarn config set ignore-engines true

RUN yarn install --production

RUN cp -R node_modules node_modules_production

RUN yarn config set ignore-engines true

RUN yarn install --network-timeout 1000000

COPY . /app

RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ../client/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
