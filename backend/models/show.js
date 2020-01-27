const ObjectID = require('mongodb').ObjectID;
const db = require('../db');
let Slide = require('../models/slides');

exports.all = function (skip, limit, cb) {
    db.get().collection('show').count(function (e, count) {
        db.get().collection('show').find().skip(skip).limit(limit).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                items: docs
            }
            cb(err, message);
        });
    });
};
exports.findById = function (id, cb) {
    db.get().collection('show').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    });
};

exports.create = function (show, cb) {
    db.get().collection('show').insert(show, function (err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('show').updateOne(
        {_id: ObjectID(id)},
        newData,
        function (err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function (id, cb) {
    db.get().collection('show').deleteOne(
        {_id: ObjectID(id)},
        function (err, result) {
            cb(err, result);
        }
    );
};

exports.findByPlace = function (place, num, cb) {
    db.get().collection('tvs').findOne({place: place, number: num}, function (err, doc1) {
        cb(err, doc1);

    });
};
exports.findByChannel = function (channel, cb) {
    db.get().collection('tvs').findOne({channel: channel}, function (err, doc) {
        cb(err, doc);
    });
};