# Database details
Flom uses **`Postgres`** as a backing database and connects to it using `sequelize`, an ORM that helps by making connections easier and makes bootstrapping the schema very easy. 

Database connection is parameterized and any Postgres server setup can be used. 
The app includes migrations to setup the database schema once connection is established. When run in docker, by default the app includes a Postgres server in the same container as the app server. 
This setup is suitable for trial runs, but before deploying to production, it's best to set up Postgres somewhere secure and configure the Flom container to connect to it (see [Server docs](server.md) for more on configuring the postgres location in the server).

# Setting up
As mentioned above and elsewhere, Flom can connect to any postgres database. 
There are some helpers included in the app to bootstrap the database to the right schema, but it must exist first. 
The baseline requirements (before running migrations) are:
* **Postgres should be running somewhere**. 
At dev time this can be on a local machine (or not), in test deployments, it runs by default in the docker container (but doesn't have to), and in production it should be run somewhere persistent. 
* **Postgres version 10** is a good idea. 
Other versions might work, but the app was built with 10.
* There must be a **`postgres` user**. 
This is the default user `sequelize` uses to write to the database. If you prefer another user, it can be changed in the sequelize config.
* There must be a **`flom`** database. 
This is where the migrations will be run, and where `sequelize` will connect. 
Again, this can be changed in sequelize config.

Postgres should create the `postgres` user by default. 
If you have another setup, use `createuser` on the command line to create the user (docs here: https://www.postgresql.org/docs/9.3/app-createuser.html).

Similarly, you can create the `flom` database with `createdb`
```
> createdb flom
```
Once that is set up, you are ready to run the migrations to bootstrap the database schema.

### Migrating
In the initial setup phase, the migrations included in the Flom app will bootstrap the database schema, creating the necessary tables and columns. 
Once you have a database set up as described above, you can run the migrations and you are ready to go. 
They should be run from the `/server` directory.
1. From the server directory, first install the dependencies (using yarn) to make sure you have the right cli:
```
> yarn install
```
2. Now use the `sequelize` command line to run the migrations. 
This will look at the sequelize config, connect to the specified database, and execute SQL statements to set up our tables:
```
> sequelize db:migrate
```
3. You can check if this worked by connecting to your Postgres instance and describing the tables: `\dt`. You should see the following tables
```
            List of relations
 Schema |     Name      | Type  |  Owner   
--------+---------------+-------+----------
 public | SequelizeMeta | table | postgres
 public | activities    | table | postgres
 public | questions     | table | postgres
 public | sessions      | table | postgres
```
If so, your connectivity is set up, the database is set up, and you should be ready to go.

# Schema
The database schema is designed to be flexible. 
It consists of 3 tables, `sessions`, `activities`, and `questions`. 
These tables are hierarchical and are related by foreign keys. 
Each session in `sessions` has a `sessionId` and number of activities associated with it based on that `sessionId`. 
Each activity has an `activityId` and a number of questions associated with it by that id. 
So essentially, each session contains a number of activities, which each contain a number of questions. 

### `sessions`
This table represents a list of every survey session. When a user starts a survey, a new session is created. As they move through the survey, the session's associated activities are added to the `activities` table. The schema for `sessions` is as follows:
```
 id | complete | createdAt | updatedAt 
----+----------+-----------+-----------
```
* **`id`**: is the session id. `activities` refer to this. It is auto-generated when a session is created.
* **`complete`**: indicates whether a session was completed. When a session is created this is `false` and when the final activity is completed, it is set to `true`.
* **`createdAt`**: is the time the session began.
* **`updatedAt`**: is the last update to the session. It will be the time the session was marked complete in most cases. 

### `activities`
This table represents all of the activities completed. Activities are added to this table when complete.
In any given session there are a number of activities, but all of them are stored in one table, related to the session they were a part of by id. 
Each activity has an id which is used in to associate `questions` with the activity they were part of. 
The schema for the `activities` table is as follows:
```
id | title | index | type | complete | createdAt | updatedAt | sessionId 
----+-------+-------+------+----------+-----------+-----------+-----------
```
* **`id`**: is the activity id. `questions` refer to this. It is auto-generated when an activity is submitted.
* **`title`**: title is the title of the activity.
It is generated from the title in the survey definition by stripping out spaces and characters. 
This is mostly to help identify the activity quickly at analysis time.
* **`index`**: is the index of the activity in the session.
It is for more info for researchers at analysis time.
* **`type`**: is the type of the activity.
* **`complete`**: marks the activity complete. Activities are currently created at completion, so this will always be true.
* **`sessionId`**: is the id of the session this activity happened during. 
* **`createdAt`**: is the time the activity was create.
* **`updatedAt`**: is the last update to the activity. 

### `questions`
This table represents answers to the survey questions. Question responses are added to this table when an activity is complete and are associated with that activity by `activityId`. 
The questions schema looks like:
```
 id | text | index | type | response | notes | createdAt | updatedAt | activityId 
----+------+-------+------+----------+-------+-----------+-----------+------------
```
* **`id`**: is the question id.
* **`text`**: is the text of the question itself. It is generated by stripping out spaces and characters from the question itself. 
This is mostly to help identify the activity quickly at analysis time.
* **`index`**: is the index of the question in the activity.
* **`type`**: is the type of the question.
* **`response`**: contains the users response to the question.
In map questions, this is often a string of geo data.
* **`notes`**: is a wildcard field that each activity might do something different with as the activity designers see fit. 
* **`activityId`**: is the id of the activity where the question was asked.

# Viewing the database
The database can be examined with any standard database tool you want. In addition, the flom server exposes some endpoints for viewing the data. To use this feature, see the `list` and `find` endpoint definitions in the [Server docs](server.md). You can use a tool called [Postman](https://www.getpostman.com/) to hit these endpoints and quickly view your database. 
