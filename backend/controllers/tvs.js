var Tvs = require('../models/tvs');

exports.all = function(req, res) {
    Tvs.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('tvs',{
            tvs:docs
        })
    });
};
exports.indexall = function(req, res) {
    Tvs.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('index',{
            tvs:docs
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
    Tvs.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};