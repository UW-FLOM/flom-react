const _ = require('lodash');
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
  submit(req, res) {
    // Add all of the answers to the questions table
    return Promise
      .all(
        _.map(req.body.questions, (q) => {
          return question.create({
            activityId: req.body.activityId,
            response: q.response
          })
        })
      )
      .then(questions => res.status(200).send(questions))
      .catch(error => res.status(400).send(error))
  }
};