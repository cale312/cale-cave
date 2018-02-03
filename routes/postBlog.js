const blogs = require('../models/blogs.model');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let data = req.body;
    if (data.blog.trim().length > 0) {
        blogs.create({
            blog: data.blog
        })
        .then(result => {
            blogs.find({})
                .then((newData) => {
                    data.blog = "";
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err);
                })
        })
    } else {
        req.flash('error', 'Cant post empty blog!');
        res.redirect('/');
    }
});

module.exports = router;
