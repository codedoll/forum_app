var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user_model.js')
var Forum = require('../models/forum_model.js')
var Comment = require('../models/comment_model.js')



router.get('/', function(req, res) {
    var sessionName = req.session.username;

    Forum.find({ "username": req.session.username }, function(err, userData) {
        res.render("./forum/all_topics.ejs", {
            userData: userData
        })

    })
})


router.get('/post', function(req, res) {
    var sessionName = req.session.username;
    res.render("./forum/post_forum.ejs", {
        sessionName: sessionName
    })
})


////POSTING A NEW TOPIC////
router.post('/post', function(req, res) {
    var newTopic = new Forum(req.body);
    var sessionName = req.session.username;

    User.findOne({ 'username': sessionName }, function(err, userData) {
    
        Forum.create(req.body, function(err, forumData) {
            userData.topics.push(forumData.id)
            userData.save(function(err) {
                res.redirect('/')
            })
    
        })
    })
})



//SINGLE TOPICS
router.get('/topics/:id', function(req, res) {

    var getID = req.params.id
    var address = getID.replace(/_/g, ' ')
    var sessionName = req.session.username

    Forum.findOne({ "title": address }, function(err, userData) {
        // res.send(userData)
        res.render("./forum/single_topic.ejs", {
            userData : userData
        })

    })

})




router.get('/:id/comment', function(req, res) {
    res.render("./forum/comment_form.ejs")
})

module.exports = router;
