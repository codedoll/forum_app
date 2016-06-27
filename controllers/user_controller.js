var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user_model.js')
var Forum = require('../models/forum_model.js')

router.get('/register', function(req, res) {
    if (req.session.username !== undefined) {
        res.redirect("/");
    } else {
        User.create(req.body, function(err, data) {
            res.render("./user/user_register.ejs");
        })
    }
})



router.post('/register', function(req, res) {
        req.session.username = req.body.username
        User.create(req.body, function(err, data){        
            res.send(data)
        // req.session.username = req.body.username;
        // res.redirect("/")
    })
})



router.post('/login', function(req, res) {
    User.findOne({ "username": req.body.username }, function(err, foundUser) {
        if (foundUser === null) {
            res.send("wrong login")
        } else if (foundUser.username === req.body.username) {
            req.session.username = req.body.username;
            res.redirect("/")
        }
    })
})


module.exports = router;
