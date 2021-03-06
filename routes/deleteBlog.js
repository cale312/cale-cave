const commentsModel = require('../models/comments.model');
const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.post('/:_id/delete', (req, res) => {
    let blogId = req.params._id;
    blogs.findOneAndRemove({
            _id: blogId
        })
        .then((blog) => {
            blog.comments.map((comment) => {
                commentsModel.findOneAndRemove({
                        commentFor: comment.commentFor
                    })
                    .then(() => {
                        blogs.find({})
                            .then((data) => {
                                res.json({
                                    blogs: data
                                });
                            })
                    })
            })
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;