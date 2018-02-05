const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.get('/:_id', (req, res) => {
    blogs.findOneAndRemove({
        _id: req.params._id
    })
    .then(result => {
        blogs.find({})
            .then( (data) => {
                res.json({
                    blogs: data
                });
            })
            .catch(err => {
                console.log(err);
            })
    })
});

module.exports = router;
