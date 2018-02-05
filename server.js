const express = require('express');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');

const app = express();

// Route files
const getAllBlogs = require('./routes/getBlogs');
const postNewBlogs = require('./routes/postBlog');
const deleteBlog = require('./routes/deleteBlog');

// Connection Config file
const connect = require('./config/connection');

connect();

// flash messages set =up
app.use(flash());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true }));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// App Routes
app.use('/api/cale_blog/v1', getAllBlogs);
app.use('/api/cale_blog/v1', postNewBlogs);
app.use('/api/cale_blog/v1/delete', deleteBlog);

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    (err) ? console.error(err) : console.log('lisitening on https://locahost:' + port);
})

/*
    Add comment section for the blogs
    Add like and dislike of the blogs
 */
