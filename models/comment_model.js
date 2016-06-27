var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    commentText: String,
    username: String,
    title: String,
    date: Date
}, { strict: true})

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;