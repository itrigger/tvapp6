const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const errorhandler = require('errorhandler');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const jwt = require('jsonwebtoken');
const placesController = require('./controllers/places');
const slidesController = require('./controllers/slides');
const tvsController = require('./controllers/tvs');
const scheduleController = require('./controllers/scheduler');

const app = express();
const methodOverride = require('method-override');
let VerifyToken = require('./verifyToken');


// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(methodOverride('_method'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));



/*auth*/
let UserController = require('./controllers/user');
let AuthController = require('./controllers/auth');



const config = require('./config');
global.__root   = __dirname + '/';
app.get('/api', function (req, res) {
    res.status(200).send('API works.');
});


/*app.use('/api/users', UserController);

app.use('/api/auth', AuthController);*/
/**/


//https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/


app.get('/add_slide/', function (req, res) {
    res.render('slide_add', {
        // id: req.params.id
    });
});
app.get('/add_place/', function (req, res) {
    res.render('places_add', {
        // id: req.params.id
    });
});
app.get('/add_tv/', function (req, res) {
    res.render('tvs_add', {
        // id: req.params.id
    });
});
app.get('/add_schedule/', function (req, res) {
    res.render('schedule_add', {
        // id: req.params.id
    });
});


/*Роуты для API (СДЕЛАТЬ ВЕРСИЮ 1,0)*/
app.post('/api/auth/register', UserController.APIadd); /*создать юзера*/
app.get('/api/me', VerifyToken, UserController.APIgetMe); /*получить юзера*/
app.post('/api/login', UserController.APIlogin); /*получить юзера*/
app.get('/api/logout', UserController.APIlogout); /*получить юзера*/

app.get('/api/tvs/all', tvsController.APIall); /*Получить все экраны*/
app.get('/api/slides/', slidesController.APIall); /*Список всех слайдов постранично*/
app.post('/api/slides/', slidesController.APIadd); /*Добавить слайд*/
app.put('/api/slides/:id', slidesController.APIupdate); /**/
app.get('/api/slides/:id', slidesController.APIfindById); /*Открыть один конкретный слайд*/
app.delete('/api/slides/:id', slidesController.APIdelete); /*Удалить слайд*/

/*Роуты для локаций*/
app.get('/places', VerifyToken, placesController.all);
app.get('/places/:id', placesController.findById);
app.post('/places', placesController.create);
app.put('/places/:id', placesController.update);
app.delete('/places/:id', placesController.delete);

/*Роуты для воспроизведения и апдейта*/
app.get('/play/:place', slidesController.findByPlace, scheduleController.test); /*Воспроизвести слайды на выбранном экране*/
app.get('/update/:channel', slidesController.reload); /*Обновить без перезагрузки через Pusher*/

/*Роуты для слайдов*/
app.get('/slides', slidesController.all); /*OK Посмотреть все слайды*/
app.get('/slides/:id', slidesController.findById); /*OK Открыть один конкретный слайд*/
app.post('/slides', slidesController.create); /*OK Создать новый слайд*/
app.put('/slides/:id', slidesController.update); /*OK Обновить слайд*/
app.delete('/slides/:id', slidesController.delete); /*OK Удалить слайд*/

/*Роуты для ТВ экранов*/
app.get('/', tvsController.indexall);
app.get('/tvs', tvsController.all);
app.get('/tvs/:id', tvsController.findById);
app.post('/tvs', tvsController.create);
app.put('/tvs/:id', tvsController.update);
app.delete('/tvs/:id', tvsController.delete);

/*Роуты для событий*/
app.get('/schedule', scheduleController.all);
app.put('/schedule/:id', scheduleController.update);
app.get('/schedule/:id', scheduleController.findById);
app.post('/schedule', scheduleController.create);
app.delete('/schedule/:id', scheduleController.delete);

/*
app.use(function (req, res) {
   res.send(404, 'Page not found');
});*/

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler({log: errorNotification}))
}

function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url

    notifier.notify({
        title: title,
        message: str
    })
}

db.connect('mongodb://trigger_kst:yakm1712@cluster0-shard-00-00-c2fuc.mongodb.net:27017,cluster0-shard-00-01-c2fuc.mongodb.net:27017,cluster0-shard-00-02-c2fuc.mongodb.net:27017/tvscreens?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function () {
        console.log('API app started');
    });
});

/*
* TODO
* 1. Авторизация
* 2. Выпадающие списки для выбора уже созданных сущностей
* 3. Распределение прав?
* 4. Более наглядное представление экранов
* 5. Таймеры и время показа
* */

module.exports = app;