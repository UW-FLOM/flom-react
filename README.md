# Flom in React
This is a version of FLOM written in React. 
This project can be run on a local machine in development mode, or deployed as a production build. 
This document describes how to get started using the app. 
For more info on how to build surveys, and contribute to the app this repo includes some other resources:
* [Architecture overview](docs/index.md) an overview of the app architecture.
* [Helpful links](docs/resources.md) to included libraries and places to learn about the primary technologies used in this app

# Getting started
This project can either be run in development mode or production mode and can be run either on a local machine, or in a docker container. 
The typical setup is:
* At development time, when writing new features or working with the app, it is run on the **local machine** in **development mode**.
* In production, when the app is being used, it will usually be in a **docker container** in **production mode**.

# Quick start: building this repo and running the Docker container
The fastest and easiest way to run the app and use it is to build this repo and run a it in Docker on your local machine. 
The only dependencies are Docker and yarn, and once you have them installed, the Flom app runs in a container that includes the database and app server.

>NOTE: the servers require linux, so the docker container can not be run on windows.
>MacOS works great.

To build and run the container:
1. Install docker: https://www.docker.com/get-started
2. Install yarn: https://yarnpkg.com/lang/en/docs/install/
3. From the root of the flom directory, run the yarn command to build the app and container.
This will take a few minutes as it fetches everything it needs from the internet:
```
yarn docker:build:all
```
4. Run the docker container, specifying the port:
```
yarn docker:start 3000
```
5. You should be able to see the demo the app with a number of surveys at `localhost:3000`

For more on building different versions of the container, see [Docker setup](docs/docker.md).

# Local machine setup

Most of the time, when run locally, this app will be in development mode.
In dev mode, the project requires 3 processes to run:
* The **productions server**, which exposes the required REST endpoints
* The **dev server**, which serves the client app, provides debuggability, and proxies all API calls to the production server
* **Postgres** a database for storage

## Pre-requisites
There are a few programs that must be installed to run these processes:
* [node](https://nodejs.org/en/): the host runtime for the server processes
* [postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads): the database. We suggest version 10
* [yarn](https://yarnpkg.com/en/): a task runner and dependency manager

## Set up
Once the pre-requisites are installed, we need to install the development dependencies for the app. This can be done from the root of the project, or manually for each part:
1. **From the root**: the easiest way to bootstrap the project is to run `yarn setup` from the root of the project. 
This will install the shared dependencies for the project, the server dependencies, and the client dependencies.
2. **Manually**: these dependencies can be installed manually by running `yarn install` from the project root, `server`, and `client` directories

Once this is done, `node_modules` folders will be created in the relevant places, containing the project's dependencies.

## Running the app
To run the app in dev mode we will run the dev server, the prod server, and Postgres. 
Each of these can be started individually, or they can all be started together. 
To start all of the processes together, from the root run:
```
yarn dev:start
```
This will start Postgres, and start the dev and production servers. By default you can see the app by going to ***localhost:3000***

> *NOTE*: the servers will be started as child processes of the window where they were started. 
>In order to easily kill them later, it is best to keep the terminal open.

## Stopping the app
It's a good idea to shut down the servers and Postgres when you are done. To kill the servers hit `ctrl-c` in the terminal where you started them. To shut down Postgres, run:
``` 
psql:stop
```

## App commands
This is a full list of the commands available from the app root. Some have been mentioned already, others are for more fine-grained control. 
To inspect them see `package.json`.

Common commands:
* `yarn setup`: installs all node dependencies in the root, client, and server directories. This may take a few minutes.
* `yarn dev:start`: starts all of the app services in dev mode: dev server, api server, and Postgres. This is the typical way to run the app at development time.
* `yarn docker:build:survey <survey name>`: makes a Docker container based on the specified `<survey name>`.
If no survey name is provided a generic container is produced that will list all surveys in the surveys directory.
**For users writing surveys, but not changing the application, this is the command to run**.
* `yarn docker:build:all <survey name>`: also creates a docker container based on the `<survey name>` specified, but also builds the client application for production.
This will take a few minutes to run.
**This command is for developers who have changed the application to build a container**.
* `yarn docker:start <port> <survey name>`: starts the container with the specified `<survey name>` on the specified `<port>`. 
Port must be specified.
**This command is for deploying the app both the test it and for production**.
For example, to start `demo1` on port `3005`:
```
 yarn docker:start 3005 demo1
```
* `yarn docker:kill:all`: stops all docker containers on the machine. 
 **NOTE**: *Be careful; this will stop all containers on the machine, be sure you own them and want them stopped.*

Advanced commands:
* `dev:start:client`: starts the dev client server in the current terminal. Once complete, the app can be reached at ***localhost:3000***. The app will be unresponsive without also starting the server.
* `dev:start:server`: starts the app server in the current terminal.
* `yarn db:setup`: sets up the database by installing ORM dependencies, crating the database. and running migrations.
* `yarn db:start`: starts the Postgres database.
* `yarn db:stop`: stops the Postgres database.
* `yarn prod:build`: creates a production client build.
* `yarn prod:start`: starts the production server on the local machine.
The client must be built first.
