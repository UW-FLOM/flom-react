#!/bin/sh

# Start postgres
/usr/lib/postgresql/10/bin/pg_ctl start

# Set up schemas
yarn db:setup

# Start the servers
yarn prod:start
