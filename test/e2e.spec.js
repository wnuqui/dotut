/*eslint no-undef: 0*/
/*eslint no-console: 0*/

var expect        = require('chai').expect
  , tutorials     = require('../src/index')
  , convert       = require('../src/cli/commands/convert')
  , nock          = require('nock')
  , responseBody  = require(__dirname + '/replies/200.json')
  , intercept     = require('intercept-stdout')
  , stdoutText    = ''

var unhookIntercept = intercept(function(text) {
  stdoutText += text
})

describe('tutorials.get()', function() {
  context('e2e', function() {
    context('success', function() {
      beforeEach(function () {
        nock('https://www.digitalocean.com')
          .get('/community/api/tutorials/search')
          .reply(200, function() {
             return responseBody
           })

        stdoutText = ''
      })

      it('requests successfully', function() {
        var options = {"parent": {}}

        return tutorials.get(options).then(function(res) {
          expect(res.statusCode).to.eq(200)
        })
      })

      it('prints results to STDOUT', function() {
        var options = {"parent": {}}

        return convert(options).then(function() {
          unhookIntercept()
          expect(stdoutText).to.match(/Title\:/)
          expect(stdoutText).to.match(/URL\:/)
          expect(stdoutText).to.match(/Page Views\:/)
        })
      })
    })

    context('error', function() {
      beforeEach(function () {
        nock('https://www.digitalocean.com')
          .get('/community/api/tutorials/search')
          .replyWithError('error')

        stdoutText = ''
      })

      it('prints error to STDOUT', function() {
        var options = {"parent": {}}

        return convert(options).catch(function() {
          unhookIntercept()
          expect(stdoutText).to.eq('Oh, seems to be an error during http request... Please try again!')
        })
      })
    })
  })
})
