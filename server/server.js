const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

var Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());

const sequelize = new Sequelize('flom-dev', 'flom', 'flom', {
  dialect: 'postgres',
});

// Add route controllers
require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  console.log('Starting production server');
  
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Client-side routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));