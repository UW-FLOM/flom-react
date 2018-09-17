const _ = require('lodash');
const path = require('path');
const glob = require('glob');
const idFromString = require('../util').idFromString;

module.exports = {
  get(req, res) {
    glob('surveys/*.json', (err, files) => {
      if(err) {
        console.log('Error reading survey definitions:', err);
      }
      const surveys = _.map(files, (filePath) => {
        const survey = require(path.join('..', filePath));
        survey.id = idFromString(survey.title);
        return survey;
      });

      res.json(surveys)
    })
  },
}
