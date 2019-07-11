 const assert = require('assert');
 const User = require('../src/user');

 describe('Virtual types', () => {
   it('should allow postCount to return a number of posts', (done) => {
     const helen = new User({
       name:'Helen',
       posts:[{title: 'Post Title'}]
     });

     helen.save()
     .then(() => User.findOne({name:'Helen'}))
     .then((user) => {
       assert(helen.postCount === 1);
       done();
     });
   });
 });