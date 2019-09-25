var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function(cb) {
    db.get().collection('slides').find().toArray(function(err, docs) {
        cb(err, docs);
    });
};

exports.findById = function(id, cb) {
    db.get().collection('slides').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};

exports.findByPlace = function(place,num, cb) {
    db.get().collection('slides').find({place: place, screen_num: num}).toArray(function(err, doc) {
        cb(err, doc);
    });
};

exports.create = function(artist, cb) {
    db.get().collection('slides').insert(artist, function(err, result) {
        cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
    db.get().collection('slides').updateOne(
        {_id: ObjectID(id)},
        newData,
        function(err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function(id, cb) {
    db.get().collection('slides').deleteOne(
        {_id: ObjectID(id)},
        function(err, result) {
            cb(err, result);
        }
    );
};