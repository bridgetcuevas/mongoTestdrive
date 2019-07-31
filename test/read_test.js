const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let helen, margot, beatrice, owen;

  beforeEach((done)=> {
    helen = new User({name: 'Helen'});
    margot = new User({name: 'Margot'});
    beatrice = new User({name: 'Beatrice'});
    owen = new User({name: 'Owen'});

    Promise.all([helen.save(), margot.save(), beatrice.save(), owen.save()])
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
    });    
  });

  it('should skip and limit the result set', (done) => {
    User.find({})
    .sort({name: 1})
    .skip(1)
    .limit(2)
    .then((users) => {
      console.log(users[1].name)
      assert(users.length === 2);
      assert(users[0].name === 'Helen');
      assert(users[1].name === 'Margot');
      done();
    })
  })
});