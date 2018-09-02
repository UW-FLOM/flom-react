const Session = require('../models').Session;

module.exports = {
  create(req, res) {
    return Session
      .create()
      .then(session => res.status(201).send(session))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Session
      .all()
      .then(sessions => res.status(200).send(sessions))
      .catch(error => res.status(400).send(error));
  },
};