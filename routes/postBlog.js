const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let data = req.body;
    blogs.create({
        blog: data.blog
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
