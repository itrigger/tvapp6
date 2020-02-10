const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // get our config file

function verifyToken(req, res, next) {
    try {
        /*console.log('token came',req.headers.authorization);*/
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).send({auth: false, message: 'No token provided.', resultCode: 10});
        }
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err)
                return res.send({ auth: false, message: 'Failed to authenticate token.', resultCode: 10 });
            // if everything is good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = verifyToken;