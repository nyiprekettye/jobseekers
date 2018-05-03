const express = require('express');
const http = require('http');
const path = require('path');
const _ = require('underscore');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
//var React = require('react')
//var ReactDOM = require('react-dom')
import jobseekers from './server/routes/jobseekers';
import company from './server/routes/company';
import admin from './server/routes/admin';
import anonymous from './server/routes/anonymous';


app.set('port', process.env.PORT || 8080);
app.set('jwtTokenSecret', '123456ABCDEF');
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname + 'company/', './dist')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));


app.use('/api/jobseekers', jobseekers);
app.use('/api/company', company);
app.use('/api/admin', admin);
app.use('/api/anonymous', anonymous);

app.get('/*app.bundle.js', (req, res) => {
    console.log('Serving app.bundle.js: ', req.url);
    res.sendFile(__dirname + '/dist/app.bundle.js');
});

app.get('/*', (req, res) => {
    console.log('Serving ', req.url);
    res.sendFile(__dirname + '/dist/app.html');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});