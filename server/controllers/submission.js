const { Submissions } = require('../models');

module.exports = {
  create(req, res) {
    return Submissions
      .create({
        content: req.body,
        surveyID: req.params.surveyID,
      })
      .then((sub) => res.status(201).send(sub))
      .catch((error) => res.status(400).send(error));
  },
};
