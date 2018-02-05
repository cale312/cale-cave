const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blog: {
        type: String
    },
    hashtags: {
        type: [],
        default: []
    },
    comments: {
        type: [],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model('caleBlogs', blogSchema);

module.exports = Blog;