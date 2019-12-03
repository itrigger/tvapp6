var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (skip, limit, cb) {
    db.get().collection('places').count(function (e, count) {
        db.get().collection('places').find().skip(skip).limit(limit).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                items: docs
            }
            cb(err, message);
        });
    });
};

exports.findById = function(id, cb) {
    db.get().collection('places').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};

exports.create = function(artist, cb) {
    db.get().collection('places').insert(artist, function(err, result) {
        cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
    db.get().collection('places').updateOne(
        {_id: ObjectID(id)},
        newData,
        function(err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function(id, cb) {
    db.get().collection('places').deleteOne(
        {_id: ObjectID(id)},
        function(err, result) {
            cb(err, result);
        }
    );
};