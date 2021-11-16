const Router = require('express-promise-router');
const passport = require('passport');
const db = require("../config/db");

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are successfully authenticated to this route!' });
});

router.get('/survey', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { rows } = await db.query('SELECT survey_id, name FROM survey');
  res.status(200).json(rows);
});

// Getting specific survey based on surveyID
router.get('/survey/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT detail FROM survey WHERE survey_id = $1', [id]);
  res.status(200).json(rows);
});
