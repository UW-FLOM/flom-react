const _ = require('lodash');
const activity = require('../models').activity;
const question = require('../models').question;

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
          response: q.response,
        })
      })
    )
    .then(questions => res.status(200).send(questions))
    .catch(error => res.status(400).send(error))
}

const find = (req, res) => {
  console.log('INFO: finding activity by id: ', req.params.sessionId);
  return activity
    .findById(req.params.activityId, {
      include: [{
        model: question,
        as: 'questions',
      }],
    })
    .then(activity => {
      if (!activity) {
        return res.status(404).send({
          message: 'Activity Not Found',
        });
      }
      return res.status(200).send(activity);
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  submit,
  find,
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