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

## Dev server
```
cd client
yarn start
```
This will run the development server on your local machine. By default you
can see the app by going to *localhost:3000*

# Running the app
In development, run the dev server, the prod server, and psql.
The dev server is set up to proxy REST calls to the production server, which talks to postgress.

To run the dev server:
```
cd client
yarn start
```

To run the production server:

```
cd server
yarn install
yarn server
```

Start postgress:
```
yarn psql:start
```
If you control the environment and you want to start everything at once:
```
yarn start:all
```

It's a good idea to shut down postgres when you are done:
```
yarn psql:stop
```
