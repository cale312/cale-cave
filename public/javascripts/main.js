const apiUrl = 'https://cale-blog.herokuapp.com/api/v1/blogs/';

// comment in for using local hosted api
// const apiUrl = 'http://localhost:8000/api/v1/blogs/';
var socket = io.connect();

function Blog(blog, date, comments, likes, dislikes, hashtags, id) {
  this.comments = comments.length;
  this.dislikes = dislikes;
  this.hashtags = hashtags;
  this.likes = likes;
  this.blog = blog;
  this.date = date;
  this.id = id;
}

function Comments(comments, hashtags, date) {
  this.comments = comments;
  this.hashtags = hashtags;
  this.date = date;
}

// function to handle when a blog is liked
function likeBlog(_id) {
  $.ajax(apiUrl + _id + '/like', {
    type: "POST",
    success: (result) => { }
  });
}

// function to handle when a blog is disliked
function disLikeBlog(_id) {
  $.ajax(apiUrl + _id + '/dislike', {
    type: "POST",
    success: (result) => { }
  });
}

function AppViewModel() {
  const self = this;
  let blogId = null;
  self.blogs = ko.observable([]);
  self.hashtags = ko.observable([]);
  self.comments = ko.observable([]);
  self.loader = ko.observable('<div class="preloader-wrapper big active"><div class="spinner-layer spinner-red-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
  self.data = ko.observable(false);

  // get all the data from the api function
  function getData() {
    return $.getJSON(apiUrl)
      .then((result) => {
        console.log('DATA LOADED SUCCESSFUL!')
        let blogs = [];
        let hashtags = [];
        let data = result.blogs.sort();
        data.map((item) => {
          blogs.push(new Blog(item.blog, item.dateAdded, item.comments, item.likes, item.dislikes, item.hashtags, item._id));
        });
        self.data(true);
        self.loader('');
        self.blogs(blogs);
      })
      .catch((err) => {
        console.log(err);
        self.loader('<p class="red-text">oops! something went wrong!</p>');
      })
  }

  // function to get all comments
  function getComments(_id) {
    let comments = [];
    return $.getJSON(apiUrl + _id)
      .then((data) => {
        let blog = data.blogs;
        if (blog.comments.length > 0) {
          blog.comments.map((comment) => {
            comments.push(new Comments(comment.comment, comment.hashtags, comment.dateAdded));
          });
        }
        self.comments(comments);
      })
  }

  // Fire the getData function to display all the blogs in the database
  getData();

  self.post = () => {
    if (document.querySelector('.blog').value.length !== 0) {
      let data = {
        blog: $('.blog').val()
      };
      $.ajax(apiUrl, {
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: (result) => {
          document.querySelector('.blog').value = '';
          // Emit post to trigger event
          socket.emit('post');
        }
      });
    } else {
      alert('the fuck dude, post something or go!')
    }  
  }

  self.like = (evt) => {
    blogId = evt.id;
    likeBlog(blogId);
    // Emit post to trigger event
    socket.emit('like');
  }

  self.dislike = (evt) => {
    blogId = evt.id;
    disLikeBlog(blogId);
    // Emit post to trigger event
    socket.emit('dislike');
  }

  self.getComments = (evt) => {
    blogId = evt.id;
    getComments(blogId)
  }

  self.comment = () => {
    if (document.querySelector('.comment').value.length !== 0) {
      let data = {
        comment: $('.comment').val()
      };
      $.ajax(apiUrl + blogId + '/comment', {
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: (result) => {
          document.querySelector('.comment').value = '';
          getComments(blogId);
          // Emit post to trigger event
          socket.emit('comment');
        }
      });
    } else {
      alert('please type something');
    }
    socket.on('comment', () => { getData() });
  }

  self.delete = (evt) => {
    blogId = evt.id;
    $.ajax(apiUrl + blogId + '/delete', {
      type: "POST",
      success: (result) => {
        socket.emit('delete');
      }
    });
  }
  
  
  // listening for events
  socket.on('post', () => { getData() });  
  socket.on('like', () => { getData() });
  socket.on('dislike', () => { getData() });
  socket.on('delete', () => { getData() });

}

ko.applyBindings(new AppViewModel());
