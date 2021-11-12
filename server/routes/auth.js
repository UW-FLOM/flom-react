const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('../config/jwt');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

// Getting all survey
router.post('/login/local', async (req, res) => {
  console.log(req.body);
  let localUser = await db.query('SELECT * FROM local_user WHERE username = $1', [req.body.username]);
  localUser = localUser.rows;
  if (localUser.length === 0) {
    return res.status(401).json({ success: false, msg: 'Username or password is incorrect' });
  }
  localUser = localUser[0];
  bcrypt.compare(req.body.password, localUser.password, async (err, result) => {
    if (result === false) {
      return res.status(401).json({ success: false, msg: 'Username or password is incorrect' });
    }
    let userDetail = await db.query('SELECT * FROM users WHERE user_id = $1', [localUser.user_id]);
    userDetail = userDetail.rows[0];
    const user = {
      id: userDetail.user_id,
      displayName: userDetail.name,
      right: userDetail.user_right,
    };
    const tokenObject = jwt(user);
    return res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
