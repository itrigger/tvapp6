const Slides = require('../models/slides');
const Pusher = require('pusher');

const channels_client = new Pusher({
    appId: '785932',
    key: '715c895bb7ce1e7fa171',
    secret: 'd9882d9bf171816308ff',
    cluster: 'ap2',
    useTLS: true
});

exports.all = function (req, res) {
    let pageNo = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    if (!(pageNo)) {
        pageNo = 1
    }
    if (!(size)) {
        size = 55
    }
    let skip = size * (pageNo - 1);
    let limit = size;
    let message = {};
    Slides.all(
        skip,
        limit,
        function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            message = {
                count: docs.totalCount,
                items: docs.items
            };
            res.render('slides', {
                slides: message
            })
        });
};

exports.findByPlace = function (req, res, next) {
    let query = require('url').parse(req.url, true).query;
    let place = query.place;
    let num = query.num;
    Slides.findByPlace(place, num, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('play', {
            slides: doc,
            query: query.channel
        })
    });
    next();
};

exports.reload = function (req, res) {
    var query = require('url').parse(req.url, true).query;
    var num = query.num;
    var place = query.place;
    var content = "";
    console.log(req.params.channel);
    console.log(place);
    console.log(num);
    Slides.findByPlace(place, num, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.forEach(function (doc) {
            content += '<div class="item">' + doc.slide_content + '</div>';
        });
        console.log(content);
        channels_client.trigger(req.params.channel, 'my-event', {
            "message": content
        });
    });


};

exports.findById = function (req, res) {
    Slides.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('slide_edit', {
            slides: doc
        })
    });
};

exports.create = function (req, res) {
    var screen = {
        place: req.body.place,
        screen_num: req.body.screen_num,
        slide_num: req.body.slide_num,
        isactive: req.body.isactive,
        slide_content: req.body.slide_content
    };
    Slides.create(screen, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.redirect('/slides');
    });
};

exports.update = function (req, res) {
    Slides.update(
        req.params.id,
        {
            place: req.body.place,
            screen_num: req.body.screen_num,
            slide_num: req.body.slide_num,
            isactive: req.body.isactive,
            slide_content: req.body.slide_content
        },
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log('Данные успешно обновлены!');
            res.redirect('/slides');
        }
    );
};

exports.delete = function (req, res) {
    Slides.delete(
        req.params.id,
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};

/*API*/
exports.APIall = function (req, res) {
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
    Slides.all(
        skip,
        size,
        function (err, docs) {
            if (err) {
                /*return res.sendStatus(500);*/
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

exports.APIadd = function (req, res) {
    let screen = {
        place: req.body.slide.place,
        screen_num: req.body.slide.screen_num,
        slide_num: req.body.slide.slide_num,
        isactive: req.body.slide.isactive,
        slide_content: req.body.slide.slide_content
    };

    Slides.create(screen, function (err, result) {
        let data = {
            resultCode: 1
        }
        if (err) {
            return res.sendStatus(500);
        }
        data.resultCode = 0;
        res.status(200).send(data);
    });
};

exports.APIdelete = function (req, res) {
    let data = {
        resultCode: 1
    }
    Slides.delete(
        req.params.id,
        function (err, result) {
            if (err) {
                console.log(err);
                return  result.status(500).send(data);
            }
            data.resultCode = 0;
            res.status(200).send(data);
        }
    );
};

exports.APIupdate = function (req, res) {
    let data = {
        resultCode: 1
    };
    Slides.update(
        req.params.id,
        {
            place: req.body.slide.place,
            screen_num: req.body.slide.screen_num,
            slide_num: req.body.slide.slide_num,
            isactive: req.body.slide.isactive,
            slide_content: req.body.slide.slide_content
        },
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            data.resultCode = 0;
            res.status(200).send(data);
        }
    );
};


exports.APIfindById = function (req, res) {
    Slides.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.APIfindByPlace = function (req, res) {
    let query = require('url').parse(req.url, true).query;
    let place = query.place;
    let num = query.num;
    Slides.findByPlace(place, num, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send({
            slides: doc,
            query: query.channel
        })
    });
};
