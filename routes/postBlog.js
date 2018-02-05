const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

// function that returns an array of all the #hashtags
const whereMyHashtags = (sentence) => {
    let hashtags = [];
    let splitSentence = sentence.split(' ');
    splitSentence.map( word => {
        (word.startsWith('#')) ? hashtags.push(word) : false;
    });
    return hashtags;
}

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
