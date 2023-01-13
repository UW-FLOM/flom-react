// Database controllers
const survey = require('./survey');
const auth = require('./auth');
const user = require('./user');
const submission = require('./submission')
const addSurvey = require('./addSurvey')
const upload = require('./upload')

// Asset controllers

module.exports = (app) => {
  // Responds from the server. This is for debugging.
  app.post('/api/echo', (req, res) => {
    console.log('Received echo request with body:', req.body);
    res.json(req.body);
  });
  /*
  // Sends list of available survey
  app.get('/api/survey', surveyController.list);

  // Sends the content of a specific survey
  app.get('/api/survey/:surveyID', surveyController.retrieve);

  // Store user response
  app.post('/api/submission/:surveyID', submissionController.create);
  */
    app.use('/api/upload', upload);
    app.use('/api/submission', submission);
    app.use('/api/addSurvey', addSurvey);
    app.use('/api/survey', survey);
    app.use('/api/auth', auth);
    app.use('/api/user', user);
};
