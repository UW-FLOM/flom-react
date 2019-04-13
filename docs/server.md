# Server

The document is intended for anyone wanting to contribute to the server code in the FLOM project.
It describes the basic setup and architecture of the server, how communication works, and helpful implementation details.

# Server architecture
The FLOM server is a fairly simple `Express` server application written in `nodejs`.
It acts as both the client application server, serving the application resources, and the API server, handling REST requests from the client application. 
The server handles all communication with the Postgres database using an ORM called `sequelize` and all database APIs are routed through it.

During development time, the server can be run directly on a development machine and the dev server provided by `create-react-app` will proxy API calls through it.
In production, the Express server serves application resourced from the client app's `build` directory.

# Sequelize
The FLOM server uses an ORM called [`sequelize`](http://docs.sequelizejs.com/) to connect to a Postgres database.
The server setup is configurable at build time to connect to any Postgres server running anywhere. 
A good production configuration would include a Postgres database set up and secured and credentials configured in the Flom server at build time.
During dev time, a basic postgres server can be run locally, and in test deployments the Flom docker container includes a Postgres database that the server is configured to connect to by default.

Sequelize itself is used to abstract database connection and communication. 
When the server starts, Sequelize reads it's configuration and connects to the specified Postgres database. 
Application code calls a stored Sequelize object with operations that create, delete, or modify rows in the database and Sequelize translates these requests to the corresponding sequel and handles the complexity of database connections.

The server contains definitions of the various models in the database (which map to related tables) as well as migrations that can be used to bootstrap the database to the necessary beginning state. 

See below for details on configuring Sequelize and it's role in the app. For more on the setup of the database, see [Database setup](database.md).

### Configuration
Sequelize picks up it's connection configuration from `/server/config/config.json`. 
This file contains information on where the database is and how to connect to it.
 This file contains two configurations, one for production and one for development. 
The connection configuration includes the following fields:
* **username**: the username of the database user. This will depend on your database configuration, but in most normal setups this should be left as `postgres`.
* **password**: the database password for your database user. The checked-in value for this field is `null`, a configuration that tells postgres to use trust authentication, only accepting requests from the local machine. This is a safe configuration when the database is running in the Docker container. **Do not check this file in containing a real password**.
* **database**: the name of the specific database in your postgres instance. This should generally be 'flom' unless you have configured your database differently.
* **host**: the location of the host machine to talk to. This is set to **localhost** by default as in the docker container we will be talking to a database on the local machine. 
Change this to talk to a database elsewhere.
* **dialect**: should always be 'postgres'

>NOTE that in the Docker container this file is built in and therefor unreadable. 
The app should **never** be deployed in such a way that this file is accessible to outside access.

The database configuration (tables and schemas) is contained in the `/server/models` directory. `/server/models/index.js` is where Sequelize is initialized. For more on specifics of the database setup see [Database setup](database.md).

# Server components
The server consists of a server component which runs the server process, a set of routes that define what the REST interface is capable of, controllers that handle each endpoint, database models that define how to store data in the database, and a `surveys` directory that contains JSON definitions of the surveys available to users.

## Server.js 
`server.js` is the entry point to the server.
Running this file starts the server.
It creates an express process, adds the routing and controller logic to it, then starts listening on the specified port (`3001` by default). 

Most of the server logic is in the routing and controllers.

## routes
`server/routes/index.js` contains the routing definitions for the server. 
These routes are the only endpoints available on the server. 
To add a new api, a route should be added here.
Each route is mapped to a controller which includes the code to handle any requests made to that route. 
For example, the following route definition indicates that any `GET` request made to `<host>:port/api/session` will be handled by the `sessionController`'s `list` function.
```
app.get('/api/session', sessionController.list);
```
Note that the http verb (`GET` in this case) is specific for each route binding. 

>**What to do with routes/index.js**: To add a new api endpoint, it must be defined here.

## controllers
The `/controllers` directory includes code to handle requests to the app's various api endpoints. 
As mentioned above, each route is bound to a controller. 
When that route is hit, the controller is called to handle the request.

#### `/controllers/index.js` 
exists only to centralize access to controllers.
It imports all of the controllers and makes them available for export.

Other controller files, `session.js` for example, define methods that are called when the bound route is hit.
Some controllers read from the database and return results, some create or edit objects in the database.
Controller files each generally correspond to a specific type of database entity.

#### `session.js`
Defines session methods.
It essentially represents operations on the session table.
Each run through a survey is a session and each will be stored as one row in the session table.
When a session is begun, a row is created with a unique id which the client uses when storing data in the related tables to associate activities with the session.
`session.js` has these methods:
* `create`: creates a session and returns a `sessionId`. 
This is the main method called to begin a survey session.
Once the application has this `sessionId`, it can move through a session and store a survey respondent's answers in the right session.
* `list`: lists all sessions in the database, showing all of their data
* `find`: shows all of the data for a particular session by `sessionId`.
* `edit`: updates a session. Used by the client app to mark the session as complete.

#### `activities.js`
Defines activity methods on the activity table.
Activities are each stored in a row in the activities table that includes a `sessionId` indicating what session they were part of. 
Unlike sessions, activities are created once they are complete (instead of before).
All activity answers are submitted at that time and the activity controller stores the associated answers in the questions table in addition to storing the activity row in the activity table.
Available methods in `activities.js`:
* `submit`: submits a completed activity's data, creating a row for that activity in the activities database as well as a row for each answer in the questions database. 
Answers are associated with the activity by `activityId`. 
* `find`: finds and returns an activity's data (including question data) by `activityId`.
* `list`: lists all activities

#### `questions.js`
Defines methods on the questions table.
The questions table stores responses to questions as well as metadata about them, their order in the activity for example. 
Questions are associated to the activity during which they were answered by `activityId`.
There is only one method for questions (usually called by the activities controller):
* `create`: creates a question associated with the provided `activityId`. 

#### `surveys.js` 
Unlike the other controllers, `surveys.js` does not communicate with the database. 
Instead, it reads the `/surveys` directory on the server and returns the survey definitions. 
It defines one method, `get`, which is called by the client app to get the JSON necessary to render surveys.

## Models and Migrations
Models and migrations define the database schema and how to interact with it.

**Models** tell Sequelize what the database schema is, and it uses them to create the appropriate SQL to send to the database at run time. 
They are essentially the run time gate keepers of the database.
Sequelize uses them to know the form of the database and how to read from and write to it.

**Migrations** set the database up with the right schema and tables, making it match what the models are expecting.

Any time a model is changed, the migration must be changed to correspond to the new schema. Any time a migration is changed, the model must also be changed to match.

For specifics on how Flom's models and migrations are defined, see [Database setup](database.md).

# Surveys
The `/surveys` directory contains survey definitions available on the system. In most production setups, there should be one survey here. 
The client application will run that one survey in that case.
If more than one survey is included, the client application will show a list.

For more on writing surveys see [Surveys](surveys.md).