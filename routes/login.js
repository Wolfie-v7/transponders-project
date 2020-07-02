var express = require('express');
var router = express.Router();
const {user} = require('app')

router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/', function(req, res, next) {
    
});

module.exports = router