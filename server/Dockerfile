FROM node:lts-alpine as base

EXPOSE 3001

WORKDIR /app

FROM base AS builder

COPY package.json yarn.lock ./

RUN yarn install --production

RUN cp -R node_modules node_modules_production

RUN yarn install --network-timeout 1000000

COPY . ./

FROM base AS release

COPY --from=builder /app/node_modules_production ./node_modules

COPY . ./

USER node

CMD ["yarn", "start:prod"]
