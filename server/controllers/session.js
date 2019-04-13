const session = require('../models').session;
const activity = require('../models').activity;
const question = require('../models').question;

module.exports = {
  // Creates a session, returning it's sessionId
  create(req, res) {
    return session
      .create()
      .then(session => res.status(201).send(session))
      .catch(error => res.status(400).send(error));
  },
  // Lists all sessions
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
  // Gets a specific sessino by id
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
  // Edits a sepcific session. 
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