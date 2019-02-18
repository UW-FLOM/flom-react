# Flom in React
This is a version of FLOM written in React. 
This project can be run on a local machine in development mode, or deployed as a production build.

# Getting started
This project can either be run in either developement mode or production mode.
Most of the time, when run locally, it will be in developement mode.
In dev mode, the project requires 3 processes to run:
* The **productions server**, which exposes the required REST endpoints
* The **dev server**, which serves the client app, provides debuggability, and proxies all API calls to the production server
* **Postgres** running a database to save data to

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
This will start Postgres, and start the dev and prodcution servers. By default you
can see the app by going to ***localhost:3000***

> *NOTE*: the servers will be started as child processes of the window where they were started. 
>In order to easily kill them later, it is best to keep the terminal open.

### Stopping the app
It's a good idea to shut down the servers and Postgres when you are done. To kill the servers hit `ctrl-c` in the terminal where you started them. To shut down Postgres, run:
``` 
yarn stop
```
