var Places = require('../models/places');

exports.all = function(req, res) {
    Places.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('places',{
            place:docs
        })
    });

};

exports.findById = function(req, res) {
    Places.findById(req.params.id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('places_edit',{
            place:doc
        })
    });
};

exports.create = function(req, res) {
    var place = {
        name: req.body.loc_name,
        description: req.body.loc_desc,
        isactive: '1'
    };
    Places.create(place, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.redirect('/places');
    });
};

exports.update = function(req, res) {
    Places.update(
        req.params.id,
        {
            name: req.body.loc_name,
            description: req.body.loc_desc,
            isactive: req.body.loc_isactive
        },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log('Данные успешно обновлены!');
            res.redirect('/places');
        }
    );
};

exports.delete = function(req, res) {
    Places.delete(
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
    Places.all(
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
    Places.findById(req.params.id, function(err, doc) {
        if (err) {
            message = {resultCode: 1};
            return res.status(500).send(message);
        }
        message = {
            count: doc.totalCount,
            items: doc.items,
            resultCode: 0
        };
        res.status(200).send(message);
    });
};

exports.APIcreate = function(req, res) {
    let place = {
        name: req.body.name,
        description: req.body.description,
        isactive: req.body.isactive
    };
    Places.create(place, function(err, result) {
        let data = {
            resultCode: 1
        }
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
    Places.update(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            isactive: req.body.isactive
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
    Places.delete(
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