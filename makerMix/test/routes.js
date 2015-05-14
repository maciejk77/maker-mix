var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
// var winston = require('winston');
var config = require('../config/dbconfig');
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mongodb');



// mongoose.connect('mongodb://localhost/makerMixTest');

(5).should.be.exactly(5).and.be.a.Number;
 
describe('Routing', function() {
  var url = 'http://localhost:3000';
  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function(done) {
    // In our tests we use the test db
    mongoose.connect(config.db.mongodb)
    // databaseCleaner.clean(mongoose.connections[0].db, function() {
    //     console.log('done');
    // });
    done()
});

  after(function(done) {
    databaseCleaner.clean(mongoose.connections[0].db, function() {
        console.log('done');
    });
    done()
  });

  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('API', function() {
    it('should add a Maker to the array', function(done) {
      var maker = {
        firstName: 'Ciccio',
        pair: false,
        blacklist: false,
        noOfCommits: 0
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
    request(url)
    .post('/makers')
    .send(maker)
    .expect('Content-Type', /json/)
    .expect(200) //Status code
      // end handles the response
    .end(function(err, res) {
        if (err) {
          throw err;
        }
      // this is should.js syntax, very clear
      res.body.should.have.property('_id')
        res.body.firstName.should.equal('Ciccio');          
        res.body.pair.should.equal(false);
        res.body.blacklist.should.equal(false);
        res.body.noOfCommits.should.equal(0);
      done();
    });
  });
});
});


