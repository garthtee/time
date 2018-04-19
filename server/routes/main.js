var express = require('express');
var router = express.Router();
module.exports = router; // Used for defining express routes

// Get API status
router.get('/', function(req, res) {
    console.log('API is live!');
    res.send(JSON.stringify({ status: 'ok' }));
});