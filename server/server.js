const express = require('express');
const bodyParser = require('body-parser');

var Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser());

const sequelize = new Sequelize('flom-dev', 'flom', 'flom', {
  dialect: 'postgres',
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Message from Express server' });
});

app.post('/api/echo', (req, res) => {
  console.log('Recieved echo request with body:', req.body);
  res.json(req.body);
});

app.post('/api/_unsafe_sqlTest', (req, res) => {
  console.log('Recieved sql test request with body:', req.body);
  sequelize.query(req.body.query).spread((results, metadata) => {
    console.log('results', results);
    console.log('metadata', metadata);
    res.json({
      results: results,
      metadata: metadata
    })
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Client-side routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));