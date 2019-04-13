const session = require('./session');
const activities = require('./activities');
const questions = require('./questions');
const surveys = require('./surveys');

// Exports all of the controllers to make them easy to import elsewhere
module.exports = {
  session,
  activities,
  questions,
  surveys
};