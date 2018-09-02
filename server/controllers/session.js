const session = require('../models').session;

module.exports = {
  create(req, res) {
    return session
      .create()
      .then(session => res.status(201).send(session))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return session
      .all()
      .then(sessions => res.status(200).send(sessions))
      .catch(error => res.status(400).send(error));
  },
};