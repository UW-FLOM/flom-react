FROM node:12-alpine as base

EXPOSE 3001

WORKDIR /app

FROM base AS builder

COPY package.json yarn.lock ./

RUN yarn config set ignore-engines true

RUN yarn install --production

RUN cp -R node_modules node_modules_production

RUN yarn install

COPY . ./

FROM base AS release

COPY --from=builder /app/node_modules_production ./node_modules

COPY . ./

USER node

CMD ["yarn", "start:prod"]