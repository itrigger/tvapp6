var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (skip, limit, cb) {
    db.get().collection('slides').count(function (e, count) {
        db.get().collection('slides').find().skip(skip).limit(limit).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                items: docs
            }
            cb(err, message);
        });
    });
};


exports.findById = function (id, cb) {
    db.get().collection('slides').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    });
};

exports.findByPlace = function (place, num, cb) {
    db.get().collection('slides').find({place: place, screen_num: num}).toArray(function (err, doc) {
        cb(err, doc);
    });
};

exports.create = function (artist, cb) {
    db.get().collection('slides').insert(artist, function (err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('slides').updateOne(
        {_id: ObjectID(id)},
        newData,
        function (err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function (id, cb) {
    db.get().collection('slides').deleteOne(
        {_id: ObjectID(id)},
        function (err, result) {
            cb(err, result);
        }
    );
};