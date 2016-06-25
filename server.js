var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var app = express();

mongoose.connect('mongodb://localhost:27017/forumProj');


app.use(session({
    secret: "beagle",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));


var userController = require('./controllers/user_controller.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use ('/user', userController);


app.get('/', function(req,res){
	if (req.session.username !== undefined) {
	res.redirect("/" + req.session.username)
	}
	else {
	res.redirect("/user/login")
	}
})


app.get('/:id', function(req, res){
	if (req.session.username !== undefined) {
	res.send("hi " + req.session.username + " your session is logged")
	}
	else {
	res.redirect("/user/login")
	}
})


app.get('/:id', function(req,res){

})

mongoose.connection.once('open', function(){
    console.log('connected to mongod');
})


app.listen(3000, function(){
    console.log('listening');
})