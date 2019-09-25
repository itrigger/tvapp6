const Slides = require('../models/slides');
const Pusher = require('pusher');

var channels_client = new Pusher({
    appId: '785932',
    key: '715c895bb7ce1e7fa171',
    secret: 'd9882d9bf171816308ff',
    cluster: 'ap2',
    useTLS: true
});

exports.all = function(req, res) {
    Slides.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('slides',{
            slides:docs
        })
    });
};

exports.findByPlace = function(req, res, next) {
    var query = require('url').parse(req.url,true).query;
    var place = query.place;
    var num = query.num;
    Slides.findByPlace(place, num, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('play',{
            slides:doc,
            query:query.channel
        })
    });
    next();
};

exports.reload = function (req, res) {
    var query = require('url').parse(req.url,true).query;
    var num = query.num;
    var place = query.place;
    var content ="";
    console.log(req.params.channel);
    console.log(place);
    console.log(num);
    Slides.findByPlace(place, num, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.forEach(function (doc){
            content += '<div class="item">'+doc.slide_content+'</div>';
        });
        console.log(content);
        channels_client.trigger(req.params.channel, 'my-event', {
            "message": content
        });
    });


};

exports.findById = function(req, res) {
    Slides.findById(req.params.id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('slide_edit',{
            slides:doc
        })
    });
};

exports.create = function(req, res) {
    var screen = {
        place: req.body.place,
        screen_num: req.body.screen_num,
        slide_num: req.body.slide_num,
        isactive: req.body.isactive,
        slide_content: req.body.slide_content
    };
    Slides.create(screen, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.redirect('/slides');
    });
};

exports.update = function(req, res) {
    Slides.update(
        req.params.id,
        {
            place: req.body.place,
            screen_num: req.body.screen_num,
            slide_num: req.body.slide_num,
            isactive: req.body.isactive,
            slide_content: req.body.slide_content
        },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log('Данные успешно обновлены!');
            res.redirect('/slides');
        }
    );
};

exports.delete = function(req, res) {
    Slides.delete(
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