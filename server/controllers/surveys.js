const _ = require('lodash');
const path = require('path');
const glob = require('glob');

module.exports = {
  get(req, res) {
    glob('surveys/*.json', (err, files) => {
      if(err) {
        console.log('Error reading survey definitions:', err);
      }
      const surveys = _.map(files, (filePath) => {
        const survey = require(path.join('..', filePath));
        return survey;
      });

      res.json(surveys)
    })
  },
}
