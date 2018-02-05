const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    comment: {
        type: String
    },
    commentFor: {
        type: String,
    },
    hashtags: {
        type: [],
        default: []
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var Comments = mongoose.model('comments', blogSchema);

module.exports = Comments;