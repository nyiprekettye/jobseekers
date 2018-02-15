var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('underscore');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');


app.set('port', process.env.PORT || 8080);
app.set('jwtTokenSecret', '123456ABCDEF');
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    res.send('Hello World')
})

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
})