//var express = require('express');
//var app = express();
//app.use(express.static(__dirname + '/public'));
//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//app.listen(port, ipaddress);
//
//require("./public/assignment/server/app.js")(app);

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var multer = require('multer');
//var passport = require('passport');
//var LocalStrategy = require('passport-local');

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: 'ravi'}));
app.use(cookieParser('ravi'));
//app.use(passport.initialize());
//app.use(passport.session());

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);