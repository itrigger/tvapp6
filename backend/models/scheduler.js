var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function(cb) {
    db.get().collection('scheduler').find().toArray(function(err, docs) {
        cb(err, docs);
    });
};


exports.findById = function(id, cb) {
    db.get().collection('scheduler').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};


/**/
/**/
exports.findByTime = function(curtime,  cb) {
    db.get().collection('scheduler').find({ starttime: {$lte: curtime}, endtime: {$gte: curtime}}).count(function (e, count) {
        db.get().collection('scheduler').find({ starttime: {$lte: curtime}, endtime: {$gte: curtime}}).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                schedule: docs
            };
            cb(err, message);
        });
    });
};

exports.findByChannelActivity = function(channel, callback){
    db.get().collection('activities').findOne({channel: channel}, function (err, item) {
        callback(err, item);
    })
};

exports.createChannelActivity = function(channel, cb) {
    db.get().collection('activities').insert(channel, function(err, result) {
        cb(err, result);
    });
};
/**/
/**/




exports.create = function(artist, cb) {
    db.get().collection('scheduler').insert(artist, function(err, result) {
        cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
    db.get().collection('scheduler').updateOne(
        {_id: ObjectID(id)},
        newData,
        function(err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function(id, cb) {
    db.get().collection('scheduler').deleteOne(
        {_id: ObjectID(id)},
        function(err, result) {
            cb(err, result);
        }
    );
};