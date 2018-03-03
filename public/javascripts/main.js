//const apiUrl = 'https://cale-blog.herokuapp.com/api/v1/blogs/';

// comment in for using local hosted api
const apiUrl = 'http://localhost:8000/api/v1/blogs/';

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

// get all the data from the api function
function getData() {
  return $.getJSON(apiUrl);
}

// function to handle when a blog is liked
function likeBlog(_id) {
  $.ajax(apiUrl + _id + '/like', {
    type: "POST",
    success: (result) => {
      console.log(result);
      setTimeout( () => {
        // location.reload();
      }, 2100);
    }
  })
}

// function to handle when a blog is disliked
function disLikeBlog(_id) {
  $.ajax(apiUrl + _id + '/dislike', {
    type: "POST",
    success: (result) => {
      console.log(result);
      setTimeout( () => {
        // location.reload();
      }, 2100);
    }
  })
}

// function to get all comments
function getComments(_id) {
  return $.getJSON(apiUrl + _id);
}

function AppViewModel() {
  const self = this;
  let blogId = null;
  self.blogs = ko.observable([]);
  self.hashtags = ko.observable([]);
  self.comments = ko.observable([]);
  self.loader = ko.observable('<div class="preloader-wrapper big active"><div class="spinner-layer spinner-red-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
  self.data = ko.observable(false);

  getData()
    .then( (result) => {
      let blogs = [];
      let hashtags = [];
      let data = result.blogs;
      console.log(data);
      data.map( (item) => {
        blogs.push(new Blog(item.blog, item.dateAdded, item.comments, item.likes, item.dislikes, item.hashtags, item._id));
      });
      console.log(blogs);
      self.data(true);
      self.loader('');
      self.blogs(blogs);
    })
    .catch( (err) => {
      console.log(err);
      self.loader('<p class="red-text">oops! something went wrong!</p>');
    })

  self.post = () => {
    let data = {
      blog: $('.blog').val()
    };
    $.ajax(apiUrl, {
      data: JSON.stringify(data),
      type: "POST", contentType: "application/json",
      success: (result) => {
        location.reload();
      }
    });
  }

  self.like = (evt) => {
    blogId = evt.id;
    likeBlog(blogId);
  }

  self.dislike = (evt) => {
    blogId = evt.id;
    disLikeBlog(blogId);
  }

  self.getComments = (evt) => {
    blogId = evt.id;
    let comments = [];
    getComments(blogId)
      .then( (data) => {
        let blog = data.blogs;
        if (blog.comments.length > 0) {
          blog.comments.map( (comment) => {
            comments.push(new Comments(comment.comment, comment.hashtags, comment.dateAdded));
          });
        }
        self.comments(comments);
      })
  }

  self.comment = () => {
    let data = {
      comment: $('.comment').val()
    };
    $.ajax(apiUrl + blogId + '/comment', {
      data: JSON.stringify(data),
      type: "POST", contentType: "application/json",
      success: (result) => {
        setTimeout( () => {
          location.reload();
        }, 2100);
      }
    });
  }

  self.delete = (evt) => {
    blogId = evt.id;
    $.ajax(apiUrl + blogId + '/delete', {
      type: "POST",
      success: (result) => {
        alert('blog deleted');
        location.reload();
      }
    });
  }

}

ko.applyBindings(new AppViewModel());
