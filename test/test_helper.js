const mongoose = require('mongoose');

//reference to ES6 promises no more deprecation error
mongoose.Promise = global.Promise;

//before executed one time before all tests
before((done) => {
  mongoose.connect(
    'mongodb://localhost/users_test', 
    { 
      useNewUrlParser: true , 
      useFindAndModify: false
    });
  mongoose.connection
     .once('open', () => { done(); })
     .on('error', (error) => {
       console.warn('warning!', error);
     });  
});
  
beforeEach((done) => {
     mongoose.connection.collections.users.drop(()=> {
       //Ready to run the next test!
       done();      
     });
   });  