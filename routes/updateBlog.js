const blogs = require('../models/blogs.model');
const express = require('express');
const whereMyHashtags = require('../libs/whereMyHashtags');
const router = express.Router();

router.post('/:_id/update', (req, res) => {
    let blogId = req.params._id;
    let data = req.body;
    let hashtags = whereMyHashtags(data.newBlog);
    blogs.findOneAndUpdate({
        _id: blogId
    }, {
        blog: data.newBlog,
        hashtags: hashtags
    })
    .then( () => {
        blogs.findOne({
            _id: blogId
        })
        .then( data => {
            res.json({
                blog: data
            });
        })
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;
