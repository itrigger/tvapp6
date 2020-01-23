let Show = require('../models/show');

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
    Show.all(
        skip,
        size,
        function (err, docs) {
            if (err) {
                /*return res.sendStatus(500);*/
                message = {resultCode: 1};
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

exports.APIfindById = function(req, res) {
    let message = {};
    Show.findById(req.params.id, function(err, doc) {
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

exports.APIcreate = function(req, res) {
    let show = {
        name: req.body.show.name,
        description: req.body.show.description,
        slides: req.body.show.slides,
        effect: req.body.show.effect
    };
    console.log(show);
    Show.create(show, function(err, result) {
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

exports.APIupdate = function(req, res) {
    let data = {
        resultCode: 1
    };
    Show.update(
        req.params.id,
        {
            name: req.body.show.name,
            description: req.body.show.description,
            slides: req.body.show.slides,
            effect: req.body.show.effect
        },
        function(err, result) {
            if (err) {
                return result.status(500).send(data);
            }
            data.resultCode = 0;
            res.status(200).send(data);
        }
    );
};

exports.APIdelete = function(req, res) {
    let data = {
        resultCode: 1
    }
    Show.delete(
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


exports.findByPlaceAndNum = function (req, res) {
    let query = require('url').parse(req.url, true).query;
    let place = query.place;
    let num = query.num;
    Show.findByPlace(place, num, function (err, doc) {
        if (err) {
            console.log(err);
            return res.send({resultCode: 1});
        }
        res.send({
            resultCode: 0,
            showID: doc.show,
            query: query.channel
        })
    });
};

