/*eslint no-undef: 0*/

var expect    = require('chai').expect
  , tutorials = require('../index')
  , nock      = require('nock')

describe('tutorials.get()', function() {
  context('integration', function() {
    beforeEach(function () {
      nock('https://www.digitalocean.com')
        .get('/community/api/tutorials/search')
        .replyWithFile(200, __dirname + '/replies/200.json')
    })

    it('is passing', function() {
      var query = {"filter": "newest"}

      return tutorials.get(query).then(function(res) {
        expect(res.statusCode).to.eq(200)
      })
    })
  })
})
