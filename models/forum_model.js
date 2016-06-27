var mongoose = require('mongoose');

var forumSchema = mongoose.Schema({
    title: String,
    forumText: String,
    username: String,
    comment: []
}, { strict: true})

var Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;