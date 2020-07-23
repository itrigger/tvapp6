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
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
//const db = require('./db');

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

app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});
app.use('*', cors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

/*auth*/

const config = require('./config');
global.__root   = __dirname + '/';

app.get('/api/1.0', function (req, res) {
    res.status(200).send('API works.');
});


//https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/


/*app.get('/add_slide/', function (req, res) {
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
});*/


/*Роуты для API (СДЕЛАТЬ ВЕРСИЮ 1,0)*/
app.post('/api/1.0/auth/register', UserController.APIadd); /*создать юзера*/
app.get('/api/1.0/me', VerifyToken, UserController.APIgetMe); /*получить юзера*/
app.post('/api/1.0/login', UserController.APIlogin); /*войти*/
app.get('/api/1.0/logout', UserController.APIlogout); /*выйти*/


/*app.get('/login', function (req, res) {
    res.render('auth_login', {

    });
});*/

/**//*Добавить верификацию*//**/
app.get('/api/1.0/slides/', slidesController.APIall); /*Список всех слайдов постранично*/
app.post('/api/1.0/slides/',VerifyToken, slidesController.APIadd); /*Добавить слайд*/
app.put('/api/1.0/slides/:id',VerifyToken, slidesController.APIupdate); /**/
app.get('/api/1.0/slides/:id', slidesController.APIfindById); /*Открыть один конкретный слайд*/
app.delete('/api/1.0/slides/:id', VerifyToken, slidesController.APIdelete); /*Удалить слайд*/
/*Routes for TV screens*/
app.get('/api/1.0/tvs/all',VerifyToken, tvsController.APIall); /*Get all TV screens*/
app.get('/api/1.0/tvs/:id', VerifyToken, tvsController.APIfindById); /*Get one TV screen by ID*/
app.post('/api/1.0/tvs', VerifyToken, tvsController.APIcreate); /*Create TV screen*/
app.patch('/api/1.0/tvs/:id', VerifyToken, tvsController.APIupdate); /*Update TV screen by ID*/
app.delete('/api/1.0/tvs/:id', VerifyToken, tvsController.APIdelete); /*Delete TV screen by ID*/
/*Роуты для локаций*/
app.get('/api/1.0/places/all', VerifyToken, placesController.APIall);
app.get('/api/1.0/places/:id', VerifyToken, placesController.APIfindById);
app.post('/api/1.0/places', VerifyToken, placesController.APIcreate);
app.put('/api/1.0/places/:id', VerifyToken, placesController.APIupdate);
app.delete('/api/1.0/places/:id', VerifyToken, placesController.APIdelete);
/*Роуты для воспроизведения и апдейта*/
app.get('/api/1.0/play/', showController.findByPlaceAndNum); /*Воспроизвести слайды на выбранном экране*/
app.get('/api/1.0/update/', VerifyToken, slidesController.reload); /*Обновить без перезагрузки через Pusher*/



/*Роуты для локаций*/
/*app.get('/places', VerifyToken, placesController.all);
app.get('/places/:id', VerifyToken, placesController.findById);
app.post('/places', VerifyToken, placesController.create);
app.put('/places/:id', VerifyToken, placesController.update);
app.delete('/places/:id', VerifyToken, placesController.delete);*/

// /*Роуты для воспроизведения и апдейта*/
// app.get('/play/:place', VerifyToken, showController.findByPlaceAndNum, scheduleController.test); /*Воспроизвести слайды на выбранном экране*/
// app.get('/update/:channel', VerifyToken, slidesController.reload); /*Обновить без перезагрузки через Pusher*/

/*Роуты для слайдов*/
/*app.get('/slides', VerifyToken, slidesController.all); /!*OK Посмотреть все слайды*!/
app.get('/slides/:id', VerifyToken, slidesController.findById); /!*OK Открыть один конкретный слайд*!/
app.post('/slides', VerifyToken, slidesController.create); /!*OK Создать новый слайд*!/
app.put('/slides/:id', VerifyToken, slidesController.update); /!*OK Обновить слайд*!/
app.delete('/slides/:id', VerifyToken, slidesController.delete); /!*OK Удалить слайд*!/*/

/*Роуты для ТВ экранов*/
// app.get('/',  tvsController.indexall);
// app.get('/tvs', VerifyToken, tvsController.all);
// app.get('/tvs/:id', VerifyToken, tvsController.findById);
// app.post('/tvs', VerifyToken, tvsController.create);
// app.put('/tvs/:id', VerifyToken, tvsController.update);
// app.delete('/tvs/:id', VerifyToken, tvsController.delete);

/*Роуты для шоу*/
app.get('/api/1.0/show', VerifyToken, showController.APIall); /*Список всех шоу*/
app.get('/api/1.0/show/:id', showController.APIfindById); /*Поиск шоу по ИД*/
app.post('/api/1.0/show', VerifyToken, showController.APIcreate); /*Создание нового шоу*/
app.put('/api/1.0/show/:id', VerifyToken, showController.APIupdate); /*Обновление шоу по ИД*/
app.delete('/api/1.0/show/:id', VerifyToken, showController.APIdelete); /*Удаление шоу по ИД*/

/*Роуты для событий*/
app.get('/api/1.0/schedules', VerifyToken, scheduleController.all);
//app.get('/api/1.0/schedules/:time', VerifyToken, scheduleController.findByTime);
app.put('/api/1.0/schedules/:id', VerifyToken, scheduleController.update);
app.get('/api/1.0/schedules/:id', VerifyToken, scheduleController.findById);
app.post('/api/1.0/schedules', VerifyToken, scheduleController.create);
app.delete('/api/1.0/schedules/:id', VerifyToken, scheduleController.delete);

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
        let moment = require('moment');
        let curtime = moment().format();
        console.log("Время сервера: " + moment(curtime).format('D/MM/YYYY, HH:mm:ss'));
        /*search in db collection 'scheduler' current time in range*/
        Schedule.findByTime(curtime, function(err, doc) {
            if (err) {
                console.log(err);
            }
            if(doc.totalCount > 0){
                for (let i=0;i<doc.totalCount;i++){
                    if(moment(curtime).format('D/MM/YYYY, HH:mm') <= moment(doc.schedule[i].endtime).format('D/MM/YYYY, HH:mm')){
                        if(doc.schedule[i].online === "1"){
                            /*do nothing while*/
                        } else {
                            Schedule.changeOnlineStatus(doc.schedule[i]._id, {
                                name: doc.schedule[i].name, description: doc.schedule[i].description, starttime: doc.schedule[i].starttime,
                                isactive: doc.schedule[i].isactive, endtime: doc.schedule[i].endtime, periodic: doc.schedule[i].periodic,
                                show: doc.schedule[i].show, channel: doc.schedule[i].channel, online: "1"
                            }, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            console.log('Шоу отправлено на экран ' + doc.schedule[i].channel);
                            channels_client.trigger(doc.schedule[i].channel, 'my-event', {
                                "message": doc.schedule[i]
                            });
                        }
                    } else {
                        if(doc.schedule[i].online === "1"){
                            Schedule.changeOnlineStatus(doc.schedule[i]._id, {
                                name: doc.schedule[i].name, description: doc.schedule[i].description, starttime: doc.schedule[i].starttime,
                                isactive: doc.schedule[i].isactive, endtime: doc.schedule[i].endtime, periodic: doc.schedule[i].periodic,
                                show: doc.schedule[i].show, channel: doc.schedule[i].channel, online: "0"
                            }, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('Шоу убрано с экрана ' + doc.schedule[i].channel);
                            });
                            /*возвращаем пред слайдшоу*/
                            Show.findByChannel(doc.schedule[i].channel, function (err, doc1) {
                                channels_client.trigger(doc.schedule[i].channel, 'my-event', {
                                    "message": doc1
                                });
                            })
                        } else {
                            /*do nothing while*/
                        }
                    }
                }
            } else {
                /*do nothing while*/
            }
        });
    });
}
/*
runSchedule();
*/


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

