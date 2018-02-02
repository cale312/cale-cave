const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('blogger', {title: 'the_CodeCave | blog'})
});

module.exports = router;
