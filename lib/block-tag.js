/**
 * BlockTag
 * @constructor
 * @returns {BlockTag}
 */
function BlockTag() {

  if( !(this instanceof BlockTag) ) {
    return new BlockTag()
  }

}

/**
 * BlockTag prototype
 * @ignore
 */
BlockTag.prototype = {

  constructor: BlockTag,

}

// Exports
module.exports = BlockTag
