const express = require('express');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

const app = express();

// Route files
const getAllBlogs = require('./routes/getBlogs');
const getBlogById = require('./routes/getBlogById');
const postNewBlogs = require('./routes/postBlog');
const commentBlog = require('./routes/commentBlog');
const deleteBlog = require('./routes/deleteBlog');
const updateBlog = require('./routes/updateBlog');
const likeBlog = require('./routes/likeBlog');
const dislikeBlog = require('./routes/dislikeBlog');

// Connection Config file
const connect = require('./config/connection');

connect();

// flash messages set =up
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true }));

// cors
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    next();
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
