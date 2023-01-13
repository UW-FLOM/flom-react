FROM node:lts AS Server

EXPOSE 3001

WORKDIR /app

COPY . ./

RUN yarn install

USER root

ENTRYPOINT yarn start:prod