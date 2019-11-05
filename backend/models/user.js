var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.APIadd = function(user,cb) {
    db.get().collection('users').insert(user, function(err, result) {
        cb(err, result);
    });
};

exports.APIgetMe = function(id,cb) {
    db.get().collection('users').findOne({_id: ObjectID(id)}, function(err, user) {
        if (err) return cb.status(500).send("There was a problem finding the user.");
        if (!user) return cb.status(404).send("No user found.");
        cb(err, user);
    });
};

exports.APIlogin = function (email, cb) {
    db.get().collection('users').findOne(email, function (err, user) {
       cb(err, user)
    });
}