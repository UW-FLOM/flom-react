const activity = require('../models').activity;

module.exports = {
  create(req, res) {
    return activity
      .create()
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
};