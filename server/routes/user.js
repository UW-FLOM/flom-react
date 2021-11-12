const Router = require('express-promise-router');
const passport = require('passport');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are successfully authenticated to this route!' });
});
