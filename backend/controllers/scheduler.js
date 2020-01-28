const Schedule = require('../models/scheduler');
const scheduler = require('node-schedule');
const timestamp = require('time-stamp');

exports.test = function(req, res) {
    console.log('scheduler started');
    var j = scheduler.scheduleJob('16 * * * *', function(){
        console.log('The answer to life, the universe, and everything!');
    });
};

exports.all = function(req, res) {
    let pageNo = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    if (!(pageNo)) {
        pageNo = 1
    }
    if (!(size)) {
        size = 5
    }
    let skip = size * (pageNo - 1);
    let message = {};
    Schedule.all(
        skip,
        size,
        function(err, docs) {
        if (err) {
            console.log(err);
            message = {resultCode: 1}
            return res.send(message);
        }
        message = {
            count: docs.totalCount,
            items: docs.items,
            resultCode: 0
        };
        res.send(message);
    });
};

exports.findById = function(req, res) {
    let message = {};
    Schedule.findById(req.params.id, function(err, doc) {
        if (err) {
            message = {resultCode: 1};
            return res.status(500).send(message);
        }
        message = {
            item: doc,
            resultCode: 0
        };
        res.status(200).send(message);
    });
};

/*33333333333333333*/
/*33333333333333333*/
/*33333333333333333*/
/*33333333333333333*/



exports.findByTime = function(req, res) {
    let curtime = timestamp('YYYYMMDDHHmm');
    console.log(curtime);
/*    let query = require('url').parse(req.url, true).query;
    let starttime = query.starttime;
    let endtime = query.endtime;*/

    Schedule.findByTime(curtime, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send({
            resultCode: 0,
            totalCount: doc.totalCount,
            schedule: doc.schedule
        });
    });
};



/*333333333333333333*/
/*333333333333333333*/
/*333333333333333333*/
/*333333333333333333*/
exports.create = function(req, res) {
    let schedule = {
        name: req.body.schedule.name,
        description: req.body.schedule.description,
        starttime: req.body.schedule.starttime,
        isactive: req.body.schedule.isactive,
        endtime: req.body.schedule.endtime,
        periodic: req.body.schedule.periodic,
        show: req.body.schedule.show,
        channel: req.body.schedule.channel,
        online: "0"
    };
    Schedule.create(schedule, function(err, result) {
        let data = {
            resultCode: 1
        };
        if (err) {
            return result.status(500).send(data);
        }
        data.resultCode = 0;
        res.status(200).send(data);
    });
};

exports.update = function(req, res) {
    Schedule.update(
        req.params.id,
        {
            name: req.body.schedule.name,
            description: req.body.schedule.description,
            starttime: req.body.schedule.starttime,
            isactive: req.body.schedule.isactive,
            endtime: req.body.schedule.endtime,
            periodic: req.body.schedule.periodic,
            show: req.body.schedule.show,
            channel: req.body.schedule.channel,
            online: "0"
        },
        function(err, result) {
            let data = {
                resultCode: 1
            };
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            data.resultCode = 0;
            res.status(200).send(data);
        }
    );
};

exports.delete = function(req, res) {
    let data = {
        resultCode: 1
    }
    Schedule.delete(
        req.params.id,
        function(err, result) {
            if (err) {
                return  result.status(500).send(data);
            }
            data.resultCode = 0;
            res.status(200).send(data);
        }
    );
};