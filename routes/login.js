var express = require('express');
var router = express.Router();
const {user} = require('app')

router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/', function(req, res, next) {
    if(req.body.username != user.username)
        return res.send({error: 'username not found'});
    if(req.body.password != user.password)
        return res.send({error: 'wrong password'})
    res.redirect('/porter/home');
});

module.exports = router