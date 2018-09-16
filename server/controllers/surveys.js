const surveys = require('../surveys/demo1.json')

module.exports = {
  get(req, res) {
    console.log('Surveys found:', surveys);
    res.json(surveys)
  },
}
