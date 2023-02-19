const Router = require('express-promise-router');
const db = require('../config/db');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

// Insert survey submission based on surveyID
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body.data;
        const startTime = req.body.timeStamp;
        const { rows } = await db.query(`INSERT INTO response (survey,detail,start_time,end_time) VALUES ($1,$2,$3,$4);`, [id, body, startTime, Date.now() ]);
        res.status(201).json(rows);
    } catch (err) {
        console.log('Route > Submission > Post > Error: ',err);
        console.log('Route > Submission > Post > Params: ', req.params);
        console.log('Route > Submission > Post > Body: ', req.body);
    }
});
