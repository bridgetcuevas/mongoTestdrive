const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let helen, blogPost, comment;

  beforeEach((done) => { 
    helen = new User({name: 'Helen'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yes it truly is'});
    comment = new Comment({content: 'Congrats on great post'});
 
     helen.blogPosts.push(blogPost);
     blogPost.comments.push(comment);
     comment.user = helen;

     Promise.all([helen.save(), blogPost.save(), comment.save()])
     .then(() => done());
  });

  it('should save a relation between a user and a blog post', (done)=> {
    User.findOne({name: 'Helen'})
    .populate('blogPosts')
    .then((user) => {
      assert(user.blogPosts[0].title === 'JS is Great'); 
      done();

    });

  });

});
