# Resources
Below are some useful resources for learning about the various technologies included in this app as well as links to the primary libraries it relies on.

## Learning 
Contributing to this app will require knowledge of javascript as well as some understanding of some of the main technologies involved:
* [React tutorial](https://reactjs.org/tutorial/tutorial.html) - React is the primary UI framework used to build this app. 
It provides a way to write re-useable view components, render them and interact with them in a reasonable way. This tutorial is a good introduction.
* [Express server](https://expressjs.com/) - Express is the application server used to serve the app and communicate with the database. This is the main express page. This app uses it in a pretty straight-forward way.
It runs on `nodejs`.
* [Postgres](http://www.postgresqltutorial.com/) - Postgres is an open source database used to store data. It can be very complex, but this app does not use it in a very complex way. 
It works mostly like a standard SQL database. The main thing to learn is how to install it and connect to it.
* [Docker](https://docs.docker.com/get-started/) - Docker is a container technology that makes it possible to bundle the app and all of its dependencies together into one shareable object that can run the database and the app server on any linux-based system. 
This tutorial explores those concepts in more depth and will provide a good understanding of what a container is.

## Libraries
In addition to the main technologies used to make this app, there are a number of other libraries included which bring in various UI components, display maps, and help with other details:
* [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) - a UI component library providing buttons, inputs, etc.
Look here to learn about how to bring in new components and styles and use the existing ones in new ways.
* [Styled Components](https://www.styled-components.com/) - a style library for styling react components. This is pretty straightforward; it makes it possible to write css in React in a re-usable way.
* [react-leaflet](https://react-leaflet.js.org/docs/en/v1/intro.html) - helps render maps in react. 
This is a React wrapper around the leaflet library for mapping in javascript. 
This is where to learn about mapping features.
* [react-router](https://reacttraining.com/react-router/web/guides/quick-start) - a client-side routing library for React. This is where to learn about adding new routes to the app. 
* [react-sound](https://www.npmjs.com/package/react-sound) - used to play sounds in surveys. 
Look here to learn about audio features.
* [sequelize](http://docs.sequelizejs.com/manual/installation/getting-started) - an ORM for connecting our node server to postgres. 
This is how to add new database functionality in the server. 
* [Create react app](https://facebook.github.io/create-react-app/docs/getting-started) - provides React infrastructure including dev server, build system, and a skeleton app. 
Create react app was used to bootstrap this project and get it started.
It's not especially important to general feature development, but if the build or major app-model features need to change, this is where to find out how.

## Other
A number of blogs and articles were referred to in the course of building this app.
The implementation does not follow any of them exactly, but these are some of the most useful that show aspects of how this app is implemented:
* https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
* https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
* https://www.robinwieruch.de/postgres-express-setup-tutorial/
* https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

Some relevant stack overflow docs:
* https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install 
