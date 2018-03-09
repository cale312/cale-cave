const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const path = require('path');
const cors = require('cors');
const log = console.log;

const app = express();

// Route files
const getBlogById = require('./routes/getBlogById');
const deleteBlog = require('./routes/deleteBlog');
const getAllBlogs = require('./routes/getBlogs');
const commentBlog = require('./routes/commentBlog');
const likeBlog = require('./routes/likeBlog');
const postNewBlogs = require('./routes/postBlog');
const updateBlog = require('./routes/updateBlog');
const dislikeBlog = require('./routes/dislikeBlog');

// Connection Config file
const connect = require('./config/connection');

connect();

// Static files
app.use(express.static('public'));

// use express middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    next();
});

// App Routes
app.get('/', (req, res) => {
    res.send({
        getAllBlogs_postBlog: '/api/v1/blogs/',
        commentBlog: '/api/v1/blogs/:_blog_id/comment/',
        deleteBlog: '/api/v1/blogs/:_blog_id/delete/',
        updateBlog: '/api/v1/blogs/:_blog_id/update/',
        likeBlog: '/api/v1/blogs/:_blog_id/like/',
        dislikeBlog: '/api/v1/blogs/:_blog_id/dislike/'
    })
});
app.use('/api/v1/blogs', getAllBlogs);
app.use('/api/v1/blogs', getBlogById);
app.use('/api/v1/blogs', postNewBlogs);
app.use('/api/v1/blogs', deleteBlog);
app.use('/api/v1/blogs', updateBlog);
app.use('/api/v1/blogs', commentBlog);
app.use('/api/v1/blogs', likeBlog);
app.use('/api/v1/blogs', dislikeBlog);

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    (err) ? console.error(err) : log(chalk.blue.bold('=====>\nlisitening on https://localhost:' + port));
})
