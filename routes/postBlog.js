const blogs = require('../models/blogs.model');
const whereMyHashtags = require('../libs/whereMyHashtags');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let data = req.body;
    let hashtags = whereMyHashtags(data.blog);
    blogs.create({
        blog: data.blog,
        hashtags: hashtags
    })
    .then(result => {
        blogs.find({})
            .then((newData) => {
                data.blog = "";
                res.json({
                    blogs: newData
                });
            })
            .catch(err => {
                console.log(err);
            })
    })
});

module.exports = router;
