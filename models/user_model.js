var mongoose = require('mongoose');
var forumSchema = require('../models/forum_model.js').schema

var userSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    topics: []
},  { strict: true})


var User = mongoose.model('User', userSchema);

module.exports = User;