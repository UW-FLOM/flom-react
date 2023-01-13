const Router = require('express-promise-router');
const passport = require('passport');

const db = require('../config/db');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

var status;

const dbModify = async (queryStatment, queryVar) => {
    try {
        const { rows } = await db.query(queryStatment, queryVar);
        status = { "code": 201, "data": rows }
    } catch (err) {
        status = { "code": 400, "data": err }
    }
}

// Survey Modifyer 
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var queryVar;
    switch (req.body.mode) {

        case "add":
            if (req.body.data.visible) { req.body.data.visible = 1 } else { req.body.data.visible = 0 };
            queryVar = [req.body.data.id, req.body.data.name, req.body.data.visible, req.body.data.details, req.body.data.start_time, req.body.data.stop_time];
            dbModify('INSERT INTO survey (id,name,visibility_id,detail,start_time,end_time) VALUES ($1,$2,$3,$4,$5,$6)', queryVar);
            break;

        case "delete":
            queryVar = [req.body.data.id];
            dbModify('DELETE FROM survey WHERE id = $1', queryVar);
            dbModify('DELETE FROM response WHERE survey = $1', queryVar);
            break;

        case "modify":
            if (req.body.data.visible) { req.body.data.visible = 1 } else { req.body.data.visible = 0 };
            queryVar = [req.body.data.id, req.body.data.visible]
            dbModify('UPDATE survey SET visibility_id = $2 WHERE id = $1', queryVar);
            break;
    }
    res.status(status.code).json(status.data);
});