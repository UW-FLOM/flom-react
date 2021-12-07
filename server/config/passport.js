const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const pathToKey = path.join(__dirname, '..', '/secret/', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(new JwtStrategy(options, (async (jwtPayload, done) => {
    // We will assign the `sub` property on the JWT to the database ID of user
    let user = await db.query('SELECT * FROM users WHERE user_id = $1', [jwtPayload.sub]);
    user = user.rows;
    if (user.length === 0) {
      return done(null, false);
    }
    if (user) {
      return done(null, user[0]);
    }
    return done(null, false);
  })));
};
