const question = require('../models').question;

module.exports = {
  create(req, res) {
    console.log('question', req);
    
    return question
      .create({
        activityId: req.params.activityId
      })
      .then(question => res.status(201).send(question))
      .catch(error => res.status(400).send(error));
  },
};