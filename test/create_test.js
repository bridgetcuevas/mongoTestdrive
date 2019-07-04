const assert = require( 'assert');
const User = require('../src/user');

describe('creating records', () => {
  it('should save a user', (done) => {
    const helen = new User({ name: 'Helen'});
    
    helen.save() 
     .then(()=> {
       //Has helen been saved successfully?
       assert(!helen.isNew);
       done();
     });
  });
});
