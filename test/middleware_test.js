const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {
  let helen, blogPost;

  beforeEach((done) => { 
    helen = new User({name: 'Helen'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yes it truly is'});
 
     helen.blogPosts.push(blogPost);

     Promise.all([helen.save(), blogPost.save()])
     .then(() => done());

  });

  it('should delete user along with their authored blog posts on delete', (done) => {
    helen.remove()
    .then(() => BlogPost.collection.countDocuments())
    .then((count) => {
        assert(count === 0);
        done();

      });
  });
});