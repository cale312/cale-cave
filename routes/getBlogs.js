const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    blogs.find({})
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
