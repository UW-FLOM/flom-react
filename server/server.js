const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/echo', (req, res) => {
  console.log('Recieved echo request with body:', req.body);
  res.end({ express: req.body.text });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Client-side routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));