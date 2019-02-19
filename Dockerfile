FROM alpine:3.8

RUN apk add \
nodejs=8.14.0-r0 \
npm=8.14.0-r0 \
yarn=1.7.0-r0

WORKDIR /app

RUN mkdir client
RUN mkdir server
RUN ls
COPY /client/build/ client/build
COPY /server/ server
COPY ./package.json /app

RUN yarn setup

CMD ["yarn", "start:prod"]
