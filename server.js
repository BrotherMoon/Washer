const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 3000;
const model = require('./models');
const JSONUtil = require('./utils/JSONUtil');
const router = express.Router();

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.post('/custorm', function (req, res, next) {
    const {id, car_id, nickname, change_time, change_mile, sug_mile, oil_type} = req.body;
    model.custorm.create({
        id, id,
        car_id: car_id,
        nickname: nickname,
        change_time: change_time,
        change_mile: change_mile,
        sug_mile: sug_mile,
        oil_type: oil_type
    }).then((result) => {
        res.send(JSONUtil.resObject(JSONUtil.code.success, '', result))
    }).catch(err => next(err));
});

app.get('/custorm', function (req, res, next) {
    model.custorm.findAll().then((result) => {
        res.send(JSONUtil.resObject(JSONUtil.code.success, '', {custorm: result}))
    }).catch(err => next(err));
});

app.post('/delete', function (req, res, next) {
    const {id} = req.body;
    model.custorm.destroy({
        where: {
            id: id
        }
    }).then((result) => {
        res.send(JSONUtil.resObject(JSONUtil.code.success, '', result))
    }).catch(err => next(err));
});

app.post('/update', function (req, res, next) {
    const {id, car_id, nickname, change_time, change_mile, sug_mile, oil_type} = req.body;
    model.custorm.update({
        car_id: car_id,
        nickname: nickname,
        change_time: change_time,
        change_mile: change_mile,
        sug_mile: sug_mile,
        oil_type: oil_type
    }, {
        where: {
            id: id
        }
    }).then((result) => {
        res.send(JSONUtil.resObject(JSONUtil.code.success, '', result))
    }).catch(err => next(err));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})