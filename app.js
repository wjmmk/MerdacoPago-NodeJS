require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//importamos el controller
const PaymentController = require("./controllers/PaymentController");
//importamos el service
const PaymentService = require("./services/PaymentService"); 
// Permitimos que el controller pueda usar el service
const PaymentInstance = new PaymentController(new PaymentService()); 


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/payment/new', (req, res) => PaymentInstance.getMercadoPAgoLink(req, res))
app.post('/webhook', (req, res) => PaymentInstance.webhook(req, res))

module.exports = app;
