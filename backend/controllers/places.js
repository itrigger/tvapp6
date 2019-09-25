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