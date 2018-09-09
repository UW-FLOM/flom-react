const sessionController = require('../controllers').session;
const activitiesController = require('../controllers').activities;
const questionsController = require('../controllers').questions;

module.exports = (app) => {
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

  app.post('/api/session', sessionController.create);
  app.get('/api/session', sessionController.list);
  app.get('/api/session/:sessionId', sessionController.find);

  app.post('/api/session/:sessionId/activity', activitiesController.create);
  app.get('/api/activity', activitiesController.list);

  app.post('/api/session/:sessionId/:activityId/question', questionsController.create);
};