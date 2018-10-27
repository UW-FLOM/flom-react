const _ = require('lodash');
const activity = require('../models').activity;
const question = require('../models').question;

// TODO: Remove this. They now get created in the submit.
const create = async (req, res) => {
  console.log('INFO: activity create');
  
  return activity
    .create({
      sessionId: req.params.sessionId
    })
    .then(activity => res.status(201).send(activity))
    .catch(error => res.status(400).send(error));
}

const submit = async (req, res) => {
  console.log('INFO: submitting answers for activity.', req.body);
  
  let newActivity = undefined;
  try {
    newActivity = await activity.create({
      sessionId: req.body.sessionId
    })
  }
  catch(error) {
    console.log('ERROR:', error);
    res.status(400).send(error)
  }

  console.log('INFO: activity created with id:', newActivity.id);

  // Add all of the answers to the questions table
  return Promise
    .all(
      _.map(req.body.responses, (q) => {
        return question.create({
          activityId: newActivity.id,
          response: q.response
        })
      })
    )
    .then(questions => res.status(200).send(questions))
    .catch(error => res.status(400).send(error))
}

module.exports = {
  create,
  submit,
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