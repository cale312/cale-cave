const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.post('/:_id/dislike', (req, res) => {
    let blogId = req.params._id;
    blogs.findOneAndUpdate({
        _id: blogId
    }, {
        $inc: {
            dislikes: 1
        }
    })
    .then( (data) => {
        blogs.findOne({
            _id: blogId
        })
        .then( data => {
            res.json({
                blog: data
            })
        })
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;