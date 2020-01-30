let moment = require('moment');

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');


exports.all = function (skip, limit, cb) {
    db.get().collection('scheduler').count(function (e, count) {
        db.get().collection('scheduler').find().skip(skip).limit(limit).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                items: docs
            }
            cb(err, message);
        });
    });
};

exports.findById = function(id, cb) {
    db.get().collection('scheduler').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};


/**/
/**/
/*exports.findByTime = function(curtime,  cb) {
    console.log('model get curtime is: ' + curtime);
    db.get().collection('scheduler').find({ starttime: {$lte: curtime}}).count(function (e, count) {
        db.get().collection('scheduler').find({ starttime: {$lte: curtime}}).toArray(function (err, docs) {
            let message = {
                totalCount: count,
                schedule: docs
            };
            cb(err, message);
        });
    });
};*/
exports.findByTime = function(curtime,  cb) {
    db.get().collection('scheduler').find().count(function (e, count) {
        db.get().collection('scheduler').find().toArray(function (err, docs) {
            let message = {
                totalCount: count,
                schedule: docs
            };
            for (let i=0;i<count;i++){
               /* console.log(moment(docs[i].starttime).format('MMMM Do YYYY, h:mm:ss a') + " ??? " + moment(curtime).format('MMMM Do YYYY, h:mm:ss a'));
                console.log("typeof 1 " + typeof docs[i].starttime + " typeof 2 " + typeof curtime);*/
                if (moment(docs[i].starttime).format('MMMM Do YYYY, h:mm:ss a') > moment(curtime).format('MMMM Do YYYY, h:mm:ss a') ){
                    message.schedule.push(docs[i]);
                }
            }

            cb(err, message);
        });
    });
};
exports.changeOnlineStatus = function(id, newdata, cb) {
    db.get().collection('scheduler').update({_id: ObjectID(id)},
        newdata,
        function(err, result) {
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