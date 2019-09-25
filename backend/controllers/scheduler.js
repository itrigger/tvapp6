const Schedule = require('../models/scheduler');
var scheduler = require('node-schedule');

exports.test = function(req, res) {
    console.log('scheduler started');
    var j = scheduler.scheduleJob('16 * * * *', function(){
        console.log('The answer to life, the universe, and everything!');
    });
};

exports.all = function(req, res) {
    Schedule.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('schedule',{
            schedule:docs
        })
    });
};

exports.findById = function(req, res) {
    Schedule.findById(req.params.id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('schedule_edit',{
            schedule:doc
        })
    });
};


exports.create = function(req, res) {
    var schedule = {
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        tv: req.body.tv,
        time: req.body.time,
        isactive: req.body.isactive
    };
    Schedule.create(schedule, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.redirect('/schedule');
    });
};

exports.update = function(req, res) {
    Schedule.update(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            place: req.body.place,
            tv: req.body.tv,
            time: req.body.time,
            isactive: req.body.isactive
        },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log('Данные успешно обновлены!');
            res.redirect('/schedule');
        }
    );
};

exports.delete = function(req, res) {
    Schedule.delete(
        req.params.id,
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};