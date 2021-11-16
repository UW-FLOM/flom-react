const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');

// Create the server and choose a port to bind to
const app = express();
const port = process.env.PORT || 3001;

// Include middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(helmet());

require('./config/passport')(passport);

app.use(passport.initialize());

app.use('/static', express.static('public'));

// Add route controllers. Most of the server logic is puleed in here
const mountRoutes = require('./routes');

mountRoutes(app);

// If in production, serve
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server ready, application available on port ${port}`));
