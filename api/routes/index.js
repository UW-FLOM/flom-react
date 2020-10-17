// Database controllers
const sessionController = require('../controllers').session;
const activitiesController = require('../controllers').activities;
const questionsController = require('../controllers').questions;

// Asset controllers
const surveysController = require('../controllers').surveys;

module.exports = (app) => {
  // Responds from the server. This is for debugging.
  app.post('/api/echo', (req, res) => {
    console.log('Recieved echo request with body:', req.body);
    res.json(req.body);
  });

  // Sends available survey definitions
  app.get('/api/surveys', surveysController.get);

  // Creates a session
  app.post('/api/session', sessionController.create);

  // Lists all completed sessions
  app.get('/api/session', sessionController.list);

  // Modifies an existing session
  app.post('/api/session/:sessionId', sessionController.edit)

  // Show a session by id
  app.get('/api/session/:sessionId', sessionController.find);

  // Lists all activities
  app.get('/api/activity', activitiesController.list);

  // Show an activity by id
  app.get('/api/activity/:activityId', activitiesController.find)
  
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