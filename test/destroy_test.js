 const assert = require('assert');
 const User = require('../src/user');

 describe('Deleting a user', () => {
   let helen;
   
   beforeEach((done) => {
     helen = new User({ name: 'Helen'});
     helen.save()
     .then(() => done());
   });

   it('should execute the model instance of remove', (done) => {
     helen.remove()
     .then(() => User.findOne({name: 'Helen'}))
     .then((user) => {
       assert(user === null); 
       done(); 
     });
   });

   it('should execute the class method of deleteOne', (done) => {
     User.deleteOne({ name: 'Helen'})
     .then(() => User.findOne({name: 'Helen'}))
     .then((user) => {
       assert(user === null); 
       done();
     });
   });

   it('should execute the class method of findOneAndRemove', (done) => {
     User.findOneAndRemove({ name: 'Helen'})
     .then(() => User.findOne({name: 'Helen'}))
     .then((user) => {
       assert(user === null); 
       done();
     });
   });

   it('should execute the class method of findByIdAndRemove', (done) => {
     User.findByIdAndRemove(helen._id)
     .then(() => User.findOne({name: 'Helen'}))
     .then((user) => {
       assert(user === null); 
       done();
     });
   });

 });