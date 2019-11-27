var Tvs = require('../models/tvs');

exports.all = function(req, res) {
    Tvs.all(0,10,function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('tvs',{
            tvs:docs.items
        })
    });
};
exports.indexall = function(req, res) {
    Tvs.all(0,10,function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('index',{
            tvs:docs.items
        })
    });
};
exports.findById = function(req, res) {
    Tvs.findById(req.params.id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('tvs_edit',{
            tvs:doc
        })
    });
};

exports.create = function(req, res) {
    var tv = {
        place: req.body.tv_place,
        number: req.body.tv_num,
        channel: req.body.tv_channel,
        isactive: '1'
    };
    Tvs.create(tv, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.redirect('/tvs');
    });
};

exports.update = function(req, res) {
    Tvs.update(
        req.params.id,
        {
            place: req.body.tv_place,
            number: req.body.tv_number,
            channel: req.body.tv_channel,
            isactive: req.body.tv_isactive
        },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log('Данные успешно обновлены!');
            res.redirect('/tvs');
        }
    );
};

exports.delete = function(req, res) {
    Tvs.delete(
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

exports.APIall = function(req, res) {
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
    Tvs.all(
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