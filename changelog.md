## Sprint 1 - 6/2018
Get the dev app up and running
* Start a new app with create react app
* Add react router and set up basic routes
* Add eslint for sanity
* Set up react-bootstrap and write some demo controls
* Can't get the eslint rules how I like them. I will have to come back to it
* Write a basic form page to copy what was already implemented. It doesn't write to the server yet
* Set up leaflet-react
* Write a basic map tool page with leaflet react
At this point I have proof of concept pages for the survey and the map tool. The dev server works and can be run locally.

## Sprint 2 - 7/2018
This week I am setting up a basic production server so that we can have REST calls for database connectivity.
The plan is to use Express as an app server and to proxy calls to the database. Step by step:
* Split the root of the project into a client and a server directory
* Add a package.json to the root directory for shared dependencies and scripts that I want 
to be able to run from the root. For example, it will be nice to have `build`, `start:dev` and `start:prod`
at the root. **NOTE:** For now I am using bash in the top-level yarn scripts, so they won't
work on windows. I will keep the README platform agnostic.
* Update .gitignore to ignore node_modules everywhere.
* Add `concurrently` to the root to run two server procs at once. This is because in dev
we want to run the dev server proxying to the api server.
* Add a yarn scipt to start the servers.
* Add dev server proxying to webpack config in `client/package.json`
* Create an express server in the `server` directory with a test API endpoint (on 3001 for now)
* Add a test api page to the app. We'll use it to develope the database.
* Add client-side routing and static file serving to `server.js`
* Install postgres locally for development
* Create dev db in postgres
* Add script to start postgres with everything else
* Add pg and sequelize node pacakges to server. We need these to talk to the database.
* Add a services directory and api interface for async calls
* Add `bodyParser` to express to parse json
* Add inputs to the test page 
* Add an echo endpoint to the server
* Removed `"eject": "react-scripts eject"` from `client/package.json`
* Add sql input to API test and `sendSql` to `api.js`. This is for dev time. We won't be sending raw SQL at run time.
* Add `_unsafe_sqlTest` endpoint to server. Again, for dev time. We will remove this altogether when ORM is in place.
* Set up server to run the unsafe SQL, then return the response
At this point we have a production dev server that proxies API requests to a production server, and a postgres database that can be queried.
There is a test page in the app where we can enter sql to test the database.

## Sprint 3 8/2018
Next, the plan is to get the app writing to and reading from the database.
* Add a top-level script to start everything.
* Branch `orm-setup` to try a complete ORM setup with `sequelize`
* Add `bin` directory to root for scripts 
* Add `morgan` for logging
* Add `.sequelizerc` to configure sequelize
* Fix license warning with `"license": "UNLICENSED"` in all `package.json` files. We will have to decide later what this should actually be.
* I put sequelize in the server project instead of at the root because the client doesnt need it
* Intialize sequelize with `models`, `config`, and `migrations`. I left seeders out for now. We can revisit that if need be.
* Set up dev environment to use local database `flom_dev` as user `flom` with password `flom`
* Create models for `session`, `activity`, and `question`. This might cahnge later, but it seems like a good place to start
* Create migration files for models and initialize the database by migrating them
* Add controllers for session create and list
* Split out routes to their own server file
* I converted all the database objects to lower case. I will use the convention that all db objects will be lower case.
* Add `sessionId` to the activity model
* Add activity create controller
* Add a find session endpoint
* Add question `POST` controller
* Add activity list controller

I used a couple blog posts about how to set up Express and the webpack dev server:
* https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
* https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
* https://www.robinwieruch.de/postgres-express-setup-tutorial/
* https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

### Open Issues
* Top-level yarn scripts use bash so they won't work on Windows. Eventually these should become node scripts
* Scripts don't work when services are already running