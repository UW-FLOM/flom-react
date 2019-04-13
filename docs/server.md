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
