const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blog: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model('caleBlogs', blogSchema);

module.exports = Blog;