# Flom in React
This is a version of FLOM written in React. 
This project can be run on a local machine in development mode, or deployed as a production build. 
This document describes how to get started using the app. 
For more info on how to build surveys, and contribute to the app this repo includes some other resources:
* [Architecture overview](architecture.md) an overview of the app architecture.
* [Helpful links](resources.md) to included libraries and places to learn about the primary technologies used in this app

# Getting started
This project can either be run in either development mode or production mode and can be run either on a local machine, or in a docker container. 
The typical setup is:
* At development time, when writing new features or working with the app, it is run on the **local machine** in **development mode**.
* In production, when the app is being used, it will usually be in a **docker container** in **production mode**.

# Quick start: running the Docker container
The fastest and easiest way to run the app and use it is to run a it in Docker on your local machine. 
The only dependency is Docker, and once you have it installed, the Flom app runs in a container that includes the database and app server.

>NOTE: the servers require linux, so the docker container can not be run on windows. 
>MacOS works great.

To run the container:
1. Install docker: https://www.docker.com/get-started
2. From the root of the flom directory, build the Flom docker container. 
This will take a few minutes as it fetches everything it needs from the internet:
```
docker build --tag=flom .
```
3. Run the docker container:
```
docker run -p 3000:3000 flom:latest
```
4. You should be able to use the app at `localhost:3000`

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
1. **From the root**: the easiest way to bootstrap the project is to run `yarn setup` from the root of the project. This will install the shared dependencies for the project, the server dependencies, and the client dependencies.
2. **Manually**: these dependencies can be installed manually by running `yarn install` from the project root, `server`, and `client` directories

Once this is done, `node_modules` folders will be created in the relevant places, containing the project's dependencies.

## Running the app
To run the app in dev mode we will run the dev server, the prod server, and Postgres. 
Each of these can be started individually, or they can all be started together. 
To start all of the processes together, from the root run:
```
yarn start:dev
```
This will start Postgres, and start the dev and production servers. By default you
can see the app by going to ***localhost:3000***

> *NOTE*: the servers will be started as child processes of the window where they were started. 
>In order to easily kill them later, it is best to keep the terminal open.

## Stopping the app
It's a good idea to shut down the servers and Postgres when you are done. To kill the servers hit `ctrl-c` in the terminal where you started them. To shut down Postgres, run:
``` 
yarn stop
```

## App commands
This is a full list of the commands available from the app root. Some have been mentioned already, others are for more fine-grained control.

Common commands:
* `yarn setup`: installs all node dependencies in the root, client, and server directories. The may take a few minutes.
* `yarn start:dev`: starts all of the app services in dev mode: dev server, api server, and Postgres. This is the typical way to run the app.
* `yarn stop`: stops database services. Servers must be shut down separately.

Advanced commands:
* `yarn client`: starts the dev client server in the current terminal. Once complete, the app can be reached at ***localhost:3000***. The app will be unresponsive without also starting the server.
* `yarn server`: starts the app server in the current terminal.
* `yarn psql:start`: starts the Postgres database.
* `yarn psql:stop`: stops the Postgres database.
* `yarn build`: creates a production client build.
