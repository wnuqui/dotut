/*eslint no-undef: 0*/

var expect    = require('chai').expect
  , tutorials = require('../src/index')
  , nock      = require('nock')

describe('tutorials.get()', function() {
  context('unit', function() {
    beforeEach(function () {
      nock('https://www.digitalocean.com')
        .get('/community/api/tutorials/search')
        .reply(200)
    })

    it('returns a promise object', function() {
      var promise = tutorials.get({})
      expect(typeof promise.then).to.eq('function')
      expect(typeof promise.catch).to.eq('function')
    })
  })
})
