/**
 * Journal (Journaling Block Device, JBD2)
 * @constructor
 * @param {Object} options
 * @returns {Journal}
 */
function Journal( options ) {

  if( !(this instanceof Journal) ) {
    return new Journal( options )
  }

  this.superBlock = new Journal.SuperBlock()

}

/**
 * JBD2 magic number
 * @constant
 * @type {Number}
 */
Journal.SIGNATURE = 0xC03B3998

/**
 * Block types
 * @enum {Number}
 */
Journal.BLOCK = {
  /** Descriptor */
  DESCRIPTOR: 1,
  /** Commit record */
  COMMIT: 2,
  /** Superblock v1 */
  SUPER_1: 3,
  /** Superblock v2 */
  SUPER_2: 4,
  /** Revocation record */
  REVOCATION: 5,
}

/**
 * Features, compatible
 * @enum {Number}
 */
Journal.FEATURE = {
  /** @type {Number} Maintains checksums on the data blocks */
  CHECKSUM: 1 << 0,
}

/**
 * Features, incompatible
 * @enum {Number}
 */
Journal.FEATURE_INCOMPAT = {
  /** @type {Number} Has block revocation records */
  REVOKE: 1 << 0,
  /** @type {Number} Can deal with 64-bit block numbers */
  BIT64: 1 << 1,
  /** @type {Number} Commits asynchronously */
  ASYNC_COMMIT: 1 << 2,
  /** @type {Number} Uses v2 of the checksum on-disk format */
  CHECKSUM_2: 1 << 3,
  /** @type {Number} Uses v3 of the checksum on-disk format */
  CHECKSUM_3: 1 << 4,
}

/**
 * Checksum algorithm types
 * @enum {Number}
 */
Journal.CHECKSUM = {
  CRC32: 1,
  MD5: 2,
  SHA1: 3,
  CRC32C: 4,
}

Journal.SuperBlock = require( './superblock' )

/**
 * Journal prototype
 * @ignore
 */
Journal.prototype = {

  constructor: Journal,

}

// Exports
module.exports = Journal
