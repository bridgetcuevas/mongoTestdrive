const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let helen;

  beforeEach((done)=> {
    helen = new User({name: 'Helen'});
    helen.save()
    .then(() => done());
  });

  it('should find all users with the name helen', (done) => {
    User.find({name: 'Helen'})
    .then((users)=> {
      console.log(users[0]._id);
      console.log(helen._id);
      assert(users._id.toString() === helen._id.toString());
      done();
    })
  });
});