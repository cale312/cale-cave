const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blog: {
        type: String
    },
    comments: {
        type: [],
        default: []
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model('caleBlogs', blogSchema);

module.exports = Blog;