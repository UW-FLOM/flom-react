const Router = require('express-promise-router');
const passport = require('passport');

const db = require('../config/db');

const jwt =require('../config/jwt');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/verify', (req, res) => {
    const verification = jwt.verify(req.headers.token);
    //console.log("Verification status: ", verification)

    if (verification.status) {
        //console.log('You are successfully authenticated to this route!', req)
        res.status(200).json({ ...verification, msg: 'You are successfully authenticated to this route!' });
    } else {
        //console.log('You are NOT authenticated to this route!', req)
        res.status(401).json({ ...verification, msg: 'You are NOT authenticated to this route!' });
    }
});

router.get('/survey', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { rows } = await db.query('SELECT id, name, visibility_id, start_time, end_time FROM survey');
    await Promise.all(rows.map(async (survey) => {
        const count = await db.query('SELECT COUNT(*) FROM response WHERE survey = $1', [survey.id]);
        survey.responseCount = count.rows[0].count;
    }));
    //console.log('Routes User /survey: ', rows)
  res.status(200).json(rows);
});

// Getting specific survey based on surveyID
router.get('/survey/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    //console.log('User.js)');
    let { rows } = await db.query('SELECT detail FROM survey WHERE id = $1', [id])
  res.status(200).json(rows);
});

router.get('/survey/responseCount/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    const count = await db.query('SELECT COUNT(*) FROM response WHERE survey = $1', [id]);
    res.status(200).json(count);
});

router.get('/survey/response/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    console.log('Routes User /survey ID: ', id)
    const { rows } = await db.query('SELECT * FROM response WHERE survey = $1', [id]);
    console.log('Routes User /survey Row: ', rows)
    res.status(200).json(rows);
});