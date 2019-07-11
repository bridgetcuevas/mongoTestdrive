const assert = require('assert');
const User = require('../src/user');

describe('Updating records', ()=> {
  let helen;

  beforeEach((done)=> {
    helen = new User({name: 'Helen', likes: 0})
    helen.save()
     .then(()=> done());
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Margot');
      done();
   });  
  }

  it('should execute the model instance of updateOne', (done) => {
    assertName(helen.updateOne({ name: 'Margot'}), 
    done
    );
  });

  it('should execute the class method of updateMany', (done) => {
    assertName(
    User.updateMany({name:'Helen'}, { name: 'Margot'}),
    done
    );
  });

  it('should execute the class method of findOneAndUpdate', (done) => {
    assertName(
    User.findOneAndUpdate({name:'Helen'}, { name: 'Margot'}),
    done
    );
  });

  it('should execute the class method of findOneByIdAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate(helen._id, { name: 'Margot'}),
      done
      );
  });

  it('should increment a users postCount by 1', (done) => {
    User.updateOne({name:'Helen'}, { $inc: { likes: 1 } })
    .then(()=> User.findOne({ name: 'Helen'}))
    .then((user) => {
      assert(user.likes === 1);
      done();
    });
  }); 

});