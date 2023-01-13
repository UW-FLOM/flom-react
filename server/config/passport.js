const passport = require('passport');
const jwt = require('./jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const db = require('./db');
const { request } = require('https');

const pathToKey = path.join(__dirname, '..', '/secret/', 'id_rsa_priv.pem');
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

    passport.use('jwt', new JwtStrategy(options, (async (jwtPayload, done) => {
        // We will assign the `sub` property on the JWT to the database ID of user
        //let user = (await db.query('SELECT * FROM users WHERE id = $1', [jwtPayload.sub])).rows[0];
        console.log(jwtPayload.exp + " - " + Date.now())
        if (jwtPayload.exp > Date.now()) {
            console.log("Yes")
            return done(null, jwtPayload.sub.right, { message: 'SERVER:PASPORT.js - This user IS Authenticated' }); 
        } else {
            //done.redirect('/login');
            console.log("No")
            return done(null, false, { message: 'SERVER:PASPORT.js - This user is not Authenticated' });
        }
    })));
};
