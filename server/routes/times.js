var mysql = require('mysql');
var config = require('./config');
var express = require('express');
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
        res.send(JSON.stringify({ result }));
    });
});