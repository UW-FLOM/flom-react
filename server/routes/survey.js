const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

// Getting all survey
router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT SurveyID, Name FROM surveys');
  res.status(200).json(rows);
});

// Getting specific survey based on surveyID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT Detail FROM surveys WHERE SurveyID = $1', [id]);
  res.status(200).json(rows);
});
