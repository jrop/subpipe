'use strict'

const through2 = require('through2')
const PassThrough = require('stream').PassThrough

module.exports = function subpipe(callback) {
	var head = new PassThrough({ objectMode: true })
	var tail = callback.call(head, head)

	return through2.obj(function (obj, enc, done) {
		tail.on('data', data => done(null, data))
		head.write(obj)
	})
}
