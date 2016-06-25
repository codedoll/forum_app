var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user_model.js')


router.get('/register', function(req, res) {
    if (req.session.username !== undefined) {
        res.redirect("/");
    } else {
        User.create(req.body, function(err, data) {
            res.render("./user/user_register.ejs");
        })
    }
})

router.get('/login', function(req, res) {
    if (req.session.username !== undefined) {
        User.findOne({ username: req.body.username }, function(err, foundUser) {
            req.session.username = foundUser.username;
            res.redirect("/")

        })

    } else {
        res.render("./user/user_login.ejs");
    }

})

router.post('/register', function(req, res) {
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
