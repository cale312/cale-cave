const commentsModel = require('../models/comments.model');
const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.post('/:_id/delete', (req, res) => {
    let blogId = req.params._id;
    blogs.findOneAndRemove({
        _id: blogId
    })
    .then( () => {
        commentsModel.findByIdAndRemove({
            commentFor: blogId
        })
        .then( () => {
            blogs.find({})
                .then( (data) => {
                    res.json({
                        blogs: data
                    });
                })
        })
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;
