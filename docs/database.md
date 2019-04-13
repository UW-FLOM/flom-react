# Database setup
Flom uses **Postgres** as a backing database and connects to it using **sequelize**, an ORM that helps by making connections easier and makes bootstrapping the schema very easy. 

Database connection is parameterized and any Postgres server setup can be used. The app includes migrations to setup the database schema once connection is established. When run in docker, by default the app includes a Postgres server in the same container as the app server.