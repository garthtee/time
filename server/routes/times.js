var mysql = require('mysql');
var config = require('./config');
var express = require('express');
var moment = require('moment');
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
var router = express.Router();
module.exports = router; // Used for defining express routes

var connection = mysql.createConnection({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
});

connection.connect(function(err) {
    if (err) {
        console.error(`Error connecting ${err.stack}.`);
        return;
    }

    console.log(`ID ${connection.threadId} connected.`);
});

/**
 * POST: Add a time 
 */
router.post('/add', (req, res) => {

    var startTime = req.body.startTime;
    var finishTime = req.body.finishTime;
    var breakTime = req.body.breakTime;

    breakTime = breakTime == '' ? 0 : breakTime;

    const time = {
        startTime,
        finishTime,
        breakTime
    };
                
    var sql = 'INSERT INTO times SET ?;';
    
    connection.query(sql, [time], (err, result) => {
        if (err) throw err;
        console.log('1 record insterted');
        res.send(JSON.stringify({ result: '1 record inserted' }));
    });
});

/**
 * GET: List all times
 */
router.get('/all', (req, res) => {

    var sql = 'SELECT * FROM times;'; 
    connection.query(sql, (err, result) => {
        if (err) throw err;

        var totalDuration = moment.duration();

        // Work out difference between times
        result.forEach(element => {
            var start = moment.utc(element.startTime, "HH:mm");
            var end = moment.utc(element.finishTime, "HH:mm");

            // Account for crossing over to midnight the next day
            if (end.isBefore(start)) end.add(1, 'day');

            // Get duration and subtract break time
            var duration = moment.duration(end.diff(start));
            duration.subtract(element.breakTime, 'minutes');

            // Add difference to the json
            element.difference = moment.utc(+ duration).format('HH:mm');

            // Add this duration to the total
            totalDuration = totalDuration.add(duration);
        });

        var total = (totalDuration).format('HH:mm');

        res.json({ result, total });
    });
});