const session = require('../models').session;
const activity = require('../models').activity;
const question = require('../models').question;

module.exports = {
  create(req, res) {
    return session
      .create()
      .then(session => res.status(201).send(session))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return session
      .findAll({
        include: [{
          model: activity,
          as: 'activities',
          include: [question]
        }],
      })
      .then(sessions => res.status(200).send(sessions))
      .catch(error => res.status(400).send(error));
  },
  find(req, res) {
    return session
      .findById(req.params.sessionId, {
        include: [{
          model: activity,
          as: 'activities',
          include: [question]
        }],
      })
      .then(session => {
        if (!session) {
          return res.status(404).send({
            message: 'Session Not Found',
          });
        }
        return res.status(200).send(session);
      })
      .catch(error => res.status(400).send(error));
  },
  edit(req, res) {
    return session
      .update(
        { complete: req.body.sessionComplete },
        { where: { id: req.params.sessionId }}
      )
      .then(session => {
        if (!session) {
          return res.status(404).send({
            message: 'Session Not Found',
          });
        }
        return res.status(200).send(session);
      })
      .catch(error => res.status(400).send(error));
  },
};