/*db.connect('mongodb://trigger_kst:yakm1712@cluster0-shard-00-00-c2fuc.mongodb.net:27017,cluster0-shard-00-01-c2fuc.mongodb.net:27017,cluster0-shard-00-02-c2fuc.mongodb.net:27017/tvscreens?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function () {
        console.log('API app started');
    });
});*/

mongoose.connect('mongodb://trigger_kst:yakm1712@cluster0-shard-00-00-c2fuc.mongodb.net:27017,cluster0-shard-00-01-c2fuc.mongodb.net:27017,cluster0-shard-00-02-c2fuc.mongodb.net:27017/tvscreens?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

app.listen(3012, function () {
    console.log('API app started');
});




/*
* TODO
* 1. ++++++ Авторизация
* 2. Выпадающие списки для выбора уже созданных сущностей
* 3. Распределение прав (каждый пользователь должен видеть свои экраны и слайды)
* AUTHORIZED_USER = Чтение и управление собственными записями
* ADMIN = Управление всеми записями
* 4. ++++++ Более наглядное представление экранов
* 5. ++++++Таймеры и время показа
* 6. Сделать проверку при ручном обновлении экрана, если экран уже в "активе", то и загружать шоу из актива
* 7. Сделать обработку ошибок, когда сервер недоступен, выводить экран с лого и пытаться подключиться
* */

/*
ERROR CODES
0 - SUCCESS
1 - DATABASE ERROR
2 - NOT FOUND
3 - NOT MODIFIED
10- AUTH ERROR
*/

/*
* 
* */

module.exports = app;