var express = require('express');
var router = express.Router();
const url = require('url');

const status = {
    AVAILABLE: 'Verfügbar',
    RENTED: 'Ausgeliehen'
}
const transponders = [
    {
        transponderNr: 1,
        roomNr: '1.100',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 2,
        roomNr: '1.101',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 3,
        roomNr: '1.102',
        status: status.RENTED,
        rentingDate: '02.03.2020'
    },
    {
        transponderNr: 4,
        roomNr: '1.103',
        status: status.RENTED,
        rentingDate: '24.03.2020'
    },
    {
        transponderNr: 5,
        roomNr: '1.105',
        status: status.RENTED,
        rentingDate: '14.04.2020'
    },
    {
        transponderNr: 6,
        roomNr: '1.106',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 7,
        roomNr: '1.107',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 8,
        roomNr: '1.108',
        status: status.RENTED,
        rentingDate: '09.02.2020'
    },
    {
        transponderNr: 9,
        roomNr: '1.110',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 10,
        roomNr: '1.111',
        status: status.RENTED,
        rentingDate: '02.05.2020'
    },
    {
        transponderNr: 11,
        roomNr: '1.112',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 12,
        roomNr: '1.113',
        status: status.AVAILABLE,
        rentingDate: '-'
    },
    {
        transponderNr: 13,
        roomNr: '1.115',
        status: status.RENTED,
        rentingDate: '17.03.2020'
    }
]

const students = [
    {
        name: 'Sam',
        surname: 'Fischer',
        email: 's.fischer@smail_thkoeln.de',
        matNr: 11457235,
        allowedTransponders: [transponders.find(tr => tr.transponderNr == 13), transponders.find(tr => tr.transponderNr == 11)],
    },

    {
        name: 'Sommer',
        surname: 'Böhm',
        email: 's.boehm@smail_thkoeln.de',
        matNr: 12389457,
        allowedTransponders: [],
    },
];

router.get('/home', function(req, res, next) {
    res.render('porter-home');
});

router.get('/rent', function(req, res, next) {
    const search = url.parse(req.url, true).query.search
    console.log(search);
    const student = students.find((student) => {
        return student.matNr == search;
    });
    if(!student | !search) return res.render("porter-rent");
    return res.render('porter-rent-result', {result: student});
});

router.post('/rent', function(req, res, next) {
    console.log(req.body);
    const transponder = req.body.transponderNr;
    transponders.find(tr => tr.transponderNr == transponder).status = status.RENTED;
    res.redirect("back");
    
});



router.get('/transponders', function(req, res, next) {
    const filter = url.parse(req.url, true).query.filter
    const search = url.parse(req.url, true).query.search

    if(search) {
        return res.render('porter-transponders', {list: transponders.filter((tr)=>{return tr.roomNr == search | tr.transponderNr.toString() == search})})
    }

    if(filter) {
        switch(filter) {
            case "all": return res.render('porter-transponders', {list: transponders, filter: "all"});
            case "available": return res.render('porter-transponders', {list: transponders.filter((tr) => {return tr.status == status.AVAILABLE}), filter: "available"});
            case "rented": return res.render('porter-transponders', {list: transponders.filter((tr) => {return tr.status == status.RENTED}), filter: "rented"});
        }
    }
    return res.render('porter-transponders', {list: transponders});
});


module.exports = router;