/*eslint no-undef: 0*/
/*eslint no-console: 0*/

module.exports = {
  onSuccess: function(response) {
    response.body.hits.forEach(function(hit) {
      console.log('\n')
      console.log('Title:      ' + hit.title)
      console.log('URL:        ' + hit.url)
      console.log('Page Views: ' + hit.pageviews)
    })
  },

  onError: function() {
    console.log('Oh, seems to be an error during http request... Please try again!')
  }
}
