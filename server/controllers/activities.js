const activity = require('../models').activity;
const question = require('../models').question;

module.exports = {
  create(req, res) {
    return activity
      .create({
        sessionId: req.params.sessionId
      })
      .then(activity => res.status(201).send(activity))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return activity
      .findAll({
        include: [{
          model: question,
          as: 'questions',
        }],
      })
      .then(activities => res.status(200).send(activities))
      .catch(error => res.status(400).send(error));
  },
};