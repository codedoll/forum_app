var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')

var User =  require('../models/user_model.js')

router.get('/register', function (req, res) {
	User.create(req.body, function(err, data){
	res.render("./user/user_register.ejs");
    })

})




router.get('/login', function (req, res) {
	res.send("login");

})

router.post('/login', function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function() {
        res.send(req.body);
    })
})
	
module.exports = router;