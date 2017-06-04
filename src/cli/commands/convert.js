/*eslint no-undef: 0*/

var tutorials = require('../../../src/index')
  , callbacks = require('../callbacks')

module.exports = function(options) {
  var query = {}

  query.per_page        = options.parent.perPage || 21
  query.page            = options.parent.page || 1
  query.q               = options.parent.query || ''
  query.primary_filter  = options.parent.sortBy || 'newest'

  return tutorials.get(query).then(callbacks.onSuccess).catch(callbacks.onError)
}
