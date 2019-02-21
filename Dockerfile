FROM alpine:3.8

RUN apk add \
nodejs=8.14.0-r0 \
npm=8.14.0-r0 \
yarn=1.7.0-r0 \
postgresql=10.5-r0

WORKDIR /app
RUN adduser -D flom
RUN mkdir /usr/pgsql
RUN mkdir /usr/pgsql/data
RUN chown flom /usr/pgsql/data

RUN mkdir client
RUN mkdir server
COPY /client/build/ client/build
COPY /server/ server
COPY ./package.json /app

RUN yarn setup
RUN su flom -c "/usr/bin/initdb -D /usr/pgsql/data -U flom"
RUN su flom -c "yarn db:setup"

EXPOSE 3000

CMD ["yarn", "start:prod"]