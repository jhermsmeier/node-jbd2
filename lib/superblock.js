var Journal = require( './journal' )

/**
 * SuperBlock
 * @constructor
 * @returns {SuperBlock}
 */
function SuperBlock() {

  if( !(this instanceof SuperBlock) ) {
    return new SuperBlock()
  }

  // Common block header

  /** @type {Number} JB2 magic number */
  this.signature = Journal.SIGNATURE
  /** @type {Number} Block type */
  this.blockType = Journal.BLOCK.SUPER_2
  /** @type {Number} Transaction sequence number of this block */
  this.transaction = 0

  // Static information describing the journal

  /** @type {Number} Block size of the journal device */
  this.blockSize = 0
  /** @type {Number} Total number of blocks in the journal */
  this.blockCount = 0
  /** @type {Number} First block of log information */
  this.firstLogBlock = 0

  // Dynamic information describing the current state of the log

  /** @type {Number} First transaction number in log */
  this.sequenceNumber = 0
  /** @type {Number} Block address of log start */
  this.start = 0
  /** @type {Number} Error value (set during abort) */
  this.errno = 0

  // The remaining fields are only valid in a version 2 superblock

  /** @type {Number} Compatible feature flags */
  this.featureCompat = 0
  /** @type {Number} Incompatible feature flags */
  this.featureIncompat = 0
  /** @type {Number} Read-only compatible feature flags */
  this.featureReadonlyCompat = 0
  /** @type {String} Journal UUID */
  this.uuid = '0000000000000000'
  /** @type {Number} Number of file systems sharing this journal */
  this.userCount = 0
  /** @type {Number} Location of dynamic super block copy (unused?) */
  this.dynSuper = 0
  /** @type {Number} Limit of journal blocks per transaction (unused?) */
  this.maxTransactions = 0
  /** @type {Number} Limit of data blocks per transaction (unused?) */
  this.maxTransactionData = 0
  /** @type {Number} Checksum algorithm used for the journal */
  this.checksumType = 0
  /** @type {Number} Reserved */
  this.reserved1 = 0
  /** @type {Buffer} Reserved */
  this.reserved2 = Buffer.alloc(42)
  /** @type {Number} Checksum of the entire superblock, with this field set to zero */
  this.checksum = 0
  /** @type {Array<String>} UUIDs of file systems sharing this journal */
  this.users = []

}

/**
 * Size of the superblock structure in bytes
 * @type {Number}
 * @constant
 */
SuperBlock.SIZE = 1024

/**
 * Parse a JBD2 superblock
 * @param {Buffer} buffer
 * @param {Number} [offset=0]
 * @returns {Journal}
 */
SuperBlock.parse = function( buffer, offset ) {
  return new SuperBlock().parse( buffer, offset )
}

/**
 * SuperBlock prototype
 * @ignore
 */
SuperBlock.prototype = {

  constructor: SuperBlock,

  /**
   * Parse a JBD2 superblock
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {Journal}
   */
  parse( buffer, offset ) {

    this.signature = buffer.readUInt32BE( offset + 0x00 )
    this.blockType = buffer.readUInt32BE( offset + 0x04 )
    this.sequence = buffer.readUInt32BE( offset + 0x08 )

    this.blockSize = buffer.readUInt32BE( offset + 0x0C )
    this.blockCount = buffer.readUInt32BE( offset + 0x10 )
    this.firstLogBlock = buffer.readUInt32BE( offset + 0x14 )

    this.sequenceNumber = buffer.readUInt32BE( offset + 0x18 )
    this.start = buffer.readUInt32BE( offset + 0x1C )
    this.errno = buffer.readUInt32BE( offset + 0x20 )

    this.featureCompat = buffer.readUInt32BE( offset + 0x24 )
    this.featureIncompat = buffer.readUInt32BE( offset + 0x28 )
    this.featureReadonlyCompat = buffer.readUInt32BE( offset + 0x2C )
    this.uuid = buffer.toString( 'hex', offset + 0x30, offset + 0x40 )
    this.userCount = buffer.readUInt32BE( offset + 0x40 )
    this.dynSuper = buffer.readUInt32BE( offset + 0x44 )
    this.maxTransaction = buffer.readUInt32BE( offset + 0x48 )
    this.maxTransactionData = buffer.readUInt32BE( offset + 0x4C )
    this.checksumType = buffer.readUInt8( offset + 0x50 )
    this.reserved1 = buffer.readUInt( offset + 0x51, 3 )
    buffer.copy( this.reserved2, offset + 0x54, offset + 0xFC )
    this.checksum = buffer.readUInt32BE( offset + 0xFC )

    this.users.length = 0

    offset += 0x100

    for( var i = 0; i < this.userCount ) {
      this.users.push( buffer.toString( 'hex', offset, offset += 16 )   )
    }

    return this

  },

  /**
   * Write a JBD2 superblock to a buffer
   * @param {Buffer} [buffer]
   * @param {Number} [offset=0]
   * @returns {Buffer}
   */
  write( buffer, offset ) {

    offset = offset || 0
    buffer = buffer || Buffer.alloc( SuperBlock.SIZE + offset )

    buffer.writeUInt32BE( this.signature, offset + 0x00 )
    buffer.writeUInt32BE( this.blockType, offset + 0x04 )
    buffer.writeUInt32BE( this.sequence, offset + 0x08 )

    buffer.writeUInt32BE( this.blockSize, offset + 0x0C )
    buffer.writeUInt32BE( this.blockCount, offset + 0x10 )
    buffer.writeUInt32BE( this.firstLogBlock, offset + 0x14 )

    buffer.writeUInt32BE( this.sequenceNumber, offset + 0x18 )
    buffer.writeUInt32BE( this.start, offset + 0x1C )
    buffer.writeUInt32BE( this.errno, offset + 0x20 )

    buffer.writeUInt32BE( this.featureCompat, offset + 0x24 )
    buffer.writeUInt32BE( this.featureIncompat, offset + 0x28 )
    buffer.writeUInt32BE( this.featureReadonlyCompat, offset + 0x2C )
    buffer.write( this.uuid, offset + 0x30, 16, 'hex' )
    buffer.writeUInt32BE( this.userCount, offset + 0x40 )
    buffer.writeUInt32BE( this.dynSuper, offset + 0x44 )
    buffer.writeUInt32BE( this.maxTransaction, offset + 0x48 )
    buffer.writeUInt32BE( this.maxTransactionData, offset + 0x4C )
    buffer.writeUInt8( this.checksumType, offset + 0x50 )
    buffer.writeUInt( this.reserved1, offset + 0x51, 3 )
    this.reserved2.copy( buffer, offset + 0x54, offset + 0xFC )
    buffer.writeUInt32BE( this.checksum, offset + 0xFC )

    offset += 0x100

    for( var i = 0; i < this.users.length; i++ ) {
      buffer.write( this.user[i], offset, 16, 'hex' )
    }

    return buffer

  },

}

// Exports
module.exports = SuperBlock
