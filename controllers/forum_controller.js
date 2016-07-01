var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')
var moment = require('moment');
var marked = require('marked');

var User = require('../models/user_model.js')
var Forum = require('../models/forum_model.js')
var Comment = require('../models/comment_model.js')

var validate = require("../userValidate");


router.get('/', validate, function(req, res) {
    var sessionName = req.session.username;

    Forum.find({ "username": req.session.username }, function(err, forumData) {
        var totalVotes = 0;
        for (var i = 0; i <  forumData.length; i++) {
            totalVotes = forumData[i].vote + totalVotes
        }
        res.render("./forum/all_topics.ejs", {
            forumData: forumData,
            totalVotes : totalVotes
        })

    })
})


router.post('/', function(req, res) {
    var newComment = new Comment(req.body);
    var sessionName = req.session.username;

    Forum.findOne({ '_id': req.body.forumID }, function(err, forumData) {
        // console.log(forumData);
        Comment.create(req.body, function(err, commentData) {
            forumData.comment.push(forumData.id)
            commentData.save(function(err) {
                var noDash = forumData.title
                var addDash = noDash.replace(/\s+/g, '_')
                res.redirect('/forum/topics/' + addDash)
            })

        })
    })
})


//ADD A VOTE

router.put('/topics/vote/:id', function(req, res) {
    Forum.findOne({ '_id': req.params.id }, function(err, forumData) {
        // console.log(foundVoters);
        var curVote = forumData.vote;
        forumData.vote = curVote + 1;
        forumData.usersVotes.push(req.session.username);

        forumData.save(function(err) {
            if (err) {
                console.error('ERROR!');
            }
            res.redirect("/")
        });


    });

});



router.get('/post', validate, function(req, res) {
    var sessionName = req.session.username;
 var dateNow = moment().format("YYYY-MM-DD HH:mm");
     res.render("./forum/post_forum.ejs", {
        sessionName: sessionName,
        dateNow: dateNow
    })
})


////POSTING A NEW TOPIC////
router.post('/post', validate, function(req, res) {
    var newTopic = new Forum(req.body);
    var sessionName = req.session.username;

    User.findOne({ 'username': sessionName }, function(err, userData) {

        Forum.create(req.body, function(err, forumData) {
            userData.topics.push(forumData.id)
            userData.save(function(err) {
                req.session.username = req.body.username

                var noDash = req.body.title
                var addDash = noDash.replace(/\s+/g, '_')
                res.redirect('/')
            })

        })
    })
})



//SINGLE TOPICS
router.get('/topics/:id', validate, function(req, res) {
    var sessionName = req.session.username
    var getID = req.params.id
    var address = getID.replace(/_/g, ' ')

    Forum.findOne({ "title": address }, function(err, forumData) {
        var topicID = forumData.id
        Comment.find({ 'forumID': topicID }, function(err, commentData) {
            var dateNow = moment().format("YYYY-MM-DD HH:mm");


            for (var i = 0; i < commentData.length; i++) {
                var markedComment = marked(commentData[i].commentText)
            }

            // console.log(userData.id);
            req.session.topicID = forumData.id;
            res.render("./forum/single_topic.ejs", {
                dateNow: dateNow,
                sessionName: req.session.username,
                forumData: forumData,
                commentData: commentData,
                markedComment: markedComment,
                currentTopic: req.params.id
            })


        })

    })

})


//EDIT TOPICS
router.get('/topics/:id/edit', validate, function(req, res) {

    var reqID = req.params.id;
    var addSpace = reqID.replace(/_/g, ' ')
    
    var dateNow = moment().format("YYYY-MM-DD HH:mm");

    Forum.findById(req.session.topicID, function(err, forumData) {

        res.render("./forum/edit_post.ejs", {
            forumData: forumData,
            reqID : reqID,
            dateNow : dateNow
        })
    })
})

router.put('/topics/:id', function(req, res) {

    Forum.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true},
    function (err, data) {
        res.redirect("/")
    })
});

//EDIT ROUTE END






router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect("/login");
});


router.get('/:id/comment', function(req, res) {
    res.render("./forum/comment_form.ejs")
})

module.exports = router;
