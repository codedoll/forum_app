var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    username: String,
    forumID: String,
    forumDate: String,
    commentText: String
}, { strict : true })

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;