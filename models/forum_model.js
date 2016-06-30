var mongoose = require('mongoose');

var forumSchema = mongoose.Schema({
    title: String,
    forumDate: String,
    forumText: String,
    username: String,
    comment: [],
    vote: Number,
    usersVotes: [],
}, { strict: true})

var Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;