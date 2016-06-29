var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var moment = require('moment');
var bcrypt = require('bcrypt');
var validate = require('express-jsonschema').validate;

var methodOverride = require('method-override');
var port = process.env.PORT || 3000
var MONGODBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forumProj'

var app = express();

var User = require('./models/user_model.js')
var Forum = require('./models/forum_model.js')


mongoose.connect(MONGODBURI);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(session({
    secret: "beagle",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));


var userController = require('./controllers/user_controller.js')
var forumController = require('./controllers/forum_controller.js')
var validate = require("./userValidate");

 app.use(bodyParser.json());

app.use('/user', userController);

app.use('/forum', forumController);

app.get('/', validate, function(req, res) {
        res.redirect("/" + req.session.username)

})



app.post('/', validate, function(req, res) {
    req.session.username = req.body.username
    User.create(req.body, function(err, data) {
        res.redirect("/")

    })
})


app.get('/register', function(req, res) {
    if (req.session.username !== undefined) {
            req.session.username = req.body.username
            res.redirect("/");
    } else {
        User.create(req.body, function(err, data) {
            res.render("user/user_register.ejs");
        })
    }
})


// router.post('/', function(req, res){
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//     User.create(req.body, function(err, data){
//         res.redirect('/');
//     })
// });

// router.post('/register', function(req, res) {
//         req.session.username = req.body.username
//         User.create(req.body, function(err, data){        
//             res.send(data)
//         // req.session.username = req.body.username;
//         // res.redirect("/")
//     })
// })

app.post('/register', function(req, res) {
        req.session.username = req.body.username
        User.create(req.body, function() {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                res.redirect("/")
        })
    })


app.get('/login', function(req, res) {

        res.render("user/user_login.ejs")


})



app.post('/login', function(req, res) {
    User.findOne({ "username": req.body.username }, function(err, foundUser) {
        if (foundUser === null) {
            res.send("wrong login")
        } else if (foundUser.username === req.body.username) {
            
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {

                req.session.username = req.body.username;
                res.redirect("/")
            }

            else {
                res.send("wrong password")
            }
        }
    })
})


app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect("/login");
});



app.get('/:id', validate, function(req, res) {
    if (req.session.username === req.params.id) {
                        Forum.find(function(err, forumData) {

            User.findOne({ username: req.params.id }, function(err, foundUser) {

                res.render('index.ejs', {
                    forumData : forumData,
                    username: req.session.username,
                    foundUser: foundUser
                })
            })
                 })
}
})


mongoose.connection.once('open', function() {
    console.log('connected to mongod');
})


app.listen(port, function() {
    console.log('listening');
})
