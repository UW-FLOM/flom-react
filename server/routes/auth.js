const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('../config/jwt');
const { verify } = require('jsonwebtoken');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

// Getting all survey
router.post('/login/local', async (req, res) => {
    //console.log(req.body);
    let localUser = (await db.query('SELECT * FROM local_user WHERE username = $1', [req.body.username])).rows[0];
    if (typeof localUser === 'undefined') {
        return res.status(401).json({ success: false, msg: 'Username is incorrect' });
    } else {
        bcrypt.compare(req.body.password, localUser.password, async (err, result) => {
            if (result === false) {
                return res.status(401).json({ success: false, msg: 'password is incorrect' });
            } else {
                let userDetail = (await db.query('SELECT * FROM users WHERE id = $1', [localUser.user_id])).rows[0];

                const user = {
                    id: userDetail.id,
                    userName: localUser.username,
                    displayName: userDetail.name,
                    right: userDetail.user_right_id,
                };
                const tokenObject = jwt.create(user);
               // console.log(jwt.verify(tokenObject.token))
                return res.status(200).json({
                    // dump: user,  
                    success: true,
                    token: tokenObject.token,
                    // expiresIn: tokenObject.expires,
                });
            };
        });
    };
});

router.get('/logout', (req, res) => {
    localStorage.removeItem('currentUser');
    //console.log("loging out-Route");
    req.logout();
    res.redirect('/');
});
