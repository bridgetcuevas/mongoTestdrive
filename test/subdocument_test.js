const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('should create a subdocument', (done) => {
    const helen = new User({
      name: 'Helen',
      posts: [{title: 'Post Title'}]
    });
    helen.save()
    .then(() =>  User.findOne({ name: 'Helen'}))
    .then((user) => {
      assert(user.posts[0].title === 'Post Title');
      done();
    });
  });

  it('should add subdocuments to an existing record', (done) => {
    const helen = new User ({
      name: 'Helen',
      posts: []
    });
    helen.save()
    .then(() => User.findOne({ name: 'Helen'}))
    .then((user) => {
      user.posts.push({ title: 'New Post'});
      return user.save();
    })
    .then(( )=> User.findOne({ name: 'Helen'}))
    .then((user) => {
      assert(user.posts[0].title === 'New Post');
      done();
    });
  });

  it('should remove an existing subdocument', (done) => {
    const helen = new User({
      name: 'Helen',
      posts: [{ title: 'New Title'}]
    });
    helen.save()
    .then(() => User.findOne({name: 'Helen'}))
    .then((user)=> {
      const post = user.posts[0];
      post.remove();
      return user.save();
    })
    .then(()=> User.findOne({name: 'Helen'}))
    .then((user)=> {
      assert(user.posts.length === 0);
      done();
    });
  });

});