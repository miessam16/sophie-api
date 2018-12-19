const should = require('chai').should;

should();

describe('Starting Test', function () {
   it('Should pass', function () {
      const x = 5;
      x.should.be.equal(5);
   });
});
