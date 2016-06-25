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
        res.redirect("/");
    } else {
        res.render("./user/user_login.ejs");
    }

})

router.post('/login', function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function() {
        req.session.username = req.body.username;
        res.redirect("login")

    })
})

module.exports = router;
