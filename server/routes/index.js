// Database controllers
const sessionController = require('../controllers').session;
const activitiesController = require('../controllers').activities;
const questionsController = require('../controllers').questions;

// Asset controllers
const surveysController = require('../controllers').surveys;

module.exports = (app) => {
  // Returns a message from the server. This is for debugging.
  app.get('/api/hello', (req, res) => {
    res.send({ express: 'Message from Express server' });
  });

  // Responds from the server. This is for debugging.
  app.post('/api/echo', (req, res) => {
    console.log('Recieved echo request with body:', req.body);
    res.json(req.body);
  });

  // TODO: REMOVE! This is dangerous, it is used for test at dev time. 
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

  // Sends available survey definitions
  app.get('/api/surveys', surveysController.get);

  // Creates a session
  app.post('/api/session', sessionController.create);

  // Lists all completed sessions
  app.get('/api/session', sessionController.list);

  // Show a session by id
  app.get('/api/session/:sessionId', sessionController.find);

  // Creates an activity in the specified session by session id
  app.post('/api/session/:sessionId/activity', activitiesController.create);

  // Lists all activities
  app.get('/api/activity', activitiesController.list);

  // Submit all answers for an activity. Data format:
  // {
  //   "activityId": <activityId>,
  //   "questions": [
  //     {
  //       "text": <question text>,
  //       "response": <response>
  //     },
  //     ...
  //   ]
  // }
  app.post('/api/activity', activitiesController.submit);

  // Creates a question in the specified session and activity
  app.post('/api/session/:sessionId/:activityId/question', questionsController.create);
};