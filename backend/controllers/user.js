const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

//router.use(bodyParser.urlencoded({ extended: true }));


// CREATES A NEW USER
exports.APIadd = function(req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    User.APIadd(user, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //res.redirect('/places');
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
};

exports.APIgetMe = function(req, res, next) {
    let token = localStorage.getItem('token');

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.APIgetMe(decoded.id, function (err, user) {
            let data = {
                resultCode: '1',
                user: user
            }
            if (err){
                data.resultCode = '1'; //resultCode = 1 ERROR
            }
            if (!user) {
                data.resultCode = '2'; //resultCode = 1 NOT FOUND
            }
            user.password = '0';
            data.resultCode = 0;
            data.user = user;
            res.status(200).send(data);
        });
    });
};



exports.APIlogin = function (req, res) {
    User.APIlogin({email: req.body.email}, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
        res.status(200).send({ auth: true, token: token });
    });
};

exports.APIlogout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};

/*

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /!* VerifyToken, *!/ function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


*/
