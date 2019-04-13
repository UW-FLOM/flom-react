const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

// Create the server and choose a port to bind to
const app = express();
const port = process.env.PORT || 3001;

// Incude middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

// Add route controllers. Most of the server logic is puleed in here
require('./routes')(app);

// If in production, serve 
if (process.env.NODE_ENV === 'production') {
  console.log('Starting production server');
  
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Client-side routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server ready, application available on port ${port}`));