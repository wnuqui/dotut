/*eslint no-undef: 0*/
var request = require('superagent')

module.exports = {
	get: function(query) {
    var tutorialsURL = 'https://www.digitalocean.com/community/api/tutorials/search'

		return request
     .get(tutorialsURL)
     .send(query)
     .set('Accept', 'application/json')
	}
}
