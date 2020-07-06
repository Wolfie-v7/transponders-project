var express = require('express');
var router = express.Router();
var user = {username: "tobias", password: "12345"};

router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    if(req.body.username != user.username)
        return res.send({error: 'username not found'});
    if(req.body.password != user.password)
        return res.send({error: 'wrong password'})
    res.redirect('/porter/home');
});

module.exports = router