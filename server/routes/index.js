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
};