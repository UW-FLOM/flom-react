const { Surveys } = require('../models');

module.exports = {
  list(req, res) {
    return Surveys
      .findAll({ attributes: ['id', 'name'] })
      .then((survey) => res.status(200).send(survey))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Surveys
      .findByPk(req.params.surveyID, { attributes: ['content'] })
      .then((survey) => {
        if (!survey) {
          return res.status(404).send({
            message: 'Survey Not Found',
          });
        }
        return res.status(200).send(survey);
      })
      .catch((error) => res.status(400).send(error));
  },
};
