const User = require('../models/mongoose/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');


// CREATES A NEW USER
exports.APIadd = function(req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let message = {};
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    user
        .save()
        .then(result => {
            console.log(result);
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours 86400
            });
            message = {
                auth: true,
                token: token,
                resultCode: 0
            }
            res.status(200).send(message);
        })
        .catch(
            err => {
                console.log(err);
                message = {
                    message: err,
                    resultCode: 1
                }
                res.status(500).send(message);
            }
        )
};

exports.APIgetMe = function(req, res, next) {
    let message = {};
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.send({ auth: false, message: 'Failed to authenticate token.', resultCode: 1 });

        User.findById(decoded.id)
            .exec()
            .then(user => {
                if(user){
                    user.password = '0';
                    message = {
                        resultCode: 0,
                        user: user
                    }
                    res.status(200).send(message);
                } else {
                    message = {
                        message: 'No user found',
                        resultCode: 2
                    };
                    res.status(400).send(message);
                }

            })
            .catch(err => {
                message = {
                    message: err,
                    resultCode: 1
                }
            })
    });
};



exports.APIlogin = function (req, res) {
    User.APIlogin({email: req.body.email}, function (err, user) {
        let resultCode = 0;

        /*if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');*/
        if (err){
            resultCode = 1; //resultCode = 1 ERROR
            return res.status(200).send({ auth: false, resultCode});
        }
        if (!user) {
            resultCode = 2; //resultCode = 2 USER NOT FOUND
            return res.status(200).send({ auth: false, resultCode});
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(200).send({ auth: false, token: null, resultCode: 3 });

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours 86400
        });

        user.password = '0';
        res.status(200).send({ auth: true, token: token, resultCode, user});
    });
};

exports.APIlogout = function (req, res) {
    localStorage.setItem('token', null);
    res.status(200).send({ auth: false, token: null });
};
