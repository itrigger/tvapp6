const timestamp = require('time-stamp');
const Schedule = require('./models/scheduler');
const Show = require('./models/show');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const errorhandler = require('errorhandler');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const placesController = require('./controllers/places');
const slidesController = require('./controllers/slides');
const tvsController = require('./controllers/tvs');
const showController = require('./controllers/show');
const scheduleController = require('./controllers/scheduler');
const UserController = require('./controllers/user');
const VerifyToken = require('./verifyToken');
const methodOverride = require('method-override');
const schedule = require('node-schedule');
const app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(methodOverride('_method'));
app.use('*', cors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
}));
app.use(bodyParser.urlencoded({extended: true}));



/*auth*/

const config = require('./config');
global.__root   = __dirname + '/';
app.get('/api', function (req, res) {
    res.status(200).send('API works.');
});


//https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/


app.get('/add_slide/', function (req, res) {
    res.render('slide_add', {
        // id: req.params.id+
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
app.post('/api/login', UserController.APIlogin); /*войти*/
app.get('/api/logout', UserController.APIlogout); /*выйти*/


app.get('/login', function (req, res) {
    res.render('auth_login', {

    });
});


app.get('/api/slides/',VerifyToken, slidesController.APIall); /*Список всех слайдов постранично*/
app.post('/api/slides/',VerifyToken, slidesController.APIadd); /*Добавить слайд*/
app.put('/api/slides/:id',VerifyToken, slidesController.APIupdate); /**/
app.get('/api/slides/:id',VerifyToken, slidesController.APIfindById); /*Открыть один конкретный слайд*/
app.delete('/api/slides/:id', slidesController.APIdelete); /*Удалить слайд*/
/*Роуты для ТВ экранов*/
app.get('/api/tvs/all',VerifyToken, tvsController.APIall); /*Получить все экраны*/
app.get('/api/tvs/:id', VerifyToken, tvsController.APIfindById);
app.post('/api/tvs', VerifyToken, tvsController.APIcreate);
app.put('/api/tvs/:id', VerifyToken, tvsController.APIupdate);
app.delete('/api/tvs/:id', VerifyToken, tvsController.APIdelete);
/*Роуты для локаций*/
app.get('/api/places/all', VerifyToken, placesController.APIall);
app.get('/api/places/:id', VerifyToken, placesController.APIfindById);
app.post('/api/places', VerifyToken, placesController.APIcreate);
app.put('/api/places/:id', VerifyToken, placesController.APIupdate);
app.delete('/api/places/:id', VerifyToken, placesController.APIdelete);
/*Роуты для воспроизведения и апдейта*/
app.get('/api/play/', showController.findByPlaceAndNum); /*Воспроизвести слайды на выбранном экране*/
app.get('/api/update/', VerifyToken, slidesController.reload); /*Обновить без перезагрузки через Pusher*/



/*Роуты для локаций*/
app.get('/places', VerifyToken, placesController.all);
app.get('/places/:id', VerifyToken, placesController.findById);
app.post('/places', VerifyToken, placesController.create);
app.put('/places/:id', VerifyToken, placesController.update);
app.delete('/places/:id', VerifyToken, placesController.delete);

/*Роуты для воспроизведения и апдейта*/
app.get('/play/:place', VerifyToken, showController.findByPlaceAndNum, scheduleController.test); /*Воспроизвести слайды на выбранном экране*/
app.get('/update/:channel', VerifyToken, slidesController.reload); /*Обновить без перезагрузки через Pusher*/

/*Роуты для слайдов*/
app.get('/slides', VerifyToken, slidesController.all); /*OK Посмотреть все слайды*/
app.get('/slides/:id', VerifyToken, slidesController.findById); /*OK Открыть один конкретный слайд*/
app.post('/slides', VerifyToken, slidesController.create); /*OK Создать новый слайд*/
app.put('/slides/:id', VerifyToken, slidesController.update); /*OK Обновить слайд*/
app.delete('/slides/:id', VerifyToken, slidesController.delete); /*OK Удалить слайд*/

/*Роуты для ТВ экранов*/
app.get('/',  tvsController.indexall);
app.get('/tvs', VerifyToken, tvsController.all);
app.get('/tvs/:id', VerifyToken, tvsController.findById);
app.post('/tvs', VerifyToken, tvsController.create);
app.put('/tvs/:id', VerifyToken, tvsController.update);
app.delete('/tvs/:id', VerifyToken, tvsController.delete);

/*Роуты для шоу*/
app.get('/api/show', VerifyToken, showController.APIall); /*Список всех шоу*/
app.get('/api/show/:id', VerifyToken, showController.APIfindById); /*Поиск шоу по ИД*/
app.post('/api/show', VerifyToken, showController.APIcreate); /*Создание нового шоу*/
app.put('/api/show/:id', VerifyToken, showController.APIupdate); /*Обновление шоу по ИД*/
app.delete('/api/show/:id', VerifyToken, showController.APIdelete); /*Удаление шоу по ИД*/

/*Роуты для событий*/
app.get('/api/schedule', VerifyToken, scheduleController.all);
app.get('/api/schedule/:time', VerifyToken, scheduleController.findByTime);
app.put('/api/schedule/:id', VerifyToken, scheduleController.update);
app.get('/api/schedule/:id', VerifyToken, scheduleController.findById);
app.post('/api/schedule', VerifyToken, scheduleController.create);
app.delete('/api/schedule/:id', VerifyToken, scheduleController.delete);

/*
app.use(function (req, res) {
   res.send(404, 'Page not found');
});*/

/*Расписание*/
const Pusher = require('pusher');

const channels_client = new Pusher({
    appId: '785932',
    key: '715c895bb7ce1e7fa171',
    secret: 'd9882d9bf171816308ff',
    cluster: 'ap2',
    useTLS: true
});


function runSchedule(){
    let timer = schedule.scheduleJob('*/1 * * * *', function(){
        let curtime = timestamp('YYYYMMDDHHmm'); //getting current time
        console.log('curtime is ' + curtime);
        /*search in db collection 'scheduler' current time in range*/
        Schedule.findByTime(curtime, function(err, doc) {
            if (err) {
                console.log(err);
            }
            if(doc.totalCount > 0){
                for (let i=0;i<doc.totalCount;i++){
                    if(curtime <= doc.schedule[i].endtime){
                        if(doc.schedule[i].online === "1"){

                        } else {
                            Schedule.changeOnlineStatus(doc.schedule[i]._id, {
                                name: doc.schedule[i].name,
                                description: doc.schedule[i].description,
                                starttime: doc.schedule[i].starttime,
                                isactive: doc.schedule[i].isactive,
                                endtime: doc.schedule[i].endtime,
                                periodic: doc.schedule[i].periodic,
                                show: doc.schedule[i].show,
                                channel: doc.schedule[i].channel,
                                online: "1"
                            }, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('Данные успешно обновлены!');
                            });
                            console.log('обновляем show');
                            channels_client.trigger(doc.schedule[i].channel, 'my-event', {
                                "message": doc.schedule[i]
                            });
                        }
                    } else {
                        if(doc.schedule[i].online === "1"){
                            Schedule.changeOnlineStatus(doc.schedule[i]._id, {
                                name: doc.schedule[i].name,
                                description: doc.schedule[i].description,
                                starttime: doc.schedule[i].starttime,
                                isactive: doc.schedule[i].isactive,
                                endtime: doc.schedule[i].endtime,
                                periodic: doc.schedule[i].periodic,
                                show: doc.schedule[i].show,
                                channel: doc.schedule[i].channel,
                                online: "0"
                            }, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('Данные успешно обновлены!');
                            })
                            /*возвращаем пред слайдшоу*/
                            Show.findByChannel(doc.schedule[i].channel, function (err, doc1) {
                                channels_client.trigger(doc.schedule[i].channel, 'my-event', {
                                    "message": doc1
                                });
                            })
                        } else {

                        }
                    }
                }
            } else {
                /*do nothing while*/
            }
        });
    });
}

runSchedule();



if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler({log: errorNotification}))
}

/*Backend notification*/
function errorNotification(err, str, req) {
    let title = 'Error in ' + req.method + ' ' + req.url;

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
* 1. ++++++ Авторизация
* 2. Выпадающие списки для выбора уже созданных сущностей
* 3. Распределение прав (каждый пользователь должен видеть свои экраны и слайды)
* AUTHORIZED_USER = Чтение и управление собственными записями
* ADMIN = Управление всеми записями
* 4. ++++++ Более наглядное представление экранов
* 5. Таймеры и время показа
* */

/*
ERROR CODES
1 - DATABASE ERROR
2 - NOT FOUND
10- AUTH ERROR
*/

/*
* 
* */

module.exports = app;