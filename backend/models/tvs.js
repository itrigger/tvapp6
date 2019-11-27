const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = function (skip, limit, cb) {
    db.get().collection('tvs').count(function (e, count) {
        db.get().collection('tvs').find().skip(skip).limit(limit).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                items: docs
            }
            cb(err, message);
        });
    });
};
exports.findById = function(id, cb) {
    db.get().collection('tvs').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};

exports.create = function(artist, cb) {
    db.get().collection('tvs').insert(artist, function(err, result) {
        cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
    db.get().collection('tvs').updateOne(
        {_id: ObjectID(id)},
        newData,
        function(err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function(id, cb) {
    db.get().collection('tvs').deleteOne(
        {_id: ObjectID(id)},
        function(err, result) {
            cb(err, result);
        }
    );
};