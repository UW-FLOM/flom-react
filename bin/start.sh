#!/bin/sh
/usr/lib/postgresql/10/bin/pg_ctl start
yarn db:setup
yarn start:prod
