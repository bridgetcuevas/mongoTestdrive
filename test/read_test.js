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
      assert(users[0]._id.toString() === helen._id.toString());
      done();
    })
  });

  it('should find a user with a specific id', (done) => {
    User.findOne({ _id: helen._id})
    .then((user)=> {
      assert( user.name === 'Helen');
      done();
    })
  })
});