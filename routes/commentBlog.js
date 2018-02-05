const blogsModel = require('../models/blogs.model');
const commentsModel = require('../models/comments.model');
const getHashtags = require('../libs/whereMyHashtags');
const express = require('express');
const chalk = require('chalk');
const log = console.log;
const router = express.Router();

router.post('/:_id/comment', (req, res) => {
    let blogId = req.params._id;
    let data = req.body;
    let hashtags = getHashtags(data.comment);
    
    commentsModel.create({
        comment: data.comment,
        hashtags: hashtags,
        commentFor: blogId
    })
    .then( (comment) => {
        blogsModel.findOneAndUpdate({
            _id: blogId
        }, {
            $push: {
                comments: comment
            }
        })
        .then( () => {
            blogsModel.findOne({ _id: blogId })
                .then(data => {
                    res.json({
                        blogs: data
                    })
                })
        })
        .catch(err => {
            log(chalk.red(err));
        })
    })

});

module.exports = router;
