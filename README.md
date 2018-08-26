# Flom in React
This is a react version of the FLOM project. There are only a couple prerequisties:

* [yarn](https://yarnpkg.com/en/)
* [node](https://nodejs.org/en/) 

# Getting started
To run the project in development mode, clone this repo, then from the repo root:

```
cd client
yarn install
yarn start
```
This will run the development server on your local machine. By default you
can see the app by going to *localhost:3000*

# Development
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

It's a good idea to shut down postgres when you are done:
```
yarn psql:stop
```