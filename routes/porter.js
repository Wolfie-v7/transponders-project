var express = require('express');
var router = express.Router();

router.get('/home', function(req, res, next) {
    res.render('porter-home');
});

router.get('/transponders', function(req, res, next) {
    res.render('porter-transponders');
});

module.exports = router;