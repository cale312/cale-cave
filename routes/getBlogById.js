const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.get('/:_id', (req, res) => {
    let blogId = req.params._id;
    blogs.findOne({
        _id: blogId
    })
    .then((data) => {
        res.json({
            blogs: data
        });
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;
