var assert = require( 'assert' )
var inspect = require( './inspect' )
var Journal = require( '..' )

context( 'Journal', function() {

  specify( 'create a new journal', function() {
    var journal = new Journal()
    inspect.log( journal )
  })

})

context( 'SuperBlock', function() {

  specify( 'create a new superblock', function() {
    var superblock = new Journal.SuperBlock()
  })

})
