# Journaling Block Device (JBD2)
[![npm](https://img.shields.io/npm/v/jbd2.svg?style=flat-square)](https://npmjs.com/package/jbd2)
[![npm license](https://img.shields.io/npm/l/jbd2.svg?style=flat-square)](https://npmjs.com/package/jbd2)
[![npm downloads](https://img.shields.io/npm/dm/jbd2.svg?style=flat-square)](https://npmjs.com/package/jbd2)
[![build status](https://img.shields.io/travis/jhermsmeier/node-jbd2.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-jbd2)

An implementation of the [JBD2] journalling layer as used in [ext3], [ext4], and [OCFS2]

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save jbd2
```

## Used by

- **[jhermsmeier](https://github.com/jhermsmeier) / [node-ext4](https://github.com/jhermsmeier/node-ext4)**, an implementation of the ext4 file system in JavaScript

## Usage

```js
var Journal = require( 'jbd2' )
```

## References

- [ext4.wiki.kernel.org / Ext4_Disk_Layout](https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout#Journal_.28jbd2.29)
- [kerneltrap.org/node/6741](https://web.archive.org/web/20070926223043/http://kerneltrap.org/node/6741)
- [kernelnewbies.org/Ext4](https://kernelnewbies.org/Ext4)

[JBD2]: https://en.wikipedia.org/wiki/Journaling_block_device
[ext3]: https://en.wikipedia.org/wiki/Ext3
[ext4]: https://en.wikipedia.org/wiki/Ext4
[OCFS2]: https://en.wikipedia.org/wiki/OCFS2
