// Get dependencies
const express = require('express'),
    path = require('path'),
    http = require('http'),
    bodyParser = require('body-parser'),
    main = require('./routes/main'),
    times = require('./routes/times'),
    app = express(),
    port = process.env.PORT || '3000';

// Stops the following error: 
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('access-Control-Allow-Origin', '*');
    next();
});

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

// Set api routes
app.use('/', main);
app.use('/times', times);

app.listen(port);