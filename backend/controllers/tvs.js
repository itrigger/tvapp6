const mongoose = require('mongoose');
const Tvs = require('../models/mongoose/tvs')

/*new version w mongoose*/
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
    Tvs.find()
        .skip(skip)
        .limit(size)
        .exec()
        .then(docs => {
            console.log(docs); /*del in prod*/
            if (docs){
                Tvs.countDocuments({},
                    function (err, count) {
                        if (err) {
                           console.log(err);
                           message = {
                               message: err,
                               resultCode: 1
                           }
                           res.status(500).send(message);
                        } else {
                            if (docs.length > 0) {
                                message = {
                                    items: docs,
                                    totalCount: count,
                                    resultCode: 0
                                };
                                res.status(200).send(message);
                            } else {
                                message = {
                                    message: 'No entries found',
                                    resultCode: 2
                                };
                                res.status(404).send(message);
                            }
                        }
                    });

            } else {
                message = {
                    message: 'No entries found',
                    resultCode: 2
                };
                res.status(400).send(message);
            }

        })
        .catch(err => {
            console.log(err);
            message = {
                message: err,
                resultCode: 2
            }
            res.status(500).send(message);
        });
}

/*new version w mongoose*/
exports.APIfindById = function(req, res) {
    const id = req.params.id;
    let message = {};
    Tvs.findById(id)
        .exec()
        .then(doc => {
            console.log(doc); /*del in prod*/
            if (doc){
                message = {
                    item: doc,
                    resultCode: 0
                };
                res.status(200).send(message);
            } else {
                message = {
                    message: 'No entries found',
                    resultCode: 2
                };
               res.status(400).send(message);
            }

        })
        .catch(err => {
            console.log(err);
            message = {
                message: err,
                resultCode: 1
            }
            res.status(500).send(message);
        });
}
/*new version w mongoose*/
exports.APIcreate = function(req, res) {
    const tvs = new Tvs({
       _id: new mongoose.Types.ObjectId,
       name: req.body.name,
       place: req.body.place,
       number: req.body.number,
       channel: req.body.channel,
       show: req.body.show,
       isactive: req.body.isactive
    });
    let message = {};
    tvs
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST request to /tvs",
                createdTvs: tvs
            })
        })
        .catch(err => {
            console.log(err);
            message = {
                message: err,
                resultCode: 1
            }
            res.status(500).send(message);
        });

}
/*new mongoose version*/
exports.APIupdate = function(req, res) {
    const id = req.params.id;
    const props = req.body;
    let message = {};
    Tvs.update({_id: id}, props)
        .exec()
        .then(result=>{
            console.log(result);
            if (result.ok > 0){
                res.status(200).send({resultCode:0, result: result});
            } else {
                res.status(200).send({resultCode:3, result:result});
            }

        })
        .catch(err => {
            console.log(err);
            message = {
                message: err,
                resultCode: 1
            }
            res.status(500).send(message);
        });
}

/*new mongoose*/
exports.APIdelete = function(req, res) {
    const id = req.params.id;
    let message = {
        resultCode: 1
    }
    Tvs.remove({_id:id})
        .exec()
        .then(result => {
            message = {
                message: result,
                resultCode: 0
            }
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            message = {
                message: err,
                resultCode: 1
            }
            res.status(500).send(message);
        });
}