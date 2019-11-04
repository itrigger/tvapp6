

var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.APIadd = function(user,cb) {
    db.get().collection('users').insert(user, function(err, result) {
        cb(err, result);
    });
};