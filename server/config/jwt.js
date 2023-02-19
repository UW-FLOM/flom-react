const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { sign } = require('crypto');

const pathToKey = path.join(__dirname, '..', '/secret/', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

exports.create = (user) => {
    //const { id } = user;

    const expiresIn = '90d';

    const payload = {
        sub: user,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });
   
    return {
        token: `Bearer ${signedToken}`
    };
}

exports.verify = (token) => {
    try {
        const verify = jsonwebtoken.verify(token, PRIV_KEY, { algorithms: 'RS256' });
        if (verify.exp > Date.now()) {
            //console.log('true')
            return { "status": true, "right": verify.sub.right };
        } else {
            //console.log('false: ')
            return {"status": false };
        }
    } catch { return { "status": false }; }
};