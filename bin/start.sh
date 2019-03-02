#!/bin/sh
/usr/lib/postgresql/10/bin/pg_ctl start
echo '--------------->'
pwd
echo '--------------+'
ls
echo '--------------='
ls ..
echo '--------------*'
yarn start:prod
