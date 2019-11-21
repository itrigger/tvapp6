var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    let token = localStorage.getItem('token');
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.send({ auth: false, message: 'Failed to authenticate token.', resultCode: 1 });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });

}

module.exports = verifyToken;