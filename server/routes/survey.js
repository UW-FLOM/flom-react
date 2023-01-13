const Router = require('express-promise-router');
const db = require('../config/db');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

// Getting all survey
router.get('/', async (req, res) => {
    console.log('Server: survey.js: ' + Date.now())
    const { rows } = await db.query('SELECT id, name FROM survey WHERE visibility_id = 1 and $1 > start_time and $1 < end_time', [Date.now()]);
    //console.log(res.status(200).json(rows));
  return res.status(200).json(rows);
});

// Getting specific survey based on surveyID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('survey.js)');
    const { rows } = await db.query('SELECT detail FROM survey WHERE id = $2 and visibility_id = 1 and $1 > start_time and $1 < end_time', [Date.now(), id]);
    console.log(rows);
    if (!rows.length) { 
       // res.redirect('/'); 
    }
 res.status(200).json(rows);
});
