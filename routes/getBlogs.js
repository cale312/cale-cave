const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    blogs.find({})
        .then((data) => {
            res.render('blogger',{
                title: "Blogger",
                blogs: data
            });
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;
